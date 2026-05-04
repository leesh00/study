import { z } from 'zod'

// 회고 작성/수정 시 입력값 유효성 검증 스키마
export const retroSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 100자 이내'),
  content: z.string().min(1, '내용을 입력해주세요'),
  tags: z.array(z.string()).max(10, '태그는 최대 10개까지'),
  // space_id는 선택사항
  space_id: z.string().nullable().optional(),
})

export type RetroSchema = z.infer<typeof retroSchema>