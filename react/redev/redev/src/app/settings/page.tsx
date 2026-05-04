import { createClient } from '@/lib/supabase'
import SpaceForm from './SpaceForm'

// 스페이스 설정 페이지 (Server Component)
// 스페이스 목록을 불러와 SpaceForm에 전달
export default async function SettingsPage() {
  const supabase = createClient()
  const { data: spaces } = await supabase
    .from('spaces')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div>
      <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#191f28', marginBottom: '20px' }}>
        설정
      </h1>
      <SpaceForm spaces={spaces ?? []} />
    </div>
  )
}