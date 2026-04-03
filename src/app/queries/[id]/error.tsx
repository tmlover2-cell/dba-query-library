'use client'

import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * 쿼리 상세 페이지 에러 처리 컴포넌트
 */
export default function QueryDetailError({ error, reset }: ErrorProps) {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center py-16">
      <AlertTriangle className="text-destructive mb-4 h-12 w-12" />
      <h2 className="mb-2 text-xl font-semibold">쿼리를 불러오지 못했습니다</h2>
      <p className="text-muted-foreground mb-6 text-center text-sm">
        Notion API 연결에 문제가 발생했습니다.
      </p>
      {process.env.NODE_ENV === 'development' && (
        <pre className="bg-muted mb-6 max-w-lg overflow-x-auto rounded-md p-4 text-xs">
          {error.message}
        </pre>
      )}
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">목록으로</Link>
        </Button>
        <Button onClick={reset}>다시 시도</Button>
      </div>
    </Container>
  )
}
