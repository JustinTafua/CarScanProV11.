import PageShell from "../components/PageShell";

export default function About() {
  return (
    <PageShell>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <h1>About CarScan Pro</h1>
        <p>
          CarScan Pro is an advanced automotive scanning application that helps
          mechanics and DIY enthusiasts identify car parts, fasteners, and tools
          using AI-powered image recognition technology.
        </p>

        <h2>Creator</h2>
        <p><strong>JT — Justin Tafua</strong></p>
        <p>
          Founder &amp; Developer. Justin Tafua is a Samoan-American entrepreneur
          and software developer from Oceanside, California. With a passion for
          automotive technology and a background in mobile app development, Justin
          created CarScan Pro to bridge the gap between traditional automotive repair
          and modern AI technology. His vision was to empower both professional
          mechanics and DIY enthusiasts with instant access to part identification
          and repair guidance, making automotive maintenance more accessible to everyone.
        </p>
        <p>Oceanside, California</p>

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