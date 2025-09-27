// src/pages/index.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InstallPrompt from '../components/InstallPrompt';

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <Navbar />

      <section style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ marginTop: 0 }}>Welcome to CarScan Pro</h1>
        <p>Your AI-powered automotive assistant.</p>

        <ul style={{ lineHeight: 1.8 }}>
          <li>Identify car parts, bolts, and tools instantly using your camera.</li>
          <li>Get detailed information, removal guides, and tool recommendations.</li>
        </ul>

        <div className="cta">
          <a className="btn" href="/scan">Scan Parts</a>
          <a className="btn" href="/browse">Find Tools</a>
          <a className="btn" href="/browse">Get Guides</a>
          <a className="btn" href="/onboarding">Onboarding</a>
          <a className="btn" href="/about">About</a>
          {/* Install (PWA) button */}
          <InstallPrompt className="btn" />
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .cta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
        .btn {
          padding: 10px 14px;
          border: 1px solid #111;
          border-radius: 10px;
          background: #fff;
          text-decoration: none;
          color: #111;
        }
      `}</style>
    </main>
  );
}
