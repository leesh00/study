'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

// 검색어를 URL searchParams로 전달하는 검색창 컴포넌트
// 서버 컴포넌트(page.tsx)에서 searchParams로 받아 DB 쿼리에 활용
export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // 현재 URL의 검색어로 초기값 설정
  const [query, setQuery] = useState(searchParams.get('q') || '')

  // 검색 실행 시 URL에 q 파라미터 추가
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
        placeholder="검색어를 입력하세요"
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