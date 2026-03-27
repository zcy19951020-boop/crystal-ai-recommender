'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Star, Shuffle, RefreshCw } from 'lucide-react'

// 每日水晶数据
const crystals = [
  { name: '紫水晶', element: '火', meaning: '智慧与宁静', color: '#9B59B6' },
  { name: '白水晶', element: '金', meaning: '净化与平衡', color: '#F5F5F5' },
  { name: '粉水晶', element: '火', meaning: '爱情与温柔', color: '#FFB6C1' },
  { name: '黄水晶', element: '土', meaning: '财富与自信', color: '#F1C40F' },
  { name: '绿幽灵', element: '木', meaning: '事业与创造', color: '#2ECC71' },
  { name: '黑曜石', element: '水', meaning: '保护与辟邪', color: '#34495E' },
  { name: '海蓝宝', element: '水', meaning: '沟通与勇气', color: '#3498DB' },
  { name: '金发晶', element: '金', meaning: '财富与能量', color: '#F39C12' },
  { name: '碧玺', element: '多', meaning: '平衡与护身', color: '#E74C3C' },
  { name: '玛瑙', element: '土', meaning: '稳定与平安', color: '#8B4513' },
  { name: '茶晶', element: '土', meaning: '稳定与接地', color: '#6E2C00' },
  { name: '蓝虎眼', element: '水', meaning: '洞察与保护', color: '#4A90D9' },
]

function getDailyCrystal(): typeof crystals[0] {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  const index = dayOfYear % crystals.length
  return crystals[index]
}

export default function Home() {
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
    <main className="min-h-screen flex flex-col items-center px-4 py-8 relative overflow-hidden">
      {/* 装饰星星 */}
      <div className="absolute top-20 left-10 text-yellow-400 animate-pulse">
        <Star size={24} fill="currentColor" />
      </div>
      <div className="absolute top-40 right-20 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }}>
        <Star size={16} fill="currentColor" />
      </div>
      <div className="absolute bottom-40 left-20 text-yellow-300 animate-pulse" style={{ animationDelay: '2s' }}>
        <Star size={20} fill="currentColor" />
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm">AI 智能推荐</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">水晶</span>
          <span className="text-white">推荐</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-md mx-auto">
          融合星座、五行与AI智能
          <br />
          为你找到最适合的水晶
        </p>
      </div>

      {/* 每日水晶卡片 */}
      {dailyCrystal && (
        <div className="w-full max-w-md mb-8">
          <div className="card bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="text-center relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">今日水晶</span>
              </div>
              
              <div 
                className={`text-4xl font-bold mb-2 transition-all duration-500 ${isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
                style={{ color: dailyCrystal.color }}
              >
                {dailyCrystal.name}
              </div>
              
              <div className="flex items-center justify-center gap-4 text-gray-400 text-sm mb-4">
                <span className="bg-gray-800/50 px-3 py-1 rounded-full">五行: {dailyCrystal.element}</span>
                <span className="bg-gray-800/50 px-3 py-1 rounded-full">寓意: {dailyCrystal.meaning}</span>
              </div>
              
              <button 
                onClick={handleShuffle}
                disabled={isAnimating}
                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
                <span className="text-sm">换一款</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Link 
        href="/onboarding"
        className="btn-primary text-lg flex items-center gap-2 group mb-12"
      >
        开始测试
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* 功能特点 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <div className="card text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Star className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-semibold mb-2">星座分析</h3>
          <p className="text-gray-400 text-sm">输入生日自动判定星座+五行</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="font-semibold mb-2">AI 推荐</h3>
          <p className="text-gray-400 text-sm">智能匹配最适合你的水晶</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Shuffle className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="font-semibold mb-2">每日惊喜</h3>
          <p className="text-gray-400 text-sm">每天随机推荐一款水晶</p>
        </div>
      </div>

      <p className="mt-12 text-gray-500 text-sm">
        完全免费 · 无需注册 · 立即体验
      </p>
    </main>
  )
}