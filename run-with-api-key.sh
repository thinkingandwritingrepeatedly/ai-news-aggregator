#!/bin/bash
# 使用方式: ./run-with-api-key.sh "your_api_key_here"

if [ -z "$1" ]; then
  echo "❌ 请提供 API key"
  echo "用法: ./run-with-api-key.sh 'your_api_key_here'"
  exit 1
fi

export ANTHROPIC_API_KEY="$1"
node node_modules/tsx/dist/cli.mjs src/index.ts
