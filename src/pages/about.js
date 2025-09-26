import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>About CarScan Pro</h1>
        <p>
          CarScan Pro was created by <strong>Justin Tafua</strong> to make auto
          diagnostics, parts, and tutorials accessible for everyone.
        </p>
        <p>
          Our mission is to help DIY mechanics and car enthusiasts save money,
          learn, and connect to the tools they need.
        </p>
      </main>
      <Footer />
    </div>
  );
}
