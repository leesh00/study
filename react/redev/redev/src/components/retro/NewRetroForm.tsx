'use client'

import { useActionState, useState } from 'react'
import { createRetro, ActionState } from '@/app/retros/actions'
import { Space } from '@/types'

interface Props {
  spaces: Space[]
}

// 회고 작성 폼 (Client Component)
export default function NewRetroForm({ spaces }: Props) {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>('')
  const [state, formAction] = useActionState<ActionState, FormData>(createRetro, null)

  // 태그 추가 (중복 제거)
  const addTag = (): void => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  // 태그 삭제
  const removeTag = (tag: string): void => {
    setTags(tags.filter(t => t !== tag))
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #e8eef8',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#191f28',
    outline: 'none',
    background: '#ffffff',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#191f28',
    marginBottom: '6px',
  }

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* 스페이스 선택 */}
      <div>
        <label style={labelStyle}>스페이스</label>
        <select
          name="space_id"
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="">선택 안함</option>
          {spaces.map((space: Space) => (
            <option key={space.id} value={space.id}>{space.name}</option>
          ))}
        </select>
      </div>

      {/* 제목 입력 */}
      <div>
        <label style={labelStyle}>제목</label>
        <input
          type="text"
          name="title"
          placeholder="오늘 배운 것을 한 줄로"
          style={inputStyle}
        />
        {state?.error?.title && (
          <p style={{ fontSize: '12px', color: '#ff7d85', marginTop: '4px' }}>{state.error.title[0]}</p>
        )}
      </div>

      {/* 내용 입력 */}
      <div>
        <label style={labelStyle}>내용</label>
        <textarea
          name="content"
          rows={8}
          placeholder="구체적으로 무엇을 배웠고, 왜 중요한지 작성해보세요"
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        {state?.error?.content && (
          <p style={{ fontSize: '12px', color: '#ff7d85', marginTop: '4px' }}>{state.error.content[0]}</p>
        )}
      </div>

      {/* 태그 입력 */}
      <div>
        <label style={labelStyle}>태그</label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="태그 입력 후 Enter"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            type="button"
            onClick={addTag}
            style={{
              padding: '8px 16px',
              border: '1px solid #e8eef8',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#6b7684',
              cursor: 'pointer',
              background: '#ffffff',
              whiteSpace: 'nowrap',
            }}
          >
            추가
          </button>
        </div>

        {/* 추가된 태그 목록 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              background: '#f5f8ff',
              border: '1px solid #e8eef8',
              borderRadius: '99px',
              fontSize: '12px',
              color: '#6b7684',
            }}>
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b95a1', padding: '0', fontSize: '14px' }}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* 태그 배열을 JSON 문자열로 hidden input에 저장 */}
        <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      </div>

      {/* 제출/취소 버튼 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: '10px',
            background: '#7fb3ff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          회고 저장
        </button>
        <a
          href="/retros"
          style={{
            padding: '10px 20px',
            border: '1px solid #e8eef8',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#6b7684',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          취소
        </a>
      </div>

      {state?.error?.general && (
        <p style={{ fontSize: '12px', color: '#ff7d85', textAlign: 'center' }}>{state.error.general}</p>
      )}
    </form>
  )
}