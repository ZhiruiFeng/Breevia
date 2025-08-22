'use client'

import { useState } from 'react'
import { 
  Home, 
  ChefHat, 
  Pill, 
  FileText, 
  Brain, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  Heart,
  Target,
  TrendingUp,
  Activity,
  Droplets
} from 'lucide-react'
import { signOut } from '@/lib/auth'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  user: any
}

const menuItems = [
  { id: 'dashboard', label: '健康仪表板', icon: Home },
  { id: 'health-logs', label: '健康记录', icon: Activity },
  { id: 'recipes', label: '营养食谱', icon: ChefHat },
  { id: 'supplements', label: '智能补剂', icon: Pill },
  { id: 'health-plans', label: '健康方案', icon: FileText },
  { id: 'ai-agents', label: 'AI 健康顾问', icon: Brain },
]

const bottomMenuItems = [
  { id: 'profile', label: '个人资料', icon: User },
  { id: 'settings', label: '设置', icon: Settings },
]

export default function Sidebar({ activeTab, onTabChange, user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <>
      {/* 移动端遮罩 */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* 侧边栏 */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-64'}
        flex flex-col
      `}>
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Breevia</h1>
                <p className="text-xs text-gray-500">个人定制养生</p>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        {/* 用户信息 */}
        {!isCollapsed && user && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name || '用户'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 健康快速统计 */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-blue-700">今日饮水</span>
                </div>
                <p className="text-lg font-semibold text-blue-900 mt-1">1.2L</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-700">健康指数</span>
                </div>
                <p className="text-lg font-semibold text-green-900 mt-1">8.5</p>
              </div>
            </div>
          </div>
        )}

        {/* 主导航 */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* 底部导航 */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            )
          })}
          
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg 
              text-red-600 hover:bg-red-50 transition-all duration-200
              ${isCollapsed ? 'justify-center' : 'justify-start'}
            `}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="font-medium">退出登录</span>}
          </button>
        </div>
      </div>

      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  )
}
