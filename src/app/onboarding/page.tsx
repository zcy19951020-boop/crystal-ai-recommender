'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { getZodiacSign, getEightCharacters } from '@/lib/zodiac'

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
  const [eightChars, setEightChars] = useState<any>(null)
  const [budget, setBudget] = useState('')

  // 处理生日输入
  const handleBirthDateChange = (date: string) => {
    setBirthDate(date)
    if (date) {
      const parts = date.split('-')
      const month = parseInt(parts[1])
      const day = parseInt(parts[2])
      const sign = getZodiacSign(month, day)
      setZodiac(sign)
      
      const ec = getEightCharacters(date)
      setEightChars(ec)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return birthDate && zodiac && eightChars?.day.element
      case 2: return budget
      default: return false
    }
  }

  const handleNext = () => {
    if (step === 2) {
      const formData = {
        sunSign: zodiac,
        birthDate,
        yearPillar: eightChars?.year,
        dayPillar: eightChars?.day,  // 使用日柱五行
        budget,
        preferences: []
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

        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= s ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 2 && (
                <div className={`w-16 h-0.5 ${step > s ? 'bg-purple-600' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              输入你的出生日期
            </h2>

            <div className="card">
              <label className="block text-gray-400 mb-4 text-lg">
                📅 出生日期（阳历）
              </label>
              <input 
                type="date" 
                value={birthDate}
                onChange={e => handleBirthDateChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 text-white text-lg text-center"
                style={{ fontSize: '1.5rem' }}
              />
            </div>
          </div>
        )}

        {step === 2 && (
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
            {step === 2 ? '开始分析' : '下一步'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  )
}