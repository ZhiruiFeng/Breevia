'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Activity, 
  Droplets, 
  Target, 
  Pill,
  Apple,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Scale,
  Moon,
  Smile,
  ChefHat,
  Beaker,
  Thermometer,
  Brain
} from 'lucide-react'

interface HealthDashboardProps {
  user: any
}

// 模拟健康数据
const mockHealthData = {
  todayStats: {
    water: { current: 1200, target: 2000 }, // ml
    calories: { current: 1650, target: 1800 },
    supplements: { taken: 3, total: 5 },
    meals: { completed: 2, planned: 3 }
  },
  vitals: {
    weight: 65.2,
    bmi: 22.1,
    bodyFat: 18.5,
    muscleMass: 52.8
  },
  wellbeing: {
    energy: 8,
    mood: 7,
    sleep: 9,
    stress: 3
  },
  constitution: 'qi_deficiency', // 气虚质
  recentMeals: [
    { name: '养生银耳莲子汤', time: '2小时前', calories: 150, benefits: ['滋阴润燥', '补脾益气'] },
    { name: '黑芝麻核桃粥', time: '今晨', calories: 280, benefits: ['补肾益精', '乌发养颜'] },
  ],
  activeSupplement: [
    { name: '还原型辅酶Q10', dosage: '100mg', time: '随早餐', status: 'taken' },
    { name: '维生素D3', dosage: '2000IU', time: '随午餐', status: 'pending' },
    { name: 'Omega-3', dosage: '1000mg', time: '随晚餐', status: 'pending' },
  ],
  upcomingReminders: [
    { type: 'meal', title: '午餐时间', time: '12:30', recipe: '补气养血汤' },
    { type: 'supplement', title: '维生素D3', time: '13:00', dosage: '2000IU' },
    { type: 'exercise', title: '太极练习', time: '18:00', duration: '30分钟' },
  ]
}

const constitutionInfo = {
  qi_deficiency: {
    name: '气虚质',
    description: '精神不振，语音低沉，易疲劳',
    color: 'from-yellow-400 to-orange-500',
    recommendations: ['益气健脾', '适量运动', '规律作息']
  },
  yang_deficiency: {
    name: '阳虚质', 
    description: '手足发凉，喜热怕冷，精神不振',
    color: 'from-red-400 to-pink-500',
    recommendations: ['温阳散寒', '适当进补', '避免寒凉']
  },
  yin_deficiency: {
    name: '阴虚质',
    description: '手足心热，口咽干燥，易上火',
    color: 'from-blue-400 to-cyan-500', 
    recommendations: ['滋阴清热', '多食润燥', '避免熬夜']
  },
  balanced: {
    name: '平和质',
    description: '体质均衡，身心健康',
    color: 'from-green-400 to-emerald-500',
    recommendations: ['维持平衡', '适度运动', '合理饮食']
  }
}

