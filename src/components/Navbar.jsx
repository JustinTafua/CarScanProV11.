export default function Navbar(){
  const link={textDecoration:'none',padding:'6px 10px',color:'#fff',fontWeight:600};
  const bar ={display:'flex',justifyContent:'space-between',padding:'16px',gap:12};
  return(
    <nav style={bar} aria-label="Main navigation">
      <a href="/" style={{...link,fontSize:18}}>CarScan Pro</a>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <a style={link} href="/">Home</a>
        <a style={link} href="/scan">Scan</a>
        <a style={link} href="/guides">Guides</a>       {/* ✅ replaces /browse */}
        <a style={link} href="/tutorial">Tutorial</a>   {/* ✅ replaces /onboarding */}
        <a style={link} href="/pricing">Pricing</a>
        <a style={link} href="/assistant">Assistant</a>
        <a style={link} href="/settings">Settings</a>
        <a style={link} href="/about">About</a>
      </div>
    </nav>
  );
}