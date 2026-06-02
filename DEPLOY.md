# 📦 HR日报 - 部署指南（图文版）

> 本指南面向零基础用户，每一步都有截图说明。你只需要会点鼠标即可。

---

## 第一步：创建GitHub账号

1. 打开浏览器，访问 **https://github.com**
2. 点击 **Sign up**（注册）
3. 填写：邮箱、密码、用户名（随意，建议用 `hr-daily-你的名字`）
4. 完成邮箱验证

---

## 第二步：创建GitHub仓库

1. 登录 GitHub 后，点击右上角 **+** → **New repository**
2. 填写仓库信息：
   - **Repository name**: `hr-daily`（必须）
   - **Description**: `HR日报 - 人力资源行业资讯站`
   - 选择 **Private**（私有）或 **Public**（公开）都可以
   - ✅ 勾选 **Add a README file**
3. 点击 **Create repository**

---

## 第三步：上传代码

### 方法A：网页上传（最简单）

1. 在仓库页面，点击 **Add file** → **Upload files**
2. 把 `hr-daily` 文件夹里的**所有内容**拖入上传区域
3. 点击 **Commit changes**

> ⚠️ 注意：需要上传`app/`、`lib/`、`scripts/`、`.github/`、`package.json` 等**所有文件和文件夹**，不要只上传zip包。

### 方法B：下载后上传zip

如果上传有困难，告诉我，我帮你打包成一个zip文件下载。

---

## 第四步：获取SiliconFlow免费API Key

1. 打开 **https://www.siliconflow.cn**（中文界面）
2. 点击注册，使用手机号/邮箱注册
3. 登录后进入 **控制台** → **API Keys**
4. 点击 **创建API Key**，复制保存（格式类似 `sk-xxxxx...`）

> 💡 **为什么选硅基流动？**
> - 每天200万token免费额度
> - 完全够一个小网站使用
> - 中文支持好，速度快

---

## 第五步：在GitHub添加密钥

1. 进入你的 `hr-daily` 仓库
2. 点击顶部 **Settings**（设置）
3. 左侧菜单找到 **Secrets and variables** → **Actions**
4. 点击 **New repository secret**
5. 填写：
   - **Name**: `SILICONFLOW_API_KEY`
   - **Secret**: 粘贴你刚才复制的API Key
6. 点击 **Add secret**

---

## 第六步：连接Vercel部署

1. 打开 **https://vercel.com**
2. 点击 **Sign Up**，用GitHub账号登录
3. 点击 **Add New...** → **Project**
4. 在列表中找到你的 **`hr-daily`** 仓库，点击 **Import**
5. 配置：
   - **Project Name**: `hr-daily`（可改）
   - **Framework Preset**: Next.js（自动识别）
   - **Build Command**: 留空（自动）
   - **Output Directory**: `out`（如果Vercel没自动识别）
6. 点击 **Deploy**（部署）
7. 等待约2分钟，看到 ✅ **Ready** 即成功

---

## 第七步：验证网站

1. Vercel部署完成后，你会获得一个URL（如 `https://hr-daily.vercel.app`）
2. 点击访问，确认能看到网站首页
3. 点击"查看今日日报"，确认有内容显示

---

## 第八步：设置每日自动更新

1. 在GitHub仓库页面，点击 **Actions**（顶部菜单）
2. 左侧点击 **Daily Scrape & Deploy**
3. 点击 **Run workflow**（右侧）→ **Run workflow**
4. 选择 `main` 分支，点击 **Run workflow**
5. 等待约1分钟刷新，确认✅显示绿色勾

> 这样就完成了！以后每天早上8点，GitHub Actions会自动：
> 1. 抓取最新HR资讯
> 2. 生成AI摘要
> 3. 更新数据并推送到GitHub
> 4. 自动触发Vercel重新部署

---

## 常见问题

### Q: 网站显示"暂无数据"
A: 运行一次 Actions 的 "Run workflow" 手动触发抓取，数据就会有了。

### Q: Vercel域名被拒
A: 如果提示"Invalid Configuration"，检查 Next.js 的 `output: 'export'` 配置是否正确。

### Q: RSS源不生效
A: 编辑 `lib/rss-sources.ts` 中的 `DEMO_SOURCES`，替换为真实可用的RSS URL。

### Q: 想自定义域名
A: 在 Vercel 项目的 Settings → Domains 中添加，按提示配置DNS即可。

---

## 后续维护

### 更换RSS源
1. 编辑 `lib/rss-sources.ts`
2. 修改 `DEMO_SOURCES` 数组中的URL
3. 提交到GitHub，自动触发重新部署

### 查看抓取日志
1. GitHub仓库 → Actions
2. 点击最上面的workflow run
3. 查看日志，确认有没有错误

### 手动触发抓取
GitHub → Actions → Daily Scrape & Deploy → Run workflow

---

**恭喜！你的HR日报网站已上线！** 🎉

有问题随时告诉我。⚡