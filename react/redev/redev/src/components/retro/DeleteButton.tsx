'use client'

import { deleteRetro } from '@/app/retros/actions'

interface Props {
  id: string
}

export default function DeleteButton({ id }: Props) {
  const handleDelete = async () => {
    if (!confirm('정말 삭제할까요?')) return
    await deleteRetro(id)
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 text-sm"
    >
      삭제
    </button>
  )
}