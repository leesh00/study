import { createServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Google OAuth 콜백 처리 라우트
// Google 로그인 후 Supabase가 이 URL로 리다이렉트
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createServerClient()
    // 인증 코드를 세션으로 교환
    await supabase.auth.exchangeCodeForSession(code)
  }

  // 로그인 성공 후 대시보드로 이동
  return NextResponse.redirect(new URL('/', request.url))
}