import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
        <h1>Terms of Service</h1>
        <p>
          By using CarScan Pro, you agree to these terms. If you disagree, do
          not use the app.
        </p>
        <h2>Subscriptions</h2>
        <p>
          Paid plans (Base, Pro, Pro Max) are billed monthly. You may cancel
          anytime via Stripe.
        </p>
        <h2>Disclaimer</h2>
        <p>
          CarScan Pro provides diagnostic guidance only. Always confirm repairs
          with a certified mechanic.
        </p>
        <p>Last updated: {new Date().getFullYear()}</p>
      </main>
      <Footer />
    </div>
  );
}
