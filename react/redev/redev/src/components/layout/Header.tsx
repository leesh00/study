'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

function SearchInput() {
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
    router.push(`/retros?${params.toString()}`)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      border: '1px solid #e8eef8',
      borderRadius: '8px',
      padding: '6px 12px',
      width: '200px',
      background: '#ffffff',
    }}>
      <svg width="14" height="14" fill="none" stroke="#8b95a1" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
        placeholder="검색"
        style={{
          border: 'none',
          outline: 'none',
          fontSize: '13px',
          color: '#191f28',
          background: 'transparent',
          width: '100%',
        }}
      />
    </div>
  )
}

// 헤더 내부 컴포넌트 — usePathname 사용
function HeaderInner() {
  const pathname = usePathname()

  const tabStyle = (active: boolean) => ({
    fontSize: '13px',
    padding: '4px 12px',
    borderRadius: '8px',
    textDecoration: 'none',
    background: active ? '#f5f8ff' : 'transparent',
    color: active ? '#191f28' : '#6b7684',
    fontWeight: active ? 500 : 400,
  })

  return (
    <header style={{
      borderBottom: '1px solid #e8eef8',
      background: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {/* 로고 */}
        <a
          href="/"
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: '#191f28',
            marginRight: '16px',
            textDecoration: 'none',
          }}>
          회개하라!
        </a>

        {/* 탭 */}
        <a href="/" style={tabStyle(pathname === '/')}>대시보드</a>
        <a href="/retros" style={tabStyle(pathname === '/retros')}>회고 목록</a>

        {/* 우측 영역 */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Suspense fallback={<div style={{ width: '200px', height: '32px', background: '#f5f8ff', borderRadius: '8px' }} />}>
            <SearchInput />
          </Suspense>
          <a href="/settings" style={{
            fontSize: '13px',
            color: pathname === '/settings' ? '#191f28' : '#6b7684',
            textDecoration: 'none',
          }}>
            설정
          </a>
          <a href="/retros/new" style={{
            fontSize: '13px',
            padding: '6px 16px',
            background: '#7fb3ff',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}>
            회고 작성
          </a>
        </div>
      </div>
    </header>
  )
}

// Suspense로 감싸서 export
export default function Header() {
  return (
    <Suspense fallback={
      <div style={{
        height: '56px',
        borderBottom: '1px solid #e8eef8',
        background: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }} />
    }>
      <HeaderInner />
    </Suspense>
  )
}