// 회고 데이터 타입 정의
export interface Retro {
  id: string
  title: string
  content: string
  tags: string[]
  created_at: string
  updated_at: string
  is_bookmarked?: boolean
}

// 회고 폼 입력값 타입
export interface RetroFormValues {
  title: string
  content: string
  tags: string[]
}