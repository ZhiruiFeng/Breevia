'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  Clock, 
  Target, 
  CheckCircle,
  Circle,
  AlertCircle,
  Pause,
  Edit,
  Trash2,
  Brain,
  Heart,
  Briefcase,
  Users,
  DollarSign,
  BookOpen,
  MoreVertical
} from 'lucide-react'

interface LifeGuide {
  id: string
  title: string
  description: string
  category: 'health' | 'work' | 'lifestyle' | 'relationships' | 'finance' | 'learning'
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed' | 'paused'
  dueDate?: string
  tags: string[]
  aiGenerated: boolean
  content: string
  createdAt: string
}

// 模拟数据
const mockLifeGuides: LifeGuide[] = [
  {
    id: '1',
    title: '建立晨练习惯',
    description: '每天早上进行30分钟的体育锻炼，提高身体素质',
    category: 'health',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2024-01-15',
    tags: ['运动', '健康', '习惯'],
    aiGenerated: true,
    content: '根据您的健康目标，建议每天早上7点开始进行30分钟的有氧运动...',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: '学习投资理财',
    description: '掌握基础的投资理财知识，制定个人财务规划',
    category: 'finance',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-02-01',
    tags: ['理财', '投资', '学习'],
    aiGenerated: false,
    content: '制定学习计划，从基础的理财概念开始学习...',
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    title: '提升工作效率',
    description: '学习时间管理技巧，优化工作流程',
    category: 'work',
    priority: 'high',
    status: 'completed',
    tags: ['效率', '时间管理', '工作'],
    aiGenerated: true,
    content: '通过番茄工作法和GTD系统提升工作效率...',
    createdAt: '2023-12-20'
  }
]

const categories = [
  { id: 'health', label: '健康', icon: Heart, color: 'text-red-600 bg-red-50' },
  { id: 'work', label: '工作', icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
  { id: 'lifestyle', label: '生活方式', icon: Target, color: 'text-green-600 bg-green-50' },
  { id: 'relationships', label: '人际关系', icon: Users, color: 'text-purple-600 bg-purple-50' },
  { id: 'finance', label: '财务', icon: DollarSign, color: 'text-yellow-600 bg-yellow-50' },
  { id: 'learning', label: '学习', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
]

const statusConfig = {
  pending: { label: '待开始', icon: Circle, color: 'text-gray-600 bg-gray-50' },
  in_progress: { label: '进行中', icon: Clock, color: 'text-blue-600 bg-blue-50' },
  completed: { label: '已完成', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  paused: { label: '已暂停', icon: Pause, color: 'text-orange-600 bg-orange-50' },
}

const priorityConfig = {
  low: { label: '低', color: 'text-green-600 bg-green-50 border-green-200' },
  medium: { label: '中', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  high: { label: '高', color: 'text-red-600 bg-red-50 border-red-200' },
}

export default function LifeGuide() {
  const [lifeGuides, setLifeGuides] = useState<LifeGuide[]>(mockLifeGuides)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showNewGuideForm, setShowNewGuideForm] = useState(false)

  const filteredGuides = lifeGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || guide.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : Target
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.color : 'text-gray-600 bg-gray-50'
  }

  const handleStatusChange = (guideId: string, newStatus: string) => {
    setLifeGuides(guides => 
      guides.map(guide => 
        guide.id === guideId ? { ...guide, status: newStatus as any } : guide
      )
    )
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      {/* 顶部标题和操作 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">生活指导</h1>
            <p className="text-gray-600 mt-1">制定和跟踪您的个人发展目标</p>
          </div>
          <button 
            onClick={() => setShowNewGuideForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>新建指导</span>
          </button>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索指导内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 分类筛选 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有分类</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>

            {/* 状态筛选 */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有状态</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* 统计概览 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = lifeGuides.filter(guide => guide.status === status).length
          const Icon = config.icon
          
          return (
            <div key={status} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{config.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* 指导列表 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredGuides.map((guide, index) => {
          const CategoryIcon = getCategoryIcon(guide.category)
          const StatusIcon = statusConfig[guide.status].icon
          
          return (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(guide.category)}`}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                      <p className="text-gray-600 text-sm">{guide.description}</p>
                    </div>
                    {guide.aiGenerated && (
                      <div className="bg-purple-50 px-2 py-1 rounded-full flex items-center space-x-1">
                        <Brain className="h-3 w-3 text-purple-600" />
                        <span className="text-xs text-purple-600 font-medium">AI生成</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${priorityConfig[guide.priority].color}`}>
                      <span className="text-xs font-medium">优先级：{priorityConfig[guide.priority].label}</span>
                    </div>
                    
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${statusConfig[guide.status].color}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span className="text-xs font-medium">{statusConfig[guide.status].label}</span>
                    </div>

                    {guide.dueDate && (
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">截止：{guide.dueDate}</span>
                      </div>
                    )}
                  </div>

                  {guide.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-700 text-sm line-clamp-2">{guide.content}</p>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <select
                    value={guide.status}
                    onChange={(e) => handleStatusChange(guide.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {filteredGuides.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">没有找到符合条件的生活指导</p>
          <button 
            onClick={() => setShowNewGuideForm(true)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            创建第一个生活指导
          </button>
        </motion.div>
      )}
    </div>
  )
}
