import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GarageBackground from "../components/GarageBackground";
import { useRouter } from "next/router";

export default function PageShell({ children }) {
  const { pathname } = useRouter();

  // Option: hide animated props on camera page to reduce distractions
  const showProps = pathname !== "/scan";

  return (
    <GarageBackground showProps={showProps}>
      <Navbar />
      <main style={{ padding: "16px 16px 80px" }}>{children}</main>
      <Footer />
    </GarageBackground>
  );
}
