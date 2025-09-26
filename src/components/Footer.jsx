import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ padding: "1rem", marginTop: "2rem", background: "#f4f4f4" }}>
      <p>© {new Date().getFullYear()} CarScan Pro — Created by Justin Tafua</p>
      <p style={{ marginTop: "0.5rem" }}>
        <Link href="/privacy">Privacy Policy</Link> |{" "}
        <Link href="/terms">Terms of Service</Link>
      </p>
    </footer>
  );
}
