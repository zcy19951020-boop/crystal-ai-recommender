// 星座计算 - 根据生日自动判定
export function getZodiacSign(month: number, day: number): string {
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
    { name: '摩羯座', start: [12, 22], end: [1, 19] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
  ]
  
  // 摩羯座跨年
  if (month === 12 && day >= 22) return '摩羯座'
  if (month === 1 && day <= 19) return '摩羯座'
  
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

// 天干列表
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
// 地支列表
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 天干对应五行
const stemElements: { [key: string]: string } = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
}

// 地支对应五行
const branchElements: { [key: string]: string } = {
  '子': '水', '丑': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
}

// 根据生日计算八字年柱
export function getYearPillar(birthDate: string): { stem: string, branch: string, element: string } {
  const year = parseInt(birthDate.split('-')[0])
  
  const stem = heavenlyStems[(year - 4) % 10]
  const branch = earthlyBranches[(year - 4) % 12]
  const element = stemElements[stem]
  
  return { stem, branch, element }
}

// 获取五行喜忌建议
export function getFiveElementAdvice(element: string): string {
  const advice: { [key: string]: string } = {
    '木': '你五行属木（木性），适合佩戴绿色/青色系水晶，如绿幽灵、绿发晶、海蓝宝、青金石',
    '火': '你五行属火（火性），适合佩戴红色/紫色系水晶，如紫水晶、红玛瑙、石榴石、紫牙乌',
    '土': '你五行属土（土性），适合佩戴黄色/棕色系水晶，如黄水晶、虎眼石、金发晶、钛晶',
    '金': '你五行属金（金属性），适合佩戴白色/金色系水晶，如白水晶、金发晶、钛晶、白幽灵',
    '水': '你五行属水（水性），适合佩戴黑色/蓝色系水晶，如黑曜石、海蓝宝、蓝晶石、托帕石'
  }
  return advice[element] || '请根据具体情况选择适合自己的水晶'
}