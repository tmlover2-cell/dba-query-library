# SQL 쿼리 라이브러리

DBA가 자주 사용하는 SQL 쿼리를 Notion DB에 저장하고, 웹에서 키워드 검색·태그 필터링·클립보드 복사를 통해 빠르게 활용할 수 있는 내부 도구입니다.

## 주요 기능

- **키워드 검색** — 쿼리명·설명 기반 텍스트 검색 (URL searchParams + debounce 300ms)
- **DBMS 필터링** — MySQL / PostgreSQL / Oracle / MSSQL 셀렉트 박스 필터
- **태그 필터링** — Notion Multi-select 태그 클릭 토글로 분류 탐색
- **SQL 코드 하이라이팅** — Shiki 기반 SQL 구문 컬러 렌더링 (Server Component)
- **클립보드 복사** — 코드 블록 복사 버튼 클릭 시 즉시 복사 + 토스트 알림
- **쿼리 상세 페이지** — 전체 SQL 코드·설명·태그를 전체 화면으로 확인

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15.5.3 (App Router + Turbopack) |
| 런타임 | React 19.1.0 + TypeScript 5 |
| 스타일링 | TailwindCSS v4 + shadcn/ui (new-york) + Lucide React |
| 코드 하이라이팅 | Shiki |
| 데이터 소스 | Notion API (`@notionhq/client`) |
| 검색/필터 | URL searchParams (Native) + debounce |
| 배포 | Vercel |

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```bash
NOTION_API_KEY=your_notion_integration_secret
NOTION_DATABASE_ID=your_notion_database_id
```

| 변수명 | 설명 |
|--------|------|
| `NOTION_API_KEY` | Notion Integration 시크릿 키 |
| `NOTION_DATABASE_ID` | 쿼리 라이브러리 Notion DB ID |

> `.env.local`은 절대 Git에 커밋하지 마세요. Vercel 배포 시 환경 변수 섹션에 동일하게 등록합니다.

### 3. Notion DB 구조 설정

Notion에서 데이터베이스를 생성하고 아래 property를 추가합니다.

| Property 이름 | 타입 | 설명 |
|--------------|------|------|
| `쿼리명` | Title | 쿼리 이름 |
| `SQL` | Rich Text | SQL 코드 (최대 2,000자) |
| `DBMS` | Select | MySQL / PostgreSQL / Oracle / MSSQL |
| `태그` | Multi-select | 카테고리 태그 |
| `설명` | Rich Text | 쿼리 설명 |

> **주의**: SQL 코드는 Notion Rich Text property에 저장합니다. Code block(page body)으로 저장하면 Notion API Rate Limit(초당 3회)에 충돌하므로 사용하지 않습니다. Rich Text의 최대 길이는 **2,000자**입니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## URL 구조

| URL | 설명 |
|-----|------|
| `/` | 메인 페이지 (전체 쿼리 목록) |
| `/?q={키워드}` | 키워드 검색 결과 |
| `/?dbms={DBMS명}` | DBMS 필터 적용 |
| `/?tag={태그명}` | 태그 필터 적용 |
| `/?q=...&dbms=...&tag=...` | 복합 필터 |
| `/queries/[id]` | 쿼리 상세 페이지 |

## 프로젝트 구조

```
notion-cms-project/
├── app/
│   ├── page.tsx                  # 메인 페이지 (쿼리 목록 + 검색/필터)
│   ├── loading.tsx               # 메인 페이지 로딩 스켈레톤
│   ├── error.tsx                 # Notion API 오류 처리
│   └── queries/
│       └── [id]/
│           ├── page.tsx          # 쿼리 상세 페이지
│           ├── loading.tsx       # 상세 페이지 로딩 스켈레톤
│           └── error.tsx         # 상세 페이지 오류 처리
├── docs/
│   └── PRD.md                    # 프로젝트 요구사항 문서
└── .env.local                    # 환경 변수 (Git 제외)
```

## 주요 명령어

```bash
npm run dev        # 개발 서버 실행 (Turbopack)
npm run build      # 프로덕션 빌드
npm run check-all  # ESLint + TypeScript + 빌드 통합 검사
```

## 문서

- [PRD (프로젝트 요구사항)](./docs/PRD.md)
