# 🚀 GitHub 设置指南

## 📋 前置条件

1. 有 GitHub 账户（https://github.com）
2. 已安装 Git（已完成 ✅）
3. 已创建 Personal Access Token

## 🔑 第一步：创建 Personal Access Token

### 为什么需要？
GitHub 不再支持用密码推送，需要使用 Personal Access Token。

### 如何创建？

1. 登录 GitHub
2. 访问 https://github.com/settings/tokens
3. 点击 "Generate new token" → "Generate new token (classic)"
4. 填写信息：
   - **Note**: `AI News Aggregator`
   - **Expiration**: 选择 "No expiration" 或 "90 days"
   - **Select scopes**: 勾选 `repo`（完整仓库访问）
5. 点击 "Generate token"
6. **复制 token**（只显示一次！）

### 保存 Token

```bash
# 在 Windows 上保存 token（可选）
# 这样 Git 会记住你的凭证
git config --global credential.helper wincred
```

## 📝 第二步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `ai-news-aggregator`
   - **Description**: `AI News Aggregator - Automated daily AI news collection and summarization`
   - **Public/Private**: Public（推荐）
   - **Initialize this repository with**: 不勾选（我们已有代码）
3. 点击 "Create repository"

## 🔗 第三步：连接本地仓库到 GitHub

### 方式 A：使用脚本（推荐）

```bash
# 双击运行
setup-github.bat
```

然后按提示输入 GitHub 用户名和 Token。

### 方式 B：手动命令

```bash
# 替换 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/ai-news-aggregator.git

# 重命名分支为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

当提示输入密码时，输入你的 Personal Access Token。

## ✅ 验证连接

```bash
# 查看远程仓库
git remote -v

# 应该显示：
# origin  https://github.com/YOUR_USERNAME/ai-news-aggregator.git (fetch)
# origin  https://github.com/YOUR_USERNAME/ai-news-aggregator.git (push)
```

## 🎉 完成！

现在你已经设置好了自动推送！

### 工作流程

```bash
# 1. 本地开发和测试
npm start

# 2. 查看更改
git status

# 3. 提交更改
git add .
git commit -m "Update: description of changes"

# 4. 自动推送到 GitHub（由 Git Hook 处理）
# ✅ 完成！
```

### 验证自动推送

1. 提交代码后，会看到：
   ```
   🚀 Auto-pushing to GitHub...
   ✅ Successfully pushed to GitHub!
   ```

2. 访问 https://github.com/YOUR_USERNAME/ai-news-aggregator 查看更新

## 🔧 Git Hook 工作原理

`.git/hooks/post-commit` 脚本会在每次提交后自动运行，执行 `git push`。

### 如果推送失败？

常见原因和解决方案：

| 错误 | 原因 | 解决方案 |
|------|------|--------|
| `fatal: 'origin' does not appear to be a git repository` | 未连接到 GitHub | 运行 `setup-github.bat` |
| `fatal: Authentication failed` | Token 无效或过期 | 重新创建 Token |
| `fatal: Could not read from remote repository` | 网络问题 | 检查网络连接 |
| `fatal: The remote end hung up unexpectedly` | 网络超时 | 重试提交 |

## 📚 常用命令

```bash
# 查看提交历史
git log --oneline

# 查看当前状态
git status

# 查看更改内容
git diff

# 撤销最后一次提交（保留更改）
git reset --soft HEAD~1

# 查看远程仓库
git remote -v

# 手动推送（如果 Hook 失败）
git push origin main
```

## 🆘 需要帮助？

1. 检查 GitHub 仓库是否已创建
2. 验证 Personal Access Token 是否有效
3. 检查网络连接
4. 查看 Git 错误信息

## 🎯 下一步

1. ✅ 创建 Personal Access Token
2. ✅ 创建 GitHub 仓库
3. ✅ 运行 `setup-github.bat` 连接
4. ✅ 测试自动推送

---

**完成后，每次提交都会自动推送到 GitHub！** 🚀
