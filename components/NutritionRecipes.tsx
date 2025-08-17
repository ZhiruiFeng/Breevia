'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Flame,
  ChefHat,
  Heart,
  Leaf,
  Zap,
  Shield,
  Brain,
  Eye,
  Bookmark,
  BookmarkCheck,
  Play,
  Share2,
  Plus,
  Award,
  Thermometer,
  Droplets,
  Target
} from 'lucide-react'

interface Recipe {
  id: string
  name: string
  description: string
  cuisineType: string
  caloriesPerServing: number
  proteinG: number
  carbsG: number
  fatG: number
  fiberG: number
  servings: number
  prepTimeMinutes: number
  cookTimeMinutes: number
  difficultyLevel: 'easy' | 'medium' | 'hard'
  mealType: string[]
  dietaryTags: string[]
  healthBenefits: string[]
  suitableConstitutions: string[]
  ingredients: { name: string; amount: string }[]
  tcmProperties: {
    nature: 'hot' | 'warm' | 'neutral' | 'cool' | 'cold'
    flavor: string[]
    effects: string[]
  }
  rating: number
  reviewCount: number
  viewCount: number
  imageUrl?: string
  isBookmarked: boolean
  isVerified: boolean
}

// 模拟食谱数据
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: '养生银耳莲子汤',
    description: '滋阴润燥，补脾益气的经典汤品，特别适合秋冬季节和阴虚体质人群食用',
    cuisineType: '中式',
    caloriesPerServing: 150,
    proteinG: 4.2,
    carbsG: 32.5,
    fatG: 0.8,
    fiberG: 2.1,
    servings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    difficultyLevel: 'easy',
    mealType: ['breakfast', 'dessert'],
    dietaryTags: ['低脂', '无麸质', '抗衰老', '美容养颜'],
    healthBenefits: ['改善肌肤', '提升免疫力', '助消化', '滋阴润燥'],
    suitableConstitutions: ['yin_deficiency', 'qi_deficiency'],
    ingredients: [
      { name: '银耳', amount: '15g' },
      { name: '莲子', amount: '30g' },
      { name: '冰糖', amount: '适量' },
      { name: '枸杞', amount: '10g' }
    ],
    tcmProperties: {
      nature: 'neutral',
      flavor: ['甘', '淡'],
      effects: ['滋阴润燥', '补脾益气', '清心安神']
    },
    rating: 4.6,
    reviewCount: 23,
    viewCount: 456,
    imageUrl: '/images/recipes/yiner-soup.jpg',
    isBookmarked: false,
    isVerified: true
  },
  {
    id: '2',
    name: '黑芝麻核桃补肾粥',
    description: '补肾益精，乌发养颜的营养粥品，富含优质蛋白质和健康脂肪',
    cuisineType: '中式',
    caloriesPerServing: 280,
    proteinG: 8.5,
    carbsG: 45.2,
    fatG: 12.3,
    fiberG: 5.2,
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    difficultyLevel: 'easy',
    mealType: ['breakfast'],
    dietaryTags: ['高蛋白', '健脑益智', '抗衰老', '乌发养颜'],
    healthBenefits: ['增强记忆', '补肾强身', '延缓衰老', '改善发质'],
    suitableConstitutions: ['kidney_yang_deficiency', 'qi_deficiency'],
    ingredients: [
      { name: '黑芝麻', amount: '20g' },
      { name: '核桃仁', amount: '25g' },
      { name: '黑米', amount: '50g' },
      { name: '红枣', amount: '5颗' }
    ],
    tcmProperties: {
      nature: 'warm',
      flavor: ['甘'],
      effects: ['补肾益精', '乌发养颜', '润肠通便']
    },
    rating: 4.8,
    reviewCount: 34,
    viewCount: 789,
    isBookmarked: true,
    isVerified: true
  },
  {
    id: '3',
    name: '山药薏米祛湿粥',
    description: '健脾祛湿，特别适合湿热体质和痰湿体质人群，有助于调理脾胃',
    cuisineType: '中式',
    caloriesPerServing: 180,
    proteinG: 5.2,
    carbsG: 38.6,
    fatG: 1.2,
    fiberG: 3.8,
    servings: 3,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    difficultyLevel: 'easy',
    mealType: ['breakfast', 'lunch'],
    dietaryTags: ['祛湿', '健脾', '低脂', '易消化'],
    healthBenefits: ['健脾胃', '祛湿气', '美白肌肤', '控制体重'],
    suitableConstitutions: ['phlegm_dampness', 'damp_heat'],
    ingredients: [
      { name: '山药', amount: '100g' },
      { name: '薏米', amount: '30g' },
      { name: '小米', amount: '40g' },
      { name: '红豆', amount: '20g' }
    ],
    tcmProperties: {
      nature: 'neutral',
      flavor: ['甘', '淡'],
      effects: ['健脾祛湿', '利水消肿', '美白肌肤']
    },
    rating: 4.4,
    reviewCount: 18,
    viewCount: 324,
    isBookmarked: false,
    isVerified: true
  },
  {
    id: '4',
    name: '当归生姜羊肉汤',
    description: '温中补虚，补血调经的经典药膳，适合阳虚体质和气血不足人群',
    cuisineType: '中式',
    caloriesPerServing: 320,
    proteinG: 25.6,
    carbsG: 8.2,
    fatG: 18.4,
    fiberG: 1.5,
    servings: 3,
    prepTimeMinutes: 25,
    cookTimeMinutes: 90,
    difficultyLevel: 'medium',
    mealType: ['lunch', 'dinner'],
    dietaryTags: ['温补', '补血', '调经', '暖胃'],
    healthBenefits: ['温中散寒', '补血调经', '增强体质', '改善循环'],
    suitableConstitutions: ['yang_deficiency', 'blood_deficiency'],
    ingredients: [
      { name: '当归', amount: '10g' },
      { name: '生姜', amount: '15g' },
      { name: '羊肉', amount: '300g' },
      { name: '红枣', amount: '6颗' }
    ],
    tcmProperties: {
      nature: 'warm',
      flavor: ['甘', '辛'],
      effects: ['温中补虚', '补血调经', '散寒止痛']
    },
    rating: 4.7,
    reviewCount: 41,
    viewCount: 612,
    isBookmarked: false,
    isVerified: true
  }
]

