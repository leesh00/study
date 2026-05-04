import { createServerClient as createSSRServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// 서버 컴포넌트 / Server Action에서 사용하는 Supabase 클라이언트
// 쿠키 기반으로 세션을 읽고 씀
export async function createServerClient() {
  const cookieStore = await cookies()

  return createSSRServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component에서는 쿠키 설정 불가 (무시)
          }
        },
      },
    }
  )
}