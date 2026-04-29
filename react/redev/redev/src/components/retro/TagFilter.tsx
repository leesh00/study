'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  tags: string[]
}

// 태그 필터 내부 컴포넌트 (useSearchParams 사용)
function TagFilterInner({ tags }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTag = searchParams.get('tag')

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedTag === tag) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    router.push(`/?${params.toString()}`)
  }

  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTag === tag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  )
}

// useSearchParams를 Suspense로 감싸서 export
export default function TagFilter({ tags }: Props) {
  return (
    <Suspense fallback={
      <div className="h-7 w-full bg-gray-200 rounded-lg animate-pulse mb-6" />
    }>
      <TagFilterInner tags={tags} />
    </Suspense>
  )
}