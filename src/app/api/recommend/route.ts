import { NextRequest, NextResponse } from 'next/server'

const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions'
const KIMI_API_KEY = process.env.KIMI_API_KEY || 'sk-BkBlCR1UZq7oahxCTm5lNaeE2pNBESYzYi3vOpamBhJxRfHO'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  let body;
  
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '无效的请求' }, { status: 400 })
  }

  const { sunSign, birthDate, birthTime, fiveElementAnswers, preferences, budget } = body

  if (!sunSign || !preferences || preferences.length === 0) {
    return NextResponse.json({ error: '请填写完整信息' }, { status: 400 })
  }

  const systemPrompt = `你是一位专业的水晶疗愈师，融合东方五行学与西方星座学，为用户推荐最适合的水晶。

## 输出格式
请用中文回复，包含：
1. 推荐水晶名称（1-3种）
2. 每种水晶的五行属性
3. 为什么适合该用户
4. 使用建议

注意：只推荐真实存在的水晶品种，不要做出医疗承诺。`

  const userMessage = `用户星座：${sunSign}
出生日期：${birthDate}
出生时间：${birthTime || '未提供'}
五行答案：${(fiveElementAnswers || []).join('、')}
用户诉求：${preferences.join('、')}
预算范围：${budget || '不限'}`

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25000)

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Kimi API error:', response.status, errorText)
      return NextResponse.json({ 
        error: `AI服务错误: ${response.status}`,
        details: errorText
      }, { status: 500 })
    }

    const data = await response.json()
    
    if (data.error) {
      console.error('Kimi API error:', data.error)
      return NextResponse.json({ error: data.error.message || 'AI服务调用失败' }, { status: 500 })
    }

    const recommendation = data.choices?.[0]?.message?.content || '抱歉，暂时无法生成推荐'

    return NextResponse.json({ recommendation })

  } catch (error: any) {
    console.error('API error:', error.message || error)
    return NextResponse.json({ 
      error: error.name === 'AbortError' ? '请求超时，请重试' : '服务器错误' 
    }, { status: 500 })
  }
}