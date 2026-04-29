'use client'

// 페이지에서 throw된 에러를 자동으로 캐치하는 에러 UI
// reset 함수로 페이지 재시도 가능
interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="text-center py-20">
        <p className="text-xl font-semibold text-gray-700 mb-2">
          문제가 발생했어요
        </p>
        <p className="text-gray-400 text-sm mb-6">
          {error.message || '데이터를 불러오지 못했습니다'}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            다시 시도
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm"
          >
            홈으로
          </a>
        </div>
      </div>
    </main>
  )
}