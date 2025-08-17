#!/bin/bash

# Breevia 项目安装脚本
echo "🌟 欢迎使用 Breevia 智能生活指导助手!"
echo "📦 开始安装项目依赖..."

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js (版本 >= 18)"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 检查是否有 .env.local 文件
if [ ! -f ".env.local" ]; then
    echo "📝 创建环境变量文件..."
    cp env.example .env.local
    echo "⚠️  请编辑 .env.local 文件，填入您的 Supabase 配置信息"
fi

echo ""
echo "🎉 安装完成！"
echo ""
echo "📋 接下来的步骤："
echo "1. 编辑 .env.local 文件，添加您的 Supabase 配置"
echo "2. 在 Supabase 中执行 database/schema.sql 创建数据表"
echo "3. 运行 'npm run dev' 启动开发服务器"
echo ""
echo "🔗 有用的命令："
echo "   npm run dev      - 启动开发服务器"
echo "   npm run build    - 构建生产版本"
echo "   npm run start    - 启动生产服务器"
echo "   npm run lint     - 代码检查"
echo ""
echo "📚 项目文档: README.md"
echo "🌐 访问地址: http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
