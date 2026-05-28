# 🤖 AI 新闻聚合器

一个智能的 AI 新闻聚合 CLI 工具，自动从多个 RSS 源抓取最新的 AI 相关新闻，并使用 Claude AI 生成高质量的摘要。

## ✨ 功能特性

### 核心功能
- 📡 从 3 个 RSS 源并行抓取新闻（TechCrunch、The Verge、Hacker News）
- ⏰ 自动过滤最近 24 小时的文章
- 🔄 智能去重处理
- 📊 按发布时间倒序排列
- 📝 生成 Markdown 格式的日报

### 高级功能
- 🤖 **AI 驱动的摘要生成**（使用 Claude API）
- 🌐 自动翻译为中文
- 📚 本地字典翻译备份
- 🔧 灵活的配置选项
- ⚡ 错误恢复机制

## 🚀 快速开始

### 基础版（无需 API key）

```bash
# 安装依赖
npm install

# 运行
npm start
# 或
node node_modules/tsx/dist/cli.mjs src/index.ts
```

### AI 版（需要 API key）

```bash
# 设置 API key
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"

# 运行
node node_modules/tsx/dist/cli.mjs src/index.ts
```

## 📋 使用说明

### 获取 API Key

1. 访问 [Anthropic Console](https://console.anthropic.com)
2. 创建 API key
3. 设置环境变量 `ANTHROPIC_API_KEY`

### 运行脚本

**Windows：**
```bash
# 基础版
run.bat

# AI 版（编辑 run-with-ai.bat，填入 API key）
run-with-ai.bat
```

**Linux/Mac：**
```bash
# 基础版
node node_modules/tsx/dist/cli.mjs src/index.ts

# AI 版
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"
node node_modules/tsx/dist/cli.mjs src/index.ts
```

## 📊 输出示例

日报保存在 `output/ai-news-YYYY-MM-DD.md`

```markdown
# AI新闻日报 - 2026-05-28

## 📊 统计
- 总文章数：43篇
- 信息源：3个

## 📰 文章列表

### 1. [Google AI Threat Defense to help you outpace the adversary](https://...)
- 来源：Hacker News
- 时间：2026-05-28 14:30 UTC
- 摘要：谷歌推出新的 AI 威胁防御工具，帮助企业应对网络安全挑战。

### 2. [ElevenLabs's new music generation model can switch genres mid-track](https://...)
- 来源：TechCrunch
- 时间：2026-05-28 14:15 UTC
- 摘要：ElevenLabs 发布新的音乐生成模型，支持在播放过程中切换音乐风格。
```

## 🏗️ 项目结构

```
.
├── src/
│   ├── types.ts              # 类型定义
│   ├── fetchers.ts           # RSS 抓取
│   ├── filters.ts            # 过滤和排序
│   ├── markdown.ts           # Markdown 生成
│   ├── translator.ts         # 翻译模块
│   ├── summarizer.ts         # AI 摘要生成
│   └── index.ts              # 主程序
├── output/                   # 输出目录
├── CLAUDE.md                 # 项目架构文档
├── 技术文档.md               # 技术细节
├── 使用指南.md               # 详细使用说明
├── 快速参考.md               # 快速参考卡
├── 更新日志.md               # 更新记录
└── package.json
```

## 📚 文档

- **[CLAUDE.md](./CLAUDE.md)** - 项目架构和开发指南
- **[技术文档.md](./技术文档.md)** - 详细的技术说明
- **[使用指南.md](./使用指南.md)** - 完整的使用说明
- **[快速参考.md](./快速参考.md)** - 快速参考卡
- **[更新日志.md](./更新日志.md)** - 版本更新记录

## 🔧 配置

### 修改新闻源

编辑 `src/index.ts`：

```typescript
const FEED_SOURCES: FeedSource[] = [
  {
    name: '新源名称',
    url: 'https://example.com/feed.xml',
    type: 'rss',
  },
];
```

### 修改摘要长度

编辑 `src/summarizer.ts`：

```typescript
content: `请用一句话（不超过50个字）...`  // 改为你想要的字数
```

### 修改使用的模型

编辑 `src/summarizer.ts`：

```typescript
model: 'claude-opus-4-7',  // 改为 'claude-sonnet-4-6' 或 'claude-haiku-4-5'
```

## 💰 成本估算

| 模型 | 每篇成本 | 50 篇成本 |
|------|---------|---------|
| Opus 4.7 | $0.01-0.05 | $0.50-2.50 |
| Sonnet 4.6 | $0.003-0.01 | $0.15-0.50 |
| Haiku 4.5 | $0.0005-0.002 | $0.025-0.10 |

## 🛠️ 技术栈

- **语言**：TypeScript
- **运行时**：Node.js 18+
- **AI**：Claude API（可选）
- **RSS 解析**：rss-parser
- **日期处理**：date-fns
- **翻译**：Google Translate API（可选）

## 📦 依赖

```json
{
  "@anthropic-ai/sdk": "^0.x.x",
  "rss-parser": "^3.13.0",
  "date-fns": "^3.0.0",
  "@vitalets/google-translate-api": "^x.x.x"
}
```

## ⚙️ 工作流程

```
1. 抓取新闻（并行请求 3 个源）
   ↓
2. 过滤 24 小时内的文章
   ↓
3. 去重处理
   ↓
4. AI 总结（可选，需要 API key）
   ↓
5. 翻译为中文
   ↓
6. 生成 Markdown 日报
   ↓
7. 保存到 output/ 目录
```

## 🚦 运行示例

```
🚀 Starting AI news aggregation...

📡 Fetching feeds...
✓ Fetched 60 articles

🔍 Processing articles...
✓ Filtered to 45 articles from last 24 hours
✓ Deduplicated to 43 unique articles
✓ Found articles from 3 sources

🤖 Generating AI summaries...
✓ Summarization completed

🌐 Translating summaries to Chinese...
✓ Translation completed

📝 Generating markdown...
✓ Report saved to: output/ai-news-2026-05-28.md

✅ Done!
```

## 🐛 故障排除

### API key 无效
- 检查 API key 是否正确复制
- 确保 API key 没有过期
- 访问 https://console.anthropic.com 检查配额

### 网络连接失败
- 检查网络连接
- 检查防火墙设置
- 尝试使用代理

### 生成速度很慢
- 这是正常的（调用 API 需要时间）
- 可以改用更快的模型（Haiku）
- 可以减少文章数量

## 📅 定时运行

### Windows 任务计划程序
1. 打开"任务计划程序"
2. 创建基本任务
3. 设置触发器（每天 8 点）
4. 设置操作：运行 `run-with-ai.bat`

### Linux/Mac Crontab
```bash
# 编辑 crontab
crontab -e

# 每天早上 8 点运行
0 8 * * * export ANTHROPIC_API_KEY="sk-ant-xxx" && cd /path/to/project && node node_modules/tsx/dist/cli.mjs src/index.ts
```

## 📝 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

- 📖 查看文档获取帮助
- 🐛 提交 Issue 报告问题
- 💬 讨论改进建议

---

**Made with ❤️ using TypeScript, Claude AI, and Node.js**
