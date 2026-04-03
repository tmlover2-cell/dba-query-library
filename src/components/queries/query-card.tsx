import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SqlHighlight } from './sql-highlight'
import { CopyButton } from './copy-button'
import type { SqlQuery } from '@/types'

interface QueryCardProps {
  query: SqlQuery
  currentTag?: string
}

/**
 * 쿼리 목록에서 개별 쿼리를 카드 형태로 표시하는 컴포넌트
 * 쿼리명, DBMS 배지, 태그, 설명 요약, SQL 미리보기 포함
 */
export async function QueryCard({ query, currentTag }: QueryCardProps) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link href={`/queries/${query.id}`}>
              <CardTitle className="hover:text-primary truncate text-base transition-colors">
                {query.title}
              </CardTitle>
            </Link>
            {query.description && (
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {query.description}
              </p>
            )}
          </div>
          <CopyButton
            sql={query.sql}
            className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>

        {/* DBMS 배지 + 태그 */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {query.dbms && (
            <Badge variant="secondary" className="font-mono text-xs">
              {query.dbms}
            </Badge>
          )}
          {query.tags.map(tag => (
            <Badge
              key={tag}
              variant={currentTag === tag ? 'default' : 'outline'}
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      {/* SQL 미리보기 (3줄) */}
      {query.sql && (
        <CardContent className="pt-0">
          <SqlHighlight sql={query.sql} preview />
        </CardContent>
      )}
    </Card>
  )
}
