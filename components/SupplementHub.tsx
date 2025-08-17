'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  AlertTriangle, 
  Shield, 
  Pill,
  Beaker,
  Clock,
  Target,
  TrendingUp,
  Award,
  ExternalLink,
  Plus,
  Bookmark,
  BookmarkCheck,
  Info,
  CheckCircle,
  XCircle,
  Heart,
  Brain,
  Zap,
  Bone,
  Eye,
  Users,
  Calendar,
  FlaskConical,
  Microscope
} from 'lucide-react'

interface Supplement {
  id: string
  name: string
  commonNames: string[]
  category: string
  description: string
  mainIngredients: string[]
  formType: string
  dosageForms: { form: string; strength: string }[]
  bioavailabilityInfo: {
    type: string
    absorptionRate: string
    bestWith: string
    stability?: string
  }
  recommendedDosage: {
    dailyMin: string
    dailyMax: string
    timing: string
    duration?: string
  }
  healthBenefits: string[]
  supportedConditions: string[]
  targetDemographics: string[]
  suitableConstitutions: string[]
  evidenceLevel: 'strong' | 'moderate' | 'limited' | 'insufficient'
  clinicalStudies: { title: string; year: number; url?: string }[]
  sideEffects: string[]
  contraindications: string[]
  drugInteractions: string[]
  qualityCertifications: string[]
  priceRange: { min: number; max: number; currency: string }
  rating: number
  reviewCount: number
  isBookmarked: boolean
  userPlan?: {
    dosage: string
    frequency: string
    startDate: string
    status: 'active' | 'planned' | 'completed'
  }
}

