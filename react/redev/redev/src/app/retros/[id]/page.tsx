import { createServerClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import DeleteButton from '@/components/retro/DeleteButton'
import EditButton from '@/components/retro/EditButton'

interface Props {
  params: Promise<{ id: string }>
}

// 회고 상세 페이지 (Server Component)
// id로 Supabase에서 단건 조회 후 표시
export default async function RetroDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createServerClient()
  const { data: retro } = await supabase
    .from('retros')
    .select('*, space:spaces(id, name, created_at)')
    .eq('id', id)
    .single()

  if (!retro) notFound()

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e8eef8',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '720px',
      margin: '0 auto',
    }}>
      {/* 목록으로 돌아가기 */}
      <div style={{ marginBottom: '20px' }}>
        <a href="/retros" style={{ fontSize: '13px', color: '#7fb3ff', textDecoration: 'none' }}>
          ← 목록으로
        </a>
      </div>

      {/* 스페이스 + 날짜 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        {retro.space ? (
          <span style={{
            fontSize: '12px',
            padding: '3px 12px',
            background: '#f5f8ff',
            color: '#6b7684',
            borderRadius: '99px',
            border: '1px solid #e8eef8',
          }}>
            {retro.space.name}
          </span>
        ) : <span />}
        <span style={{ fontSize: '12px', color: '#8b95a1' }}>
          {new Date(retro.created_at).toLocaleDateString('ko-KR')}
        </span>
      </div>

      {/* 제목 */}
      <h1 style={{ fontSize: '22px', fontWeight: 500, color: '#191f28', marginBottom: '16px' }}>
        {retro.title}
      </h1>

      {/* 본문 내용 */}
      <p style={{
        fontSize: '15px',
        color: '#6b7684',
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
        marginBottom: '24px',
      }}>
        {retro.content}
      </p>

      {/* 태그 목록 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}>
        {retro.tags.map((tag: string) => (
          <span key={tag} style={{
            fontSize: '12px',
            padding: '4px 12px',
            background: '#f5f8ff',
            color: '#6b7684',
            borderRadius: '99px',
            border: '1px solid #e8eef8',
          }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* 수정/삭제 버튼 */}
      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #e8eef8', paddingTop: '20px' }}>
        <EditButton id={retro.id} />
        <DeleteButton id={retro.id} />
      </div>
    </div>
  )
}