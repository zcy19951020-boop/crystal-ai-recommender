'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, Sparkles, Loader2 } from 'lucide-react'

export default function Result() {
  const [loading, setLoading] = useState(true)
  const [recommendation, setRecommendation] = useState('')
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('crystalFormData')
    if (data) {
      const parsed = JSON.parse(data)
      setFormData(parsed)
      fetchRecommendation(parsed)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchRecommendation = async (data: any) => {
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      setRecommendation(result.recommendation || '抱歉，暂时无法生成推荐')
    } catch (error) {
      setRecommendation('生成推荐时出错，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setLoading(true)
    if (formData) fetchRecommendation(formData)
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/onboarding" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          重新测试
        </Link>

        <h1 className="text-3xl font-bold text-center mb-4">
          <span className="gradient-text">AI</span> 推荐结果
        </h1>

        {formData && (
          <div className="text-center text-gray-400 mb-8">
            <p>{formData.sunSign} · {formData.preferences.join('、')} · {formData.budget}</p>
          </div>
        )}

        {loading ? (
          <div className="card text-center py-16">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-purple-500 animate-spin" />
            <p className="text-xl font-medium mb-2">AI 正在分析中...</p>
            <p className="text-gray-400">结合你的星座、五行与诉求为你匹配最适合的水晶</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="font-medium text-yellow-400">推荐详情</span>
              </div>
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                {recommendation}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleRetry} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gray-800 hover:bg-gray-700">
                <RefreshCw className="w-4 h-4" />
                重新生成
              </button>
              <Link href="/" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-purple-600 hover:bg-purple-700">
                返回首页
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}