const constitutionColors = {
  qi_deficiency: 'from-yellow-400 to-orange-500',
  yang_deficiency: 'from-red-400 to-pink-500',
  yin_deficiency: 'from-blue-400 to-cyan-500',
  phlegm_dampness: 'from-green-400 to-emerald-500',
  damp_heat: 'from-purple-400 to-indigo-500',
  blood_stasis: 'from-red-500 to-rose-600',
  qi_stagnation: 'from-gray-400 to-slate-500',
  balanced: 'from-green-400 to-emerald-500'
}

const constitutionNames = {
  qi_deficiency: '气虚质',
  yang_deficiency: '阳虚质', 
  yin_deficiency: '阴虚质',
  phlegm_dampness: '痰湿质',
  damp_heat: '湿热质',
  blood_stasis: '血瘀质',
  qi_stagnation: '气郁质',
  balanced: '平和质'
}

const mealTypeColors = {
  breakfast: 'bg-yellow-100 text-yellow-800',
  lunch: 'bg-green-100 text-green-800',
  dinner: 'bg-blue-100 text-blue-800',
  snack: 'bg-purple-100 text-purple-800',
  dessert: 'bg-pink-100 text-pink-800'
}

const difficultyColors = {
  easy: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  hard: 'text-red-600 bg-red-50'
}

const natureIcons = {
  hot: { icon: Flame, color: 'text-red-600' },
  warm: { icon: Thermometer, color: 'text-orange-600' },
  neutral: { icon: Target, color: 'text-gray-600' },
  cool: { icon: Droplets, color: 'text-blue-600' },
  cold: { icon: Droplets, color: 'text-cyan-600' }
}

