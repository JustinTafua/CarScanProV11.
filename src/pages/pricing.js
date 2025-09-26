import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pricing() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Membership Plans</h1>
        <p>Choose the plan that fits your needs:</p>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "2rem"
        }}>
          {/* Free */}
          <div style={{
            border: "1px solid #ccc",
            padding: "1rem",
            width: "220px",
            borderRadius: "8px"
          }}>
            <h2>Free</h2>
            <p>✔ 3 scans/day</p>
            <p>✔ Ads supported</p>
            <p>❌ Offline mode</p>
            <button disabled>Included</button>
          </div>

          {/* Base */}
          <div style={{
            border: "1px solid #ccc",
            padding: "1rem",
            width: "220px",
            borderRadius: "8px"
          }}>
            <h2>Base — $2.99/mo</h2>
            <p>✔ 10 scans/day</p>
            <p>✔ Fewer ads</p>
            <p>❌ Offline mode</p>
            <button>Subscribe</button>
          </div>

          {/* Pro */}
          <div style={{
            border: "1px solid #ccc",
            padding: "1rem",
            width: "220px",
            borderRadius: "8px"
          }}>
            <h2>Pro — $4.99/mo</h2>
            <p>✔ Unlimited scans</p>
            <p>✔ Ad-free</p>
            <p>✔ Offline mode</p>
            <button>Subscribe</button>
          </div>

          {/* Pro Max */}
          <div style={{
            border: "1px solid #ccc",
            padding: "1rem",
            width: "220px",
            borderRadius: "8px"
          }}>
            <h2>Pro Max — $9.99/mo</h2>
            <p>✔ Unlimited scans</p>
            <p>✔ Ad-free</p>
            <p>✔ Offline + Advanced AI</p>
            <p>✔ Early access to new features</p>
            <button>Subscribe</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
