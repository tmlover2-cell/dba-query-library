# SQL 쿼리 라이브러리 개발 로드맵

Notion DB에 저장된 SQL 쿼리를 DBA가 웹에서 빠르게 검색하고 복사할 수 있는 1인 내부 도구

## 개요

SQL 쿼리 라이브러리는 SQL 쿼리를 반복적으로 작성하고 관리하는 DBA를 위한 내부 도구로 다음 기능을 제공합니다:

- **Notion CMS 연동**: Notion DB를 단일 데이터 소스로 활용하여 쿼리를 관리
- **검색 및 필터링**: 키워드, DBMS, 태그 기반으로 쿼리를 빠르게 탐색
- **SQL 하이라이팅 및 복사**: Shiki 구문 강조와 원클릭 클립보드 복사

## 개발 워크플로우

1. **작업 계획**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조
   - 초기 상태의 샘플로 `000-sample.md` 참조

3. **작업 구현**

   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

   - 로드맵에서 완료된 작업을 체크박스 체크 및 ✅로 표시

## 개발 단계

### Phase 1: 프로젝트 초기 설정 ✅

- **Task 001: 프로젝트 구조 및 환경 설정** ✅ - 완료
  - See: `/tasks/001-project-setup.md`
  - ✅ Next.js 15 스타터킷 보일러플레이트 제거 (데모 페이지, 예제 컴포넌트)
  - ✅ 프로젝트 디렉토리 구조 생성 (`src/lib/notion/`, `src/components/queries/`, `src/types/`)
  - ✅ 필수 패키지 설치 (`@notionhq/client`, `shiki`, `use-debounce`)
  - ✅ 환경 변수 설정 (`.env.local` 생성, `NOTION_API_KEY`, `NOTION_DATABASE_ID`)
  - ✅ Notion DB 프로퍼티 생성 (`title`, `sql`, `dbms`, `tags`, `description`)
  - ✅ Notion API 연결 확인 (개발 서버 실행 및 DB 응답 검증)
  - ✅ SSL 인증서 우회 처리 (`next.config.ts`, 사내 네트워크 대응)

### Phase 2: 데이터 레이어 및 공통 컴포넌트 구현 ✅

- **Task 002: 타입 정의 및 Notion 데이터 레이어 구현** ✅ - 완료
  - See: `/tasks/002-data-layer.md`
  - ✅ `src/types/index.ts` — `SqlQuery`, `SearchParams` 타입 정의
  - ✅ `src/lib/notion/adapter.ts` — Notion API 응답을 `SqlQuery`로 변환하는 어댑터 구현
    - `properties.title` (Title), `properties.sql` (Rich Text), `properties.dbms` (Select), `properties.tags` (Multi-select), `properties.description` (Rich Text) 처리
  - ✅ `src/lib/notion/queries.ts` — 쿼리 목록 조회 함수 구현 (`unstable_cache`, revalidate 60초)
  - ✅ `src/lib/notion/queries.ts` — 쿼리 상세 조회 함수 구현 (`unstable_cache`, revalidate 60초)
  - ✅ `src/lib/notion/queries.ts` — 클라이언트 필터링 함수 구현 (`filterQueries`, `extractAllTags`, `extractAllDbms`)

- **Task 003: 공통 UI 컴포넌트 구현** ✅ - 완료
  - See: `/tasks/003-common-components.md`
  - ✅ `src/components/queries/sql-highlight.tsx` — Shiki SQL 하이라이팅 서버 컴포넌트 구현 (미리보기 모드 포함)
  - ✅ `src/components/queries/copy-button.tsx` — 클립보드 복사 버튼 클라이언트 컴포넌트 구현 (Sonner 토스트 연동)
  - ✅ shadcn/ui 기반 공통 UI 컴포넌트 설치 (Badge, Button, Card, Input, Select, Skeleton, Separator, Sonner)

### Phase 3: 핵심 페이지 및 기능 구현 ✅

