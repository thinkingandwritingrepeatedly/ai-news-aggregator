@echo off
REM 每天早上 9 点运行的脚本
REM 生成 AI 新闻日报并发送邮件

cd /d "D:\项目\每日AI新闻聚合器"

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║          🤖 AI 新闻聚合器 - 每日定时运行                      ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📅 运行时间: %date% %time%
echo.

REM 设置环境变量
REM 请替换为你的 126 邮箱和授权码
set EMAIL_USER=your_126_email@126.com
set EMAIL_PASSWORD=your_126_email_auth_code

echo 🚀 开始生成 AI 新闻日报...
echo.

REM 运行程序
"C:\Program Files\nodejs\node.exe" node_modules/tsx/dist/cli.mjs src/index.ts

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ 日报生成成功！
    echo 📧 邮件已发送到: timyhao@126.com
    echo.
) else (
    echo.
    echo ❌ 日报生成失败！
    echo 请检查错误信息。
    echo.
)

REM 记录日志
echo [%date% %time%] 运行完成 >> logs\daily-run.log

pause
