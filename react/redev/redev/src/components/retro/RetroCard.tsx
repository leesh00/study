import { Retro } from '@/types'

interface Props {
  retro: Retro
}

// 목록 페이지에서 회고 하나를 카드 형태로 표시하는 컴포넌트
// 클릭 시 상세 페이지로 이동
export default function RetroCard({ retro }: Props) {
  return (
    <a href={`/retros/${retro.id}`} className="block">
      <div className="p-4 md:p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all">
        {/* 날짜 */}
        <div className="flex justify-end mb-3">
          <span className="text-gray-400 text-sm">
            {new Date(retro.created_at).toLocaleDateString('ko-KR')}
          </span>
        </div>

        {/* 제목 */}
        <h2 className="text-lg font-semibold mb-2 text-gray-900">
          {retro.title}
        </h2>

        {/* 내용 미리보기 (2줄 제한) */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {retro.content}
        </p>

        {/* 태그 목록 */}
        <div className="flex flex-wrap gap-2">
          {retro.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}