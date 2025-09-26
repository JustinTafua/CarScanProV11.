export default function Navbar() {
  return (
    <nav style={{
      padding: '12px 16px',
      background: '#0d47a1',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ fontWeight: 700 }}>CarScan Pro v11</div>
      <div style={{ display: 'flex', gap: 12 }}>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
        <a href="/scan" style={{ color: 'white', textDecoration: 'none' }}>Scan</a>
        <a href="/pricing" style={{ color: 'white', textDecoration: 'none' }}>Pricing</a>
        <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
      </div>
    </nav>
  );
}
