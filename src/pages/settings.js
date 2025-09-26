import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Settings() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
        <h1>Settings</h1>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2rem" }}>
          <li>🔑 Manage account</li>
          <li>💳 Payment & subscription</li>
          <li>🌙 Dark mode toggle (coming soon)</li>
          <li>🔔 Notifications (coming soon)</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
