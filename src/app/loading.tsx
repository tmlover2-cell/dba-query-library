import { Container } from '@/components/layout/container'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * 메인 페이지 로딩 스켈레톤 UI
 */
export default function Loading() {
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
        {/* 검색/필터 스켈레톤 */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-48" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>

        {/* 카드 목록 스켈레톤 */}
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border p-5">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-5" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
