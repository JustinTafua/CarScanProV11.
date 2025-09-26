import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
        <h1>Privacy Policy</h1>
        <p>
          CarScan Pro respects your privacy. We collect minimal information to
          provide app services, process subscriptions, and improve your
          experience.
        </p>
        <h2>What We Collect</h2>
        <ul>
          <li>Email (for subscriptions & support)</li>
          <li>Payment details (processed securely via Stripe)</li>
          <li>Basic usage analytics (non-identifiable)</li>
        </ul>
        <h2>Your Rights</h2>
        <p>
          You may request deletion of your account or data anytime by contacting
          us.
        </p>
        <p>Last updated: {new Date().getFullYear()}</p>
      </main>
      <Footer />
    </div>
  );
}