export default function HealthDashboard({ user }: HealthDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 6) return '夜深了，注意休息'
    if (hour < 12) return '早上好，开始健康的一天'
    if (hour < 14) return '中午好，记得均衡饮食'
    if (hour < 18) return '下午好，适当放松身心'
    if (hour < 22) return '晚上好，准备养生晚餐'
    return '夜晚了，早点休息'
  }

  const constitution = constitutionInfo[mockHealthData.constitution as keyof typeof constitutionInfo] || constitutionInfo.balanced

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-y-auto">
      {/* 顶部问候和体质显示 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {getGreeting()}，{user?.name || '养生达人'}！
              </h1>
              <p className="text-gray-600">
                今天是 {currentTime.toLocaleDateString('zh-CN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-gray-700 mb-1">
                {currentTime.toLocaleTimeString('zh-CN', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </div>
              <div className={`bg-gradient-to-r ${constitution.color} text-white px-4 py-2 rounded-full`}>
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4" />
                  <span className="font-medium">{constitution.name}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">体质特点</h3>
            <p className="text-green-800 text-sm mb-3">{constitution.description}</p>
            <div className="flex flex-wrap gap-2">
              {constitution.recommendations.map((rec, index) => (
                <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  {rec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 今日健康指标 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* 饮水量 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockHealthData.todayStats.water.current}ml
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">今日饮水</h3>
          <p className="text-gray-600 text-sm mb-3">
            目标 {mockHealthData.todayStats.water.target}ml
          </p>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(mockHealthData.todayStats.water.current / mockHealthData.todayStats.water.target) * 100}%` }}
            />
          </div>
        </div>

        {/* 热量摄入 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockHealthData.todayStats.calories.current}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">热量摄入</h3>
          <p className="text-gray-600 text-sm mb-3">
            目标 {mockHealthData.todayStats.calories.target} kcal
          </p>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(mockHealthData.todayStats.calories.current / mockHealthData.todayStats.calories.target) * 100}%` }}
            />
          </div>
        </div>

        {/* 补剂服用 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Pill className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockHealthData.todayStats.supplements.taken}/{mockHealthData.todayStats.supplements.total}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">补剂服用</h3>
          <p className="text-gray-600 text-sm mb-3">
            今日计划 {mockHealthData.todayStats.supplements.total} 种
          </p>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(mockHealthData.todayStats.supplements.taken / mockHealthData.todayStats.supplements.total) * 100}%` }}
            />
          </div>
        </div>

        {/* 饮食计划 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <Apple className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {mockHealthData.todayStats.meals.completed}/{mockHealthData.todayStats.meals.planned}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">用餐计划</h3>
          <p className="text-gray-600 text-sm mb-3">
            今日安排 {mockHealthData.todayStats.meals.planned} 餐
          </p>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(mockHealthData.todayStats.meals.completed / mockHealthData.todayStats.meals.planned) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 身体指标 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">身体指标</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">体重</span>
              <span className="font-semibold text-blue-900">{mockHealthData.vitals.weight} kg</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">BMI</span>
              <span className="font-semibold text-green-900">{mockHealthData.vitals.bmi}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">体脂率</span>
              <span className="font-semibold text-purple-900">{mockHealthData.vitals.bodyFat}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-gray-700">肌肉量</span>
              <span className="font-semibold text-orange-900">{mockHealthData.vitals.muscleMass} kg</span>
            </div>
          </div>
        </motion.div>

        {/* 身心状态 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">身心状态</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-700">精力水平</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-4 rounded-full ${
                      i < mockHealthData.wellbeing.energy ? 'bg-yellow-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smile className="h-4 w-4 text-green-500" />
                <span className="text-gray-700">心情指数</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-4 rounded-full ${
                      i < mockHealthData.wellbeing.mood ? 'bg-green-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4 text-blue-500" />
                <span className="text-gray-700">睡眠质量</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-4 rounded-full ${
                      i < mockHealthData.wellbeing.sleep ? 'bg-blue-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-red-500" />
                <span className="text-gray-700">压力水平</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-4 rounded-full ${
                      i < mockHealthData.wellbeing.stress ? 'bg-red-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 今日提醒 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">今日提醒</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {mockHealthData.upcomingReminders.map((reminder, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  reminder.type === 'meal' ? 'bg-green-100 text-green-600' :
                  reminder.type === 'supplement' ? 'bg-purple-100 text-purple-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {reminder.type === 'meal' ? <ChefHat className="h-4 w-4" /> :
                   reminder.type === 'supplement' ? <Beaker className="h-4 w-4" /> :
                   <Activity className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{reminder.title}</p>
                  <p className="text-gray-600 text-xs">
                    {reminder.time} • {reminder.recipe || reminder.dosage || reminder.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 最近用餐和补剂 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
      >
        {/* 最近用餐 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">最近用餐</h2>
          </div>
          <div className="p-6 space-y-4">
            {mockHealthData.recentMeals.map((meal, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border border-green-200 rounded-lg">
                <div className="bg-green-100 p-2 rounded-lg">
                  <ChefHat className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{meal.name}</h3>
                  <p className="text-gray-600 text-sm">{meal.time} • {meal.calories} kcal</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {meal.benefits.map((benefit, idx) => (
                      <span key={idx} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 补剂服用计划 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">补剂计划</h2>
          </div>
          <div className="p-6 space-y-4">
            {mockHealthData.activeSupplement.map((supplement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-purple-200 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  supplement.status === 'taken' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  {supplement.status === 'taken' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Pill className="h-4 w-4 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{supplement.name}</h3>
                  <p className="text-gray-600 text-sm">{supplement.dosage} • {supplement.time}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  supplement.status === 'taken' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {supplement.status === 'taken' ? '已服用' : '待服用'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
