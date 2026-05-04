import LoginButton from './LoginButton'

// 로그인 페이지 (Server Component)
export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f8ff',
    }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e8eef8',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 500, color: '#191f28', marginBottom: '8px' }}>
          회개하라! 🙏
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7684', marginBottom: '32px' }}>
          개발 인사이트를 기록하고 탐색하세요
        </p>
        <LoginButton />
      </div>
    </div>
  )
}