'use client'

import { useActionState, useState } from 'react'
import { updateRetro, ActionState } from '@/app/retros/actions'
import { Retro } from '@/types'

interface Props {
  retro: Retro
}

export default function EditForm({ retro }: Props) {
  // 기존 태그 목록으로 초기화
  const [tags, setTags] = useState<string[]>(retro.tags)
  const [tagInput, setTagInput] = useState('')

  // id를 bind로 고정한 updateRetro를 useActionState에 전달
  const updateRetroWithId = updateRetro.bind(null, retro.id)
  const [state, formAction] = useActionState<ActionState, FormData>(updateRetroWithId, null)

  // 태그 추가 (중복 제거)
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  // 태그 삭제
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* 제목 입력 (기존값 채워진 상태) */}
      <div>
        <label className="block text-sm font-medium mb-2">제목</label>
        <input
          type="text"
          name="title"
          defaultValue={retro.title}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.error?.title && (
          <p className="text-red-500 text-sm mt-1">{state.error.title[0]}</p>
        )}
      </div>

      {/* 내용 입력 (기존값 채워진 상태) */}
      <div>
        <label className="block text-sm font-medium mb-2">내용</label>
        <textarea
          name="content"
          rows={8}
          defaultValue={retro.content}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.error?.content && (
          <p className="text-red-500 text-sm mt-1">{state.error.content[0]}</p>
        )}
      </div>

      {/* 태그 입력 (기존 태그 채워진 상태) */}
      <div>
        <label className="block text-sm font-medium mb-2">태그</label>
        <div className="flex gap-2 mb-2">
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            추가
          </button>
        </div>

        {/* 추가된 태그 목록 */}
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-blue-900"
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
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          수정 완료
        </button>
        <a
          href={`/retros/${retro.id}`}
          className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium text-center"
        >
          취소
        </a>
      </div>

      {state?.error?.general && (
        <p className="text-red-500 text-center">{state.error.general}</p>
      )}
    </form>
  )
}