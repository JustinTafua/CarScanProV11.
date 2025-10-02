import PageShell from '../components/PageShell';

export default function About(){
  return (
    <PageShell>
      <h1>About CarScan Pro</h1>

      <section className="card">
        <h2>App Description</h2>
        <p>
          CarScan Pro is an advanced automotive scanning application that helps mechanics and DIY
          enthusiasts identify car parts, fasteners, and tools using AI-powered image recognition technology.
        </p>
      </section>

      <section className="card">
        <h2>Creator</h2>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div style={{width:44,height:44,borderRadius:'50%',background:'#2d59ff',display:'grid',placeItems:'center',color:'#fff',fontWeight:700}}>JT</div>
          <div>
            <div><b>Justin Tafua</b></div>
            <div style={{opacity:.8}}>Founder & Developer — Oceanside, California</div>
          </div>
        </div>
        <p style={{marginTop:12}}>
          Justin Tafua is a Samoan-American entrepreneur and software developer from Oceanside, California.
          With a passion for automotive technology and a background in mobile app development, Justin created CarScan Pro
          to bridge the gap between traditional automotive repair and modern AI technology. His vision was to empower both
          professional mechanics and DIY enthusiasts with instant access to part identification and repair guidance, making
          automotive maintenance more accessible to everyone.
        </p>
      </section>

      <section className="card">
        <h2>Features</h2>
        <ul>
          <li>AI-powered part identification</li>
          <li>Bolt and fastener size detection</li>
          <li>Tool recommendation system</li>
          <li>Video repair tutorials</li>
          <li>Parts vendor integration</li>
          <li>Offline scanning capabilities</li>
        </ul>
      </section>
    </PageShell>
  );
}