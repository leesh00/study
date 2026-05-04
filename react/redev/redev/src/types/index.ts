// 스페이스 타입 (카테고리 역할)
export interface Space {
  id: string
  name: string
  created_at: string
}

// 회고 데이터 타입
export interface Retro {
  id: string
  title: string
  content: string
  tags: string[]
  space_id: string | null
  space?: Space
  created_at: string
  updated_at: string
  is_bookmarked?: boolean
}

// 회고 작성/수정 폼 입력값 타입
export interface RetroFormValues {
  title: string
  content: string
  tags: string[]
  space_id: string | null
}

// 대시보드 통계 타입
export interface DashboardStats {
  totalCount: number
  thisMonthCount: number
  activeTagCount: number
}

// 태그별 통계 타입
export interface TagStat {
  tag: string
  count: number
}