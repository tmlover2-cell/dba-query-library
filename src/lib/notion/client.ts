import { Client } from '@notionhq/client'

/**
 * Notion API 클라이언트 싱글턴
 * 서버 컴포넌트 및 서버 액션에서만 사용 (API 키 보호)
 */
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
})

/**
 * Notion DB ID 환경 변수
 */
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ''
