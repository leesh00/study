'use client'

import { createClient } from '@/lib/supabase'

// 로그아웃 버튼 (Client Component)
export default function LogoutButton() {
  const handleLogout = async (): Promise<void> => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        fontSize: '13px',
        padding: '6px 14px',
        border: '1px solid #e8eef8',
        borderRadius: '8px',
        color: '#6b7684',
        cursor: 'pointer',
        background: '#ffffff',
      }}
    >
      로그아웃
    </button>
  )
}