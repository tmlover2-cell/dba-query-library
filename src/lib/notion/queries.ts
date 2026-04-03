import { unstable_cache } from 'next/cache'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionClient, NOTION_DATABASE_ID } from './client'
import { adaptNotionPageToSqlQuery } from './adapter'
import type { SqlQuery, SearchParams } from '@/types'

/**
 * Notion DB에서 SQL 쿼리 전체 목록 조회 (60초 캐싱)
 *
 * Next.js 15 주의사항:
 * - fetch 기본 캐시가 no-store로 변경됨
 * - Notion API Rate Limit 대응을 위해 unstable_cache로 60초 캐싱
 */
export const getQueries = unstable_cache(
  async (): Promise<SqlQuery[]> => {
    const response = await notionClient.databases.query({
      database_id: NOTION_DATABASE_ID,
      page_size: 100,
    })

    return (response.results as PageObjectResponse[])
      .filter(
        (page): page is PageObjectResponse =>
          page.object === 'page' && 'properties' in page
      )
      .map(adaptNotionPageToSqlQuery)
  },
  ['queries-list'],
  { revalidate: 60 }
)

/**
 * Notion DB에서 특정 쿼리 상세 조회 (60초 캐싱)
 */
export const getQueryById = unstable_cache(
  async (id: string): Promise<SqlQuery | null> => {
    try {
      const page = await notionClient.pages.retrieve({ page_id: id })

      if (!('properties' in page)) return null

      return adaptNotionPageToSqlQuery(page as PageObjectResponse)
    } catch {
      return null
    }
  },
  ['query-detail'],
  { revalidate: 60 }
)

/**
 * 클라이언트 필터링: URL searchParams 기준으로 쿼리 목록을 필터링
 *
 * Notion API 필터 대신 클라이언트 사이드 필터링 사용
 * - 이유: 목록 전체를 캐싱 후 필터링하는 것이 API 호출 최소화에 유리
 */
export function filterQueries(
  queries: SqlQuery[],
  params: SearchParams
): SqlQuery[] {
  const { q, dbms, tag } = params

  return queries.filter(query => {
    // 키워드 검색: 쿼리명 + 설명 대상
    if (q) {
      const keyword = q.toLowerCase()
      const matchesTitle = query.title.toLowerCase().includes(keyword)
      const matchesDescription = query.description
        .toLowerCase()
        .includes(keyword)
      if (!matchesTitle && !matchesDescription) return false
    }

    // DBMS 필터
    if (dbms && query.dbms !== dbms) return false

    // 태그 필터
    if (tag && !query.tags.includes(tag)) return false

    return true
  })
}

/**
 * 쿼리 목록에서 전체 태그 목록 추출 (중복 제거)
 */
export function extractAllTags(queries: SqlQuery[]): string[] {
  const tagSet = new Set<string>()
  queries.forEach(query => {
    query.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

/**
 * 쿼리 목록에서 전체 DBMS 목록 추출 (중복 제거)
 */
export function extractAllDbms(queries: SqlQuery[]): string[] {
  const dbmsSet = new Set<string>()
  queries.forEach(query => {
    if (query.dbms) dbmsSet.add(query.dbms)
  })
  return Array.from(dbmsSet).sort()
}
