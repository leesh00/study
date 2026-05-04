'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import { retroSchema } from '@/lib/validations'

// Server Action 반환 타입 정의
export type ActionState = {
  error?: {
    title?: string[]
    content?: string[]
    tags?: string[]
    space_id?: string[]
    general?: string
  }
} | null

// 새 회고 생성 Server Action
export async function createRetro(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    tags: JSON.parse(formData.get('tags') as string || '[]'),
    space_id: formData.get('space_id') as string || null,
  }

  const parsed = retroSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createServerClient()

  // 현재 로그인한 사용자 정보 조회
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { general: '로그인이 필요합니다' } }

  const { error } = await supabase.from('retros').insert({
    title: parsed.data.title,
    content: parsed.data.content,
    tags: parsed.data.tags,
    space_id: parsed.data.space_id ?? null,
    user_id: user.id,
  })

  if (error) return { error: { general: error.message } }

  revalidatePath('/')
  revalidatePath('/retros')
  redirect('/retros')
}

// 기존 회고 수정 Server Action
export async function updateRetro(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    tags: JSON.parse(formData.get('tags') as string || '[]'),
    space_id: formData.get('space_id') as string || null,
  }

  const parsed = retroSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createServerClient()

  // 현재 로그인한 사용자 정보 조회
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { general: '로그인이 필요합니다' } }

  const { error } = await supabase
    .from('retros')
    .update({
      title: parsed.data.title,
      content: parsed.data.content,
      tags: parsed.data.tags,
      space_id: parsed.data.space_id ?? null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: { general: error.message } }

  revalidatePath('/')
  revalidatePath('/retros')
  revalidatePath(`/retros/${id}`)
  redirect(`/retros/${id}`)
}

// 회고 삭제 Server Action
export async function deleteRetro(id: string): Promise<void> {
  const supabase = await createServerClient()

  // 현재 로그인한 사용자 정보 조회
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('retros')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/')
  revalidatePath('/retros')
}