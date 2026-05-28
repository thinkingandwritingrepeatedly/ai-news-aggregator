# 🚀 开始使用

欢迎使用 **AI 新闻聚合器**！

这是一个完整的、生产级别的 TypeScript CLI 工具，用于自动聚合和总结 AI 相关新闻。

## ⚡ 30 秒快速开始

### 1️⃣ 安装依赖
```bash
npm install
```

### 2️⃣ 运行程序
```bash
npm start
```

### 3️⃣ 查看结果
打开 `output/ai-news-YYYY-MM-DD.md` 查看生成的日报

## 🤖 使用 AI 总结（可选）

如果你有 Anthropic API key，可以生成高质量的 AI 总结：

### 1️⃣ 获取 API Key
访问 [Anthropic Console](https://console.anthropic.com) 获取 API key

### 2️⃣ 设置环境变量
```bash
# Windows PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-xxxxxxxxxxxxx"

# Linux/Mac
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"
```

### 3️⃣ 运行程序
```bash
npm start
```

## 📚 文档导航

根据你的需求选择相应的文档：

### 🎯 我想快速了解
👉 [README.md](./README.md) - 项目概览和功能介绍

### 📖 我想详细了解使用方法
👉 [使用指南.md](./使用指南.md) - 完整的使用说明

### ⚡ 我想快速查询命令
👉 [快速参考.md](./快速参考.md) - 快速参考卡

### 🔧 我想了解技术细节
👉 [技术文档.md](./技术文档.md) - 详细的技术说明

### 🏗️ 我想了解项目架构
👉 [CLAUDE.md](./CLAUDE.md) - 项目架构和开发指南

### 📋 我想了解项目完成情况
👉 [项目完成总结.md](./项目完成总结.md) - 完成总结

👉 [交付清单.md](./交付清单.md) - 交付清单

### 📝 我想了解最新更新
👉 [更新日志.md](./更新日志.md) - 版本更新记录

## 🎯 常见任务

### 任务 1：生成今天的 AI 新闻日报
```bash
npm start
```
日报会保存到 `output/ai-news-YYYY-MM-DD.md`

### 任务 2：使用 AI 生成高质量摘要
```bash
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"
npm start
```

### 任务 3：修改新闻源
编辑 `src/index.ts` 中的 `FEED_SOURCES`

### 任务 4：修改摘要长度
编辑 `src/summarizer.ts` 中的 prompt

### 任务 5：定时运行（Windows）
1. 打开"任务计划程序"
2. 创建基本任务
3. 设置触发器（每天 8 点）
4. 设置操作：运行 `run-with-ai.bat`

### 任务 6：定时运行（Linux/Mac）
```bash
crontab -e
# 添加：0 8 * * * export ANTHROPIC_API_KEY="sk-ant-xxx" && cd /path && npm start
```

## 💡 功能特性

✨ **核心功能**
- 从 3 个 RSS 源并行抓取新闻
- 自动过滤最近 24 小时的文章
- 智能去重处理
- 生成 Markdown 日报

✨ **高级功能**
- 🤖 **AI 驱动的摘要生成**（使用 Claude API）
- 🌐 自动翻译为中文
- 📚 本地字典翻译备份
- 🔧 灵活的配置选项

## 🚦 工作流程

```
抓取新闻 → 过滤 + 去重 → AI 总结 → 翻译 → 生成日报 → 保存文件
```

## 📊 输出示例

```markdown
# AI新闻日报 - 2026-05-28

## 📊 统计
- 总文章数：43篇
- 信息源：3个

## 📰 文章列表

### 1. [Google AI Threat Defense...](https://...)
- 来源：Hacker News
- 时间：2026-05-28 14:30 UTC
- 摘要：谷歌推出新的 AI 威胁防御工具，帮助企业应对网络安全挑战。

### 2. [ElevenLabs's new music generation...](https://...)
- 来源：TechCrunch
- 时间：2026-05-28 14:15 UTC
- 摘要：ElevenLabs 发布新的音乐生成模型，支持在播放过程中切换音乐风格。
```

## ❓ 常见问题

**Q: 没有 API key 可以用吗？**
A: 可以！基础版本不需要 API key，但摘要质量会较低。

**Q: 使用 API 会产生费用吗？**
A: 是的，每次调用 Claude API 都会产生费用。50 篇文章约 $0.50-2.50（取决于模型）。

**Q: 如何降低成本？**
A: 可以改用更便宜的模型（Haiku）。编辑 `src/summarizer.ts` 中的 `model` 字段。

**Q: 如何修改新闻源？**
A: 编辑 `src/index.ts` 中的 `FEED_SOURCES` 数组。

**Q: 如何定时运行？**
A: 使用系统任务计划程序或 crontab。详见 [使用指南.md](./使用指南.md)。

## 🆘 遇到问题？

1. 📖 查看 [使用指南.md](./使用指南.md) 的故障排除部分
2. 📖 查看 [快速参考.md](./快速参考.md) 的常见错误表
3. 📖 查看 [技术文档.md](./技术文档.md) 了解技术细节

## 🎉 你已准备好！

现在你可以：

1. ✅ 运行 `npm start` 生成今天的 AI 新闻日报
2. ✅ 设置 API key 使用 AI 生成高质量摘总
3. ✅ 定时运行自动生成每日日报
4. ✅ 自定义配置满足你的需求

---

**Happy news aggregating! 🚀**

**Need help? Check the documentation files above.**

**Last Updated: 2026-05-28**
