import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#0d47a1", color: "white" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/scan">Scan</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
        <li><Link href="/feedback">Feedback</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/settings">Settings</Link></li>
        <li><Link href="/privacy">Privacy</Link></li>
        <li><Link href="/terms">Terms</Link></li>
      </ul>
    </nav>
  );
}
