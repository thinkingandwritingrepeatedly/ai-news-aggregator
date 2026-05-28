# 🤖 AI 新闻聚合器 - 技术文档

## 📋 项目概述

**AI News Aggregator** 是一个自动化的 AI 新闻聚合系统，每天早上 9 点自动抓取多个 RSS 源的最新文章，生成中文日报，并通过邮件发送。

### 核心特性

- ✅ 从 3 个 RSS 源并行抓取文章（TechCrunch、The Verge、Hacker News）
- ✅ 自动过滤最近 24 小时的文章
- ✅ URL 去重，确保无重复内容
- ✅ 自动翻译为中文（本地字典 + Google Translate 备用）
- ✅ 生成 Markdown 格式的日报
- ✅ 每天早上 9 点自动运行
- ✅ 邮件自动通知（126 邮箱）
- ✅ 完全免费（无需 API Key）

---

## 🏗️ 系统架构

### 数据流

```
RSS 源 (3 个)
    ↓
并行抓取 (fetchers.ts)
    ↓
过滤 24 小时 (filters.ts)
    ↓
URL 去重
    ↓
按时间排序
    ↓
翻译为中文 (translator.ts)
    ↓
生成 Markdown (markdown.ts)
    ↓
保存到 output/
    ↓
发送邮件 (mailer.ts)
    ↓
✅ 完成
```

### 模块说明

| 模块 | 功能 | 依赖 |
|------|------|------|
| `fetchers.ts` | RSS 源抓取、HTML 清理、摘要提取 | rss-parser |
| `filters.ts` | 24 小时过滤、去重、排序 | date-fns |
| `translator.ts` | 中文翻译（本地字典 + Google Translate） | @vitalets/google-translate-api |
| `markdown.ts` | Markdown 日报生成 | 无外部依赖 |
| `mailer.ts` | 邮件发送（126 SMTP） | nodemailer |
| `summarizer.ts` | 文章摘要（已禁用 AI，使用原始描述） | 无 |
| `index.ts` | 主程序入口、流程编排 | 上述所有模块 |

---

## 📦 安装和配置

### 前置条件

- **Node.js 18+** （已安装）
- **npm** （已安装）
- **Windows 11** （用于任务计划程序）
- **126 邮箱** （用于邮件发送）

### 项目结构

```
D:\项目\每日AI新闻聚合器/
├── src/
│   ├── types.ts              # TypeScript 类型定义
│   ├── fetchers.ts           # RSS 源抓取
│   ├── filters.ts            # 文章过滤和去重
│   ├── translator.ts         # 中文翻译
│   ├── markdown.ts           # Markdown 生成
│   ├── mailer.ts             # 邮件发送
│   ├── summarizer.ts         # 摘要处理（已禁用 AI）
│   └── index.ts              # 主程序
├── output/                   # 生成的日报（自动创建）
├── logs/                     # 运行日志
├── daily-run.bat             # Windows 定时运行脚本
├── package.json              # 项目依赖
├── tsconfig.json             # TypeScript 配置
├── EMAIL_SETUP.md            # 邮件配置指南
├── GITHUB_SETUP.md           # Git 配置指南
├── 新功能说明.md             # 功能说明
└── TECHNICAL_GUIDE.md        # 本文档
```

### 依赖清单

```json
{
  "dependencies": {
    "rss-parser": "^3.13.0",
    "date-fns": "^3.0.0",
    "@vitalets/google-translate-api": "^9.2.0",
    "nodemailer": "^6.9.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsx": "^4.0.0"
  }
}
```

---

## 🚀 快速开始

### 1. 手动测试

```bash
# 进入项目目录
cd D:\项目\每日AI新闻聚合器

# 运行一次
"C:\Program Files\nodejs\node.exe" node_modules/tsx/dist/cli.mjs src/index.ts
```

**预期输出：**
```
🚀 Starting AI news aggregation...
📡 Fetching feeds...
✓ Fetched 60 articles
🔍 Processing articles...
✓ Filtered to 50 articles from last 24 hours
✓ Deduplicated to 50 unique articles
✓ Found articles from 3 sources
📝 Using original article descriptions (no AI summarization)
🌐 Translating summaries to Chinese...
✓ Translation completed
📝 Generating markdown...
✓ Report saved to: D:\项目\每日AI新闻聚合器\output\ai-news-2026-05-28.md
✅ Done!
```

### 2. 查看生成的日报

```bash
# 查看最新日报
type D:\项目\每日AI新闻聚合器\output\ai-news-2026-05-28.md
```

---

## 📧 邮件配置（必需）

### 第 1 步：获取 126 邮箱授权码

