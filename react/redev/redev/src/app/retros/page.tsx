import { Suspense } from 'react'
import { createClient } from '@/lib/supabase'
import RetroCard from '@/components/retro/RetroCard'
import TagFilter from '@/components/retro/TagFilter'
import SpaceFilter from '@/components/retro/SpaceFilter'
import { Retro, Space } from '@/types'

interface Props {
  searchParams: Promise<{
    q?: string
    tag?: string
    space_id?: string
  }>
}

// 회고 목록 페이지 (Server Component)
// searchParams로 검색어/태그/스페이스 필터를 받아 Supabase 쿼리에 적용
export default async function RetrosPage({ searchParams }: Props) {
  const { q, tag, space_id } = (await searchParams) ?? {}
  const supabase = createClient()

  // 스페이스 목록 조회
  const { data: spaces } = await supabase
    .from('spaces')
    .select('*')
    .order('created_at', { ascending: true })

  // 회고 목록 쿼리 (최신순)
  let query = supabase
    .from('retros')
    .select('*, space:spaces(id, name, created_at)')
    .order('created_at', { ascending: false })

  // 검색어 필터 (제목 + 내용 + 태그 통합 검색)
  if (q) {
    query = query.or(
      `title.ilike.%${q}%,content.ilike.%${q}%,tags.cs.{${q}}`
    )
  }

  // 태그 필터
  if (tag) {
    query = query.contains('tags', [tag])
  }

  // 스페이스 필터
  if (space_id) {
    query = query.eq('space_id', space_id)
  }

  const { data: retros, error } = await query
  if (error) throw error

  // 전체 태그 목록 추출 (중복 제거)
  const allTags = [...new Set(retros.flatMap((retro: Retro) => retro.tags))]

  return (
    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e8eef8', padding: '24px' }}>
      {/* 상단 타이틀 + 필터 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#191f28' }}>회고 목록</h1>
      </div>

      {/* 스페이스 탭 필터 */}
      <Suspense fallback={<div style={{ height: '32px', background: '#f5f8ff', borderRadius: '8px', marginBottom: '12px' }} />}>
        <SpaceFilter spaces={spaces ?? []} />
      </Suspense>

      {/* 태그 필터 */}
      <Suspense fallback={<div style={{ height: '32px', background: '#f5f8ff', borderRadius: '8px', marginBottom: '12px' }} />}>
        <TagFilter tags={allTags} />
      </Suspense>

      {/* 검색/필터 결과 표시 */}
      {(q || tag || space_id) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', color: '#6b7684' }}>
          <span>
            {q && `"${q}" 검색 결과`}
            {q && (tag || space_id) && ' · '}
            {tag && `#${tag}`}
            {space_id && spaces?.find((s: Space) => s.id === space_id)?.name}
          </span>
          <a href="/retros" style={{ color: '#7fb3ff', textDecoration: 'none', fontSize: '12px' }}>
            초기화
          </a>
        </div>
      )}

      {/* 총 개수 */}
      <p style={{ fontSize: '13px', color: '#6b7684', marginBottom: '16px' }}>
        총 {retros.length}개의 회고
      </p>

      {/* 회고 목록 */}
      {retros.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#8b95a1' }}>
          <p style={{ fontSize: '15px', marginBottom: '8px' }}>회고가 없어요</p>
          <p style={{ fontSize: '13px' }}>
            {q || tag || space_id ? '다른 검색어나 필터를 시도해보세요' : '오늘의 배움을 기록해보세요 →'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {retros.map((retro: Retro) => (
            <RetroCard key={retro.id} retro={retro} />
          ))}
        </div>
      )}
    </div>
  )
}