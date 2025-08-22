'use client';

import React from 'react';
import { BentoGrid, BentoCard, BentoFeatureCard, BentoStatsCard } from './BentoGrid';
import {
  HealthIcon,
  NutritionIcon,
  WorkoutIcon,
  SupplementIcon,
  AIIcon,
  KnowledgeIcon,
  DashboardIcon,
  ProfileIcon,
  CirclePattern,
  TrianglePattern,
  DiamondPattern,
} from './GeometricIcons';

const DesignSystemDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-peach-50">
      {/* 头部区域 */}
      <header className="section-spacing container-spacing">
        <div className="content-max-width">
          <div className="text-center space-y-6">
            <h1 className="heading-primary text-gradient animate-fade-in">
              柔和美学设计系统
            </h1>
            <p className="text-fluid-lg text-body max-content-width mx-auto animate-slide-up">
              基于浅米色与粉橘色的温暖色调，营造舒适优雅的用户体验。采用 Bento Grid 布局，保持大量空白，让信息清晰易读。
            </p>
            
            {/* 装饰性几何图案 */}
            <div className="flex justify-center items-center gap-8 mt-12">
              <div className="text-peach-300 animate-float">
                <CirclePattern size="lg" />
              </div>
              <div className="text-cream-400 animate-soft-bounce">
                <TrianglePattern size="lg" />
              </div>
              <div className="text-peach-200 animate-float" style={{ animationDelay: '1s' }}>
                <DiamondPattern size="lg" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="container-spacing">
        <div className="content-max-width">
          {/* 功能展示区域 */}
          <section className="mb-24">
            <h2 className="heading-secondary text-center mb-16 animate-slide-up">
              核心功能模块
            </h2>
            
            <BentoGrid className="animate-fade-in">
              <BentoFeatureCard
                size="large"
                icon={<HealthIcon size="xl" animate />}
                title="健康监测"
                description="智能追踪您的健康数据，提供个性化的健康建议和趋势分析，让您时刻了解身体状况。"
                action={
                  <button className="btn-primary">
                    立即体验
                  </button>
                }
              />

              <BentoFeatureCard
                size="medium"
                icon={<AIIcon size="lg" animate />}
                title="AI 健康助手"
                description="基于先进的人工智能技术，为您提供24/7的健康咨询和建议。"
                action={
                  <button className="btn-soft">
                    了解更多
                  </button>
                }
              />

              <BentoStatsCard
                icon={<DashboardIcon size="md" animate />}
                value="98%"
                label="用户满意度"
                trend="up"
              />

              <BentoStatsCard
                icon={<ProfileIcon size="md" animate />}
                value="50K+"
                label="活跃用户"
                trend="up"
              />

              <BentoFeatureCard
                size="wide"
                icon={<NutritionIcon size="lg" animate />}
                title="营养管理"
                description="科学的营养搭配建议，个性化的饮食计划，让健康生活更简单。支持多种饮食偏好和限制条件。"
                action={
                  <button className="btn-ghost">
                    查看详情
                  </button>
                }
              />

              <BentoFeatureCard
                size="medium"
                icon={<WorkoutIcon size="lg" animate />}
                title="运动计划"
                description="定制化的运动方案，适合不同健身水平的用户。"
              />

              <BentoFeatureCard
                size="small"
                icon={<SupplementIcon size="md" animate />}
                title="补剂推荐"
                description="基于您的健康状况推荐合适的营养补剂。"
              />

              <BentoFeatureCard
                size="medium"
                icon={<KnowledgeIcon size="lg" animate />}
                title="健康知识"
                description="丰富的健康知识库，让您成为自己的健康专家。"
                action={
                  <button className="btn-soft">
                    学习更多
                  </button>
                }
              />
            </BentoGrid>
          </section>

          {/* 设计元素展示 */}
          <section className="mb-24">
            <h2 className="heading-secondary text-center mb-16">
              设计元素
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 颜色面板 */}
              <div className="card-elevated animate-slide-up">
                <h3 className="text-xl font-semibold mb-6 text-neutral-800">
                  配色方案
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cream-300"></div>
                    <div>
                      <div className="font-medium">浅米色</div>
                      <div className="text-muted">#e3dac6</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-peach-300"></div>
                    <div>
                      <div className="font-medium">粉橘色</div>
                      <div className="text-muted">#f6d4c2</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-400"></div>
                    <div>
                      <div className="font-medium">中性灰</div>
                      <div className="text-muted">#a8a29e</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 按钮样式 */}
              <div className="card-elevated animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-semibold mb-6 text-neutral-800">
                  按钮样式
                </h3>
                <div className="space-y-4">
                  <button className="btn-primary w-full">
                    主要按钮
                  </button>
                  <button className="btn-soft w-full">
                    柔和按钮
                  </button>
                  <button className="btn-ghost w-full">
                    幽灵按钮
                  </button>
                </div>
              </div>

              {/* 输入框样式 */}
              <div className="card-elevated animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-semibold mb-6 text-neutral-800">
                  表单元素
                </h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="用户名" 
                    className="input-soft"
                  />
                  <input 
                    type="email" 
                    placeholder="邮箱地址" 
                    className="input-soft"
                  />
                  <textarea 
                    placeholder="留言内容" 
                    rows={3}
                    className="input-soft resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 图标展示 */}
          <section className="mb-24">
            <h2 className="heading-secondary text-center mb-16">
              几何图标系统
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { icon: <HealthIcon size="xl" animate />, name: '健康' },
                { icon: <NutritionIcon size="xl" animate />, name: '营养' },
                { icon: <WorkoutIcon size="xl" animate />, name: '运动' },
                { icon: <SupplementIcon size="xl" animate />, name: '补剂' },
                { icon: <AIIcon size="xl" animate />, name: 'AI助手' },
                { icon: <KnowledgeIcon size="xl" animate />, name: '知识' },
                { icon: <DashboardIcon size="xl" animate />, name: '仪表板' },
                { icon: <ProfileIcon size="xl" animate />, name: '个人' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center gap-3 p-4 card-soft animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-peach-600">
                    {item.icon}
                  </div>
                  <span className="text-muted text-center">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 文字样式展示 */}
          <section className="mb-24">
            <div className="card-elevated text-center">
              <h2 className="heading-secondary mb-8">
                文字排版系统
              </h2>
              <div className="space-y-6 max-content-width mx-auto">
                <h1 className="heading-primary text-gradient">
                  主标题样式
                </h1>
                <h2 className="heading-secondary">
                  副标题样式
                </h2>
                <p className="text-fluid-lg text-body">
                  这是流体大字号段落文字，会根据屏幕尺寸自动调整大小，确保在各种设备上都有良好的可读性。
                </p>
                <p className="text-body">
                  这是标准段落文字，采用合适的行高和字间距，提供舒适的阅读体验。文字颜色选择了柔和的中性色调，不会造成视觉疲劳。
                </p>
                <p className="text-muted">
                  这是辅助说明文字，通常用于提示信息或次要内容。
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="section-spacing container-spacing">
        <div className="content-max-width">
          <div className="text-center">
            <p className="text-muted">
              Breevia Design System - 柔和美学，简约优雅
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesignSystemDemo;

