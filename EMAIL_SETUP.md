# 📧 邮件配置指南

## 🎯 目标
每天早上 9 点自动生成 AI 新闻日报，并发送邮件到 timyhao@126.com

## 📋 前置条件

### 1. 获取 126 邮箱授权码

126 邮箱需要使用授权码而不是密码。

#### 步骤：

1. 登录 126 邮箱 (https://mail.126.com)
2. 点击 "设置" → "账户"
3. 找到 "POP3/IMAP/SMTP 服务"
4. 点击 "开启"
5. 验证身份（短信或邮件验证）
6. 获得授权码（16 位字符）

#### 示例：
```
授权码: abcdefghijklmnop
```

### 2. 获取 Anthropic API Key

访问 https://console.anthropic.com 获取 API key

## 🔧 配置步骤

### 第 1 步：设置环境变量

#### 方式 A：编辑 daily-run.bat（推荐）

打开 `daily-run.bat`，修改以下行：

```batch
set EMAIL_USER=your_126_email@126.com
set EMAIL_PASSWORD=your_126_email_auth_code
set ANTHROPIC_API_KEY=your_anthropic_api_key
```

替换为你的实际信息：

```batch
set EMAIL_USER=timyhao@126.com
set EMAIL_PASSWORD=abcdefghijklmnop
set ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

#### 方式 B：系统环境变量

1. 打开 "环境变量" 设置
2. 添加以下变量：
   - `EMAIL_USER` = 你的 126 邮箱
   - `EMAIL_PASSWORD` = 126 邮箱授权码
   - `ANTHROPIC_API_KEY` = Anthropic API Key

### 第 2 步：测试邮件配置

创建 `test-email.bat`：

```batch
@echo off
cd /d "D:\项目\每日AI新闻聚合器"

set EMAIL_USER=timyhao@126.com
set EMAIL_PASSWORD=your_126_email_auth_code

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

### 第 3 步：设置定时任务

#### Windows 任务计划程序

1. 打开 "任务计划程序"
2. 点击 "创建基本任务"
3. 填写信息：
   - **名称**: `AI News Daily Report`
   - **描述**: `每天早上 9 点生成 AI 新闻日报并发送邮件`
4. 点击 "下一步"
5. **触发器**：
   - 选择 "每天"
   - 时间：09:00
   - 点击 "下一步"
6. **操作**：
   - 选择 "启动程序"
   - 程序或脚本：`D:\项目\每日AI新闻聚合器\daily-run.bat`
   - 点击 "下一步"
7. 点击 "完成"

#### 验证任务

```bash
# 查看已创建的任务
tasklist /FI "IMAGENAME eq daily-run.bat"

# 手动运行测试
D:\项目\每日AI新闻聚合器\daily-run.bat
```

## 📊 工作流程

```
每天 09:00
    ↓
运行 daily-run.bat
    ↓
抓取 RSS 源
    ↓
AI 生成 1000 字摘要
    ↓
翻译为中文
    ↓
生成 Markdown 日报
    ↓
发送邮件到 timyhao@126.com
    ↓
✅ 完成！
```

## 📧 邮件内容

### 邮件主题
```
🤖 AI 新闻日报 - 2026-05-28
```

### 邮件内容
- 📅 日期
- 📊 统计信息（文章数、信息源数）
- 📰 文章列表（附件）
- ⏰ 生成时间

### 附件
- `ai-news-2026-05-28.md` - 完整的日报文件

## 🆘 常见问题

### Q: 邮件发送失败？

**A: 检查以下几点：**

1. **授权码是否正确？**
   - 重新获取授权码
   - 确保没有多余空格

2. **126 邮箱是否开启 SMTP？**
   - 访问 126 邮箱设置
   - 确保 POP3/IMAP/SMTP 已开启

3. **网络连接是否正常？**
   - 检查网络连接
   - 尝试手动运行脚本

4. **API Key 是否有效？**
   - 检查 Anthropic API Key
   - 确保有足够的配额

### Q: 如何查看运行日志？

**A: 查看 `logs/daily-run.log` 文件**

```bash
# 查看最后 10 行日志
tail -n 10 logs/daily-run.log
```

### Q: 如何禁用邮件发送？

**A: 注释掉 `src/index.ts` 中的邮件代码**

```typescript
// const emailSent = await sendEmailReport(outputPath, translated.length, sources.size);
```

### Q: 可以发送到多个邮箱吗？

**A: 可以，修改 `src/mailer.ts` 中的 `RECIPIENT_EMAIL`**

```typescript
const RECIPIENT_EMAIL = 'email1@126.com,email2@126.com';
```

## 📝 配置检查清单

- [ ] 获取 126 邮箱授权码
- [ ] 获取 Anthropic API Key
- [ ] 编辑 `daily-run.bat` 填入凭证
- [ ] 测试邮件连接
- [ ] 创建 Windows 定时任务
- [ ] 验证定时任务是否正常运行
- [ ] 检查邮件是否正常接收

## 🎉 完成！

现在你已经设置好了每日自动生成和邮件通知！

### 验证

1. 手动运行 `daily-run.bat` 测试
2. 检查是否收到邮件
3. 查看邮件附件中的日报内容

---

**有问题？检查 `logs/daily-run.log` 查看错误信息。**


### 2. 获取 Anthropic API Key

访问 https://console.anthropic.com 获取 API key

## 🔧 配置步骤

### 第 1 步：设置环境变量

#### 方式 A：编辑 daily-run.bat（推荐）

打开 `daily-run.bat`，修改以下行：

```batch
set EMAIL_USER=your_qq_email@qq.com
set EMAIL_PASSWORD=your_qq_email_auth_code
set ANTHROPIC_API_KEY=your_anthropic_api_key
```

替换为你的实际信息：

```batch
set EMAIL_USER=123456789@qq.com
set EMAIL_PASSWORD=abcdefghijklmnop
set ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

#### 方式 B：系统环境变量

1. 打开 "环境变量" 设置
2. 添加以下变量：
   - `EMAIL_USER` = 你的 QQ 邮箱
   - `EMAIL_PASSWORD` = QQ 邮箱授权码
   - `ANTHROPIC_API_KEY` = Anthropic API Key

### 第 2 步：测试邮件配置

创建 `test-email.bat`：

```batch
@echo off
cd /d "D:\项目\每日AI新闻聚合器"

set EMAIL_USER=your_qq_email@qq.com
set EMAIL_PASSWORD=your_qq_email_auth_code

"C:\Program Files\nodejs\node.exe" -e "
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'qq',
  host: 'smtp.qq.com',
  port: 587,
  secure: false,
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

### 第 3 步：设置定时任务

#### Windows 任务计划程序

1. 打开 "任务计划程序"
2. 点击 "创建基本任务"
3. 填写信息：
   - **名称**: `AI News Daily Report`
   - **描述**: `每天早上 9 点生成 AI 新闻日报并发送邮件`
4. 点击 "下一步"
5. **触发器**：
   - 选择 "每天"
   - 时间：09:00
   - 点击 "下一步"
6. **操作**：
   - 选择 "启动程序"
   - 程序或脚本：`D:\项目\每日AI新闻聚合器\daily-run.bat`
   - 点击 "下一步"
7. 点击 "完成"

#### 验证任务

```bash
# 查看已创建的任务
tasklist /FI "IMAGENAME eq daily-run.bat"

# 手动运行测试
D:\项目\每日AI新闻聚合器\daily-run.bat
```

## 📊 工作流程

```
每天 09:00
    ↓
运行 daily-run.bat
    ↓
抓取 RSS 源
    ↓
AI 生成 1000 字摘要
    ↓
翻译为中文
    ↓
生成 Markdown 日报
    ↓
发送邮件到 timyhao@126.com
    ↓
✅ 完成！
```

## 📧 邮件内容

### 邮件主题
```
🤖 AI 新闻日报 - 2026-05-28
```

### 邮件内容
- 📅 日期
- 📊 统计信息（文章数、信息源数）
- 📰 文章列表（附件）
- ⏰ 生成时间

### 附件
- `ai-news-2026-05-28.md` - 完整的日报文件

## 🆘 常见问题

### Q: 邮件发送失败？

**A: 检查以下几点：**

1. **授权码是否正确？**
   - 重新获取授权码
   - 确保没有多余空格

2. **QQ 邮箱是否开启 SMTP？**
   - 访问 QQ 邮箱设置
   - 确保 POP3/IMAP/SMTP 已开启

3. **网络连接是否正常？**
   - 检查网络连接
   - 尝试手动运行脚本

4. **API Key 是否有效？**
   - 检查 Anthropic API Key
   - 确保有足够的配额

### Q: 如何查看运行日志？

**A: 查看 `logs/daily-run.log` 文件**

```bash
# 查看最后 10 行日志
tail -n 10 logs/daily-run.log
```

### Q: 如何禁用邮件发送？

**A: 注释掉 `src/index.ts` 中的邮件代码**

```typescript
// const emailSent = await sendEmailReport(outputPath, translated.length, sources.size);
```

### Q: 可以发送到多个邮箱吗？

**A: 可以，修改 `src/mailer.ts` 中的 `RECIPIENT_EMAIL`**

```typescript
const RECIPIENT_EMAIL = 'email1@example.com,email2@example.com';
```

## 📝 配置检查清单

- [ ] 获取 QQ 邮箱授权码
- [ ] 获取 Anthropic API Key
- [ ] 编辑 `daily-run.bat` 填入凭证
- [ ] 测试邮件连接
- [ ] 创建 Windows 定时任务
- [ ] 验证定时任务是否正常运行
- [ ] 检查邮件是否正常接收

## 🎉 完成！

现在你已经设置好了每日自动生成和邮件通知！

### 验证

1. 手动运行 `daily-run.bat` 测试
2. 检查是否收到邮件
3. 查看邮件附件中的日报内容

---

**有问题？检查 `logs/daily-run.log` 查看错误信息。**
