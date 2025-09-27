// src/components/PageShell.jsx
import { useEffect, useState } from 'react';
import GarageLayout from './GarageLayout';
import Navbar from './Navbar';
import Footer from './Footer';
import { getNextStage } from '../lib/stage';

export default function PageShell({ children }) {
  const [stage, setStage] = useState(0);
  useEffect(() => { setStage(getNextStage()); }, []);
  return (
    <GarageLayout stageIndex={stage}>
      <div style={{ display:'grid', gap:14 }}>
        <Navbar/>
        <div style={{ background:'rgba(255,255,255,.86)', backdropFilter:'blur(6px)', padding:18, borderRadius:12 }}>
          {children}
        </div>
        <Footer/>
      </div>
    </GarageLayout>
  );
}// top of src/pages/index.js
import InstallPrompt from '../components/InstallPrompt';

// inside your CTA/Button area:
<InstallPrompt className="btn" />
