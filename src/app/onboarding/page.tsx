'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Sparkles, Zap } from 'lucide-react'
import { getZodiacSign, getFiveElement, getFiveElementAdvice } from '@/lib/zodiac'

const preferenceOptions = [
  { id: '财运', label: '💰 财运', desc: '提升收入、改善财务' },
  { id: '爱情', label: '💕 爱情', desc: '桃花运、感情升温' },
  { id: '事业', label: '🎯 事业', desc: '工作顺利、升职加薪' },
  { id: '健康', label: '🧘 健康', desc: '改善睡眠、身体调养' },
  { id: '学业', label: '📚 学业', desc: '考试运、学习效率' }
]

const budgetOptions = [
  { id: '入门级', label: '入门级', range: '¥100-300', desc: '小晶体/手串入门款' },
  { id: '进阶级', label: '进阶级', range: '¥300-800', desc: '中等品质/设计款' },
  { id: '收藏级', label: '收藏级', range: '¥800+', desc: '高品质/稀有款' }
]

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [birthDate, setBirthDate] = useState('')
  const [zodiac, setZodiac] = useState('')
  const [fiveElement, setFiveElement] = useState('')
  const [fiveElementAdvice, setFiveElementAdvice] = useState('')
  const [preferences, setPreferences] = useState<string[]>([])
  const [budget, setBudget] = useState('')

  const totalSteps = 3

  // 处理生日输入，自动计算星座和五行
  const handleBirthDateChange = (date: string) => {
    setBirthDate(date)
    if (date) {
      const [, month, day] = date.split('-').map(Number)
      const sign = getZodiacSign(month, day)
      setZodiac(sign)
      
      const element = getFiveElement(date)
      setFiveElement(element.element)
      setFiveElementAdvice(getFiveElementAdvice(element.element))
    }
  }

  const togglePreference = (id: string) => {
    if (preferences.includes(id)) {
      setPreferences(preferences.filter(p => p !== id))
    } else {
      setPreferences([...preferences, id])
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return birthDate && zodiac && fiveElement
      case 2: return preferences.length > 0
      case 3: return budget
      default: return false
    }
  }

  const handleNext = () => {
    if (step === totalSteps) {
      const formData = {
        sunSign: zodiac,
        birthDate,
        birthTime: '',
        fiveElementAnswers: [fiveElement],
        preferences,
        budget,
        fiveElementAdvice
      }
      localStorage.setItem('crystalFormData', JSON.stringify(formData))
      router.push('/result')
    } else {
      setStep(step + 1)
    }
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        {/* 步骤指示器 */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= s ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < totalSteps && (
                <div className={`w-16 h-0.5 ${step > s ? 'bg-purple-600' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>

        {/* 步骤1: 生日输入 */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              输入生日，我们自动为你分析
            </h2>

            <div className="card">
              <label className="block text-gray-400 mb-4 text-lg">
                📅 你的出生日期（阳历）
              </label>
              <input 
                type="date" 
                value={birthDate}
                onChange={e => handleBirthDateChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 text-white text-lg text-center"
                style={{ fontSize: '1.5rem' }}
              />
            </div>

            {zodiac && fiveElement && (
              <div className="card bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">分析结果</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">星座</div>
                      <div className="text-2xl font-bold text-white">{zodiac}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">五行</div>
                      <div className="text-2xl font-bold text-white">{fiveElement}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-lg p-3 text-sm text-gray-300">
                    {fiveElementAdvice}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 步骤2: 诉求选择 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              你最关注哪个方面？
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {preferenceOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => togglePreference(opt.id)}
                  className={`p-5 rounded-xl text-left transition-all border flex items-center gap-4
                    ${preferences.includes(opt.id) 
                      ? 'bg-purple-600/20 border-purple-500' 
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'}`}
                >
                  <span className="text-2xl">{opt.label.split(' ')[0]}</span>
                  <div className="flex-1">
                    <div className="font-medium text-lg">{opt.label.split(' ')[1]}</div>
                    <div className="text-sm text-gray-400">{opt.desc}</div>
                  </div>
                  {preferences.includes(opt.id) && (
                    <Check className="w-6 h-6 text-purple-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 步骤3: 预算选择 */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              你的预算范围？
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {budgetOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setBudget(opt.id)}
                  className={`p-6 rounded-xl text-left transition-all border
                    ${budget === opt.id ? 'bg-purple-600/20 border-purple-500' : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-xl">{opt.label}</span>
                    <span className="text-yellow-400 font-bold text-lg">{opt.range}</span>
                  </div>
                  <p className="text-gray-400">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 底部按钮 */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full ${step === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            上一步
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium ${canProceed() ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
          >
            {step === totalSteps ? '开始分析' : '下一步'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  )
}