import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Breevia - 个人定制养生平台',
  description: '专业的个人定制养生平台，提供个性化食谱、科学补剂推荐和医学级健康方案',
  keywords: ['个人养生', '定制食谱', '补剂推荐', '中医体质', '健康管理', '营养分析'],
  authors: [{ name: 'Breevia Health Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
