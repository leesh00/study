'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Space } from '@/types'

interface Props {
  spaces: Space[]
}

// 스페이스 탭 필터 내부 컴포넌트
function SpaceFilterInner({ spaces }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedSpaceId = searchParams.get('space_id')

  // 스페이스 클릭 시 URL 파라미터 변경
  const handleSpaceClick = (spaceId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (spaceId === null) {
      params.delete('space_id')
    } else {
      params.set('space_id', spaceId)
    }
    router.push(`/retros?${params.toString()}`)
  }

  const tabStyle = (active: boolean) => ({
    fontSize: '13px',
    padding: '5px 14px',
    borderRadius: '99px',
    border: `1px solid ${active ? '#191f28' : '#e8eef8'}`,
    background: active ? '#191f28' : '#ffffff',
    color: active ? '#ffffff' : '#6b7684',
    cursor: 'pointer',
    fontWeight: active ? 500 : 400,
    transition: 'all 0.15s',
  })

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
      {/* 전체 탭 */}
      <button
        onClick={() => handleSpaceClick(null)}
        style={tabStyle(selectedSpaceId === null)}
      >
        전체
      </button>

      {/* 스페이스 탭 목록 */}
      {spaces.map((space: Space) => (
        <button
          key={space.id}
          onClick={() => handleSpaceClick(space.id)}
          style={tabStyle(selectedSpaceId === space.id)}
        >
          {space.name}
        </button>
      ))}
    </div>
  )
}

// useSearchParams Suspense 경계 처리
export default function SpaceFilter({ spaces }: Props) {
  return (
    <Suspense fallback={<div style={{ height: '32px', background: '#f5f8ff', borderRadius: '8px', marginBottom: '12px' }} />}>
      <SpaceFilterInner spaces={spaces} />
    </Suspense>
  )
}