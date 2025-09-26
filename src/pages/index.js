import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Navbar />
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>🚗 Welcome to CarScan Pro v11</h1>
        <p>The #1 DIY auto scan + repair helper app.</p>

        <div style={{ marginTop: "2rem" }}>
          <h2>What you can do:</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>📸 Use AI Camera Scan</li>
            <li>🛠 Find Tutorials & Parts</li>
            <li>💳 Unlock Pro features with a membership</li>
            <li>⭐ Enjoy ad-free & offline access with Pro Max</li>
          </ul>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <a href="/scan">
            <button style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              cursor: "pointer"
            }}>
              Start Scanning
            </button>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
