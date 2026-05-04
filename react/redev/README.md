# 회개하라! 🙏

> 개발 및 업무 과정에서 얻은 인사이트를 기록하고, 태그 기반으로 다시 탐색할 수 있는 회고 아카이브 서비스

<br />

## 프로젝트 소개

개발/업무 중 배운 점이 메모앱, 메신저 등에 흩어져 재사용이 어렵고, 시간이 지나면 동일한 문제를 반복하게 되는 문제를 해결하기 위해 만들었습니다.

회고를 단순 저장이 아닌 **재탐색 가능한 데이터**로 설계하여, 태그와 스페이스 기반으로 필요한 순간에 꺼내볼 수 있는 구조를 목표로 했습니다.

<br />

## 주요 기능

* **회고 CRUD** — 작성 / 수정 / 삭제 / 조회
* **스페이스** — 업무 / 프로젝트 / 코드리뷰 / 개인 등 사용자 정의 그룹으로 회고 분류
* **태그 기반 필터링** — 태그 클릭으로 관련 회고 즉시 탐색
* **통합 검색** — 제목 / 내용 / 태그를 동시에 검색
* **대시보드** — 총 회고 수, 이번 달 작성 수, 활성 태그 수 통계 및 태그별 사용 현황
* **반응형 UI** — 모바일 / 데스크탑 대응

<br />

## 기술 스택

|구분|기술|
|-|-|
|Framework|Next.js 15 (App Router)|
|Language|TypeScript|
|Styling|Tailwind CSS v4|
|Form|React Hook Form + Zod|
|Database|Supabase (PostgreSQL)|
|Deploy|Vercel|

<br />

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                  # 대시보드 페이지
│   ├── layout.tsx                # 공통 레이아웃 (헤더 포함)
│   ├── loading.tsx               # 로딩 상태 UI
│   ├── error.tsx                 # 에러 상태 UI
│   ├── not-found.tsx             # 404 페이지
│   ├── retros/
│   │   ├── page.tsx              # 회고 목록 페이지
│   │   ├── actions.ts            # 회고 CRUD Server Action
│   │   ├── new/page.tsx          # 회고 작성 페이지
│   │   └── \\\[id]/
│   │       ├── page.tsx          # 회고 상세 페이지
│   │       └── edit/page.tsx     # 회고 수정 페이지
│   └── settings/
│       ├── page.tsx              # 스페이스 설정 페이지
│       ├── actions.ts            # 스페이스 CRUD Server Action
│       └── SpaceForm.tsx         # 스페이스 추가/삭제 폼
├── components/
│   ├── layout/
│   │   └── Header.tsx            # 공통 헤더
│   ├── retro/
│   │   ├── RetroCard.tsx         # 회고 카드
│   │   ├── NewRetroForm.tsx      # 회고 작성 폼
│   │   ├── EditForm.tsx          # 회고 수정 폼
│   │   ├── TagFilter.tsx         # 태그 필터
│   │   ├── SpaceFilter.tsx       # 스페이스 필터
│   │   ├── DeleteButton.tsx      # 삭제 버튼
│   │   └── EditButton.tsx        # 수정 버튼
│   └── ui/                       # 공통 원자 컴포넌트
├── lib/
│   ├── supabase.ts               # Supabase 클라이언트
│   └── validations.ts            # Zod 유효성 검증 스키마
└── types/
    └── index.ts                  # 전역 타입 정의
```

<br />

## 로컬 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/본인계정/redev.git
cd redev

# 2. 패키지 설치
npm install

# 3. 환경변수 설정
# .env.local 파일 생성 후 아래 내용 입력
NEXT\\\_PUBLIC\\\_SUPABASE\\\_URL=your\\\_supabase\\\_url
NEXT\\\_PUBLIC\\\_SUPABASE\\\_ANON\\\_KEY=your\\\_supabase\\\_anon\\\_key

# 4. 개발 서버 실행
npm run dev
```

<br />

## 기술적 의사결정

### Q. 왜 App Router를 선택했나?

* Server Component로 초기 데이터 패칭을 서버에서 처리하여 클라이언트 번들 크기 최소화
* Server Action을 활용해 별도 API 라우트 없이 CRUD 구현 가능
* 최신 Next.js 패턴을 실무 수준으로 적용하는 것이 목표였기 때문

### Q. Supabase를 선택한 이유?

* PostgreSQL 기반으로 배열 타입 컬럼과 `contains` 연산자를 활용한 태그 필터링 지원
* 무료 티어로 빠른 프로토타이핑 가능
* RESTful API 자동 생성으로 별도 백엔드 구축 없이 빠르게 연결 가능

### Q. 태그와 스페이스를 분리한 이유?

* 초기에는 카테고리 단일 구조로 설계했으나, 상황 기반 탐색(태그)과 영역 기반 분류(스페이스)의 역할이 다르다고 판단
* 스페이스 = 큰 맥락(업무/프로젝트 등), 태그 = 세부 키워드로 이중 구조로 설계
* 스페이스는 사용자가 직접 추가/삭제할 수 있도록 별도 테이블로 분리

### Q. URL searchParams로 필터 상태를 관리한 이유?

* 필터 조건이 URL에 반영되어 새로고침 후에도 상태 유지
* 특정 필터 결과를 링크로 공유 가능
* 서버 컴포넌트에서 직접 DB 쿼리에 적용하여 클라이언트 필터링 대비 효율적

