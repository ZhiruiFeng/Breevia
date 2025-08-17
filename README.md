# Breevia - 个人定制养生平台

一个基于 Next.js、Tailwind CSS 和 Supabase 构建的个人定制养生平台，专注于提供个性化食谱、补剂推荐和医学级健康方案。

## ✨ 核心功能

### 🏠 健康仪表板
- 个人健康指标监控和趋势分析
- 今日营养摄入和补剂服用提醒
- 健康计划进度跟踪
- 个性化健康建议展示

### 🍽️ 定制食谱系统
- 基于个人体质和健康目标的食谱推荐
- 营养成分分析和热量计算
- 食材替换和过敏原提醒
- 周期性饮食计划制定

### 💊 智能补剂管理
- 个性化补剂推荐（如还原型vs氧化型辅酶Q10）
- 补剂有效性科学分析
- 服用周期和剂量指导
- 补剂间相互作用检测

### 🏥 医学级方案推荐
- 基于循证医学的健康方案
- 分层医疗建议（预防、调理、治疗）
- 专业医学文献支持
- 个人健康档案管理

### 🤖 专业健康顾问（AI）
- **营养师 Nutri**：膳食营养分析和食谱定制
- **药师 Pharma**：补剂推荐和用药指导
- **医师 Medic**：健康评估和方案制定
- **教练 Trainer**：运动康复和体能训练

## 🛠 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式系统**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **认证系统**: Supabase Auth
- **动画库**: Framer Motion
- **图标库**: Lucide React
- **开发语言**: TypeScript

## 📦 项目结构

```
Breevia/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React 组件
│   ├── AuthForm.tsx       # 认证表单
│   ├── Sidebar.tsx        # 侧边导航栏
│   ├── HealthDashboard.tsx      # 健康仪表板
│   ├── NutritionRecipes.tsx     # 营养食谱
│   ├── SupplementHub.tsx   # 智能补剂
│   └── AIAgents.tsx       # AI 健康顾问
├── lib/                   # 工具库
│   ├── supabase.ts        # Supabase 客户端
│   └── auth.ts            # 认证逻辑
├── database/              # 数据库相关
│   └── schema.sql         # 数据库表结构
└── env.example            # 环境变量示例

```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd Breevia
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `env.example` 为 `.env.local` 并填入相应的配置：

```bash
cp env.example .env.local
```

需要配置的环境变量：
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 匿名密钥
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase 服务角色密钥

### 4. 设置数据库

在 Supabase 项目中执行 `database/schema.sql` 文件来创建数据表。

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🗄️ 数据库设计

### 主要数据表

- **user_health_profiles**: 用户健康档案和体质信息
- **recipes**: 营养食谱数据库
- **supplements**: 补剂产品信息库
- **user_recipe_interactions**: 用户食谱互动记录
- **user_supplement_plans**: 用户补剂服用计划
- **health_plans**: 个性化健康方案
- **health_logs**: 健康日志和监测数据
- **health_ai_sessions**: AI 健康顾问对话记录

### 数据库特性

- 行级安全策略 (RLS) 保护用户数据
- 自动时间戳更新
- 索引优化查询性能
- JSON 字段支持灵活的数据结构

## 🎨 设计特色

### 现代化 UI/UX
- 响应式设计，支持移动端和桌面端
- 流畅的动画和交互效果
- 直观的导航和信息架构
- 可访问性优化

### 个性化体验
- 基于用户行为的智能推荐
- 个性化的仪表板和统计信息
- 自定义的目标和偏好设置

### 安全性
- 端到端的数据加密
- 基于角色的访问控制
- 隐私保护设计

## 🚧 开发路线图

### 短期目标 (1-3 个月)
- [ ] 完善用户认证和档案管理
- [ ] 实现基础的生活指导功能
- [ ] 优化知识推荐算法
- [ ] 移动端适配优化

### 中期目标 (3-6 个月)
- [ ] 集成 AI 对话功能
- [ ] 实现语音交互支持
- [ ] 添加社区功能
- [ ] 数据分析和洞察

### 长期目标 (6-12 个月)
- [ ] 多语言支持
- [ ] 第三方服务集成
- [ ] 移动应用开发
- [ ] 企业版功能

## 🤝 贡献指南

欢迎贡献代码！请确保：

1. 遵循现有的代码风格
2. 编写清晰的提交信息
3. 添加必要的测试
4. 更新相关文档

## 📝 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

感谢以下开源项目和服务：

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Supabase](https://supabase.com/) - 开源 Firebase 替代方案
- [Framer Motion](https://www.framer.com/motion/) - React 动画库
- [Lucide](https://lucide.dev/) - 美观的图标库

---

**Breevia** - 让 AI 成为您生活的智能伙伴 🌟