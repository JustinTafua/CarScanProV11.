// src/components/Navbar.jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link href="/" style={styles.brand}>CarScan Pro</Link>
      </div>
      <div style={styles.right}>
        <Link href="/" style={styles.item}>Home</Link>
        <Link href="/scan" style={styles.item}>Scan</Link>
        <Link href="/guides" style={styles.item}>Guides</Link>
        <Link href="/tutorial" style={styles.item}>Tutorial</Link>
        <Link href="/assistant" style={styles.item}>Assistant</Link>
        <Link href="/pricing" style={styles.item}>Pricing</Link>
        <Link href="/settings" style={styles.item}>Settings</Link>
        <Link href="/about" style={styles.item}>About</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    backdropFilter: "blur(6px)",
    background: "rgba(10,10,10,.25)",
    color: "#fff"
  },
  left: { display: "flex", gap: 12, alignItems: "center" },
  right: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" },
  brand: { fontWeight: 700, fontSize: 18, color: "#fff", textDecoration: "none" },
  item: { color: "#fff", textDecoration: "none", fontSize: 16 }
};