'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { retroSchema } from '@/lib/validations'

// 새 회고 생성 Server Action
// useActionState와 함께 사용하므로 prevState를 첫 번째 인자로 받음
export async function createRetro(prevState: unknown, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    tags: JSON.parse(formData.get('tags') as string || '[]'),
  }

  // Zod로 입력값 유효성 검증
  const parsed = retroSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  const supabase = createClient()
  const { error } = await supabase.from('retros').insert({
    title: parsed.data.title,
    content: parsed.data.content,
    tags: parsed.data.tags,
  })

  if (error) {
    return { error: { general: error.message } }
  }

  // 목록 페이지 캐시 무효화 후 이동
  revalidatePath('/')
  redirect('/')
}

// 기존 회고 수정 Server Action
// bind로 id를 미리 바인딩한 후 useActionState에 전달
export async function updateRetro(id: string, prevState: unknown, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    tags: JSON.parse(formData.get('tags') as string || '[]'),
  }

  // Zod로 입력값 유효성 검증
  const parsed = retroSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  const supabase = createClient()
  const { error } = await supabase
    .from('retros')
    .update({
      title: parsed.data.title,
      content: parsed.data.content,
      tags: parsed.data.tags,
    })
    .eq('id', id)

  if (error) {
    return { error: { general: error.message } }
  }

  // 목록 + 상세 페이지 캐시 무효화 후 상세로 이동
  revalidatePath('/')
  revalidatePath(`/retros/${id}`)
  redirect(`/retros/${id}`)
}

// 회고 삭제 Server Action
// 삭제 후 목록 페이지 캐시 무효화
export async function deleteRetro(id: string) {
  const supabase = createClient()
  await supabase.from('retros').delete().eq('id', id)
  revalidatePath('/')
}