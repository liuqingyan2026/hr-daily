'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { slug: '', label: '全部' },
  { slug: 'industry', label: '行业动态' },
  { slug: 'product', label: '产品工具' },
  { slug: 'policy', label: '政策法规' },
  { slug: 'daily', label: '每日日报' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('')
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      const res = await fetch('/data/news.json')
      if (res.ok) {
        const data = await res.json()
        setNews(data.items || [])
      }
    } catch (e) {
      console.error('加载失败', e)
    } finally {
      setLoading(false)
    }
  }

  const filteredNews = activeCategory
    ? news.filter(item => item.category === activeCategory)
    : news

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* 顶部导航 */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
          }}>
            <Link href="/" style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#2563eb',
              textDecoration: 'none',
            }}>
              ⚡ HR日报
            </Link>
            <nav style={{ display: 'flex', gap: 8 }}>
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  href={cat.slug ? `/category/${cat.slug}` : '/'}
                  onClick={(e) => {
                    if (cat.slug === activeCategory) {
                      e.preventDefault()
                    }
                  }}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontSize: 14,
                    textDecoration: 'none',
                    background: activeCategory === cat.slug ? '#2563eb' : 'transparent',
                    color: activeCategory === cat.slug ? '#fff' : '#666',
                  }}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        {/* 今日日报入口 */}
        <div style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          borderRadius: 16,
          padding: '32px 40px',
          marginBottom: 40,
          color: '#fff',
        }}>
          <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 8 }}>今日要点</div>
          <h2 style={{ fontSize: 24, margin: '0 0 16px 0', fontWeight: 700 }}>
            <Link href={`/daily/${new Date().toISOString().slice(0, 10)}`} style={{ color: '#fff', textDecoration: 'none' }}>
              查看今日日报 →
            </Link>
          </h2>
          <p style={{ opacity: 0.8, fontSize: 14 }}>
            聚合当天行业动态、产品更新、政策法规，一文看懂今日HR圈
          </p>
        </div>

        {/* 资讯列表 */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24, color: '#1a1a1a' }}>
            最新资讯 {filteredNews.length > 0 && `(${filteredNews.length})`}
          </h3>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>加载中...</div>
          ) : filteredNews.length === 0 ? (
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: 60,
              textAlign: 'center',
              color: '#999',
              border: '1px dashed #ddd',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <p style={{ margin: '0 0 8px 0', color: '#666' }}>暂无资讯</p>
              <p style={{ fontSize: 13 }}>GitHub Actions 每天早8点自动抓取</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredNews.map((item) => (
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
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <CategoryBadge category={item.category} />
                        <span style={{ fontSize: 12, color: '#999' }}>{item.source}</span>
                      </div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}>
                        {item.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: 14, color: '#666', lineHeight: 1.5 }}>
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
        </div>
      </main>

      {/* 页脚 */}
      <footer style={{
        borderTop: '1px solid #eee',
        padding: '40px 20px',
        textAlign: 'center',
        color: '#999',
        fontSize: 13,
      }}>
        <p style={{ margin: '0 0 8px 0' }}>HR日报 · 每日自动更新</p>
        <p style={{ margin: 0 }}>由 GitHub Actions + Vercel 自动托管</p>
      </footer>
    </div>
  )
}

function CategoryBadge({ category }: { category: string }) {
  const config: Record<string, { label: string; bg: string; color: string }> = {
    industry: { label: '行业动态', bg: '#fef3c7', color: '#92400e' },
    product: { label: '产品工具', bg: '#dbeafe', color: '#1e40af' },
    policy: { label: '政策法规', bg: '#fce7f3', color: '#9d174d' },
    daily: { label: '每日日报', bg: '#d1fae5', color: '#065f46' },
  }
  const c = config[category] || config.industry
  return (
    <span style={{
      padding: '2px 10px',
      borderRadius: 12,
      fontSize: 12,
      background: c.bg,
      color: c.color,
    }}>
      {c.label}
    </span>
  )
}