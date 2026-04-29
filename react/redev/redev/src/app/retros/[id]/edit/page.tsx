import { createClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EditForm from '@/components/retro/EditForm'

interface Props {
  params: Promise<{ id: string }>
}

// 회고 수정 페이지 (Server Component)
// 기존 회고 데이터를 불러와 EditForm에 전달
export default async function EditRetroPage({ params }: Props) {
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
    <main className="max-w-2xl mx-auto p-4 md:p-8">
      {/* 상세 페이지로 돌아가기 */}
      <div className="mb-6">
        <a href={`/retros/${id}`} className="text-blue-500 hover:underline text-sm">
          ← 상세로 돌아가기
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-8">회고 수정</h1>
      <EditForm retro={retro} />
    </main>
  )
}