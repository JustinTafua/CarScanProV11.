// src/components/PageShell.jsx
import Navbar from './Navbar';
import Footer from './Footer';
import GarageLayout from './GarageLayout';

export default function PageShell({ children }) {
  return (
    <GarageLayout>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </GarageLayout>
  );
}