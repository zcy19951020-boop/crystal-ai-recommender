import { NextRequest, NextResponse } from 'next/server'

const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions'
const KIMI_API_KEY = process.env.KIMI_API_KEY || 'sk-BkBlCR1UZq7oahxCTm5lNaeE2pNBESYzYi3vOpamBhJxRfHO'

// 水晶数据库（基于实际库存）
const crystalDB = [
  { name: '紫水晶', element: '火', keywords: ['智慧', '学业', '冥想', '安稳'], prices: { '入门级': '¥50-150', '进阶级': '¥200-500', '收藏级': '¥800+' } },
  { name: '白水晶', element: '金', keywords: ['净化', '平衡', '专注', '疗愈'], prices: { '入门级': '¥30-100', '进阶级': '¥150-400', '收藏级': '¥600+' } },
  { name: '粉水晶', element: '火', keywords: ['桃花', '爱情', '人缘', '招桃花'], prices: { '入门级': '¥50-150', '进阶级': '¥200-600', '收藏级': '¥800+' } },
  { name: '黄水晶', element: '土', keywords: ['财运', '财富', '自信', '偏财'], prices: { '入门级': '¥80-200', '进阶级': '¥300-600', '收藏级': '¥800+' } },
  { name: '绿幽灵', element: '木', keywords: ['事业', '正财', '创造', '升职'], prices: { '入门级': '¥100-250', '进阶级': '¥400-800', '收藏级': '¥1000+' } },
  { name: '黑曜石', element: '水', keywords: ['辟邪', '护身', '防小人', '挡煞'], prices: { '入门级': '¥30-80', '进阶级': '¥150-350', '收藏级': '¥500+' } },
  { name: '海蓝宝', element: '水', keywords: ['沟通', '勇气', '表达', '领导'], prices: { '入门级': '¥80-180', '进阶级': '¥300-600', '收藏级': '¥800+' } },
  { name: '金发晶', element: '金', keywords: ['财富', '正能量', '事业', '贵人'], prices: { '入门级': '¥100-250', '进阶级': '¥400-700', '收藏级': '¥900+' } },
  { name: '碧玺', element: '多', keywords: ['平衡', '护身', '健康', '多彩'], prices: { '入门级': '¥150-300', '进阶级': '¥500-800', '收藏级': '¥1200+' } },
  { name: '玛瑙', element: '土', keywords: ['稳定', '平安', '踏实', '健康'], prices: { '入门级': '¥20-80', '进阶级': '¥150-350', '收藏级': '¥500+' } },
  { name: '茶晶', element: '土', keywords: ['稳定', '接地', '务实', '踏实'], prices: { '入门级': '¥30-100', '进阶级': '¥150-400', '收藏级': '¥600+' } },
  { name: '蓝虎眼', element: '水', keywords: ['洞察', '决策', '事业', '保护'], prices: { '入门级': '¥80-180', '进阶级': '¥300-550', '收藏级': '¥700+' } },
  { name: '红玛瑙', element: '火', keywords: ['热情', '活力', '健康', '能量'], prices: { '入门级': '¥30-100', '进阶级': '¥150-400', '收藏级': '¥600+' } },
  { name: '石榴石', element: '火', keywords: ['爱情', '忠诚', '健康', '妇科'], prices: { '入门级': '¥80-180', '进阶级': '¥300-600', '收藏级': '¥800+' } },
  { name: '白幽灵', element: '金', keywords: ['转运', '净化', '事业', '清除'], prices: { '入门级': '¥80-200', '进阶级': '¥350-650', '收藏级': '¥800+' } },
  { name: '绿发晶', element: '木', keywords: ['事业', '财运', '创造', '财富'], prices: { '入门级': '¥100-250', '进阶级': '¥400-750', '收藏级': '¥1000+' } },
  { name: '红虎眼', element: '火', keywords: ['热情', '自信', '行动力', '勇气'], prices: { '入门级': '¥80-180', '进阶级': '¥300-550', '收藏级': '¥700+' } },
  { name: '紫牙乌', element: '火', keywords: ['爱情', '神秘', '妇科', '健康'], prices: { '入门级': '¥100-250', '进阶级': '¥400-700', '收藏级': '¥900+' } },
]

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  let body;
  
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '无效的请求' }, { status: 400 })
  }

  const { sunSign, birthDate, yearPillar, dayPillar, budget } = body

  if (!birthDate || !dayPillar?.element) {
    return NextResponse.json({ error: '请填写完整信息' }, { status: 400 })
  }

  // 使用日柱五行进行推荐
  const element = dayPillar.element

  const elementMap: { [key: string]: string[] } = {
    '木': ['绿幽灵', '绿发晶', '海蓝宝', '青金石'],
    '火': ['紫水晶', '粉水晶', '红玛瑙', '石榴石', '红虎眼', '紫牙乌'],
    '土': ['黄水晶', '茶晶', '玛瑙', '金发晶', '钛晶'],
    '金': ['白水晶', '白幽灵', '金发晶', '钛晶', '托帕石'],
    '水': ['黑曜石', '海蓝宝', '蓝虎眼', '托帕石', '青金石']
  }

  const recommendedCrystals = elementMap[element] || ['白水晶', '紫水晶']

  const crystalList = crystalDB
    .filter(c => recommendedCrystals.includes(c.name))
    .map(c => `${c.name}（${c.element}行，${c.keywords.join('、')}）`)
    .join('、 ')

  const systemPrompt = `你是一位专业的水晶疗愈师，融合东方五行学与西方星座学，为用户推荐最适合的水晶。

## 用户信息
- 太阳星座：${sunSign || '未知'}
- 出生日期：${birthDate}
- 八字年柱：${yearPillar?.stem || ''}${yearPillar?.branch || ''}（${yearPillar?.element || '未知'}）
- 八字日柱：${dayPillar?.stem || ''}${dayPillar?.branch || ''}（**五行属${dayPillar?.element || '未知'}**，这是最重要的判断依据）
- 预算范围：${budget || '不限'}

## 你拥有以下水晶库存（按五行分类）：
${crystalList}

## 推荐规则（重要！）
1. **主要依据日柱五行**来判断用户适合的水晶，这是最重要的判断标准
2. 五行相生相克：木生火、火生土、土生金、金生水、水生木
3. 根据预算推荐合适价位的水晶
4. 结合星座特质给出建议

## 输出格式
请用中文回复，包含：
1. 推荐水晶名称（1-3种）
2. 每种水晶的五行属性和美好寓意
3. 为什么适合该用户（重点结合日柱五行）
4. 参考价格区间
5. 使用建议

注意：只推荐真实存在的水晶。`

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
          { role: 'user', content: '请根据我的信息推荐水晶' }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return NextResponse.json({ error: `AI服务错误: ${response.status}` }, { status: 500 })
    }

    const data = await response.json()
    const recommendation = data.choices?.[0]?.message?.content || '抱歉，暂时无法生成推荐'

    return NextResponse.json({ recommendation })

  } catch (error: any) {
    return NextResponse.json({ 
      error: error.name === 'AbortError' ? '请求超时，请重试' : '服务器错误' 
    }, { status: 500 })
  }
}