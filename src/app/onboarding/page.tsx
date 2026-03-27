'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const zodiacSigns = [
  '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
  '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
]

const fiveElementQuestions = [
  { question: '你平时更喜欢哪种颜色？', options: [
    { text: '红色/橙色', element: '火' },
    { text: '蓝色/黑色', element: '水' },
    { text: '绿色/青色', element: '木' },
    { text: '白色/金色', element: '金' },
    { text: '黄色/棕色', element: '土' }
  ]},
  { question: '最近最困扰你的是？', options: [
    { text: '精力不足/容易疲惫', element: '火弱' },
    { text: '情绪波动/失眠', element: '水弱' },
    { text: '决策困难/没有方向', element: '木弱' },
    { text: '收入不稳/破财', element: '金弱' },
    { text: '肠胃不好/皮肤问题', element: '土弱' }
  ]},
  { question: '你的性格更偏向？', options: [
    { text: '急躁/热情', element: '火旺' },
    { text: '内向/敏感', element: '水旺' },
    { text: '随和/被动', element: '木旺' },
    { text: '理性/挑剔', element: '金旺' },
    { text: '稳重/保守', element: '土旺' }
  ]}
]

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
  const [formData, setFormData] = useState({
    sunSign: '',
    birthDate: '',
    birthTime: '',
    fiveElementAnswers: [] as string[],
    preferences: [] as string[],
    budget: ''
  })

  const totalSteps = 4

  const updateForm = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleFiveElementAnswer = (qIndex: number, element: string) => {
    const newAnswers = [...formData.fiveElementAnswers]
    newAnswers[qIndex] = element
    updateForm('fiveElementAnswers', newAnswers)
  }

  const togglePreference = (id: string) => {
    const current = formData.preferences
    if (current.includes(id)) {
      updateForm('preferences', current.filter(p => p !== id))
    } else {
      updateForm('preferences', [...current, id])
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.sunSign && formData.birthDate
      case 2: return formData.fiveElementAnswers.length === 3
      case 3: return formData.preferences.length > 0
      case 4: return formData.budget
      default: return false
    }
  }

  const handleNext = () => {
    if (step === totalSteps) {
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
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= s ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < totalSteps && (
                <div className={`w-12 h-0.5 ${step > s ? 'bg-purple-600' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center mb-8">
          {step === 1 && '选择你的星座'}
          {step === 2 && '五行测试'}
          {step === 3 && '选择你的诉求'}
          {step === 4 && '选择预算范围'}
        </h2>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">出生日期 *</label>
              <input 
                type="date" 
                value={formData.birthDate}
                onChange={e => updateForm('birthDate', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">太阳星座 *</label>
              <div className="grid grid-cols-4 gap-3">
                {zodiacSigns.map(sign => (
                  <button
                    key={sign}
                    onClick={() => updateForm('sunSign', sign)}
                    className={`py-3 px-2 rounded-lg text-sm font-medium transition-all
                      ${formData.sunSign === sign ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    {sign}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">出生时间（可选）</label>
              <input 
                type="time" 
                value={formData.birthTime}
                onChange={e => updateForm('birthTime', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            {fiveElementQuestions.map((q, qIndex) => (
              <div key={qIndex}>
                <p className="font-medium mb-4">{qIndex + 1}. {q.question}</p>
                <div className="grid grid-cols-5 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleFiveElementAnswer(qIndex, opt.element)}
                      className={`py-3 px-2 rounded-lg text-sm transition-all
                        ${formData.fiveElementAnswers[qIndex] === opt.element ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 gap-4">
            {preferenceOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => togglePreference(opt.id)}
                className={`p-4 rounded-xl text-left transition-all border
                  ${formData.preferences.includes(opt.id) ? 'bg-purple-600/20 border-purple-500' : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{opt.label}</span>
                  {formData.preferences.includes(opt.id) && <Check className="w-5 h-5 text-purple-400" />}
                </div>
                <p className="text-sm text-gray-400 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="grid grid-cols-1 gap-4">
            {budgetOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => updateForm('budget', opt.id)}
                className={`p-6 rounded-xl text-left transition-all border
                  ${formData.budget === opt.id ? 'bg-purple-600/20 border-purple-500' : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-lg">{opt.label}</span>
                  <span className="text-yellow-400 font-bold">{opt.range}</span>
                </div>
                <p className="text-gray-400">{opt.desc}</p>
              </button>
            ))}
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
            {step === totalSteps ? '开始分析' : '下一步'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  )
}