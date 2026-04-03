/**
 * SQL 쿼리 라이브러리 공통 타입 정의
 */

/**
 * Notion DB에서 조회한 SQL 쿼리 데이터 모델
 * - Notion Rich Text property는 최대 2,000자 제한
 */
export interface SqlQuery {
  /** Notion 페이지 고유 ID (UUID 형식) */
  id: string
  /** 쿼리명 - Notion Title property */
  title: string
  /** SQL 코드 (최대 2,000자) - Notion Rich Text property */
  sql: string
  /** DBMS 종류 - Notion Select property */
  dbms: 'MySQL' | 'PostgreSQL' | 'Oracle' | 'MSSQL' | string
  /** 멀티셀렉트 태그 목록 - Notion Multi-select property */
  tags: string[]
  /** 쿼리 설명 - Notion Rich Text property */
  description: string
}

/**
 * 메인 페이지 검색/필터 파라미터
 */
export interface SearchParams {
  /** 키워드 검색 (쿼리명, 설명 대상) */
  q?: string
  /** DBMS 필터 */
  dbms?: string
  /** 태그 필터 */
  tag?: string
}
