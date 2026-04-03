import { codeToHtml } from 'shiki'

interface SqlHighlightProps {
  sql: string
  /** 미리보기 모드: true이면 3줄로 제한 */
  preview?: boolean
}

/**
 * Shiki를 사용하여 SQL 코드를 구문 하이라이팅하는 서버 컴포넌트
 * 서버에서 직접 실행되므로 번들 크기에 영향 없음
 */
export async function SqlHighlight({
  sql,
  preview = false,
}: SqlHighlightProps) {
  // 미리보기 모드: 첫 3줄만 표시
  const displaySql = preview ? sql.split('\n').slice(0, 3).join('\n') : sql

  const html = await codeToHtml(displaySql, {
    lang: 'sql',
    theme: 'github-dark',
  })

  return (
    <div
      className="overflow-x-auto rounded-md text-sm [&>pre]:p-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
