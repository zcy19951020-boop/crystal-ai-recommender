import { NextRequest, NextResponse } from 'next/server'

const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions'
const KIMI_API_KEY = process.env.KIMI_API_KEY || 'sk-BkBlCR1UZq7oahxCTm5lNaeE2pNBESYzYi3vOpamBhJxRfHO'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sunSign, birthDate, birthTime, fiveElementAnswers, preferences, budget } = body

    const systemPrompt = `你是一位专业的水晶疗愈师，融合东方五行学与西方星座学，为用户推荐最适合的水晶。

## 你的知识背景
1. 水晶疗愈：了解各种水晶的磁场、功效、适用场景
2. 西方星座：12星座的性格特质、守护石、幸运色
3. 东方五行：金木水火土相生相克，五行喜忌分析

## 推荐原则
1. 根据用户的太阳星座分析性格特质
2. 根据用户的五行测试结果，分析五行缺失与喜忌
3. 结合用户的诉求（财运/爱情/事业/健康/学业）给出针对性推荐
4. 考虑用户的预算范围，推荐对应价位的水晶

## 输出格式
请用中文回复，包含：
1. 推荐水晶名称（1-3种）
2. 每种水晶的五行属性
3. 为什么适合该用户
4. 使用建议

## 重要提醒
- 只推荐真实存在的水晶品种
- 不要做出医疗承诺
- 语气专业但易懂`

    const userMessage = `请根据以下信息推荐水晶：

用户星座：${sunSign}
出生日期：${birthDate}
出生时间：${birthTime || '未提供'}
五行答案：${fiveElementAnswers.join('、')}
用户诉求：${preferences.join('、')}
预算范围：${budget}`

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
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Kimi API error:', error)
      return NextResponse.json({ error: 'AI服务调用失败' }, { status: 500 })
    }

    const data = await response.json()
    const recommendation = data.choices?.[0]?.message?.content || '抱歉，暂时无法生成推荐'

    return NextResponse.json({ recommendation })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}