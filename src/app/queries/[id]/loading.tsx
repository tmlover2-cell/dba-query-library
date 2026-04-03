import { Container } from '@/components/layout/container'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

/**
 * 쿼리 상세 페이지 로딩 스켈레톤 UI
 */
export default function QueryDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* 헤더 스켈레톤 */}
      <div className="border-b">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* 뒤로 가기 버튼 */}
        <Skeleton className="mb-6 h-8 w-24" />

        {/* 쿼리 제목 */}
        <div className="mb-6">
          <Skeleton className="mb-3 h-8 w-2/3" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>

        <Separator className="mb-6" />

        {/* 설명 */}
        <div className="mb-6">
          <Skeleton className="mb-2 h-4 w-16" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-4/5" />
        </div>

        {/* SQL 코드 블록 */}
        <div>
          <div className="mb-2 flex justify-between">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
          <Skeleton className="h-64 w-full rounded-md" />
        </div>
      </Container>
    </div>
  )
}
