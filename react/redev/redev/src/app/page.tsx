import { createServerClient } from '@/lib/supabase-server'
import { Retro } from '@/types'

// 대시보드 페이지 (Server Component)
// 전체 회고 데이터를 집계하여 통계 표시
export default async function DashboardPage() {
  const supabase = await createServerClient()

  // 전체 회고 조회
  const { data: retros, error } = await supabase
    .from('retros')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  // 이번달 작성 수 계산
  const now = new Date()
  const thisMonthCount = retros.filter((retro: Retro) => {
    const created = new Date(retro.created_at)
    return (
      created.getFullYear() === now.getFullYear() &&
      created.getMonth() === now.getMonth()
    )
  }).length

  // 태그별 카운트 집계
  const tagCountMap: Record<string, number> = {}
  retros.forEach((retro: Retro) => {
    retro.tags.forEach(tag => {
      tagCountMap[tag] = (tagCountMap[tag] || 0) + 1
    })
  })

  // 태그 카운트 내림차순 정렬
  const tagStats = Object.entries(tagCountMap)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)

  // 최대 태그 카운트 (바 차트 비율 계산용)
  const maxTagCount = tagStats[0]?.count ?? 1

  // 활성 태그 수
  const activeTagCount = tagStats.length

  // 상위 5개 태그
  const topTags = tagStats.slice(0, 5)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 통계 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e8eef8',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <p style={{ fontSize: '13px', color: '#6b7684', marginBottom: '8px' }}>총 회고 수</p>
          <p style={{ fontSize: '28px', fontWeight: 500, color: '#191f28', marginBottom: '4px' }}>{retros.length}</p>
          <p style={{ fontSize: '12px', color: '#8b95a1' }}>전체 누적 회고</p>
        </div>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e8eef8',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <p style={{ fontSize: '13px', color: '#6b7684', marginBottom: '8px' }}>이번 달 작성</p>
          <p style={{ fontSize: '28px', fontWeight: 500, color: '#191f28', marginBottom: '4px' }}>{thisMonthCount}</p>
          <p style={{ fontSize: '12px', color: '#8b95a1' }}>
            {now.getMonth() + 1}월 기준
          </p>
        </div>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e8eef8',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <p style={{ fontSize: '13px', color: '#6b7684', marginBottom: '8px' }}>활성 태그</p>
          <p style={{ fontSize: '28px', fontWeight: 500, color: '#191f28', marginBottom: '4px' }}>{activeTagCount}</p>
          <p style={{ fontSize: '12px', color: '#8b95a1' }}>사용 중인 태그</p>
        </div>
      </div>

      {/* 상위 태그 요약 */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e8eef8',
        borderRadius: '12px',
        padding: '20px',
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: 500, color: '#191f28', marginBottom: '12px' }}>
          상위 태그 요약
        </h2>
        {topTags.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#8b95a1' }}>아직 태그가 없어요</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {topTags.map(({ tag, count }) => (
              <a
                key={tag}
                href={`/retros?tag=${tag}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px 16px',
                  border: '1px solid #e8eef8',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  background: '#f5f8ff',
                  minWidth: '80px',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#191f28' }}>#{tag}</span>
                <span style={{ fontSize: '12px', color: '#6b7684', marginTop: '4px' }}>회고 {count}건</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* 태그별 통계 */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e8eef8',
        borderRadius: '12px',
        padding: '20px',
      }}>
        <h2 style={{ fontSize: '15px', fontWeight: 500, color: '#191f28', marginBottom: '16px' }}>
          태그별 통계
        </h2>
        {tagStats.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#8b95a1' }}>아직 태그가 없어요</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tagStats.map(({ tag, count }) => (
              <a
                key={tag}
                href={`/retros?tag=${tag}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  border: '1px solid #e8eef8',
                  borderRadius: '12px',
                  padding: '14px 16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#191f28' }}>#{tag}</span>
                    <span style={{ fontSize: '12px', color: '#6b7684' }}>{count}건</span>
                  </div>
                  {/* 바 차트 */}
                  <div style={{ height: '4px', background: '#f5f8ff', borderRadius: '2px' }}>
                    <div style={{
                      height: '4px',
                      background: '#7fb3ff',
                      borderRadius: '2px',
                      width: `${(count / maxTagCount) * 100}%`,
                      transition: 'width 0.3s',
                    }} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}