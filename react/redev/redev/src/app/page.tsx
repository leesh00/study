import { Suspense } from 'react'
import { createClient } from '@/lib/supabase'
import RetroCard from '@/components/retro/RetroCard'
import SearchBar from '@/components/retro/SearchBar'
import TagFilter from '@/components/retro/TagFilter'
import { Retro } from '@/types'

interface Props {
  searchParams: Promise<{
    q?: string
    tag?: string
  }>
}

// 메인 페이지 (Server Component)
// searchParams로 검색어/태그 필터를 받아 Supabase 쿼리에 적용
export default async function HomePage({ searchParams }: Props) {
  const { q, tag } = (await searchParams) ?? {}
  const supabase = createClient()

  // 기본 쿼리 (최신순 정렬)
  let query = supabase
    .from('retros')
    .select('*')
    .order('created_at', { ascending: false })

  // 검색어 필터 적용 (제목 + 내용 + 태그 통합 검색)
  if (q) {
    query = query.or(
      `title.ilike.%${q}%,content.ilike.%${q}%,tags.cs.{${q}}`
    )
  }

  // 태그 필터 적용 (배열 포함 여부 검사)
  if (tag) {
    query = query.contains('tags', [tag])
  }

  const { data: retros, error } = await query

  if (error) throw error

  // 전체 회고에서 중복 없는 태그 목록 추출
  const allTags = [...new Set(retros.flatMap((retro: Retro) => retro.tags))]

  return (
    <main className="max-w-3xl mx-auto p-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">회개하라! 🙏</h1>
        <a
          href="/retros/new"
          className="px-3 py-2 md:px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base whitespace-nowrap"
        >
          + 새 회고
        </a>
      </div>

      {/* 검색창 - useSearchParams 사용으로 Suspense 필수 */}
      <Suspense fallback={
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mb-6" />
      }>
        <SearchBar />
      </Suspense>

      {/* 태그 필터 - useSearchParams 사용으로 Suspense 필수 */}
      <Suspense fallback={
        <div className="h-7 w-full bg-gray-200 rounded-lg animate-pulse mb-6" />
      }>
        <TagFilter tags={allTags} />
      </Suspense>

      {/* 검색/필터 결과 표시 */}
      {(q || tag) && (
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <span>
            {q && `"${q}" 검색 결과`}
            {q && tag && ' · '}
            {tag && `#${tag} 필터`}
          </span>
          <a href="/" className="text-blue-500 hover:underline">
            초기화
          </a>
        </div>
      )}

      {/* 회고 목록 */}
      {retros.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">회고가 없어요</p>
          <p className="text-sm mt-2">
            {q || tag ? '다른 검색어나 태그를 시도해보세요' : '오늘의 배움을 기록해보세요 →'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {retros.map((retro: Retro) => (
            <RetroCard key={retro.id} retro={retro} />
          ))}
        </div>
      )}
    </main>
  )
}