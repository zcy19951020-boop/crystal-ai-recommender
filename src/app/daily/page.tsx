'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, RefreshCw, Shuffle, Star } from 'lucide-react'

// 全部水晶数据
const crystals = [
  { name: '紫水晶', element: '火', meaning: '智慧与宁静', keywords: ['智慧', '学业', '冥想', '安稳'] },
  { name: '白水晶', element: '金', meaning: '净化与平衡', keywords: ['净化', '平衡', '专注', '疗愈'] },
  { name: '粉水晶', element: '火', meaning: '爱情与温柔', keywords: ['桃花', '爱情', '人缘', '招桃花'] },
  { name: '黄水晶', element: '土', meaning: '财富与自信', keywords: ['财运', '财富', '自信', '偏财'] },
  { name: '绿幽灵', element: '木', meaning: '事业与创造', keywords: ['事业', '正财', '创造', '升职'] },
  { name: '黑曜石', element: '水', meaning: '保护与辟邪', keywords: ['辟邪', '护身', '防小人', '挡煞'] },
  { name: '海蓝宝', element: '水', meaning: '沟通与勇气', keywords: ['沟通', '勇气', '表达', '领导'] },
  { name: '金发晶', element: '金', meaning: '财富与能量', keywords: ['财富', '正能量', '事业', '贵人'] },
  { name: '碧玺', element: '多', meaning: '平衡与护身', keywords: ['平衡', '护身', '健康', '多彩'] },
  { name: '玛瑙', element: '土', meaning: '稳定与平安', keywords: ['稳定', '平安', '踏实', '健康'] },
  { name: '茶晶', element: '土', meaning: '稳定与接地', keywords: ['稳定', '接地', '务实', '踏实'] },
  { name: '蓝虎眼', element: '水', meaning: '洞察与保护', keywords: ['洞察', '决策', '事业', '保护'] },
  { name: '红玛瑙', element: '火', meaning: '热情与活力', keywords: ['热情', '活力', '健康', '能量'] },
  { name: '石榴石', element: '火', meaning: '爱情与忠诚', keywords: ['爱情', '忠诚', '健康', '妇科'] },
  { name: '白幽灵', element: '金', meaning: '净化与转运', keywords: ['转运', '净化', '事业', '清除'] },
  { name: '绿发晶', element: '木', meaning: '事业与财运', keywords: ['事业', '财运', '创造', '财富'] },
  { name: '红虎眼', element: '火', meaning: '热情与自信', keywords: ['热情', '自信', '行动力', '勇气'] },
  { name: '紫牙乌', element: '火', meaning: '爱情与神秘', keywords: ['爱情', '神秘', '妇科', '健康'] },
  { name: '托帕石', element: '金', meaning: '智慧与和平', keywords: ['智慧', '和平', '沟通', '事业'] },
  { name: '青金石', element: '水', meaning: '智慧与清明', keywords: ['智慧', '考试', '清明', '创意'] },
]

function getDailyCrystal(): typeof crystals[0] {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  return crystals[dayOfYear % crystals.length]
}

export default function DailyCrystal() {
  const [dailyCrystal, setDailyCrystal] = useState<typeof crystals[0] | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setDailyCrystal(getDailyCrystal())
  }, [])

  const handleShuffle = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * crystals.length)
      setDailyCrystal(crystals[randomIndex])
      setIsAnimating(false)
    }, 500)
  }

  return (
    <main className="min-h-screen px-4 py-8 relative">
      <div className="max-w-md mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        <h1 className="text-3xl font-bold text-center mb-2">
          <Sparkles className="inline w-8 h-8 text-yellow-400 mr-2" />
          今日水晶
        </h1>
        <p className="text-gray-400 text-center mb-8">随机抽取属于你的水晶</p>

        {dailyCrystal && (
          <div className={`card bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 p-8 text-center transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="text-4xl font-bold mb-4" style={{ color: '#8B5CF6' }}>
              {dailyCrystal.name}
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="bg-gray-800/50 px-4 py-2 rounded-full text-gray-300">
                五行属{dailyCrystal.element}
              </span>
            </div>
            
            <div className="text-gray-400 mb-6">
              {dailyCrystal.meaning}
            </div>

            <div className="text-sm text-gray-500 mb-6">
              关键词：{dailyCrystal.keywords.join(' · ')}
            </div>
            
            <button 
              onClick={handleShuffle}
              disabled={isAnimating}
              className="flex items-center gap-2 mx-auto px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-all"
            >
              <Shuffle className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
              <span>换一款</span>
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            每天随机推荐一款水晶<br/>
            仅供参考娱乐
          </p>
        </div>
      </div>
    </main>
  )
}