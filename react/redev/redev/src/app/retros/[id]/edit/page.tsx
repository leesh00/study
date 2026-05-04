import { createClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EditForm from '@/components/retro/EditForm'
import { Space } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

// 회고 수정 페이지 (Server Component)
// 기존 회고 데이터와 스페이스 목록을 불러와 EditForm에 전달
export default async function EditRetroPage({ params }: Props) {
  const { id } = await params
  const supabase = createClient()

  // 회고 데이터 조회
  const { data: retro } = await supabase
    .from('retros')
    .select('*, space:spaces(id, name, created_at)')
    .eq('id', id)
    .single()

  if (!retro) notFound()

  // 스페이스 목록 조회
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
        <a href={`/retros/${id}`} style={{ fontSize: '13px', color: '#7fb3ff', textDecoration: 'none' }}>
          ← 상세로 돌아가기
        </a>
      </div>
      <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#191f28', marginBottom: '24px' }}>
        회고 수정
      </h1>
      <EditForm retro={retro} spaces={spaces ?? []} />
    </div>
  )
}