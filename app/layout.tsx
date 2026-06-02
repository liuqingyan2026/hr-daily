import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR日报 - 人力资源行业资讯',
  description: '每日自动聚合人力资源行业最新资讯、AI摘要、政策法规',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#fafafa' }}>
        {children}
      </body>
    </html>
  )
}