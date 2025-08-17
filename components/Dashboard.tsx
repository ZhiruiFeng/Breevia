'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Brain,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  Plus
} from 'lucide-react'
import { motion } from 'framer-motion'

interface DashboardProps {
  user: any
}

// 模拟数据
const mockStats = {
  todayTasks: { completed: 3, total: 5 },
  weeklyProgress: 78,
  knowledgeItems: 12,
  aiSessions: 8
}

const mockRecentActivities = [
  { id: 1, type: 'task', title: '完成晨练', time: '2小时前', status: 'completed' },
  { id: 2, type: 'knowledge', title: '阅读：时间管理的艺术', time: '4小时前', status: 'in_progress' },
  { id: 3, type: 'ai', title: 'AI 助手对话：健康饮食建议', time: '昨天', status: 'completed' },
  { id: 4, type: 'task', title: '制定本周学习计划', time: '昨天', status: 'pending' },
]

const mockUpcomingTasks = [
  { id: 1, title: '阅读投资理财基础', category: '学习', priority: 'high', dueTime: '今天 18:00' },
  { id: 2, title: '练习冥想10分钟', category: '健康', priority: 'medium', dueTime: '今天 20:00' },
  { id: 3, title: '整理本周工作总结', category: '工作', priority: 'high', dueTime: '明天 09:00' },
]

const mockRecommendations = [
  { id: 1, title: '深度工作法', type: 'book', difficulty: 'intermediate', rating: 4.9 },
  { id: 2, title: '正念冥想入门', type: 'course', difficulty: 'beginner', rating: 4.8 },
  { id: 3, title: '高效时间管理技巧', type: 'article', difficulty: 'beginner', rating: 4.7 },
]

export default function Dashboard({ user }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return '早上好'
    if (hour < 18) return '下午好'
    return '晚上好'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50'
      case 'intermediate': return 'text-yellow-600 bg-yellow-50'
      case 'advanced': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      {/* 顶部问候 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}，{user?.name || '用户'}！
          </h1>
          <div className="text-lg font-mono text-gray-600 bg-white px-4 py-2 rounded-lg border">
            {formatTime(currentTime)}
          </div>
        </div>
        <p className="text-gray-600">
          今天是 {currentTime.toLocaleDateString('zh-CN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </motion.div>

      {/* 统计卡片 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockStats.todayTasks.completed}/{mockStats.todayTasks.total}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">今日任务</h3>
          <p className="text-gray-600 text-sm">已完成 {mockStats.todayTasks.completed} 个任务</p>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(mockStats.todayTasks.completed / mockStats.todayTasks.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{mockStats.weeklyProgress}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">本周进度</h3>
          <p className="text-gray-600 text-sm">学习和任务完成情况</p>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${mockStats.weeklyProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{mockStats.knowledgeItems}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">知识收藏</h3>
          <p className="text-gray-600 text-sm">本月收藏的学习资源</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Brain className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{mockStats.aiSessions}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">AI 对话</h3>
          <p className="text-gray-600 text-sm">本周与AI助手的互动</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 最近活动 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">最近活动</h2>
          </div>
          <div className="p-6 space-y-4">
            {mockRecentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  activity.status === 'completed' ? 'bg-green-50' :
                  activity.status === 'in_progress' ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  {activity.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : activity.status === 'in_progress' ? (
                    <Clock className="h-4 w-4 text-blue-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 即将到来的任务 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">即将到来</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              查看全部
            </button>
          </div>
          <div className="p-6 space-y-4">
            {mockUpcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{task.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.category}
                    </span>
                    <span className="text-gray-500 text-xs">{task.dueTime}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
            <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">添加新任务</span>
            </button>
          </div>
        </motion.div>

        {/* 推荐内容 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">为您推荐</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              更多推荐
            </button>
          </div>
          <div className="p-6 space-y-4">
            {mockRecommendations.map((item) => (
              <div key={item.id} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">{item.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(item.difficulty)}`}>
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {item.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
