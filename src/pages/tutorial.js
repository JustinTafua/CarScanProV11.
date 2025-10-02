import PageShell from '../components/PageShell';
export default function Tutorial(){
  return (
    <PageShell>
      <h1>Tutorial</h1>
      <section className="card">
        <h2>Welcome to CarScan Pro</h2>
        <p>Your AI-powered automotive assistant.</p>
        <ul>
          <li>Identify car parts, bolts, and tools instantly using your camera.</li>
          <li>Get detailed information, removal guides, and tool recommendations.</li>
        </ul>
        <a className="btn" href="/scan">Start Scanning</a>
      </section>
      <section className="card">
        <h2>Scan Car Parts</h2>
        <ol>
          <li>Point your camera at the part</li>
          <li>Tap <b>Start Camera</b>, then hold steady</li>
          <li>See instant identification & tool tips</li>
        </ol>
      </section>
      <section className="card">
        <h2>Pro tip</h2>
        <p>Ensure good lighting and keep the part centered for best results.</p>
      </section>
    </PageShell>
  );
}