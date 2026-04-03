import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { SqlQuery } from '@/types'

/**
 * Notion API 페이지 응답을 SqlQuery 모델로 변환하는 어댑터 함수
 *
 * Notion Rich Text property 구조:
 * property.rich_text[].plain_text 를 이어붙여 문자열로 반환
 */
function extractRichText(
  property: PageObjectResponse['properties'][string]
): string {
  if (property.type !== 'rich_text') return ''
  return property.rich_text.map(t => t.plain_text).join('')
}

/**
 * Notion Title property에서 텍스트 추출
 */
function extractTitle(
  property: PageObjectResponse['properties'][string]
): string {
  if (property.type !== 'title') return ''
  return property.title.map(t => t.plain_text).join('')
}

/**
 * Notion Select property에서 선택값 추출
 */
function extractSelect(
  property: PageObjectResponse['properties'][string]
): string {
  if (property.type !== 'select') return ''
  return property.select?.name ?? ''
}

/**
 * Notion Multi-select property에서 태그 목록 추출
 */
function extractMultiSelect(
  property: PageObjectResponse['properties'][string]
): string[] {
  if (property.type !== 'multi_select') return []
  return property.multi_select.map(item => item.name)
}

/**
 * Notion 페이지 응답 객체를 SqlQuery 인터페이스로 변환
 */
export function adaptNotionPageToSqlQuery(page: PageObjectResponse): SqlQuery {
  const { properties } = page

  return {
    id: page.id,
    title: properties['title'] ? extractTitle(properties['title']) : '',
    sql: properties['sql'] ? extractRichText(properties['sql']) : '',
    dbms: properties['dbms'] ? extractSelect(properties['dbms']) : '',
    tags: properties['tags'] ? extractMultiSelect(properties['tags']) : [],
    description: properties['description']
      ? extractRichText(properties['description'])
      : '',
  }
}
