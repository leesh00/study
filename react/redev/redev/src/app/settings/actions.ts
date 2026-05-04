'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase'

// 새 스페이스 생성
export async function createSpace(prevState: unknown, formData: FormData): Promise<{ error?: string } | null> {
  const name = formData.get('name') as string

  if (!name?.trim()) {
    return { error: '스페이스 이름을 입력해주세요' }
  }

  const supabase = createClient()

  // 중복 이름 확인
  const { data: existing } = await supabase
    .from('spaces')
    .select('id')
    .eq('name', name.trim())
    .single()

  if (existing) {
    return { error: '이미 존재하는 스페이스입니다' }
  }

  const { error } = await supabase
    .from('spaces')
    .insert({ name: name.trim() })

  if (error) return { error: error.message }

  revalidatePath('/settings')
  revalidatePath('/retros')
  return null
}

// 스페이스 삭제
export async function deleteSpace(id: string): Promise<void> {
  const supabase = createClient()

  // 해당 스페이스 사용 중인 회고의 space_id를 null로 초기화
  await supabase
    .from('retros')
    .update({ space_id: null })
    .eq('space_id', id)

  await supabase
    .from('spaces')
    .delete()
    .eq('id', id)

  revalidatePath('/settings')
  revalidatePath('/retros')
}