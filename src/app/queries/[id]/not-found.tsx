import Link from 'next/link'
import { Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

/**
 * 쿼리를 찾을 수 없을 때 표시되는 404 페이지
 */
export default function QueryNotFound() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center py-16">
      <Database className="text-muted-foreground mb-4 h-12 w-12 opacity-30" />
      <h2 className="mb-2 text-xl font-semibold">쿼리를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground mb-6 text-sm">
        삭제되었거나 잘못된 ID입니다.
      </p>
      <Button asChild>
        <Link href="/">목록으로 돌아가기</Link>
      </Button>
    </Container>
  )
}
