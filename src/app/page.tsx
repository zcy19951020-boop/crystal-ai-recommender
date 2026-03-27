'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Star } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-20 left-10 text-yellow-400 animate-pulse">
        <Star size={24} fill="currentColor" />
      </div>
      <div className="absolute top-40 right-20 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }}>
        <Star size={16} fill="currentColor" />
      </div>
      <div className="absolute bottom-40 left-20 text-yellow-300 animate-pulse" style={{ animationDelay: '2s' }}>
        <Star size={20} fill="currentColor" />
      </div>
      
      <div className="text-center mb-12">
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

      <Link 
        href="/onboarding"
        className="btn-primary text-lg flex items-center gap-2 group"
      >
        开始测试
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
        <div className="card text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Star className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-semibold mb-2">星座分析</h3>
          <p className="text-gray-400 text-sm">太阳、上升、月亮星座综合分析</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="font-semibold mb-2">五行测试</h3>
          <p className="text-gray-400 text-sm">通过问卷推算五行喜忌</p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="font-semibold mb-2">AI 推荐</h3>
          <p className="text-gray-400 text-sm">智能匹配最适合你的水晶</p>
        </div>
      </div>

      <p className="mt-16 text-gray-500 text-sm">
        完全免费 · 无需注册 · 立即体验
      </p>
    </main>
  )
}