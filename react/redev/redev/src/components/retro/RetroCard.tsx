import { Retro } from '@/types'

interface Props {
  retro: Retro
}

// 목록 페이지에서 회고 하나를 카드 형태로 표시하는 컴포넌트
export default function RetroCard({ retro }: Props) {
  return (
    <a href={`/retros/${retro.id}`} className="retro-card-link">
      <div className="retro-card">
        {/* 스페이스 + 날짜 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          {retro.space ? (
            <span style={{
              fontSize: '12px',
              padding: '2px 10px',
              background: '#f5f8ff',
              color: '#6b7684',
              borderRadius: '99px',
              border: '1px solid #e8eef8',
            }}>
              {retro.space.name}
            </span>
          ) : <span />}
          <span style={{ fontSize: '12px', color: '#8b95a1' }}>
            {new Date(retro.created_at).toLocaleDateString('ko-KR')}
          </span>
        </div>

        {/* 제목 */}
        <h2 style={{ fontSize: '15px', fontWeight: 500, color: '#191f28', marginBottom: '6px' }}>
          {retro.title}
        </h2>

        {/* 내용 미리보기 */}
        <p style={{
          fontSize: '13px',
          color: '#6b7684',
          marginBottom: '12px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
        }}>
          {retro.content}
        </p>

        {/* 태그 목록 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {retro.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '11px',
              padding: '2px 8px',
              background: '#f5f8ff',
              color: '#8b95a1',
              borderRadius: '99px',
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}