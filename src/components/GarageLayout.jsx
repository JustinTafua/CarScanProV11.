// src/components/GarageBackground.jsx
import { useEffect, useState } from "react";

const stages = [
  "/mockup_stage1.png",
  "/mockup_stage2.png",
  "/mockup_stage3.png",
  "/mockup_stage4.png",
];

// visit tracking (first visit = sequential, later = random)
function hasVisitedBefore() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("hasVisited") === "true";
}
function markVisited() {
  if (typeof window === "undefined") return;
  localStorage.setItem("hasVisited", "true");
}

// small animated SVG “props” (tools) – inline so you don't need images
function ToolsLayer() {
  return (
    <div className="tools-layer" aria-hidden>
      {/* Jack stand */}
      <svg className="tool jack-stand" viewBox="0 0 100 100">
        <polygon points="50,10 60,35 40,35" fill="#c23" />
        <rect x="47" y="35" width="6" height="35" fill="#333" />
        <polygon points="25,80 75,80 85,95 15,95" fill="#444" />
      </svg>

      {/* Impact gun */}
      <svg className="tool impact-gun" viewBox="0 0 120 80">
        <rect x="10" y="20" width="70" height="30" rx="6" fill="#222" />
        <rect x="80" y="28" width="30" height="14" rx="3" fill="#666" />
        <rect x="25" y="50" width="18" height="20" rx="3" fill="#333" />
      </svg>

      {/* Shop light (subtle “flicker” glow) */}
      <svg className="tool shop-light" viewBox="0 0 120 120">
        <rect x="10" y="10" width="100" height="10" rx="4" fill="#ddd" />
        <circle cx="60" cy="70" r="35" className="glow" fill="rgba(255,255,180,0.08)" />
      </svg>

      {/* Loose wheel */}
      <svg className="tool loose-wheel" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" fill="#222" />
        <circle cx="50" cy="50" r="20" fill="#555" />
        <circle cx="50" cy="50" r="4" fill="#999" />
      </svg>
    </div>
  );
}

export default function GarageBackground({ children }) {
  const [background, setBackground] = useState(stages[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // SSR guard
    if (typeof window === "undefined") return;

    if (!hasVisitedBefore()) {
      // First visit: play sequential build (Stage 1→4)
      setBackground(stages[index]);
      if (index < stages.length - 1) {
        const t = setTimeout(() => setIndex((i) => i + 1), 2500); // 2.5s per step
        return () => clearTimeout(t);
      } else {
        // finished sequence – mark visited
        markVisited();
      }
    } else {
      // Repeat visits: random one each load
      const randomStage = stages[Math.floor(Math.random() * stages.length)];
      setBackground(randomStage);
    }
  }, [index]);

  return (
    <div className="garage-bg" style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* subtle dark veil to keep UI readable */}
      <div className="garage-veil" />
      {/* animated tools */}
      <ToolsLayer />
      {/* app content */}
      <div className="garage-content">
        {children}
      </div>
      <style jsx global>{`
        .garage-bg { isolation: isolate; }

        .garage-veil {
          position:absolute; inset:0;
          background: radial-gradient(ellipse at 50% 110%, rgba(0,0,0,0.35), rgba(0,0,0,0.55));
          pointer-events:none;
          z-index: 1;
        }

        .garage-content {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          color: #fff;
        }

        .tools-layer {
          position: absolute;
          inset: 0;
          z-index: 1; /* under content, above background */
          pointer-events: none;
        }

        .tool {
          position: absolute;
          width: 120px;
          height: 120px;
          opacity: 0.75;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));
        }

        /* Positions (tweak as needed to fit your mockups) */
        .jack-stand   { left: 12%; bottom: 12%; animation: jackSlide 6s ease-in-out infinite; }
        .impact-gun   { left: 64%; bottom: 16%; animation: nudge 5.5s ease-in-out infinite; }
        .shop-light   { left: 28%; bottom: 28%; animation: flicker 4s ease-in-out infinite; opacity: 0.6; }
        .loose-wheel  { left: 78%; bottom: 10%; transform: rotate(-8deg); animation: rollNudge 7s ease-in-out infinite; }

        /* Animations */
        @keyframes jackSlide {
          0% { transform: translateX(0); }
          50% { transform: translateX(10px); }
          100% { transform: translateX(0); }
        }
        @keyframes nudge {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(6px,-2px) rotate(-2deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        @keyframes rollNudge {
          0% { transform: translateX(0) rotate(-8deg); }
          50% { transform: translateX(-8px) rotate(2deg); }
          100% { transform: translateX(0) rotate(-8deg); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.55; }
          40% { opacity: 0.75; }
          60% { opacity: 0.5; }
          80% { opacity: 0.7; }
        }

        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .tool { animation: none !important; }
        }
      `}</style>
    </div>
  );
}