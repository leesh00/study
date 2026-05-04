'use client'

interface Props {
  id: string
}

// 수정 페이지로 이동하는 버튼
export default function EditButton({ id }: Props) {
  return (
    <button
      onClick={() => { window.location.href = `/retros/${id}/edit` }}
      style={{
        padding: '8px 20px',
        border: '1px solid #e8eef8',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#6b7684',
        cursor: 'pointer',
        background: '#ffffff',
      }}
    >
      수정
    </button>
  )
}