// 模拟补剂数据
const mockSupplements: Supplement[] = [
  {
    id: '1',
    name: '还原型辅酶Q10',
    commonNames: ['泛醌醇', 'Ubiquinol', 'CoQ10'],
    category: 'antioxidant',
    description: '活性形式的辅酶Q10，相比氧化型具有更好的生物利用度和抗氧化效果，是细胞能量产生的关键辅酶',
    mainIngredients: ['Ubiquinol'],
    formType: 'soft_capsule',
    dosageForms: [
      { form: '软胶囊', strength: '100mg' },
      { form: '软胶囊', strength: '200mg' }
    ],
    bioavailabilityInfo: {
      type: '还原型',
      absorptionRate: '比氧化型高8倍',
      bestWith: '脂肪类食物',
      stability: '对光热敏感，需避光保存'
    },
    recommendedDosage: {
      dailyMin: '100mg',
      dailyMax: '300mg',
      timing: '随餐服用',
      duration: '可长期服用'
    },
    healthBenefits: ['心血管保护', '抗氧化', '提高能量代谢', '延缓衰老', '改善疲劳'],
    supportedConditions: ['心脏病', '高血压', '疲劳综合征', '老年痴呆预防'],
    targetDemographics: ['中老年人', '心血管高危人群', '运动员', '慢性疲劳者'],
    suitableConstitutions: ['qi_deficiency', 'yang_deficiency'],
    evidenceLevel: 'strong',
    clinicalStudies: [
      { title: 'CoQ10对心力衰竭患者的疗效评估', year: 2023, url: 'https://example.com/study1' },
      { title: '还原型辅酶Q10的生物利用度研究', year: 2022 }
    ],
    sideEffects: ['偶有胃肠不适', '极少数人群可能出现皮疹'],
    contraindications: ['孕妇哺乳期', '正在服用华法林'],
    drugInteractions: ['华法林', '降血压药物'],
    qualityCertifications: ['GMP认证', 'NSF认证', '有机认证'],
    priceRange: { min: 150, max: 400, currency: 'CNY' },
    rating: 4.7,
    reviewCount: 156,
    isBookmarked: false,
    userPlan: {
      dosage: '100mg',
      frequency: 'daily',
      startDate: '2024-01-01',
      status: 'active'
    }
  },
  {
    id: '2',
    name: '维生素D3',
    commonNames: ['胆钙化醇', 'Cholecalciferol', 'VD3'],
    category: 'vitamin',
    description: '天然形式的维生素D，相比D2具有更好的生物活性，是维持骨骼健康和免疫功能的重要营养素',
    mainIngredients: ['Cholecalciferol'],
    formType: 'soft_capsule',
    dosageForms: [
      { form: '软胶囊', strength: '1000IU' },
      { form: '软胶囊', strength: '2000IU' },
      { form: '滴剂', strength: '400IU/滴' }
    ],
    bioavailabilityInfo: {
      type: 'D3 vs D2',
      absorptionRate: 'D3比D2效果好2-3倍',
      bestWith: '脂肪类食物',
      stability: '稳定性好，避光保存'
    },
    recommendedDosage: {
      dailyMin: '1000IU',
      dailyMax: '4000IU',
      timing: '随餐服用',
      duration: '需要血清25(OH)D检测指导'
    },
    healthBenefits: ['骨骼健康', '免疫调节', '情绪改善', '肌肉功能', '心血管保护'],
    supportedConditions: ['骨质疏松', '免疫力低下', '季节性抑郁', '肌肉无力'],
    targetDemographics: ['所有年龄段', '缺乏阳光照射人群', '老年人', '免疫力低下者'],
    suitableConstitutions: ['yang_deficiency', 'qi_deficiency'],
    evidenceLevel: 'strong',
    clinicalStudies: [
      { title: '维生素D3对免疫功能的影响', year: 2023 },
      { title: 'VD3与骨质疏松预防的大型队列研究', year: 2022 }
    ],
    sideEffects: ['过量可能导致高钙血症', '肾结石风险'],
    contraindications: ['高钙血症', '严重肾功能不全'],
    drugInteractions: ['噻嗪类利尿剂', '地高辛'],
    qualityCertifications: ['USP认证', 'GMP认证'],
    priceRange: { min: 50, max: 150, currency: 'CNY' },
    rating: 4.5,
    reviewCount: 289,
    isBookmarked: true
  },
  {
    id: '3',
    name: 'Omega-3鱼油',
    commonNames: ['深海鱼油', 'EPA+DHA', '欧米伽3'],
    category: 'omega',
    description: '富含EPA和DHA的深海鱼油，对心血管、大脑和眼部健康有重要作用，选择分子蒸馏提纯的产品效果更好',
    mainIngredients: ['EPA', 'DHA'],
    formType: 'soft_capsule',
    dosageForms: [
      { form: '软胶囊', strength: '1000mg (EPA 500mg + DHA 300mg)' },
      { form: '液体', strength: '15ml (含EPA+DHA 2000mg)' }
    ],
    bioavailabilityInfo: {
      type: '分子蒸馏',
      absorptionRate: '空腹服用吸收更好',
      bestWith: '可空腹或随餐',
      stability: '需冷藏保存'
    },
    recommendedDosage: {
      dailyMin: '1000mg',
      dailyMax: '3000mg',
      timing: '随餐或空腹',
      duration: '需要定期检测Omega-3指数'
    },
    healthBenefits: ['心血管保护', '大脑健康', '抗炎', '眼部健康', '情绪稳定'],
    supportedConditions: ['高血脂', '抑郁症', '认知衰退', '干眼症', '关节炎'],
    targetDemographics: ['心血管高危人群', '脑力工作者', '老年人', '孕产妇'],
    suitableConstitutions: ['blood_stasis', 'yin_deficiency'],
    evidenceLevel: 'strong',
    clinicalStudies: [
      { title: 'Omega-3对心血管疾病预防的荟萃分析', year: 2023 },
      { title: 'EPA+DHA对认知功能的保护作用', year: 2022 }
    ],
    sideEffects: ['鱼腥味打嗝', '偶有恶心', '大剂量可能影响凝血'],
    contraindications: ['鱼类过敏', '严重出血倾向'],
    drugInteractions: ['抗凝血药物', '阿司匹林'],
    qualityCertifications: ['IFOS五星认证', 'Friend of the Sea'],
    priceRange: { min: 100, max: 300, currency: 'CNY' },
    rating: 4.6,
    reviewCount: 234,
    isBookmarked: false
  },
  {
    id: '4',
    name: '益生菌复合配方',
    commonNames: ['多株益生菌', 'Probiotics', '肠道菌群'],
    category: 'probiotic',
    description: '含有多种有益菌株的复合配方，有助于维护肠道菌群平衡，改善消化功能和免疫力',
    mainIngredients: ['双歧杆菌', '乳酸菌', '嗜酸乳杆菌'],
    formType: 'capsule',
    dosageForms: [
      { form: '胶囊', strength: '100亿CFU/粒' },
      { form: '粉剂', strength: '50亿CFU/包' }
    ],
    bioavailabilityInfo: {
      type: '活菌制剂',
      absorptionRate: '需要活菌才有效',
      bestWith: '空腹或餐前30分钟',
      stability: '需冷藏保存，避免高温'
    },
    recommendedDosage: {
      dailyMin: '100亿CFU',
      dailyMax: '500亿CFU',
      timing: '空腹或餐前',
      duration: '建议连续服用2-3个月'
    },
    healthBenefits: ['改善消化', '增强免疫力', '缓解过敏', '情绪调节', '营养吸收'],
    supportedConditions: ['肠易激综合征', '便秘', '腹泻', '过敏性疾病', '免疫力低下'],
    targetDemographics: ['肠道问题人群', '经常服用抗生素者', '过敏体质', '免疫力低下者'],
    suitableConstitutions: ['phlegm_dampness', 'qi_deficiency'],
    evidenceLevel: 'moderate',
    clinicalStudies: [
      { title: '益生菌对肠易激综合征的疗效研究', year: 2023 },
      { title: '多株益生菌对免疫功能的影响', year: 2022 }
    ],
    sideEffects: ['初期可能有轻微腹胀', '个别人群可能腹泻'],
    contraindications: ['严重免疫缺陷', '急性胰腺炎'],
    drugInteractions: ['抗生素', '免疫抑制剂'],
    qualityCertifications: ['GMP认证', '活菌数保证'],
    priceRange: { min: 80, max: 250, currency: 'CNY' },
    rating: 4.3,
    reviewCount: 123,
    isBookmarked: false
  }
]

