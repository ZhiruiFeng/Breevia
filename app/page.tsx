'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AuthForm from '@/components/AuthForm'
import Sidebar from '@/components/Sidebar'
import HealthDashboard from '@/components/HealthDashboard'
import NutritionRecipes from '@/components/NutritionRecipes'
import SupplementHub from '@/components/SupplementHub'
import AIAgents from '@/components/AIAgents'
import { getCurrentUser, onAuthStateChange, type AuthUser } from '@/lib/auth'

export default function Home() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    // 检查当前用户状态
    getCurrentUser().then((user) => {
      setUser(user)
      setLoading(false)
    })

    // 监听认证状态变化
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleAuthSuccess = () => {
    // 认证成功后会通过 onAuthStateChange 自动更新用户状态
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HealthDashboard user={user} />
      case 'recipes':
        return <NutritionRecipes />
      case 'supplements':
        return <SupplementHub />
      case 'health-plans':
        return (
          <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">健康方案</h2>
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <p className="text-gray-600 mb-4">个性化健康方案功能正在开发中</p>
                <p className="text-gray-500 text-sm">即将为您提供基于循证医学的专业健康方案</p>
              </div>
            </div>
          </div>
        )
      case 'ai-agents':
        return <AIAgents />
      case 'profile':
        return (
          <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">个人健康档案</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input 
                    type="text" 
                    value={user?.user_metadata?.name || user?.email || ''} 
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">注册时间</label>
                  <input 
                    type="text" 
                    value={user?.created_at ? new Date(user.created_at).toLocaleDateString('zh-CN') : ''} 
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">健康设置</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">通知设置</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-gray-700">用餐提醒</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-gray-700">补剂提醒</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">健康检查提醒</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">隐私设置</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">健康数据分享</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-gray-700">匿名使用分析</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <HealthDashboard user={user} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <AuthForm
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
        onSuccess={handleAuthSuccess}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        user={user}
      />
      <main className="flex-1 flex flex-col lg:ml-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
