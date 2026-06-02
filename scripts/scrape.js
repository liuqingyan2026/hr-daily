// 独立抓取脚本 - 在本地或GitHub Actions中运行
// 用法: node scripts/scrape.js

const fs = require('fs')
const path = require('path')

// 模拟scrape模块
const { scrapeAll, generateDailyReport } = {
  scrapeAll: async () => {
    // 生成模拟数据用于演示
    const mockItems = [
      {
        id: '1',
        title: '北森发布新一代招聘管理系统，AI赋能人才筛选',
        link: 'https://www.beisen.com/news/123',
        summary: '北森近日发布招聘管理系统的AI版本，新增智能简历筛选、面试自动排期等功能。',
        publishedAt: new Date().toISOString(),
        category: 'product',
        source: '北森',
        summaryGenerated: true,
      },
      {
        id: '2',
        title: '2025年人力资源数字化转型十大趋势',
        link: 'https://www.hrresearch.com/trends-2025',
        summary: '人力资源数字化转型已进入深水区，本文盘点2025年十大趋势。',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        category: 'industry',
        source: 'HR研究',
        summaryGenerated: true,
      },
      {
        id: '3',
        title: '国务院发布关于加强新就业形态劳动者权益保障的意见',
        link: 'https://www.gov.cn/policy/2025/123',
        summary: '意见要求平台企业保障外卖员、快递员等新就业形态劳动者的基本权益。',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        category: 'policy',
        source: '中国政府网',
        summaryGenerated: true,
      },
      {
        id: '4',
        title: 'Moka战略投资HRTech初创公司，加速AI招聘布局',
        link: 'https://www.mokahr.com/news/456',
        summary: 'Moka宣布对一家HRTech初创公司进行战略投资，布局AI招聘赛道。',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        category: 'industry',
        source: 'Moka',
        summaryGenerated: true,
      },
      {
        id: '5',
        title: '盖雅工场上新：智能排班系统支持跨门店自动调配',
        link: 'https://www.gaiaworks.com/product/789',
        summary: '盖雅工场智能排班系统新增跨门店人力调配功能，降低30%人力成本。',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        category: 'product',
        source: '盖雅工场',
        summaryGenerated: true,
      },
      {
        id: '6',
        title: '人社部公布2025年企业用工监测报告',
        link: 'https://www.mohrss.gov.cn/report-2025',
        summary: '报告指出灵活就业比例持续上升，制造业用工需求同比下降5%。',
        publishedAt: new Date(Date.now() - 18000000).toISOString(),
        category: 'industry',
        source: '人力资源和社会保障部',
        summaryGenerated: true,
      },
      {
        id: '7',
        title: '《个人信息保护法》配套规定发布，企业HR合规须知',
        link: 'https://www.cyber.gov.cn/hr-compliance-2025',
        summary: '新规要求企业HR系统在处理员工个人信息时必须获得明确授权。',
        publishedAt: new Date(Date.now() - 21600000).toISOString(),
        category: 'policy',
        source: '国家互联网信息办公室',
        summaryGenerated: true,
      },
      {
        id: '8',
        title: 'Workday发布2025Q1财报，亚太区营收增长24%',
        link: 'https://www.workday.com/news/q1-2025',
        summary: 'Workday公布一季度财报，亚太区企业客户数量大幅增长。',
        publishedAt: new Date(Date.now() - 25200000).toISOString(),
        category: 'industry',
        source: 'Workday',
        summaryGenerated: true,
      },
      {
        id: '9',
        title: '薪人薪事发布新版薪酬管理系统，支持跨境发薪',
        link: 'https://www.xinrenxinshi.com/product/payroll-v3',
        summary: '薪人薪事新版薪酬系统支持全球主要货币跨境发放。',
        publishedAt: new Date(Date.now() - 28800000).toISOString(),
        category: 'product',
        source: '薪人薪事',
        summaryGenerated: true,
      },
      {
        id: '10',
        title: 'LinkedIn报告显示：AI技能将成为HR核心竞争力',
        link: 'https://www.linkedin.com/news/ai-hr-skills-2025',
        summary: 'LinkedIn最新报告显示，掌握AI技能的HR从业者薪资溢价达40%。',
        publishedAt: new Date(Date.now() - 32400000).toISOString(),
        category: 'industry',
        source: 'LinkedIn',
        summaryGenerated: true,
      },
    ]
    return mockItems
  },
  generateDailyReport: async (items, date) => ({
    date,
    items,
    generatedAt: new Date().toISOString(),
  }),
}

async function main() {
  console.log('🔄 开始抓取HR资讯...\n')
  
  const today = new Date().toISOString().slice(0, 10)
  
  // 抓取所有资讯
  const items = await scrapeAll()
  console.log(`✅ 抓取完成，共 ${items.length} 条\n`)
  
  // 生成每日日报
  const dailyData = await generateDailyReport(items, today)
  
  // 确保data目录存在
  const dataDir = path.join(__dirname, '..', 'data')
  const dailyDir = path.join(dataDir, 'daily')
  fs.mkdirSync(dailyDir, { recursive: true })
  
  // 写入news.json
  const newsData = { items, lastUpdated: new Date().toISOString() }
  fs.writeFileSync(
    path.join(dataDir, 'news.json'),
    JSON.stringify(newsData, null, 2),
    'utf-8'
  )
  console.log('✅ 已写入 data/news.json')
  
  // 写入当日日报
  fs.writeFileSync(
    path.join(dailyDir, `${today}.json`),
    JSON.stringify(dailyData, null, 2),
    'utf-8'
  )
  console.log(`✅ 已写入 data/daily/${today}.json`)
  
  console.log('\n🎉 完成！')
}

main().catch(console.error)