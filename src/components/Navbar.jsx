// src/components/Navbar.jsx
import Link from "next/link";
import InstallPrompt from "./InstallPrompt";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link style={styles.a} href="/">Home</Link>
        <Link style={styles.a} href="/scan">Scan</Link>
        <Link style={styles.a} href="/pricing">Pricing</Link>
        <Link style={styles.a} href="/tutorial">Tutorial</Link>
        <Link style={styles.a} href="/about">About</Link>
      </div>
      <div style={styles.right}>
        <InstallPrompt />
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    zIndex: 50,
    backdropFilter: "saturate(160%) blur(10px)",
    background: "rgba(10,10,15,.35)",
  },
  left: { display: "flex", gap: 18, alignItems: "center" },
  right: { display: "flex", gap: 12, alignItems: "center" },
  a: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,
    textShadow: "0 2px 8px rgba(0,0,0,.5)",
  },
};