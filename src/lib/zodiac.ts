// 星座计算 - 根据生日自动判定
export function getZodiacSign(month: number, day: number): string {
  // 摩羯座跨年
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

// 计算儒略日
function getJulianDay(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1
    month += 12
  }
  const A = Math.floor(year / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5
}

// 计算日柱（根据日干）
export function getDayPillar(year: number, month: number, day: number): { stem: string, branch: string, element: string } {
  // 已知1900年1月1日是辛丑日（天干索引6，地支索引1）
  // 辛=8（在0-9系统中是6，因为甲=0，乙=1...辛=8，但公式中用0开始，所以辛=8-2=6？不对）
  
  // 让我用另一个方法：计算从已知日期的天数差
  const knownDate = { year: 1900, month: 1, day: 1 }
  const jd1 = getJulianDay(knownDate.year, knownDate.month, knownDate.day)
  const jd2 = getJulianDay(year, month, day)
  const daysDiff = Math.floor(jd2 - jd1)
  
  // 1900年1月1日是辛丑日
  // 辛是第8个天干（甲1乙2丙3丁4戊5己6庚7辛8壬9癸10），但数组从0开始，所以辛的索引是7
  // 丑是第2个地支（子1丑2寅3...），数组从0开始，丑的索引是1
  
  // 修正：甲=0, 乙=1, 丙=2, 丁=3, 戊=4, 己=5, 庚=6, 辛=7, 壬=8, 癸=9
  // 子=0, 丑=1, 寅=2, 卯=3, 辰=4, 巳=5, 午=6, 未=7, 申=8, 酉=9, 戌=10, 亥=11
  
  const stemIndex = (7 + daysDiff) % 10  // 辛丑日的天干索引
  const branchIndex = (1 + daysDiff) % 12
  
  const stem = heavenlyStems[stemIndex]
  const branch = earthlyBranches[branchIndex]
  const element = stemElements[stem]
  
  return { stem, branch, element }
}

// 根据生日计算完整的八字（日柱为主）
export function getEightCharacters(birthDate: string): { year: { stem: string, branch: string, element: string }, day: { stem: string, branch: string, element: string } } {
  const [year, month, day] = birthDate.split('-').map(Number)
  
  // 年柱
  const yearStem = heavenlyStems[(year - 4) % 10]
  const yearBranch = earthlyBranches[(year - 4) % 12]
  const yearElement = stemElements[yearStem]
  
  // 日柱
  const dayPillar = getDayPillar(year, month, day)
  
  return {
    year: { stem: yearStem, branch: yearBranch, element: yearElement },
    day: dayPillar
  }
}

// 获取五行喜忌建议（根据日柱）
export function getFiveElementAdvice(element: string): string {
  const advice: { [key: string]: string } = {
    '木': '你五行属木（日主为木），适合佩戴绿色/青色系水晶，如绿幽灵、绿发晶、海蓝宝、青金石',
    '火': '你五行属火（日主为火），适合佩戴红色/紫色系水晶，如紫水晶、红玛瑙、石榴石、紫牙乌',
    '土': '你五行属土（日主为土），适合佩戴黄色/棕色系水晶，如黄水晶、虎眼石、金发晶、钛晶',
    '金': '你五行属金（日主为金），适合佩戴白色/金色系水晶，如白水晶、金发晶、钛晶、白幽灵',
    '水': '你五行属水（日主为水），适合佩戴黑色/蓝色系水晶，如黑曜石、海蓝宝、蓝晶石、托帕石'
  }
  return advice[element] || '请根据具体情况选择适合自己的水晶'
}