// HR行业RSS订阅源配置
// 分类: industry=行业动态, product=产品工具, policy=政策法规

export const RSS_SOURCES = [
  // 行业动态
  {
    name: 'HR圈内',
    url: 'https://hr Inside.com',
    category: 'industry',
    enabled: false, // 待替换真实URL
  },
  {
    name: '中国人力资源网',
    url: 'https://www.hr.com',
    category: 'industry',
    enabled: false,
  },
  {
    name: '北森',
    url: 'https://www.beisen.com',
    category: 'product',
    enabled: false,
  },
  {
    name: 'Moka',
    url: 'https://www.mokahr.com',
    category: 'product',
    enabled: false,
  },
  {
    name: '智员',
    url: 'https://www.zhiyuanhr.com',
    category: 'industry',
    enabled: false,
  },
  {
    name: '人力机器',
    url: 'https://www.hrmaas.com',
    category: 'industry',
    enabled: false,
  },
  {
    name: '盖雅工场',
    url: 'https://www.gaiaworks.com',
    category: 'product',
    enabled: false,
  },
  {
    name: '中国劳动保障网',
    url: 'https://www.clss.com',
    category: 'policy',
    enabled: false,
  },
  {
    name: '人力资源研究',
    url: 'https://www.hrresearch.com',
    category: 'industry',
    enabled: false,
  },
  {
    name: 'HRise',
    url: 'https://www.hrise.com',
    category: 'industry',
    enabled: false,
  },
]

// 示例RSS源（可用的真实源，用于演示）
export const DEMO_SOURCES = [
  {
    name: '36氪',
    url: 'https://36kr.com/feed',
    category: 'industry',
    enabled: true,
  },
  {
    name: '虎嗅',
    url: 'https://www.huxiu.com/rss/',
    category: 'industry',
    enabled: true,
  },
  {
    name: '爱范儿',
    url: 'https://www.ifair.com/feed',
    category: 'industry',
    enabled: true,
  },
  {
    name: '少数派',
    url: 'https://sspai.com/feed',
    category: 'industry',
    enabled: true,
  },
  {
    name: 'AI前线',
    url: 'https://ai.google.dev/stable/blog/rss',
    category: 'product',
    enabled: true,
  },
]

// 获取启用的源
export function getEnabledSources() {
  return DEMO_SOURCES.filter(s => s.enabled)
}