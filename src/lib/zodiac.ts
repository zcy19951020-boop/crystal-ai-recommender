// 星座计算 - 根据生日自动判定
export function getZodiacSign(month: number, day: number): string {
  if (month === 12 && day >= 22) return '摩羯座'
  if (month === 1 && day <= 19) return '摩羯座'
  
  const signs = [
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 21] },
    { name: '巨蟹座', start: [6, 22], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 23] },
    { name: '天蝎座', start: [10, 24], end: [11, 22] },
    { name: '射手座', start: [11, 23], end: [12, 21] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
  ]
  
  for (const sign of signs) {
    if (
      (month === sign.start[0] && day >= sign.start[1]) ||
      (month === sign.end[0] && day <= sign.end[1])
    ) {
      return sign.name
    }
  }
  
  return '未知'
}

// 获取星座特质
export function getZodiacTraits(zodiac: string): string {
  const traits: { [key: string]: string } = {
    '白羊座': '热情、积极、直接、有领导力',
    '金牛座': '稳定、务实、忠诚、追求安全感',
    '双子座': '好奇、善于沟通、多变、思维敏捷',
    '巨蟹座': '敏感、顾家、情绪化、有同理心',
    '狮子座': '自信、热情、有领袖气质、爱表现',
    '处女座': '追求完美、细心、分析能力强的强迫症',
    '天秤座': '追求平衡、公正、有艺术气质、选择困难',
    '天蝎座': '神秘、深情、执着、有洞察力',
    '射手座': '乐观、自由、爱好冒险、诚实',
    '摩羯座': '稳重、有野心、务实、注重成就',
    '水瓶座': '创新、独立、反传统、人道主义',
    '双鱼座': '浪漫、艺术、直觉强、容易逃避'
  }
  return traits[zodiac] || ''
}