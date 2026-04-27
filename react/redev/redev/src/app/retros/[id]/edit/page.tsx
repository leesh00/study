import { createClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import DeleteButton from '@/components/retro/DeleteButton'

interface Props {
  params: Promise<{ id: string }>
}

// 회고 상세 페이지 (Server Component)
// params.id로 Supabase에서 단건 조회
export default async function RetroDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = createClient()
  const { data: retro } = await supabase
    .from('retros')
    .select('*')
    .eq('id', id)
    .single()

  // 존재하지 않는 id면 404 페이지로 이동
  if (!retro) notFound()

  return (
    <main className="max-w-3xl mx-auto p-8">
      {/* 목록으로 돌아가기 */}
      <div className="mb-6">
        <a href="/" className="text-blue-500 hover:underline text-sm">
          ← 목록으로
        </a>
      </div>

      {/* 날짜 */}
      <div className="flex justify-end mb-4">
        <span className="text-gray-400 text-sm">
          {new Date(retro.created_at).toLocaleDateString('ko-KR')}
        </span>
      </div>

      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-6">{retro.title}</h1>

      {/* 본문 내용 */}
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
        {retro.content}
      </p>

      {/* 태그 목록 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {retro.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 수정/삭제 버튼 */}
      <div className="flex gap-3">
        <a
          href={`/retros/${retro.id}/edit`}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
        >
          수정
        </a>
        <DeleteButton id={retro.id} />
      </div>
    </main>
  )
}