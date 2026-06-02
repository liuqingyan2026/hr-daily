// 示例数据初始化脚本
// 运行一次即可生成演示数据，后续由GitHub Actions自动更新

const fs = require('fs')
const path = require('path')

// 创建示例数据
const sampleNews = {
  items: [
    {
      id: 'demo-1',
      title: '北森发布新一代招聘管理系统，AI赋能人才筛选',
      link: 'https://www.beisen.com/news/123',
      summary: '北森近日发布招聘管理系统的AI版本，新增智能简历筛选、面试自动排期等功能，大幅提升HR工作效率。',
      publishedAt: new Date().toISOString(),
      category: 'product',
      source: '北森',
      summaryGenerated: true,
    },
    {
      id: 'demo-2',
      title: '2025年人力资源数字化转型十大趋势',
      link: 'https://www.hrresearch.com/trends-2025',
      summary: '人力资源数字化转型已进入深水区，AI招聘、智能排班、员工体验平台成为三大关键词。',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      category: 'industry',
      source: 'HR研究',
      summaryGenerated: true,
    },
    {
      id: 'demo-3',
      title: '国务院发布关于加强新就业形态劳动者权益保障的意见',
      link: 'https://www.gov.cn/policy/2025/123',
      summary: '意见要求平台企业保障外卖员、快递员等新就业形态劳动者的基本权益，不得制定限制骑手自由的规则。',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      category: 'policy',
      source: '中国政府网',
      summaryGenerated: true,
    },
    {
      id: 'demo-4',
      title: 'Moka战略投资HRTech初创公司，加速AI招聘布局',
      link: 'https://www.mokahr.com/news/456',
      summary: 'Moka宣布对一家HRTech初创公司进行战略投资，布局AI招聘赛道，强化智能化招聘能力。',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      category: 'industry',
      source: 'Moka',
      summaryGenerated: true,
    },
    {
      id: 'demo-5',
      title: '盖雅工场上新：智能排班系统支持跨门店自动调配',
      link: 'https://www.gaiaworks.com/product/789',
      summary: '盖雅工场智能排班系统新增跨门店人力调配功能，基于AI算法优化人力配置，降低30%人力成本。',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      category: 'product',
      source: '盖雅工场',
      summaryGenerated: true,
    },
    {
      id: 'demo-6',
      title: '人社部公布2025年企业用工监测报告',
      link: 'https://www.mohrss.gov.cn/report-2025',
      summary: '报告指出灵活就业比例持续上升至32%，制造业用工需求同比下降5%，服务业岗位需求旺盛。',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      category: 'industry',
      source: '人力资源和社会保障部',
      summaryGenerated: true,
    },
    {
      id: 'demo-7',
      title: '《个人信息保护法》配套规定发布，企业HR合规须知',
      link: 'https://www.cyber.gov.cn/hr-compliance-2025',
      summary: '新规要求企业HR系统在处理员工个人信息时必须获得明确授权，禁止过度收集与工作无关的隐私数据。',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      category: 'policy',
      source: '国家互联网信息办公室',
      summaryGenerated: true,
    },
    {
      id: 'demo-8',
      title: 'Workday发布2025Q1财报，亚太区营收增长24%',
      link: 'https://www.workday.com/news/q1-2025',
      summary: 'Workday公布一季度财报，亚太区企业客户数量同比增长35%，大中华区表现尤为强劲。',
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      category: 'industry',
      source: 'Workday',
      summaryGenerated: true,
    },
    {
      id: 'demo-9',
      title: '薪人薪事发布新版薪酬管理系统，支持跨境发薪',
      link: 'https://www.xinrenxinshi.com/product/payroll-v3',
      summary: '薪人薪事新版薪酬系统支持全球50种主要货币跨境发放，助力跨国企业简化发薪流程。',
      publishedAt: new Date(Date.now() - 28800000).toISOString(),
      category: 'product',
      source: '薪人薪事',
      summaryGenerated: true,
    },
    {
      id: 'demo-10',
      title: 'LinkedIn报告显示：AI技能将成为HR核心竞争力',
      link: 'https://www.linkedin.com/news/ai-hr-skills-2025',
      summary: 'LinkedIn最新报告显示，掌握AI技能的HR从业者薪资溢价达40%，数据分析能力需求增长最快。',
      publishedAt: new Date(Date.now() - 32400000).toISOString(),
      category: 'industry',
      source: 'LinkedIn',
      summaryGenerated: true,
    },
    {
      id: 'demo-11',
      title: '国家统计局：2025年一季度就业形势总体平稳',
      link: 'https://www.stats.gov.cn/employment/q1-2025',
      summary: '一季度全国城镇新增就业303万人，同比微增，调查失业率平均为5.2%，就业局势总体稳定。',
      publishedAt: new Date(Date.now() - 36000000).toISOString(),
      category: 'industry',
      source: '国家统计局',
      summaryGenerated: true,
    },
    {
      id: 'demo-12',
      title: '金蝶云·星瀚HR新品发布，数字员工概念亮相',
      link: 'https://www.kingdee.com/hr-new-2025',
      summary: '金蝶发布新一代HR SaaS产品，推出"数字员工"概念，AI助手可自动处理入职、转正、离职等流程。',
      publishedAt: new Date(Date.now() - 39600000).toISOString(),
      category: 'product',
      source: '金蝶',
      summaryGenerated: true,
    },
  ],
  lastUpdated: new Date().toISOString(),
}

const today = new Date().toISOString().slice(0, 10)

const dailyData = {
  date: today,
  items: sampleNews.items,
  generatedAt: new Date().toISOString(),
}

// 确保目录存在
const dataDir = path.join(__dirname, '..', 'data')
const dailyDir = path.join(dataDir, 'daily')
fs.mkdirSync(dailyDir, { recursive: true })

// 写入news.json
fs.writeFileSync(
  path.join(dataDir, 'news.json'),
  JSON.stringify(sampleNews, null, 2),
  'utf-8'
)
console.log('✅ 已创建 data/news.json')

// 写入今日日报
fs.writeFileSync(
  path.join(dailyDir, `${today}.json`),
  JSON.stringify(dailyData, null, 2),
  'utf-8'
)
console.log(`✅ 已创建 data/daily/${today}.json`)

// 生成最近7天的日报（只有今天有数据）
for (let i = 1; i <= 6; i++) {
  const date = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
  const pastData = {
    date,
    items: sampleNews.items.slice(0, 8).map(item => ({
      ...item,
      id: `${item.id}-${date}`,
      publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
    })),
    generatedAt: new Date(Date.now() - i * 86400000).toISOString(),
  }
  fs.writeFileSync(
    path.join(dailyDir, `${date}.json`),
    JSON.stringify(pastData, null, 2),
    'utf-8'
  )
  console.log(`✅ 已创建 data/daily/${date}.json`)
}

console.log('\n🎉 示例数据创建完成！')
console.log('共有12条资讯，7天日报数据')