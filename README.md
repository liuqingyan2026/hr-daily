# HR日报 - 人力资源行业资讯站

🤖 每日自动聚合人力资源行业最新资讯，AI生成摘要

## 功能特性

- 📰 **每日资讯** - 自动抓取HR行业RSS源最新文章
- 🤖 **AI摘要** - 每篇文章自动生成50字以内中文摘要
- 📅 **每日日报** - 每天自动生成一篇聚合日报（如 `/daily/2025-06-02`）
- 📂 **分类浏览** - 支持行业动态/产品工具/政策法规分类
- ⚡ **极简风格** - 高信息密度，零视觉噪音

## 自动化说明

- **抓取**: GitHub Actions 每天 UTC 0:00（约早8点北京时间）自动执行
- **部署**: 抓取完成后自动推送到 GitHub，触发 Vercel 重新部署
- **摘要**: 使用 SiliconFlow 免费API（每天200万token，完全够用）

## 快速部署

详见 [DEPLOY.md](./DEPLOY.md)

## 本地开发

```bash
npm install
npm run dev
```

## 项目结构

```
hr-daily/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── daily/             # 日报列表
│   └── category/          # 分类页
├── lib/                   # 工具模块
│   ├── scrape.ts          # 抓取逻辑
│   └── summarize.ts       # AI摘要
├── scripts/
│   ├── scrape.js          # 抓取脚本
│   └── init-data.js       # 示例数据初始化
├── data/                  # 资讯数据（gitignore，由CI生成）
└── .github/workflows/     # GitHub Actions
```

## RSS源配置

编辑 `lib/rss-sources.ts` 中的 `DEMO_SOURCES` 数组，添加你的RSS源。

## AI摘要API配置

1. 注册 [SiliconFlow](https://www.siliconflow.cn/) 获取免费API Key
2. 在 GitHub 仓库 Settings → Secrets 添加 `SILICONFLOW_API_KEY`