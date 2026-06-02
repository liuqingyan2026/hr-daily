import Parser from 'rss-parser'
import axios from 'axios'
import { getEnabledSources } from './rss-sources'

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  timeout: 10000,
})

export interface NewsItem {
  id: string
  title: string
  link: string
  summary: string
  publishedAt: string
  category: 'industry' | 'product' | 'policy' | 'daily'
  source: string
  summaryGenerated: boolean
}

export interface DailyData {
  date: string
  items: NewsItem[]
  generatedAt: string
}

// 抓取单个RSS源
async function fetchRSSSource(source: { name: string; url: string; category: string }): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url)
    return (feed.items || []).slice(0, 20).map((item, index) => ({
      id: `${source.name}-${Date.now()}-${index}`,
      title: item.title || '无标题',
      link: item.link || item.guid || '',
      summary: item.contentSnippet || item.content || '',
      publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
      category: source.category as 'industry' | 'product' | 'policy',
      source: source.name,
      summaryGenerated: false,
    })).filter(item => item.link && item.title !== '无标题')
  } catch (error) {
    console.error(`抓取失败 ${source.name}:`, error instanceof Error ? error.message : error)
    return []
  }
}

// 主抓取函数
export async function scrapeAll(): Promise<NewsItem[]> {
  const sources = getEnabledSources()
  console.log(`开始抓取 ${sources.length} 个RSS源...`)
  
  const results = await Promise.allSettled(
    sources.map(source => fetchRSSSource(source))
  )
  
  const allItems: NewsItem[] = []
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value)
    }
  })
  
  // 按时间排序
  allItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  
  // 去重（根据链接）
  const seen = new Set<string>()
  const uniqueItems = allItems.filter(item => {
    if (seen.has(item.link)) return false
    seen.add(item.link)
    return true
  })
  
  console.log(`抓取完成，共 ${uniqueItems.length} 条资讯`)
  return uniqueItems
}

// 生成每日日报
export async function generateDailyReport(items: NewsItem[], date: string): Promise<DailyData> {
  return {
    date,
    items: items.slice(0, 50), // 限制50条
    generatedAt: new Date().toISOString(),
  }
}