import { createClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import DeleteButton from '@/components/retro/DeleteButton'
import EditButton from '@/components/retro/EditButton'

interface Props {
  params: Promise<{ id: string }>
}

// 회고 상세 페이지
// id로 Supabase에서 단건 조회 후 표시
export default async function RetroDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = createClient()
  const { data: retro } = await supabase
    .from('retros')
    .select('*')
    .eq('id', id)
    .single()

  if (!retro) notFound()

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="mb-6">
        <a href="/" className="text-blue-500 hover:underline text-sm">
          ← 목록으로
        </a>
      </div>

      <div className="flex items-center justify-end mb-4">
        <span className="text-gray-400 text-sm">
          {new Date(retro.created_at).toLocaleDateString('ko-KR')}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{retro.title}</h1>

      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
        {retro.content}
      </p>

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

      <div className="flex gap-3">
        <div className="flex gap-3">
          <EditButton id={retro.id} />
          <DeleteButton id={retro.id} />
        </div>
      </div>
    </main>
  )
}