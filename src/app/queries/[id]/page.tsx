import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Database } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/layout/container'
import { ThemeToggle } from '@/components/theme-toggle'
import { SqlHighlight } from '@/components/queries/sql-highlight'
import { CopyButton } from '@/components/queries/copy-button'
import { getQueryById } from '@/lib/notion/queries'

interface QueryDetailPageProps {
  params: Promise<{ id: string }>
}

/**
 * 쿼리 상세 페이지
 * 전체 SQL 코드, 설명, 태그, DBMS 정보를 표시
 */
export default async function QueryDetailPage({
  params,
}: QueryDetailPageProps) {
  const { id } = await params
  const query = await getQueryById(id)

  if (!query) {
    notFound()
  }

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

      {/* 상세 콘텐츠 */}
      <main>
        <Container className="py-8">
          {/* 뒤로 가기 */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                목록으로
              </Link>
            </Button>
          </div>

          {/* 쿼리 헤더 */}
          <div className="mb-6">
            <h1 className="mb-3 text-2xl font-bold">{query.title}</h1>

            {/* DBMS + 태그 */}
            <div className="flex flex-wrap items-center gap-2">
              {query.dbms && (
                <Badge variant="secondary" className="font-mono">
                  {query.dbms}
                </Badge>
              )}
              {query.tags.map(tag => (
                <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
                  <Badge
                    variant="outline"
                    className="hover:bg-accent cursor-pointer transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          <Separator className="mb-6" />

          {/* 설명 */}
          {query.description && (
            <div className="mb-6">
              <h2 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                설명
              </h2>
              <p className="text-sm leading-relaxed">{query.description}</p>
            </div>
          )}

          {/* SQL 코드 블록 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                SQL
              </h2>
              <CopyButton sql={query.sql} />
            </div>
            <SqlHighlight sql={query.sql} />
          </div>
        </Container>
      </main>
    </div>
  )
}