<br />

## 트러블슈팅

### 1\. 바이브 코딩 환경에서의 폴더 구조 불일치

**문제** AI를 활용한 프로젝트 초기 생성 시 폴더 구조가 예상과 다르게 생성되는 경우가 있었고, TypeScript 경로 alias(`@/\\\*`) 인식 오류가 발생했다.

**해결** `tsconfig.json`의 `paths` 설정을 확인하고 `@/\\\*`가 `./src/\\\*`를 가리키도록 수정했다.

**교훈** AI로 코드 구조를 생성하는 경우 반드시 생성 후 확인 과정이 필요하다.

\---

### 2\. 외부 서비스 UI 변경으로 인한 가이드 불일치

**문제** Supabase 공식 가이드 기준 UI가 실제와 달라 키 위치를 찾기 어려웠다. 화면 캡처를 AI에 전달하면 암호키가 그대로 노출될 위험이 있어 텍스트로만 설명해야 했다.

**해결** 화면을 직접 탐색하며 해당 항목을 찾아냈다.

**교훈** 보안 위험이 있는 요소를 AI에 노출하지 않도록 주의해야 한다.

\---

### 3\. MVP 단계에 맞는 보안 설정 적용

**문제** Supabase 테이블 생성 시 RLS(Row Level Security) 미적용 경고가 발생했다.

**해결** MVP 단계에서는 RLS를 비활성화하고, 추후 인증 기능 추가 시 적용하기로 결정했다.

**교훈** ESLint 설정과 마찬가지로 보안 설정도 개발 단계에 맞게 단계적으로 적용하는 것이 중요하다.

\---

### 4\. Next.js 15 Breaking Change — params Promise 전환

**문제** Next.js 15에서 Dynamic Route의 `params`가 동기 객체에서 Promise로 변경되어 `params.id`에 접근 시 에러가 발생했다.

```
Error: Route "/retros/\\\[id]" used params.id. params is now a Promise.
```

**해결** `params` 타입을 `Promise<{ id: string }>`로 변경하고, `const { id } = await params`로 언래핑했다.

**교훈** 메이저 버전 업그레이드 시 공식 문서의 Migration Guide와 Breaking Change 목록을 반드시 확인해야 한다.

\---

### 5\. searchParams undefined 방어 처리

**문제** Next.js 15에서 `searchParams`를 `await`로 언래핑할 때 URL에 쿼리스트링이 없는 경우 `undefined`가 반환되어 구조 분해 할당이 실패했다.

```
Cannot destructure property 'q' of '(intermediate value)' as it is undefined.
```

**해결** Nullish coalescing 연산자(`??`)로 `undefined` 방어 처리했다.

```typescript
// 수정 전
const { q, tag } = await searchParams

// 수정 후
const { q, tag } = (await searchParams) ?? {}
```

\---

### 6\. useSearchParams() Suspense 경계 미적용으로 Vercel 빌드 실패

**문제** `useSearchParams()`를 사용하는 컴포넌트가 Suspense로 감싸지지 않아 Vercel 빌드 시 실패했다. 로컬 개발 환경에서는 정상 동작했기 때문에 배포 전까지 발견하지 못했다.

**원인** Next.js 빌드 시 `useSearchParams()`는 반드시 Suspense 경계 안에 있어야 한다. 페이지에서 감싸는 것만으로는 부족하고, 컴포넌트 내부에서도 Suspense로 감싸야 한다.

**해결** `SearchBar`, `TagFilter` 컴포넌트를 Inner/Wrapper 패턴으로 분리하여 컴포넌트 내부에서 Suspense로 감쌌다.

```typescript
// Inner 컴포넌트 — useSearchParams 사용
function SearchBarInner() {
  const searchParams = useSearchParams()
  // ...
}

// Wrapper 컴포넌트 — Suspense로 감싸서 export
export default function SearchBar() {
  return (
    <Suspense fallback={<div />}>
      <SearchBarInner />
    </Suspense>
  )
}
```

\---

### 7\. TypeScript 타입 미명시로 Vercel 빌드 실패

**문제** Server Action의 반환 타입을 명시하지 않아 Vercel 빌드 시 타입 에러가 발생했다. 로컬 개발 환경에서는 통과되었으나 빌드 시 strict 타입 체크에서 실패했다.

**해결** `ActionState` 타입을 정의하고 함수 반환 타입을 명시했다.

```typescript
export type ActionState = {
  error?: {
    title?: string\\\[]
    content?: string\\\[]
    general?: string
  }
} | null

export async function createRetro(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> { ... }
```

**교훈** TypeScript를 사용하는 이상 반환 타입까지 명시하는 습관이 필요하다. 로컬과 빌드 환경의 타입 체크 수준이 다를 수 있다.

\---

### 8\. useFormState → useActionState 변경 (React 19)

**문제** `react-dom`의 `useFormState`가 React 19에서 `react`의 `useActionState`로 변경되어 런타임 에러가 발생했다.

**해결** import 경로와 함수명을 변경했다.

```typescript
// 수정 전
import { useFormState } from 'react-dom'
const \\\[state, formAction] = useFormState(action, null)

// 수정 후
import { useActionState } from 'react'
const \\\[state, formAction] = useActionState(action, null)
```

**교훈** 메이저 버전 업그레이드 시 Breaking Change를 확인하고, 에러 메시지를 적극 활용해야 한다.



