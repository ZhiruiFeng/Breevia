'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  MessageSquare, 
  Brain, 
  Heart, 
  Target, 
  BookOpen,
  Plus,
  Clock,
  Star,
  Send,
  Mic,
  Image,
  Settings,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react'

interface AIAgent {
  id: string
  name: string
  description: string
  type: 'life_coach' | 'knowledge_curator' | 'task_manager' | 'wellness_advisor'
  capabilities: string[]
  icon: any
  color: string
  status: 'available' | 'busy' | 'offline'
  sessionCount: number
  rating: number
}

interface ChatSession {
  id: string
  agentId: string
  title: string
  lastMessage: string
  timestamp: string
  messageCount: number
}

// AI 健康顾问配置
const aiAgents: AIAgent[] = [
  {
    id: '1',
    name: '营养师 Nutri',
    description: '专业营养师，提供个性化膳食营养分析、食谱定制和饮食指导',
    type: 'nutritionist',
    capabilities: ['膳食分析', '食谱定制', '营养计算', '体重管理', '特殊饮食'],
    icon: Target,
    color: 'from-green-500 to-emerald-600',
    status: 'available',
    sessionCount: 289,
    rating: 4.9
  },
  {
    id: '2',
    name: '药师 Pharma',
    description: '专业药师，提供科学的补剂推荐、用药指导和相互作用检测',
    type: 'pharmacist',
    capabilities: ['补剂推荐', '用药指导', '相互作用', '剂量优化', '安全评估'],
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-600',
    status: 'available',
    sessionCount: 234,
    rating: 4.8
  },
  {
    id: '3',
    name: '医师 Medic',
    description: '基于循证医学的健康评估师，提供专业的健康方案制定和疾病预防建议',
    type: 'physician',
    capabilities: ['健康评估', '疾病预防', '方案制定', '风险分析', '体检解读'],
    icon: Brain,
    color: 'from-red-500 to-pink-600',
    status: 'available',
    sessionCount: 156,
    rating: 4.7
  },
  {
    id: '4',
    name: '教练 Trainer',
    description: '运动康复和体能训练专家，为您量身定制运动方案和康复计划',
    type: 'trainer',
    capabilities: ['运动处方', '康复训练', '体能测评', '损伤预防', '运动营养'],
    icon: Heart,
    color: 'from-orange-500 to-red-600',
    status: 'busy',
    sessionCount: 178,
    rating: 4.6
  }
]

// 模拟健康咨询记录
const mockSessions: ChatSession[] = [
  {
    id: '1',
    agentId: '1',
    title: '个性化减脂食谱定制',
    lastMessage: '根据您的体质，我推荐这套低GI饮食方案...',
    timestamp: '2小时前',
    messageCount: 18
  },
  {
    id: '2',
    agentId: '2',
    title: '维生素D3补充咨询',
    lastMessage: '建议您先检测血清25(OH)D水平，再确定具体剂量...',
    timestamp: '昨天',
    messageCount: 12
  },
  {
    id: '3',
    agentId: '3',
    title: '体检报告解读',
    lastMessage: '您的血脂指标偏高，需要注意饮食调整和适量运动...',
    timestamp: '3天前',
    messageCount: 25
  },
  {
    id: '4',
    agentId: '4',
    title: '肩颈康复训练计划',
    lastMessage: '这套拉伸动作每天做2-3次，持续2周应该会有明显改善...',
    timestamp: '1周前',
    messageCount: 14
  }
]

export default function AIAgents() {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null)
  const [sessions, setSessions] = useState<ChatSession[]>(mockSessions)
  const [showChat, setShowChat] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return '在线'
      case 'busy': return '忙碌'
      case 'offline': return '离线'
      default: return '未知'
    }
  }

  const startNewSession = (agent: AIAgent) => {
    setSelectedAgent(agent)
    setShowChat(true)
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    // 这里将来会连接到实际的AI服务
    console.log('发送消息到AI:', newMessage)
    setNewMessage('')
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-hidden">
      {!showChat ? (
        // AI 助手选择界面
        <div className="p-6 overflow-y-auto h-full">
          {/* 顶部介绍 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="text-center max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 健康顾问</h1>
              <p className="text-gray-600 text-lg mb-4">
                选择您的专业健康顾问，获得个性化的养生指导和医学建议
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">隐私保护</span>
                </div>
                <p className="text-sm">所有健康数据均经过加密处理，严格遵循医疗隐私保护标准</p>
              </div>
            </div>
          </motion.div>

          {/* AI 助手卡片网格 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {aiAgents.map((agent, index) => {
              const Icon = agent.icon
              
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 card-hover"
                >
                  <div className="p-6">
                    {/* 助手头部信息 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`bg-gradient-to-r ${agent.color} p-4 rounded-xl`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                            <span className="text-sm text-gray-600">{getStatusText(agent.status)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{agent.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{agent.sessionCount} 次对话</p>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-gray-600 mb-4">{agent.description}</p>

                    {/* 能力标签 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {agent.capabilities.map(capability => (
                        <span 
                          key={capability}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => startNewSession(agent)}
                        disabled={agent.status === 'offline'}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                          agent.status === 'offline'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : `bg-gradient-to-r ${agent.color} text-white hover:opacity-90`
                        }`}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>开始对话</span>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* 最近咨询 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">最近咨询</h2>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  查看全部
                </button>
              </div>
            </div>
            <div className="p-6">
              {sessions.length > 0 ? (
                <div className="space-y-4">
                  {sessions.map(session => {
                    const agent = aiAgents.find(a => a.id === session.agentId)
                    const AgentIcon = agent?.icon || Bot
                    
                    return (
                      <div 
                        key={session.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedAgent(agent || null)
                          setShowChat(true)
                        }}
                      >
                        <div className={`bg-gradient-to-r ${agent?.color || 'from-gray-400 to-gray-500'} p-2 rounded-lg`}>
                          <AgentIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{session.title}</h3>
                          <p className="text-sm text-gray-600 truncate">{session.lastMessage}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{session.timestamp}</span>
                            <span className="text-xs text-gray-500">• {session.messageCount} 条消息</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">还没有咨询记录</p>
                  <p className="text-gray-400 text-sm">选择一个健康顾问开始您的专业咨询</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* 功能预告 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">即将推出</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Mic className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">语音咨询</p>
                <p className="text-xs text-gray-600">语音健康咨询功能</p>
              </div>
              <div className="text-center">
                <Image className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">影像分析</p>
                <p className="text-xs text-gray-600">体检报告AI解读</p>
              </div>
              <div className="text-center">
                <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">智能学习</p>
                <p className="text-xs text-gray-600">个性化健康方案</p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        // 聊天界面 (简化版本，为未来扩展预留)
        <div className="h-full flex flex-col">
          {/* 聊天头部 */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowChat(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ←
                </button>
                {selectedAgent && (
                  <>
                    <div className={`bg-gradient-to-r ${selectedAgent.color} p-2 rounded-lg`}>
                      <selectedAgent.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedAgent.name}</h3>
                      <p className="text-sm text-gray-600">{getStatusText(selectedAgent.status)}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 聊天内容区域 */}
          <div className="flex-1 p-4 bg-gray-50">
            <div className="text-center py-12">
              <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI 对话功能即将上线</h3>
              <p className="text-gray-600 mb-4">我们正在集成先进的AI模型，为您提供智能对话体验</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-blue-800 text-sm">
                  💡 预计功能：实时对话、上下文理解、个性化建议、多模态交互
                </p>
              </div>
            </div>
          </div>

          {/* 消息输入框 */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="输入您的消息... (功能开发中)"
                disabled
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage}
                disabled
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
