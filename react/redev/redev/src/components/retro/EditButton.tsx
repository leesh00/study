'use client'

interface Props {
  id: string
}

// 수정 페이지로 이동하는 버튼 컴포넌트
// window.location.href로 강제 이동
export default function EditButton({ id }: Props) {
  return (
    <button
      onClick={() => { window.location.href = `/retros/${id}/edit` }}
      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
    >
      수정
    </button>
  )
}