const categoryIcons = {
  vitamin: { icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  mineral: { icon: Bone, color: 'text-gray-600', bg: 'bg-gray-50' },
  antioxidant: { icon: Shield, color: 'text-green-500', bg: 'bg-green-50' },
  omega: { icon: Brain, color: 'text-blue-500', bg: 'bg-blue-50' },
  probiotic: { icon: Target, color: 'text-purple-500', bg: 'bg-purple-50' },
  herbal: { icon: Beaker, color: 'text-green-600', bg: 'bg-green-50' },
  amino_acid: { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  enzyme: { icon: FlaskConical, color: 'text-indigo-500', bg: 'bg-indigo-50' }
}

const evidenceLevelColors = {
  strong: 'text-green-700 bg-green-100 border-green-200',
  moderate: 'text-blue-700 bg-blue-100 border-blue-200',
  limited: 'text-yellow-700 bg-yellow-100 border-yellow-200',
  insufficient: 'text-gray-700 bg-gray-100 border-gray-200'
}

const evidenceLevelNames = {
  strong: '强证据',
  moderate: '中等证据',
  limited: '有限证据',
  insufficient: '证据不足'
}

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

export default function SupplementHub() {
  const [supplements, setSupplements] = useState<Supplement[]>(mockSupplements)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedEvidence, setSelectedEvidence] = useState<string>('all')
  const [selectedConstitution, setSelectedConstitution] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')
  const [showOnlyMyPlan, setShowOnlyMyPlan] = useState(false)

  const filteredSupplements = supplements
    .filter(supplement => {
      const matchesSearch = supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplement.commonNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           supplement.healthBenefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || supplement.category === selectedCategory
      const matchesEvidence = selectedEvidence === 'all' || supplement.evidenceLevel === selectedEvidence
      const matchesConstitution = selectedConstitution === 'all' || 
                                 supplement.suitableConstitutions.includes(selectedConstitution)
      const matchesMyPlan = !showOnlyMyPlan || supplement.userPlan

      return matchesSearch && matchesCategory && matchesEvidence && matchesConstitution && matchesMyPlan
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating
        case 'reviews': return b.reviewCount - a.reviewCount
        case 'price': return a.priceRange.min - b.priceRange.min
        case 'evidence': 
          const evidenceOrder = { strong: 4, moderate: 3, limited: 2, insufficient: 1 }
          return evidenceOrder[b.evidenceLevel] - evidenceOrder[a.evidenceLevel]
        default: return 0
      }
    })

  const toggleBookmark = (supplementId: string) => {
    setSupplements(supplements =>
      supplements.map(supplement =>
        supplement.id === supplementId ? { ...supplement, isBookmarked: !supplement.isBookmarked } : supplement
      )
    )
  }

  const getCategoryIcon = (category: string) => {
    const categoryInfo = categoryIcons[category as keyof typeof categoryIcons] || categoryIcons.vitamin
    const IconComponent = categoryInfo.icon
    return { IconComponent, ...categoryInfo }
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-y-auto">
      {/* 顶部标题和操作 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">智能补剂</h1>
            <p className="text-gray-600 mt-1">科学的补剂推荐，基于循证医学和个人体质</p>
          </div>
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyMyPlan}
                onChange={(e) => setShowOnlyMyPlan(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">仅显示我的计划</span>
            </label>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>定制方案</span>
            </button>
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
                placeholder="搜索补剂名称、功效、成分..."
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
              <option value="vitamin">维生素</option>
              <option value="mineral">矿物质</option>
              <option value="antioxidant">抗氧化剂</option>
              <option value="omega">Omega脂肪酸</option>
              <option value="probiotic">益生菌</option>
              <option value="herbal">草本植物</option>
              <option value="amino_acid">氨基酸</option>
              <option value="enzyme">酶类</option>
            </select>

            {/* 证据等级筛选 */}
            <select
              value={selectedEvidence}
              onChange={(e) => setSelectedEvidence(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有证据等级</option>
              <option value="strong">强证据</option>
              <option value="moderate">中等证据</option>
              <option value="limited">有限证据</option>
              <option value="insufficient">证据不足</option>
            </select>

            {/* 体质筛选 */}
            <select
              value={selectedConstitution}
              onChange={(e) => setSelectedConstitution(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有体质</option>
              {Object.entries(constitutionNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>

            {/* 排序 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="rating">评分最高</option>
              <option value="reviews">评论最多</option>
              <option value="evidence">证据最强</option>
              <option value="price">价格最低</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* 补剂列表 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {filteredSupplements.map((supplement, index) => {
          const { IconComponent, color, bg } = getCategoryIcon(supplement.category)
          
          return (
            <motion.div
              key={supplement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                {/* 补剂头部信息 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-xl ${bg}`}>
                      <IconComponent className={`h-6 w-6 ${color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{supplement.name}</h3>
                        {supplement.userPlan && (
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            supplement.userPlan.status === 'active' ? 'bg-green-100 text-green-700' :
                            supplement.userPlan.status === 'planned' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {supplement.userPlan.status === 'active' ? '正在服用' :
                             supplement.userPlan.status === 'planned' ? '计划服用' : '已完成'}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {supplement.commonNames.slice(0, 3).map(name => (
                          <span key={name} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {name}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{supplement.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleBookmark(supplement.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        supplement.isBookmarked 
                          ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                          : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                      }`}
                    >
                      {supplement.isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* 补剂详细信息网格 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* 基本信息 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Info className="h-4 w-4" />
                      <span>基本信息</span>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">剂型:</span>
                        <span className="text-gray-900 text-sm font-medium">{supplement.formType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">价格范围:</span>
                        <span className="text-gray-900 text-sm font-medium">
                          ¥{supplement.priceRange.min}-{supplement.priceRange.max}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">证据等级:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${evidenceLevelColors[supplement.evidenceLevel]}`}>
                          {evidenceLevelNames[supplement.evidenceLevel]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 生物利用度信息 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Microscope className="h-4 w-4" />
                      <span>吸收特性</span>
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-600 text-xs">类型:</span>
                        <p className="text-gray-900 text-sm font-medium">{supplement.bioavailabilityInfo.type}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs">吸收率:</span>
                        <p className="text-gray-900 text-sm">{supplement.bioavailabilityInfo.absorptionRate}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs">最佳服用方式:</span>
                        <p className="text-gray-900 text-sm">{supplement.bioavailabilityInfo.bestWith}</p>
                      </div>
                    </div>
                  </div>

                  {/* 推荐剂量 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Pill className="h-4 w-4" />
                      <span>推荐剂量</span>
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-600 text-xs">日剂量范围:</span>
                        <p className="text-gray-900 text-sm font-medium">
                          {supplement.recommendedDosage.dailyMin} - {supplement.recommendedDosage.dailyMax}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs">服用时间:</span>
                        <p className="text-gray-900 text-sm">{supplement.recommendedDosage.timing}</p>
                      </div>
                      {supplement.recommendedDosage.duration && (
                        <div>
                          <span className="text-gray-600 text-xs">服用周期:</span>
                          <p className="text-gray-900 text-sm">{supplement.recommendedDosage.duration}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 健康益处 */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">主要功效</h4>
                  <div className="flex flex-wrap gap-2">
                    {supplement.healthBenefits.map(benefit => (
                      <span key={benefit} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 适用体质 */}
                {supplement.suitableConstitutions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">适用体质</h4>
                    <div className="flex flex-wrap gap-2">
                      {supplement.suitableConstitutions.map(constitution => (
                        <span key={constitution} className={`px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r ${constitutionColors[constitution as keyof typeof constitutionColors]}`}>
                          {constitutionNames[constitution as keyof typeof constitutionNames]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 安全性信息 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {supplement.sideEffects.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span>可能副作用</span>
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {supplement.sideEffects.map((effect, idx) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-yellow-600">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {supplement.contraindications.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span>禁忌人群</span>
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {supplement.contraindications.map((contraindication, idx) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-red-600">•</span>
                            <span>{contraindication}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 评分、研究和操作 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-gray-900">{supplement.rating}</span>
                      <span className="text-gray-600 text-sm">({supplement.reviewCount} 评论)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <FlaskConical className="h-4 w-4" />
                      <span className="text-sm">{supplement.clinicalStudies.length} 项研究</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {supplement.qualityCertifications.slice(0, 2).map(cert => (
                        <span key={cert} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                      查看详情
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1">
                      <Plus className="h-4 w-4" />
                      <span>添加到计划</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {filteredSupplements.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">没有找到符合条件的补剂</p>
          <p className="text-gray-400 text-sm mt-2">尝试调整搜索条件或筛选器</p>
        </motion.div>
      )}
    </div>
  )
}
