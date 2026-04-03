import { Suspense } from 'react'
import { Database } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ThemeToggle } from '@/components/theme-toggle'
import { SearchFilter } from '@/components/queries/search-filter'
import { QueryCard } from '@/components/queries/query-card'
import {
  getQueries,
  filterQueries,
  extractAllTags,
  extractAllDbms,
} from '@/lib/notion/queries'
import type { SearchParams } from '@/types'

interface HomePageProps {
  searchParams: Promise<SearchParams>
}

/**
 * 메인 페이지: 쿼리 목록 + 검색/필터
 * 서버 컴포넌트에서 Notion API 호출 (unstable_cache로 60초 캐싱)
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const { q = '', dbms = '', tag = '' } = params

  // Notion API에서 전체 쿼리 목록 조회 (캐싱)
  const allQueries = await getQueries()

  // 검색/필터 적용
  const filteredQueries = filterQueries(allQueries, { q, dbms, tag })

  // 태그/DBMS 목록 추출
  const tagList = extractAllTags(allQueries)
  const dbmsList = extractAllDbms(allQueries)

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <span className="font-semibold">SQL 쿼리 라이브러리</span>
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      {/* 메인 콘텐츠 */}
      <main>
        <Container className="py-8">
          {/* 검색 및 필터 영역 */}
          <div className="mb-8">
            <Suspense>
              <SearchFilter
                currentQ={q}
                currentDbms={dbms}
                currentTag={tag}
                dbmsList={dbmsList}
                tagList={tagList}
              />
            </Suspense>
          </div>

          {/* 쿼리 결과 카운트 */}
          <p className="text-muted-foreground mb-4 text-sm">
            {filteredQueries.length === allQueries.length
              ? `총 ${allQueries.length}개의 쿼리`
              : `${filteredQueries.length}개의 쿼리 (전체 ${allQueries.length}개 중)`}
          </p>

          {/* 쿼리 카드 목록 */}
          {filteredQueries.length === 0 ? (
            <div className="text-muted-foreground py-16 text-center">
              <Database className="mx-auto mb-4 h-12 w-12 opacity-20" />
              <p className="text-lg font-medium">검색 결과가 없습니다</p>
              <p className="mt-1 text-sm">다른 키워드나 필터를 시도해보세요.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {filteredQueries.map(query => (
                <QueryCard key={query.id} query={query} currentTag={tag} />
              ))}
            </div>
          )}
        </Container>
      </main>
    </div>
  )
}
