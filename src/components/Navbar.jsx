// src/components/Navbar.jsx
export default function Navbar() {
  const linkStyle = { textDecoration: 'none', padding: '6px 10px', color: '#111' };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px',
        borderBottom: '1px solid #eee',
        background: '#fff',
        borderRadius: 12
      }}
    >
      <a href="/" style={{ ...linkStyle, fontWeight: 700 }}>CarScan Pro</a>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a style={linkStyle} href="/scan">Scan</a>
        <a style={linkStyle} href="/onboarding">Onboarding</a>
        <a style={linkStyle} href="/browse">Browse</a>
        <a style={linkStyle} href="/assistant">Assistant</a>
        <a style={linkStyle} href="/pricing">Pro</a>
        <a style={linkStyle} href="/about">About</a>
        <a style={linkStyle} href="/feedback">Feedback</a>
        <a style={linkStyle} href="/settings">Settings</a>
      </div>
    </nav>
  );
}
