import { createClient } from '@/lib/supabase'
import RetroCard from '@/components/retro/RetroCard'
import { Retro } from '@/types'

export default async function HomePage() {
  const supabase = createClient()
  const { data: retros, error } = await supabase
    .from('retros')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">회개하라! 🙏</h1>
        <a
          href="/retros/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + 새 회고
        </a>
      </div>

      {retros.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">아직 회고가 없어요</p>
          <p className="text-sm mt-2">오늘의 배움을 기록해보세요 →</p>
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