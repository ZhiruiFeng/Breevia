'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  ExternalLink, 
  Bookmark,
  BookmarkCheck,
  Eye,
  ThumbsUp,
  Share2,
  Play,
  FileText,
  Video,
  Headphones,
  Book,
  BookOpen,
  Wrench,
  GraduationCap,
  TrendingUp,
  Award,
  Users
} from 'lucide-react'

interface KnowledgeItem {
  id: string
  title: string
  description: string
  content: string
  category: 'article' | 'video' | 'course' | 'book' | 'podcast' | 'tool'
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: number
  sourceUrl?: string
  tags: string[]
  rating: number
  reviewCount: number
  isBookmarked: boolean
  viewCount: number
  createdAt: string
}

// 模拟数据
const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: '1',
    title: '时间管理的艺术',
    description: '学习如何有效管理时间，提高工作和生活效率',
    content: '这篇文章深入探讨了现代时间管理的核心原则...',
    category: 'article',
    difficultyLevel: 'beginner',
    estimatedTime: 15,
    sourceUrl: 'https://example.com/time-management',
    tags: ['时间管理', '效率', '生产力'],
    rating: 4.5,
    reviewCount: 128,
    isBookmarked: false,
    viewCount: 1205,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: '健康饮食指南',
    description: '了解均衡饮食的重要性和实践方法',
    content: '健康的饮食习惯对身体和心理健康都有重要影响...',
    category: 'article',
    difficultyLevel: 'beginner',
    estimatedTime: 20,
    tags: ['健康', '饮食', '营养'],
    rating: 4.7,
    reviewCount: 89,
    isBookmarked: true,
    viewCount: 856,
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    title: '冥想入门课程',
    description: '学习基础冥想技巧，改善心理健康',
    content: '这个课程将带您了解冥想的基本原理和实践方法...',
    category: 'course',
    difficultyLevel: 'beginner',
    estimatedTime: 30,
    tags: ['冥想', '心理健康', '放松'],
    rating: 4.8,
    reviewCount: 156,
    isBookmarked: false,
    viewCount: 2103,
    createdAt: '2024-01-03'
  },
  {
    id: '4',
    title: '投资理财基础',
    description: '个人财务管理和投资入门知识',
    content: '理财是现代生活的必备技能，本课程涵盖基础知识...',
    category: 'course',
    difficultyLevel: 'intermediate',
    estimatedTime: 60,
    tags: ['理财', '投资', '财务'],
    rating: 4.6,
    reviewCount: 234,
    isBookmarked: true,
    viewCount: 1789,
    createdAt: '2024-01-04'
  },
  {
    id: '5',
    title: '深度工作法',
    description: '如何在分心的世界中专注工作',
    content: '在这个充满干扰的时代，深度工作变得越来越重要...',
    category: 'book',
    difficultyLevel: 'intermediate',
    estimatedTime: 180,
    tags: ['专注', '工作', '效率'],
    rating: 4.9,
    reviewCount: 312,
    isBookmarked: false,
    viewCount: 945,
    createdAt: '2024-01-05'
  }
]

const categories = [
  { id: 'article', label: '文章', icon: FileText, color: 'text-blue-600 bg-blue-50' },
  { id: 'video', label: '视频', icon: Video, color: 'text-red-600 bg-red-50' },
  { id: 'course', label: '课程', icon: GraduationCap, color: 'text-purple-600 bg-purple-50' },
  { id: 'book', label: '书籍', icon: Book, color: 'text-green-600 bg-green-50' },
  { id: 'podcast', label: '播客', icon: Headphones, color: 'text-orange-600 bg-orange-50' },
  { id: 'tool', label: '工具', icon: Wrench, color: 'text-gray-600 bg-gray-50' },
]

const difficultyLevels = [
  { id: 'beginner', label: '初级', color: 'text-green-600 bg-green-50' },
  { id: 'intermediate', label: '中级', color: 'text-yellow-600 bg-yellow-50' },
  { id: 'advanced', label: '高级', color: 'text-red-600 bg-red-50' },
]

export default function KnowledgeHub() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(mockKnowledgeItems)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')

  const filteredItems = knowledgeItems
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'all' || item.difficultyLevel === selectedDifficulty
      
      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating
        case 'views': return b.viewCount - a.viewCount
        case 'reviews': return b.reviewCount - a.reviewCount
        case 'time': return (a.estimatedTime || 0) - (b.estimatedTime || 0)
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default: return 0
      }
    })

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : FileText
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.color : 'text-gray-600 bg-gray-50'
  }

  const getDifficultyColor = (difficulty: string) => {
    const level = difficultyLevels.find(lvl => lvl.id === difficulty)
    return level ? level.color : 'text-gray-600 bg-gray-50'
  }

  const getDifficultyLabel = (difficulty: string) => {
    const level = difficultyLevels.find(lvl => lvl.id === difficulty)
    return level ? level.label : difficulty
  }

  const toggleBookmark = (itemId: string) => {
    setKnowledgeItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    )
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} 分钟`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours} 小时 ${remainingMinutes} 分钟` : `${hours} 小时`
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      {/* 顶部标题和统计 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">知识推荐</h1>
            <p className="text-gray-600 mt-1">发现和学习优质的知识内容</p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <BookmarkCheck className="h-4 w-4" />
              <span>{knowledgeItems.filter(item => item.isBookmarked).length} 个收藏</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>{knowledgeItems.length} 个资源</span>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索知识内容、标签..."
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
              <option value="all">所有类型</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>

            {/* 难度筛选 */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有难度</option>
              {difficultyLevels.map(level => (
                <option key={level.id} value={level.id}>{level.label}</option>
              ))}
            </select>

            {/* 排序 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="rating">评分最高</option>
              <option value="views">浏览最多</option>
              <option value="reviews">评论最多</option>
              <option value="time">时间最短</option>
              <option value="newest">最新发布</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* 分类统计 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8"
      >
        {categories.map(category => {
          const count = knowledgeItems.filter(item => item.category === category.id).length
          const Icon = category.icon
          
          return (
            <div key={category.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{category.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* 知识项目列表 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredItems.map((item, index) => {
          const CategoryIcon = getCategoryIcon(item.category)
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 card-hover group"
            >
              <div className="p-6">
                {/* 头部信息 */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                    <CategoryIcon className="h-5 w-5" />
                  </div>
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.isBookmarked 
                        ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                        : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                    }`}
                  >
                    {item.isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                  </button>
                </div>

                {/* 标题和描述 */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* 标签和难度 */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficultyLevel)}`}>
                    {getDifficultyLabel(item.difficultyLevel)}
                  </span>
                  {item.estimatedTime && (
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{formatTime(item.estimatedTime)}</span>
                    </div>
                  )}
                </div>

                {/* 标签 */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-gray-500 text-xs">+{item.tags.length - 3}</span>
                    )}
                  </div>
                )}

                {/* 评分和统计 */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{item.rating}</span>
                    <span>({item.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{item.viewCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>开始学习</span>
                  </button>
                  {item.sourceUrl && (
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  )}
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {filteredItems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">没有找到符合条件的知识内容</p>
          <p className="text-gray-400 text-sm mt-2">尝试调整搜索条件或筛选器</p>
        </motion.div>
      )}
    </div>
  )
}
