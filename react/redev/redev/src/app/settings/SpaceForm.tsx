'use client'

import { useActionState } from 'react'
import { createSpace, deleteSpace } from './actions'
import { Space } from '@/types'

interface Props {
  spaces: Space[]
}

// 스페이스 추가/삭제 폼 (Client Component)
export default function SpaceForm({ spaces }: Props) {
  const [state, formAction] = useActionState(createSpace, null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 스페이스 추가 폼 */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e8eef8',
        borderRadius: '12px',
        padding: '20px',
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: 500, color: '#191f28', marginBottom: '16px' }}>
          새 스페이스 추가
        </h2>
        <form action={formAction} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            name="name"
            placeholder="스페이스 이름 입력"
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #e8eef8',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#191f28',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              background: '#7fb3ff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            추가
          </button>
        </form>
        {state?.error && (
          <p style={{ fontSize: '12px', color: '#ff7d85', marginTop: '8px' }}>
            {state.error}
          </p>
        )}
      </div>

      {/* 스페이스 목록 */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e8eef8',
        borderRadius: '12px',
        padding: '20px',
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: 500, color: '#191f28', marginBottom: '16px' }}>
          스페이스 목록
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {spaces.map(space => (
            <div
              key={space.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                border: '1px solid #e8eef8',
                borderRadius: '8px',
              }}
            >
              <span style={{ fontSize: '14px', color: '#191f28' }}>{space.name}</span>
              <button
                onClick={async () => {
                  if (!confirm(`"${space.name}" 스페이스를 삭제할까요?\n해당 스페이스의 회고는 삭제되지 않습니다.`)) return
                  await deleteSpace(space.id)
                  window.location.reload()
                }}
                style={{
                  padding: '4px 12px',
                  background: '#fff0f0',
                  color: '#ff7d85',
                  border: '1px solid #ffd6d8',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}