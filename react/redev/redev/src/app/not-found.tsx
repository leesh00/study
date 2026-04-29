// 404 페이지
export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="text-center py-20">
        <p className="text-xl font-semibold text-gray-700 mb-2">
          페이지를 찾을 수 없어요
        </p>
        <p className="text-gray-400 text-sm mb-6">
          삭제되었거나 존재하지 않는 페이지입니다
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          홈으로
        </a>
      </div>
    </main>
  )
}