@echo off
REM 设置 API key（请替换为你的实际 key）
set ANTHROPIC_API_KEY=your_api_key_here

cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" node_modules/tsx/dist/cli.mjs src/index.ts
pause
