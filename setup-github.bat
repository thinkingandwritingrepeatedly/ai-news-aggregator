@echo off
REM 连接到 GitHub 仓库
REM 请替换 YOUR_USERNAME 为你的 GitHub 用户名

cd /d "D:\项目\每日AI新闻聚合器"

echo 🔗 Connecting to GitHub...
echo.
echo 请输入你的 GitHub 用户名:
set /p USERNAME=

REM 添加远程仓库
git remote add origin https://github.com/%USERNAME%/ai-news-aggregator.git

REM 重命名分支为 main
git branch -M main

REM 推送到 GitHub
echo.
echo 📤 Pushing to GitHub...
echo 如果提示输入密码，请输入你的 GitHub Personal Access Token
echo (访问 https://github.com/settings/tokens 创建)
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Successfully connected to GitHub!
    echo 📍 Repository: https://github.com/%USERNAME%/ai-news-aggregator
    echo.
    echo 🎉 现在每次提交都会自动推送到 GitHub!
) else (
    echo.
    echo ❌ Failed to push to GitHub
    echo 请检查:
    echo 1. GitHub 用户名是否正确
    echo 2. 仓库是否已创建
    echo 3. Personal Access Token 是否有效
)

pause