1. 登录 https://mail.126.com
2. 点击 **设置** → **账户**
3. 找到 **POP3/IMAP/SMTP 服务**
4. 点击 **开启**
5. 验证身份（短信或邮件验证）
6. 获得 **16 位授权码**

**示例：** `abcdefghijklmnop`

### 第 2 步：配置 daily-run.bat

编辑 `D:\项目\每日AI新闻聚合器\daily-run.bat`，修改以下行：

```batch
set EMAIL_USER=timyhao@126.com
set EMAIL_PASSWORD=abcdefghijklmnop
```

替换为你的实际信息：
- `EMAIL_USER` = 你的 126 邮箱地址
- `EMAIL_PASSWORD` = 你的 16 位授权码

### 第 3 步：测试邮件连接

创建 `test-email.bat`：

```batch
@echo off
cd /d "D:\项目\每日AI新闻聚合器"

set EMAIL_USER=timyhao@126.com
set EMAIL_PASSWORD=your_auth_code

"C:\Program Files\nodejs\node.exe" -e "
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: '126',
  host: 'smtp.126.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email connection failed:', error.message);
  } else {
    console.log('✅ Email connection successful!');
  }
});
"

pause
```

双击运行测试。

---

## ⏰ 定时任务配置（必需）

### Windows 任务计划程序设置

1. **打开任务计划程序**
   - 按 `Win + R`
   - 输入 `taskschd.msc`
   - 按 Enter

2. **创建基本任务**
   - 右侧点击 **创建基本任务**
   - 填写信息：
     - **名称：** `AI News Daily Report`
     - **描述：** `每天早上 9 点生成 AI 新闻日报并发送邮件`
   - 点击 **下一步**

3. **设置触发器**
   - **触发器：** 选择 **每天**
   - **时间：** 09:00
   - 点击 **下一步**

4. **设置操作**
   - **操作：** 选择 **启动程序**
   - **程序或脚本：** `D:\项目\每日AI新闻聚合器\daily-run.bat`
   - 点击 **下一步**

5. **完成**
   - 点击 **完成**

### 验证任务

```bash
# 查看已创建的任务
tasklist /FI "IMAGENAME eq daily-run.bat"

# 手动运行测试
D:\项目\每日AI新闻聚合器\daily-run.bat
```

---

## 📊 输出格式

### 日报文件名

```
ai-news-YYYY-MM-DD.md
```

### 日报内容结构

```markdown
# AI新闻日报 - 2026-05-28

## 📊 统计
- 总文章数：50篇
- 信息源：3个

## 📰 文章列表

### 1. [文章标题](https://example.com)
- 来源：TechCrunch
- 时间：2026-05-28 14:30 UTC
- 摘要：文章摘要内容...

### 2. [文章标题](https://example.com)
- 来源：The Verge
- 时间：2026-05-28 13:45 UTC
- 摘要：文章摘要内容...
```

### 邮件内容

**主题：** 🤖 AI 新闻日报 - 2026-05-28

**正文：**
- 📅 日期
- 📊 统计信息（文章数、信息源数）
- 📰 文章列表
- ⏰ 生成时间

**附件：** `ai-news-2026-05-28.md`

---

## 🔧 配置参数

### RSS 源配置

编辑 `src/index.ts` 中的 `FEED_SOURCES`：

```typescript
const FEED_SOURCES: FeedSource[] = [
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    type: 'rss',
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    type: 'rss',
  },
  {
    name: 'Hacker News',
    url: 'https://hnrss.org/newest?q=AI&count=30',
    type: 'hn',
  },
];
```

### 邮件配置

编辑 `src/mailer.ts` 中的 `EMAIL_CONFIG`：

```typescript
const EMAIL_CONFIG = {
  service: '126',
  host: 'smtp.126.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
};

const RECIPIENT_EMAIL = 'timyhao@126.com';
```

### 翻译配置

编辑 `src/translator.ts` 中的本地字典（500+ 技术术语）。

---

## 📈 性能指标

| 指标 | 值 |
|------|-----|
| 抓取时间 | 2-5 秒 |
| 处理时间 | 1-2 秒 |
| 翻译时间 | 5-10 秒 |
| 邮件发送时间 | 2-5 秒 |
| **总耗时** | **10-25 秒** |

---

## 💰 成本分析

### 完全免费

- ✅ RSS 抓取：免费
- ✅ 文章翻译：免费（本地字典 + Google Translate）
- ✅ 邮件发送：免费（126 邮箱）
- ✅ 文章摘要：免费（使用原始描述，无 AI）

**总成本：$0/月**

---

## 🆘 故障排除

### 问题 1：邮件发送失败

