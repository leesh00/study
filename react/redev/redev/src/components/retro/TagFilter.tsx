'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  // 전체 회고에서 추출한 중복 없는 태그 목록
  tags: string[]
}

// 태그 클릭 시 URL searchParams의 tag 파라미터를 변경하는 필터 컴포넌트
// 같은 태그 재클릭 시 필터 해제
export default function TagFilter({ tags }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTag = searchParams.get('tag')

  // 태그 클릭 시 URL 파라미터 변경
  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedTag === tag) {
      // 같은 태그 클릭 시 필터 해제
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