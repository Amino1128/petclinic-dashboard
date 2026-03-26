import { MoonFilled } from '@ant-design/icons'

function Header() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 18,
        flexWrap: 'wrap',
        marginBottom: 24,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: '14px 18px',
          minWidth: 88,
          boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 18,
            background: '#0f172a',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
          }}
        >
          <MoonFilled />
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 999,
          padding: '18px 34px',
          boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
          fontSize: 22,
          fontWeight: 700,
          color: '#334155',
        }}
      >
        PetMedical+
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 999,
          padding: '18px 34px',
          boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
          fontSize: 22,
          fontWeight: 700,
          color: '#475569',
        }}
      >
        Monday, April 6 , 2026
      </div>
    </div>
  )
}

export default Header