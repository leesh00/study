'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

// 검색창 내부 컴포넌트 (useSearchParams 사용)
function SearchBarInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (query.trim()) {
      params.set('q', query.trim())
    } else {
      params.delete('q')
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
        placeholder="제목, 내용, 태그로 검색"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        검색
      </button>
    </div>
  )
}

// useSearchParams를 Suspense로 감싸서 export
export default function SearchBar() {
  return (
    <Suspense fallback={
      <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mb-6" />
    }>
      <SearchBarInner />
    </Suspense>
  )
}