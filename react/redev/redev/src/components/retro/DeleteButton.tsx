'use client'

import { deleteRetro } from '@/app/retros/actions'

interface Props {
  id: string
}

// 회고 삭제 버튼
export default function DeleteButton({ id }: Props) {
  const handleDelete = async (): Promise<void> => {
    if (!confirm('정말 삭제할까요?')) return
    await deleteRetro(id)
    window.location.href = '/retros'
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '8px 20px',
        border: '1px solid #ffd6d8',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#ff7d85',
        cursor: 'pointer',
        background: '#fff0f0',
      }}
    >
      삭제
    </button>
  )
}