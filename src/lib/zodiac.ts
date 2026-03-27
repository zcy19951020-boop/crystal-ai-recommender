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

// 计算日柱（标准方法：以1984-01-01为甲子日基准）
export function getDayPillar(year: number, month: number, day: number): { stem: string, branch: string, element: string } {
  // 基准日期：1984年1月1日 = 甲子日
  const baseYear = 1984
  const baseMonth = 1
  const baseDay = 1
  
  // 计算距离基准日期的天数
  // 使用简化方法：计算year-month-day距离1984-1-1的天数
  const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)
  
  const getDaysInYear = (y: number) => isLeapYear(y) ? 366 : 365
  
  let days = 0
  
  // 计算从1984到year的天数差
  for (let y = baseYear; y < year; y++) {
    days += getDaysInYear(y)
  }
  
  // 加上当年的天数
  const monthsDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (isLeapYear(year)) monthsDays[2] = 29
  
  for (let m = 1; m < month; m++) {
    days += monthsDays[m]
  }
  
  days += (day - baseDay)
  
  // 日柱60一循环，基准是1984-01-01为第0天（甲子）
  const cycle = days % 60
  const stemIndex = cycle % 10
  const branchIndex = cycle % 12
  
  const stem = heavenlyStems[stemIndex]
  const branch = earthlyBranches[branchIndex]
  const element = stemElements[stem]
  
  return { stem, branch, element }
}

// 计算年柱
export function getYearPillar(year: number): { stem: string, branch: string, element: string } {
  const stem = heavenlyStems[(year - 4) % 10]
  const branch = earthlyBranches[(year - 4) % 12]
  const element = stemElements[stem]
  return { stem, branch, element }
}

// 根据生日计算完整八字
export function getEightCharacters(birthDate: string): { year: { stem: string, branch: string, element: string }, day: { stem: string, branch: string, element: string } } {
  const [year, month, day] = birthDate.split('-').map(Number)
  
  return {
    year: getYearPillar(year),
    day: getDayPillar(year, month, day)
  }
}

// 获取五行喜忌建议（根据日柱）
export function getFiveElementAdvice(element: string): string {
  const advice: { [key: string]: string } = {
    '木': '你日主属木，适合佩戴绿色/青色系水晶，如绿幽灵、绿发晶、海蓝宝、青金石',
    '火': '你日主属火，适合佩戴红色/紫色系水晶，如紫水晶、红玛瑙、石榴石、紫牙乌',
    '土': '你日主属土，适合佩戴黄色/棕色系水晶，如黄水晶、虎眼石、金发晶、钛晶',
    '金': '你日主属金，适合佩戴白色/金色系水晶，如白水晶、金发晶、钛晶、白幽灵',
    '水': '你日主属水，适合佩戴黑色/蓝色系水晶，如黑曜石、海蓝宝、蓝晶石、托帕石'
  }
  return advice[element] || '请根据具体情况选择适合自己的水晶'
}