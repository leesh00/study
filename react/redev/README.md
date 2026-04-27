Day 1 (2026.04.25) — 프로젝트 초기 셋업
완료한 작업

Next.js 15 프로젝트 생성 (App Router, TypeScript, Tailwind CSS)
프로젝트 폴더 구조 설계 및 생성 (components/, lib/, types/)
Supabase 프로젝트 생성 및 PostgreSQL 데이터베이스 연결
retros 테이블 스키마 설계 및 생성 (UUID PK, 배열 타입 tags 컬럼)
환경변수 설정 (.env.local) 및 Supabase 클라이언트 연결 확인

기술적 의사결정
Q. 왜 App Router를 선택했나?

Server Component로 초기 데이터 패칭을 서버에서 처리하여 클라이언트 번들 크기 최소화
Server Action을 활용해 별도 API 라우트 없이 CRUD 구현 가능
최신 Next.js 패턴 학습 및 실무 적용 경험 확보 목적

Q. Supabase를 선택한 이유?

PostgreSQL 기반으로 복잡한 쿼리(배열 필터링 등) 지원
무료 티어로 빠른 프로토타이핑 가능
RESTful API 자동 생성으로 백엔드 구축 시간 단축

트러블슈팅 포인트
1. ui업데이트
문제 : 바이브 코딩으로 프로젝트 환경 초기 생성 시 폴더 구조가 다른 경우가 있었다.
해결방법 : TypeScript 경로 alias(@/*) 인식 오류 → tsconfig.json의 paths 설정 확인 및 수정
- ai로 구조를 생성하는 경우 생성 후 확인과정 필요

문제 : 홈페이지(Supabase) 가이드를 요청하는 경우, 새로운 UI로 변경되어서 기존과 다르게 찾을 수 없었다. 화면을 캡쳐해서 붙여넣기엔 암호키가 그대로 ai에 노출될 위험이 있어 새로운 화면에 대해 설명해야했다. 
- 보안위험이 있는 요소 주의

2. 단계에 맞는 적용
문제 : Supabase RLS(Row Level Security) 경고
해결 : MVP 단계에서는 비활성화, 추후 인증 기능 추가 시 적용 예정
- ESlint도 필요 이상으로 하면 진행과정에 방해가 되듯 적절한 단계를 맞추는게 중요.