'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * 메인 페이지 에러 처리 컴포넌트 (Notion API 오류 등)
 * 'use client' 필수 - Next.js error.tsx 요구사항
 */
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen">
      <Container className="flex min-h-screen flex-col items-center justify-center py-16">
        <AlertTriangle className="text-destructive mb-4 h-12 w-12" />
        <h2 className="mb-2 text-xl font-semibold">
          데이터를 불러오지 못했습니다
        </h2>
        <p className="text-muted-foreground mb-6 text-center text-sm">
          Notion API 연결에 문제가 발생했습니다.
          <br />
          환경 변수(NOTION_API_KEY, NOTION_DATABASE_ID)를 확인해주세요.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="bg-muted mb-6 max-w-lg overflow-x-auto rounded-md p-4 text-xs">
            {error.message}
          </pre>
        )}
        <Button onClick={reset}>다시 시도</Button>
      </Container>
    </div>
  )
}
