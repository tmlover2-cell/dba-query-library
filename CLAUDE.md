# Claude Code 개발 지침

**SQL 쿼리 라이브러리**는 DBA가 자주 사용하는 SQL 쿼리를 Notion DB에 저장하고 웹에서 빠르게 검색/복사할 수 있는 내부 도구입니다.

상세 프로젝트 요구사항은 @/docs/PRD.md 참조

## 핵심 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Backend/CMS**: Notion API (`@notionhq/client`)
- **Code Highlighting**: Shiki (서버 컴포넌트 전용)
- **UI Components**: Radix UI + Lucide Icons + Sonner
- **Development**: ESLint + Prettier + Husky + lint-staged

## 프로젝트 주요 규칙

### Next.js 15 캐싱 주의사항

```typescript
// fetch 기본 캐시가 no-store로 변경됨 - 반드시 명시 필요
import { unstable_cache } from 'next/cache'

export const getQueries = unstable_cache(
  async () => {
    /* ... */
  },
  ['cache-key'],
  { revalidate: 60 }
)
```

### 서버/클라이언트 컴포넌트 구분

- Notion API 호출: 서버 컴포넌트만 (API 키 보호)
- SQL 하이라이팅 (Shiki): 서버 컴포넌트 (`sql-highlight.tsx`)
- 검색/필터 입력: 클라이언트 컴포넌트 (`search-filter.tsx`)
- 복사 버튼: 클라이언트 컴포넌트 (`copy-button.tsx`)

### 검색 필터 상태 관리

URL searchParams로 상태 관리 (React Hook Form + Zod 사용 안 함)

```typescript
// searchParams는 서버 컴포넌트에서 Promise로 받음 (Next.js 15)
interface PageProps {
  searchParams: Promise<{ q?: string; dbms?: string; tag?: string }>
}
```

### Notion DB 프로퍼티 이름 (정확히 일치해야 함)

| 코드 key      | Notion 프로퍼티 타입 |
| ------------- | -------------------- |
| `title`       | Title                |
| `sql`         | Rich Text            |
| `dbms`        | Select               |
| `tags`        | Multi-select         |
| `description` | Rich Text            |

## 자주 사용하는 명령어

```bash
# 개발
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run check-all   # 모든 검사 통합 실행 (권장)

# UI 컴포넌트 추가
NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn@latest add [component]
```

## 작업 완료 체크리스트

```bash
npm run check-all   # 모든 검사 통과 확인
npm run build       # 빌드 성공 확인
```

## 개발 가이드 문서

- **프로젝트 요구사항**: `@/docs/PRD.md`
- **프로젝트 구조**: `@/docs/guides/project-structure.md`
- **스타일링 가이드**: `@/docs/guides/styling-guide.md`
- **컴포넌트 패턴**: `@/docs/guides/component-patterns.md`
- **Next.js 15 가이드**: `@/docs/guides/nextjs-15.md`
