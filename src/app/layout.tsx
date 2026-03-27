import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '水晶AI推荐 | 星座+五行+AI智能推荐',
  description: '基于星座和五行的人工智能水晶推荐工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="stars" />
        {children}
      </body>
    </html>
  )
}