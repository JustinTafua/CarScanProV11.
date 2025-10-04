// src/components/PageShell.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import GarageBackground from "./GarageBackground";

export default function PageShell({ children }) {
  return (
    <GarageBackground>
      <Navbar />
      <main style={{ padding: "16px 16px 80px" }}>{children}</main>
      <Footer />
    </GarageBackground>
  );
}