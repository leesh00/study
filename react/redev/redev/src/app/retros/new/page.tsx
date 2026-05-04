import { createServerClient } from '@/lib/supabase-server'
import NewRetroForm from '@/components/retro/NewRetroForm'
import { Space } from '@/types'

// 회고 작성 페이지 (Server Component)
// 스페이스 목록을 불러와 폼에 전달
export default async function NewRetroPage() {
  const supabase = await createServerClient()
  const { data: spaces } = await supabase
    .from('spaces')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e8eef8',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '720px',
      margin: '0 auto',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <a href="/retros" style={{ fontSize: '13px', color: '#7fb3ff', textDecoration: 'none' }}>
          ← 목록으로
        </a>
      </div>
      <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#191f28', marginBottom: '24px' }}>
        새 회고 작성
      </h1>
      <NewRetroForm spaces={spaces ?? []} />
    </div>
  )
}