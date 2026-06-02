'use client'

import { use } from 'react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

const CATEGORY_CONFIG: Record<string, { label: string; description: string; color: string }> = {
  industry: { label: '行业动态', description: '人力资源行业最新动态与趋势', color: '#f59e0b' },
  product: { label: '产品工具', description: 'HR软件、工具新功能与版本更新', color: '#3b82f6' },
  policy: { label: '政策法规', description: '劳动法规、政策解读与合规指南', color: '#ec4899' },
}

export default function CategoryPage({ params }: PageProps) {
  const { slug } = use(params)
  const config = CATEGORY_CONFIG[slug]
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/news.json')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d && d.items) {
          setNews(d.items.filter((item: any) => item.category === slug))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  if (!config) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>未找到该分类</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
            <Link href="/" style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', textDecoration: 'none' }}>
              ⚡ HR日报
            </Link>
            <nav style={{ display: 'flex', gap: 8 }}>
              {Object.entries(CATEGORY_CONFIG).map(([key, val]) => (
                <Link
                  key={key}
                  href={`/category/${key}`}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontSize: 14,
                    textDecoration: 'none',
                    background: slug === key ? '#2563eb' : 'transparent',
                    color: slug === key ? '#fff' : '#666',
                  }}
                >
                  {val.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{
          borderLeft: `4px solid ${config.color}`,
          paddingLeft: 20,
          marginBottom: 32,
        }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: 28, fontWeight: 700 }}>{config.label}</h1>
          <p style={{ margin: 0, color: '#666', fontSize: 15 }}>{config.description}</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>加载中...</div>
        ) : news.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center', border: '1px solid #eee' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p style={{ color: '#999' }}>暂无{config.label}相关资讯</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {news.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: '#fff',
                  borderRadius: 12,
                  padding: '20px 24px',
                  textDecoration: 'none',
                  border: '1px solid #eee',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: '#999' }}>{item.source}</span>
                    </div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600, color: '#1a1a1a' }}>
                      {item.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
                      {item.summary || item.generatedSummary || '暂无摘要'}
                    </p>
                  </div>
                  <div style={{ fontSize: 12, color: '#bbb', whiteSpace: 'nowrap' }}>
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }) : ''}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

import { useState, useEffect } from 'react'