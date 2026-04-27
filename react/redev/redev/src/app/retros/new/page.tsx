'use client'

import { useActionState, useState } from 'react'
import { createRetro } from '../actions'

export default function NewRetroPage() {
  // 태그 목록 상태
  const [tags, setTags] = useState<string[]>([])
  // 태그 입력창 상태
  const [tagInput, setTagInput] = useState('')
  // Server Action 상태 (에러 메시지 등)
  const [state, formAction] = useActionState(createRetro, null)

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
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">새 회고 작성</h1>

      <form action={formAction} className="space-y-6">
        {/* 제목 입력 */}
        <div>
          <label className="block text-sm font-medium mb-2">제목</label>
          <input
            type="text"
            name="title"
            placeholder="오늘 배운 것을 한 줄로"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.error?.title && (
            <p className="text-red-500 text-sm mt-1">{state.error.title[0]}</p>
          )}
        </div>

        {/* 내용 입력 */}
        <div>
          <label className="block text-sm font-medium mb-2">내용</label>
          <textarea
            name="content"
            rows={8}
            placeholder="구체적으로 무엇을 배웠고, 왜 중요한지 작성해보세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.error?.content && (
            <p className="text-red-500 text-sm mt-1">{state.error.content[0]}</p>
          )}
        </div>

        {/* 태그 입력 (Enter 또는 추가 버튼으로 추가) */}
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
            회고 저장
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium text-center"
          >
            취소
          </a>
        </div>

        {state?.error?.general && (
          <p className="text-red-500 text-center">{state.error.general}</p>
        )}
      </form>
    </div>
  )
}