export default function NutritionRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedConstitution, setSelectedConstitution] = useState<string>('all')
  const [selectedMealType, setSelectedMealType] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')

  const filteredRecipes = recipes
    .filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.healthBenefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesConstitution = selectedConstitution === 'all' || 
                                 recipe.suitableConstitutions.includes(selectedConstitution)
      const matchesMealType = selectedMealType === 'all' || 
                             recipe.mealType.includes(selectedMealType)
      const matchesDifficulty = selectedDifficulty === 'all' || 
                               recipe.difficultyLevel === selectedDifficulty
      
      return matchesSearch && matchesConstitution && matchesMealType && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating
        case 'views': return b.viewCount - a.viewCount
        case 'calories': return a.caloriesPerServing - b.caloriesPerServing
        case 'time': return (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes)
        default: return 0
      }
    })

  const toggleBookmark = (recipeId: string) => {
    setRecipes(recipes =>
      recipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, isBookmarked: !recipe.isBookmarked } : recipe
      )
    )
  }

  const getNatureIcon = (nature: string) => {
    const natureInfo = natureIcons[nature as keyof typeof natureIcons] || natureIcons.neutral
    const IconComponent = natureInfo.icon
    return <IconComponent className={`h-4 w-4 ${natureInfo.color}`} />
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-y-auto">
      {/* 顶部标题和筛选 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">营养食谱</h1>
            <p className="text-gray-600 mt-1">基于体质的个性化养生食谱推荐</p>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>定制食谱</span>
          </button>
        </div>

        {/* 搜索和筛选栏 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索食谱、功效、食材..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* 体质筛选 */}
            <select
              value={selectedConstitution}
              onChange={(e) => setSelectedConstitution(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">所有体质</option>
              {Object.entries(constitutionNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>

            {/* 用餐类型筛选 */}
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">所有餐型</option>
              <option value="breakfast">早餐</option>
              <option value="lunch">午餐</option>
              <option value="dinner">晚餐</option>
              <option value="snack">加餐</option>
              <option value="dessert">甜品</option>
            </select>

            {/* 难度筛选 */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">所有难度</option>
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>

            {/* 排序 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="rating">评分最高</option>
              <option value="views">浏览最多</option>
              <option value="calories">热量最低</option>
              <option value="time">制作最快</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* 食谱网格 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden group"
          >
            {/* 食谱图片区域 */}
            <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-200">
              <div className="absolute top-3 left-3 flex space-x-2">
                {recipe.isVerified && (
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                    <Award className="h-3 w-3" />
                    <span className="text-xs font-medium">营养师认证</span>
                  </div>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleBookmark(recipe.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    recipe.isBookmarked 
                      ? 'text-yellow-600 bg-white/90 hover:bg-white' 
                      : 'text-gray-400 bg-white/70 hover:text-yellow-600 hover:bg-white/90'
                  }`}
                >
                  {recipe.isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </button>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                <div className="bg-white/90 px-2 py-1 rounded-lg">
                  <div className="flex items-center space-x-1">
                    {getNatureIcon(recipe.tcmProperties.nature)}
                    <span className="text-xs font-medium">
                      {recipe.tcmProperties.nature === 'hot' ? '热性' :
                       recipe.tcmProperties.nature === 'warm' ? '温性' :
                       recipe.tcmProperties.nature === 'neutral' ? '平性' :
                       recipe.tcmProperties.nature === 'cool' ? '凉性' : '寒性'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* 食谱标题和基本信息 */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {recipe.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {recipe.description}
                </p>
                
                {/* 营养信息 */}
                <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{recipe.caloriesPerServing}</div>
                    <div className="text-xs text-gray-600">卡路里</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{recipe.proteinG}g</div>
                    <div className="text-xs text-gray-600">蛋白质</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{recipe.carbsG}g</div>
                    <div className="text-xs text-gray-600">碳水</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{recipe.fiberG}g</div>
                    <div className="text-xs text-gray-600">纤维</div>
                  </div>
                </div>
              </div>

              {/* 标签和属性 */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} 分钟
                  </span>
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{recipe.servings} 人份</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[recipe.difficultyLevel]}`}>
                    {recipe.difficultyLevel === 'easy' ? '简单' : recipe.difficultyLevel === 'medium' ? '中等' : '困难'}
                  </span>
                </div>

                {/* 餐型标签 */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {recipe.mealType.map(type => (
                    <span key={type} className={`px-2 py-1 rounded-full text-xs ${mealTypeColors[type as keyof typeof mealTypeColors]}`}>
                      {type === 'breakfast' ? '早餐' : 
                       type === 'lunch' ? '午餐' :
                       type === 'dinner' ? '晚餐' :
                       type === 'snack' ? '加餐' : '甜品'}
                    </span>
                  ))}
                </div>

                {/* 适用体质 */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {recipe.suitableConstitutions.slice(0, 2).map(constitution => (
                    <span key={constitution} className={`px-2 py-1 rounded-full text-xs text-white bg-gradient-to-r ${constitutionColors[constitution as keyof typeof constitutionColors]}`}>
                      {constitutionNames[constitution as keyof typeof constitutionNames]}
                    </span>
                  ))}
                  {recipe.suitableConstitutions.length > 2 && (
                    <span className="text-gray-500 text-xs">+{recipe.suitableConstitutions.length - 2}</span>
                  )}
                </div>

                {/* 功效标签 */}
                <div className="flex flex-wrap gap-1">
                  {recipe.healthBenefits.slice(0, 3).map(benefit => (
                    <span key={benefit} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      {benefit}
                    </span>
                  ))}
                  {recipe.healthBenefits.length > 3 && (
                    <span className="text-gray-500 text-xs">+{recipe.healthBenefits.length - 3}</span>
                  )}
                </div>
              </div>

              {/* 评分和统计 */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{recipe.rating}</span>
                  <span>({recipe.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{recipe.viewCount}</span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <ChefHat className="h-4 w-4" />
                  <span>查看食谱</span>
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredRecipes.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">没有找到符合条件的食谱</p>
          <p className="text-gray-400 text-sm mt-2">尝试调整搜索条件或筛选器</p>
        </motion.div>
      )}
    </div>
  )
}
