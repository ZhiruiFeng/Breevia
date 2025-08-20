import React from 'react';

interface IconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

// 健康相关图标
export const HealthIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-soft-bounce' : ''} ${className}`}
  >
    <path 
      d="M12 21C12 21 20 16 20 10C20 7.79086 18.2091 6 16 6C14.5 6 13.2 6.8 12 8C10.8 6.8 9.5 6 8 6C5.79086 6 4 7.79086 4 10C4 16 12 21 12 21Z" 
      fill="currentColor" 
      className="opacity-90"
    />
    <circle cx="12" cy="10" r="3" fill="white" className="opacity-80" />
    <path d="M12 8.5V11.5M10.5 10H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const NutritionIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-float' : ''} ${className}`}
  >
    <path 
      d="M8 4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6H18C19.1046 6 20 6.89543 20 8V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V8C4 6.89543 4.89543 6 6 6H8V4Z" 
      fill="currentColor" 
      className="opacity-90"
    />
    <rect x="8" y="4" width="8" height="2" rx="1" fill="white" className="opacity-80" />
    <circle cx="9" cy="11" r="1.5" fill="white" className="opacity-90" />
    <circle cx="15" cy="11" r="1.5" fill="white" className="opacity-90" />
    <circle cx="12" cy="15" r="1.5" fill="white" className="opacity-90" />
  </svg>
);

export const WorkoutIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-gentle-scale' : ''} ${className}`}
  >
    <path 
      d="M6 8C4.89543 8 4 8.89543 4 10V14C4 15.1046 4.89543 16 6 16H7V18C7 19.1046 7.89543 20 9 20H15C16.1046 20 17 19.1046 17 18V16H18C19.1046 16 20 15.1046 20 14V10C20 8.89543 19.1046 8 18 8H6Z" 
      fill="currentColor" 
      className="opacity-90"
    />
    <rect x="9" y="4" width="6" height="4" rx="2" fill="currentColor" className="opacity-70" />
    <rect x="8" y="10" width="8" height="2" rx="1" fill="white" className="opacity-80" />
  </svg>
);

export const SupplementIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-float' : ''} ${className}`}
  >
    <rect 
      x="6" y="3" width="12" height="18" rx="6" 
      fill="currentColor" 
      className="opacity-90"
    />
    <rect x="6" y="3" width="12" height="9" rx="6" fill="currentColor" className="opacity-70" />
    <circle cx="9" cy="7" r="1" fill="white" className="opacity-90" />
    <circle cx="12" cy="7" r="1" fill="white" className="opacity-90" />
    <circle cx="15" cy="7" r="1" fill="white" className="opacity-90" />
    <circle cx="10.5" cy="16" r="1" fill="white" className="opacity-80" />
    <circle cx="13.5" cy="16" r="1" fill="white" className="opacity-80" />
  </svg>
);

export const AIIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-gentle-scale' : ''} ${className}`}
  >
    <circle 
      cx="12" cy="12" r="9" 
      fill="currentColor" 
      className="opacity-90"
    />
    <circle cx="9" cy="10" r="1.5" fill="white" className="opacity-90" />
    <circle cx="15" cy="10" r="1.5" fill="white" className="opacity-90" />
    <path 
      d="M8 15C8 15 9.5 17 12 17C14.5 17 16 15 16 15" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      className="opacity-80"
    />
    <path 
      d="M12 6L13 4L12 2L11 4L12 6Z" 
      fill="white" 
      className="opacity-70"
    />
  </svg>
);

export const KnowledgeIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-float' : ''} ${className}`}
  >
    <path 
      d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" 
      fill="currentColor" 
      className="opacity-90"
    />
    <path d="M8 8H16M8 12H14M8 16H12" stroke="white" strokeWidth="2" strokeLinecap="round" className="opacity-80" />
    <circle cx="18" cy="6" r="3" fill="currentColor" className="opacity-70" />
    <path d="M18 5V7M17 6H19" stroke="white" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-gentle-scale' : ''} ${className}`}
  >
    <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" className="opacity-90" />
    <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" className="opacity-80" />
    <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" className="opacity-80" />
    <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" className="opacity-70" />
    <circle cx="6.5" cy="6.5" r="1" fill="white" className="opacity-90" />
    <circle cx="17.5" cy="6.5" r="1" fill="white" className="opacity-80" />
    <circle cx="6.5" cy="17.5" r="1" fill="white" className="opacity-80" />
    <circle cx="17.5" cy="17.5" r="1" fill="white" className="opacity-70" />
  </svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-soft-bounce' : ''} ${className}`}
  >
    <circle 
      cx="12" cy="12" r="9" 
      fill="currentColor" 
      className="opacity-90"
    />
    <circle cx="12" cy="9" r="3" fill="white" className="opacity-90" />
    <path 
      d="M7 18C7 15.7909 9.23858 14 12 14C14.7614 14 17 15.7909 17 18" 
      fill="white" 
      className="opacity-80"
    />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 'md', className = '', animate = false }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${animate ? 'animate-gentle-scale' : ''} ${className}`}
  >
    <path 
      d="M12 1L15.09 8.26L22 9L17 14.74L18.18 22.02L12 18L5.82 22.02L7 14.74L2 9L8.91 8.26L12 1Z" 
      fill="currentColor" 
      className="opacity-90"
    />
    <circle cx="12" cy="12" r="3" fill="white" className="opacity-80" />
    <path d="M12 10V14M10 12H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// 装饰性几何图标
export const CirclePattern: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${className}`}
  >
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" className="opacity-30" />
    <circle cx="12" cy="12" r="4" fill="currentColor" className="opacity-50" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" className="opacity-90" />
  </svg>
);

export const TrianglePattern: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${className}`}
  >
    <path 
      d="M12 3L21 18H3L12 3Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="currentColor"
      className="opacity-40"
    />
    <circle cx="12" cy="14" r="2" fill="white" className="opacity-80" />
  </svg>
);

export const DiamondPattern: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`${sizeClasses[size]} ${className}`}
  >
    <path 
      d="M12 3L18 12L12 21L6 12L12 3Z" 
      fill="currentColor" 
      className="opacity-50"
    />
    <path 
      d="M12 7L15 12L12 17L9 12L12 7Z" 
      fill="white" 
      className="opacity-80"
    />
  </svg>
);

// 图标组合组件
export const IconGrid: React.FC<{ 
  icons: Array<{ icon: React.ReactNode; label: string; }>;
  className?: string;
}> = ({ icons, className = '' }) => (
  <div className={`grid grid-cols-3 gap-4 ${className}`}>
    {icons.map((item, index) => (
      <div 
        key={index}
        className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-cream-100/50 hover:bg-cream-200/60 transition-colors duration-200"
      >
        <div className="text-peach-600">
          {item.icon}
        </div>
        <span className="text-xs text-neutral-600 font-medium">
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

export default {
  HealthIcon,
  NutritionIcon,
  WorkoutIcon,
  SupplementIcon,
  AIIcon,
  KnowledgeIcon,
  DashboardIcon,
  ProfileIcon,
  SettingsIcon,
  CirclePattern,
  TrianglePattern,
  DiamondPattern,
  IconGrid
};
