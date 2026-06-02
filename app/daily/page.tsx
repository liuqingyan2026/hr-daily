'use client'

import Link from 'next/link'

export default function DailyPage() {
  const today = new Date().toISOString().slice(0, 10)
  
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
            <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: 14 }}>
              ← 返回首页
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
          textAlign: 'center',
          marginBottom: 40,
        }}>
          <h1 style={{ margin: '0 0 16px 0', fontSize: 28 }}>每日日报</h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: 16 }}>
            聚合当天所有分类重要资讯，AI生成摘要
          </p>
        </div>
        
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #eee' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 24px 0' }}>往期日报</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[...Array(7)].map((_, i) => {
              const date = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
              return (
                <Link
                  key={date}
                  href={`/daily/${date}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    background: i === 0 ? '#f0f7ff' : '#fafafa',
                    borderRadius: 12,
                    textDecoration: 'none',
                    border: i === 0 ? '1px solid #2563eb' : '1px solid transparent',
                  }}
                >
                  <span style={{ fontSize: 15, color: '#1a1a1a', fontWeight: i === 0 ? 600 : 400 }}>
                    {date}
                    {i === 0 && <span style={{ marginLeft: 8, fontSize: 12, color: '#2563eb' }}>今日</span>}
                  </span>
                  <span style={{ color: '#999', fontSize: 14 }}>→</span>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}