**检查清单：**
- [ ] 授权码是否正确？
- [ ] 126 邮箱是否开启 SMTP？
- [ ] 网络连接是否正常？
- [ ] 是否有多余空格？

**解决方案：**
```bash
# 重新获取授权码
# 1. 登录 https://mail.126.com
# 2. 设置 → 账户 → POP3/IMAP/SMTP
# 3. 重新获取授权码
# 4. 更新 daily-run.bat
```

### 问题 2：定时任务未运行

**检查清单：**
- [ ] 任务计划程序中是否创建了任务？
- [ ] 任务是否启用？
- [ ] 脚本路径是否正确？
- [ ] 是否有权限运行脚本？

**解决方案：**
```bash
# 手动运行测试
D:\项目\每日AI新闻聚合器\daily-run.bat

# 查看日志
type D:\项目\每日AI新闻聚合器\logs\daily-run.log
```

### 问题 3：文章抓取失败

**检查清单：**
- [ ] 网络连接是否正常？
- [ ] RSS 源是否可访问？
- [ ] 是否有代理限制？

**解决方案：**
```bash
# 查看详细错误信息
"C:\Program Files\nodejs\node.exe" node_modules/tsx/dist/cli.mjs src/index.ts
```

### 问题 4：翻译失败

**检查清单：**
- [ ] 网络连接是否正常？
- [ ] Google Translate 是否可访问？

**解决方案：**
- 系统会自动使用本地字典作为备用
- 查看 `src/translator.ts` 中的字典配置

---

## 📝 日志管理

### 日志位置

```
D:\项目\每日AI新闻聚合器\logs\daily-run.log
```

### 查看日志

```bash
# 查看最后 10 行
tail -n 10 D:\项目\每日AI新闻聚合器\logs\daily-run.log

# 查看所有日志
type D:\项目\每日AI新闻聚合器\logs\daily-run.log
```

### 日志格式

```
[2026-05-28 09:00:00] 运行完成
[2026-05-28 09:02:15] 运行完成
[2026-05-28 09:04:30] 运行完成
```

---

## ✅ 待办事项清单

### 必需配置

- [ ] **获取 126 邮箱授权码**
  - 登录 https://mail.126.com
  - 设置 → 账户 → POP3/IMAP/SMTP
  - 开启服务，获取 16 位授权码

- [ ] **编辑 daily-run.bat**
  - 打开 `D:\项目\每日AI新闻聚合器\daily-run.bat`
  - 修改 `EMAIL_USER` 为你的 126 邮箱
  - 修改 `EMAIL_PASSWORD` 为你的授权码

- [ ] **测试邮件连接**
  - 创建 `test-email.bat`
  - 双击运行
  - 确认输出 `✅ Email connection successful!`

- [ ] **创建 Windows 定时任务**
  - 打开任务计划程序
  - 创建基本任务
  - 名称：`AI News Daily Report`
  - 触发器：每天 09:00
  - 操作：运行 `daily-run.bat`

- [ ] **验证定时任务**
  - 手动运行 `daily-run.bat`
  - 检查是否收到邮件
  - 查看邮件附件中的日报内容

### 可选优化

- [ ] 添加更多 RSS 源
- [ ] 自定义翻译字典
- [ ] 修改邮件收件人
- [ ] 调整定时运行时间
- [ ] 配置 Git 自动推送（见 GITHUB_SETUP.md）

---

## 📚 相关文档

- **EMAIL_SETUP.md** - 详细的邮件配置指南
- **GITHUB_SETUP.md** - Git 自动推送配置
- **新功能说明.md** - 功能更新说明
- **CLAUDE.md** - 项目架构和开发指南

---

## 🎯 工作流程总结

```
每天 09:00
    ↓
Windows 任务计划程序触发
    ↓
运行 daily-run.bat
    ↓
设置环境变量（EMAIL_USER, EMAIL_PASSWORD）
    ↓
执行 src/index.ts
    ↓
抓取 RSS 源（3 个）
    ↓
过滤 + 去重 + 排序
    ↓
翻译为中文
    ↓
生成 Markdown 日报
    ↓
保存到 output/ai-news-YYYY-MM-DD.md
    ↓
发送邮件到 timyhao@126.com
    ↓
记录日志到 logs/daily-run.log
    ↓
✅ 完成！
```

---

## 🎉 完成！

现在你已经拥有：

✅ 完全免费的 AI 新闻聚合系统
✅ 每天早上 9 点自动运行
✅ 邮件自动通知
✅ 完整的中文日报
✅ 详细的运行日志

**下一步：按照上面的待办事项清单完成配置！** 📧

---

**最后更新：** 2026-05-28
**版本：** 1.0.0
**状态：** 生产就绪 ✅
