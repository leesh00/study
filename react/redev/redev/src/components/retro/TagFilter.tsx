'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  tags: string[]
}

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
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            selectedTag === tag
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  )
}

export default function TagFilter({ tags }: Props) {
  return (
    <Suspense fallback={
      <div className="h-8 w-full bg-gray-100 rounded-lg animate-pulse" />
    }>
      <TagFilterInner tags={tags} />
    </Suspense>
  )
}