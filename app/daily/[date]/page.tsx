'use client'

import { use } from 'react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ date: string }>
}

export default function DailyDatePage({ params }: PageProps) {
  const { date } = use(params)
  const today = new Date().toISOString().slice(0, 10)
  const isToday = date === today

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
            <Link href="/" style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', textDecoration: 'none' }}>
              ⚡ HR日报
            </Link>
            <Link href="/daily" style={{ color: '#666', textDecoration: 'none', fontSize: 14 }}>
              ← 日报列表
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          borderRadius: 16,
          padding: '40px',
          color: '#fff',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 8 }}>
            {isToday ? '今日' : '往期'}日报
          </div>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>
            {date}
            {isToday && <span style={{ marginLeft: 12, fontSize: 16, background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 12 }}>今日</span>}
          </h1>
        </div>

        <DailyContent date={date} />
      </main>
    </div>
  )
}

function DailyContent({ date }: { date: string }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/data/daily/${date}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [date])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>加载中...</div>
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: 60,
        textAlign: 'center',
        border: '1px solid #eee',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
        <h3 style={{ margin: '0 0 12px 0', color: '#1a1a1a' }}>暂无日报数据</h3>
        <p style={{ color: '#999', margin: '0 0 24px 0', fontSize: 14 }}>
          此日期的日报将在次日早8点自动生成
        </p>
        <Link href="/" style={{
          display: 'inline-block',
          padding: '10px 24px',
          background: '#2563eb',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontSize: 14,
        }}>
          查看首页资讯
        </Link>
      </div>
    )
  }

  const categories = ['industry', 'product', 'policy']
  const categoryLabels: Record<string, string> = {
    industry: '行业动态',
    product: '产品工具',
    policy: '政策法规',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {categories.map(cat => {
        const items = data.items.filter((item: any) => item.category === cat)
        if (items.length === 0) return null
        return (
          <div key={cat} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #eee' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CategoryDot category={cat} />
              {categoryLabels[cat]} ({items.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map((item: any, idx: number) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    background: '#fafafa',
                    borderRadius: 12,
                    textDecoration: 'none',
                  }}
                >
                  <h4 style={{ margin: '0 0 8px 0', fontSize: 15, fontWeight: 500, color: '#1a1a1a', lineHeight: 1.4 }}>
                    {item.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                    {item.summary || item.generatedSummary || '暂无摘要'}
                  </p>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
                    {item.source} · {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('zh-CN') : ''}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )
      })}
      
      <div style={{ textAlign: 'center', color: '#999', fontSize: 12, padding: '20px 0' }}>
        数据更新时间: {data.generatedAt ? new Date(data.generatedAt).toLocaleString('zh-CN') : ''}
      </div>
    </div>
  )
}

// Need to import useState and useEffect since this is 'use client'
import { useState, useEffect } from 'react'

function CategoryDot({ category }: { category: string }) {
  const colors: Record<string, string> = {
    industry: '#f59e0b',
    product: '#3b82f6',
    policy: '#ec4899',
  }
  return (
    <span style={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: colors[category] || '#666',
      display: 'inline-block',
    }} />
  )
}