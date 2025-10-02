// src/components/PageShell.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import GarageLayout from "./GarageLayout";

export default function PageShell({ children }) {
  return (
    <GarageLayout>
      <Navbar />
      <main style={styles.main}>{children}</main>
      <Footer />
    </GarageLayout>
  );
}

const styles = {
  main: {
    paddingTop: 80,
    paddingBottom: 60,
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gap: 18,
  },
};