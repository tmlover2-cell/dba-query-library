import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'SQL 쿼리 라이브러리',
  description:
    'DBA가 자주 사용하는 SQL 쿼리를 Notion DB에서 검색하고 복사할 수 있는 내부 도구',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