- **Task 004: 메인 페이지 구현** ✅ - 완료
  - See: `/tasks/004-main-page.md`
  - ✅ `src/app/page.tsx` — 서버 컴포넌트로 Notion 쿼리 목록 패칭 및 렌더링
    - `searchParams` (Promise) 처리 (Next.js 15 방식)
    - 필터 파라미터(`q`, `dbms`, `tag`) 서버에서 수신 후 쿼리 함수에 전달
    - 검색 결과 수 표시 및 빈 상태(Empty State) UI 구현
  - ✅ `src/components/queries/search-filter.tsx` — 검색/필터 클라이언트 컴포넌트 구현
    - 키워드 검색 인풋 (300ms debounce → URL `?q=` 업데이트)
    - DBMS 셀렉트 박스 (URL `?dbms=` 업데이트)
    - 태그 필터 버튼 그룹 (클릭 토글 → URL `?tag=` 업데이트)
    - 필터 초기화 버튼 (URL searchParams 전체 제거)
  - ✅ `src/components/queries/query-card.tsx` — 쿼리 카드 서버 컴포넌트 구현
    - 쿼리명, DBMS 배지, 태그 목록, 설명 요약 표시
    - SQL 미리보기 코드 블록 (3줄, Shiki 하이라이팅)
    - 복사 버튼 포함 (hover 시 노출)
    - 카드 클릭 → 상세 페이지 이동 링크

- **Task 005: 쿼리 상세 페이지 구현** ✅ - 완료
  - See: `/tasks/005-detail-page.md`
  - ✅ `src/app/queries/[id]/page.tsx` — 쿼리 상세 서버 컴포넌트 구현
    - Notion 페이지 ID로 단건 조회 (`params` Promise 처리)
    - 쿼리명, DBMS 배지, 태그 목록 표시
    - 전체 SQL 코드 블록 (Shiki 하이라이팅)
    - 설명 전체 표시
    - 복사 버튼
    - 뒤로 가기 버튼 (메인 페이지 복귀)
    - 태그 클릭 → 메인 페이지 해당 태그 필터 활성화 상태로 이동

### Phase 4: UX 마감 작업 ✅

- **Task 006: 로딩 및 에러 처리 구현** ✅ - 완료
  - See: `/tasks/006-ux-polish.md`
  - ✅ `src/app/loading.tsx` — 메인 페이지 로딩 스켈레톤 UI 구현 (헤더, 검색/필터, 카드 6개 skeleton)
  - ✅ `src/app/error.tsx` — 메인 페이지 에러 UI 구현 (Notion API 오류 메시지, 다시 시도 버튼)
  - ✅ `src/app/queries/[id]/loading.tsx` — 상세 페이지 로딩 스켈레톤 UI 구현
  - ✅ `src/app/queries/[id]/error.tsx` — 상세 페이지 에러 UI 구현 (목록으로 버튼 포함)
  - ✅ `src/app/queries/[id]/not-found.tsx` — 존재하지 않는 쿼리 404 처리
  - ✅ Sonner 토스트 프로바이더 `src/app/layout.tsx`에 등록
  - ✅ 반응형 레이아웃 구현 (모바일/태블릿/데스크탑 대응, sm/lg 그리드 breakpoint 적용)

### Phase 5: 최적화 및 배포

- **Task 007: 프로덕션 빌드 검증 및 배포** - 우선순위
  - `npm run check-all` 린트/타입 검사 통과 확인
  - `npm run build` 프로덕션 빌드 성공 확인 (빌드 에러 없음)
  - `unstable_cache` 캐싱 동작 검증 (revalidate 60초 확인)
  - Vercel 프로젝트 생성 및 GitHub 저장소 연결
  - Vercel 환경 변수 등록 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
  - Vercel 배포 및 운영 URL 확인
  - 배포 환경에서 Notion API 연동 최종 확인
  - Playwright MCP를 활용한 배포 환경 E2E 테스트 수행

## 기술 제약 및 주의사항

| 항목 | 내용 |
|------|------|
| SQL 최대 길이 | Notion Rich Text 2,000자 제한 |
| Notion API Rate Limit | 초당 3회 → `unstable_cache` 60초 캐싱으로 대응 |
| 페이지네이션 | MVP는 100개 이하 운영 가정, 단순 전체 조회 |
| 인증 | 불필요 (1인 내부 도구) |
| 서버/클라이언트 분리 | Notion API 호출은 서버 컴포넌트에서만 |
| Next.js 15 캐시 | fetch 기본 캐시가 `no-store`로 변경 → `unstable_cache` 필수 명시 |

## MVP 이후 백로그

- 쿼리 직접 등록/편집 UI (Notion에서 직접 관리)
- 즐겨찾기/북마크 기능
- 복사 횟수/조회수 통계
- cursor 기반 페이지네이션 (100개 초과 시)
- 사용자 인증 및 권한 관리
