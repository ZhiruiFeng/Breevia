import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  gradient?: boolean;
  hover?: boolean;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 ${className}`}>
      {children}
    </div>
  );
};

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = '', 
  size = 'medium',
  gradient = false,
  hover = true
}) => {
  const sizeClasses = {
    small: 'col-span-1 row-span-1 min-h-[200px]',
    medium: 'col-span-1 md:col-span-2 row-span-1 min-h-[250px]',
    large: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2 min-h-[400px]',
    wide: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-1 min-h-[200px]',
    tall: 'col-span-1 row-span-2 min-h-[400px]',
  };

  const gradientClasses = gradient 
    ? 'bg-gradient-to-br from-cream-50 via-peach-50 to-cream-100 bg-300% animate-gradient-shift' 
    : 'bg-cream-50/80 backdrop-blur-xs';

  const hoverClasses = hover 
    ? 'hover:scale-102 hover:shadow-lg hover:shadow-peach-200/50 transition-all duration-300 ease-out cursor-pointer' 
    : '';

  return (
    <div className={`
      ${sizeClasses[size]}
      ${gradientClasses}
      ${hoverClasses}
      rounded-3xl p-8 border border-cream-200/50
      relative overflow-hidden
      ${className}
    `}>
      {/* 轻微的内阴影效果 */}
      <div className="absolute inset-0 rounded-3xl shadow-inner shadow-cream-300/20 pointer-events-none" />
      
      {/* 内容区域 */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
      
      {/* 悬停时的光晕效果 */}
      {hover && (
        <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-peach-200 to-cream-200 pointer-events-none" />
      )}
    </div>
  );
};

// 预设的卡片组件
export const BentoFeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  size?: BentoCardProps['size'];
}> = ({ icon, title, description, action, size = 'medium' }) => {
  return (
    <BentoCard size={size} gradient>
      <div className="flex flex-col h-full">
        {/* 图标区域 */}
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-peach-100/80 text-peach-600 animate-float">
          {icon}
        </div>
        
        {/* 文字内容 */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-neutral-800 mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-neutral-600 leading-relaxed text-sm">
            {description}
          </p>
        </div>
        
        {/* 操作按钮 */}
        {action && (
          <div className="mt-6 pt-4 border-t border-cream-300/50">
            {action}
          </div>
        )}
      </div>
    </BentoCard>
  );
};

export const BentoStatsCard: React.FC<{
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}> = ({ value, label, trend = 'neutral', icon }) => {
  const trendColors = {
    up: 'text-success-600',
    down: 'text-warning-600',
    neutral: 'text-neutral-600'
  };

  return (
    <BentoCard size="small" hover>
      <div className="flex flex-col justify-center h-full text-center">
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-cream-200/60 flex items-center justify-center text-peach-600">
              {icon}
            </div>
          </div>
        )}
        
        <div className="text-3xl font-bold text-neutral-800 mb-2">
          {value}
        </div>
        
        <div className={`text-sm font-medium ${trendColors[trend]}`}>
          {label}
        </div>
      </div>
    </BentoCard>
  );
};

export default BentoGrid;
