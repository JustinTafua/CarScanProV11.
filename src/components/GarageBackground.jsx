// src/components/GarageBackground.jsx
import { useEffect, useRef, useState } from "react";

const stages = [
  "/mockup_stage1.png",
  "/mockup_stage2.png",
  "/mockup_stage3.png",
  "/mockup_stage4.png",
];

function hasVisitedBefore() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("hasVisited") === "true";
}
function markVisited() {
  if (typeof window === "undefined") return;
  localStorage.setItem("hasVisited", "true");
}

/** Small animated SVG “props” layer (tools) */
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
      {/* Shop light glow */}
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

export default function GarageBackground({ children, showProps = true }) {
  // crossfade layers
  const [frontSrc, setFrontSrc] = useState(stages[0]); // top layer (fading in)
  const [backSrc, setBackSrc] = useState(stages[0]);   // bottom layer (current)
  const [fadeIn, setFadeIn] = useState(false);

  // first-visit step index (for Stage1→4)
  const [index, setIndex] = useState(0);

  // Refs for parallax transforms
  const backRef = useRef(null);   // bottom bg
  const frontRef = useRef(null);  // top bg (fading)
  const propsRef = useRef(null);  // tools

  // Decide which image to show (first visit = sequential; later = random)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setImageInstant = (src) => {
      // No animation → just swap both layers to same src
      setBackSrc(src);
      setFrontSrc(src);
      setFadeIn(false);
    };

    const crossfadeTo = (src) => {
      // Put new src on front, fade it in, then commit to back
      setFrontSrc(src);
      requestAnimationFrame(() => {
        setFadeIn(true);
        // after fade completes, lock it into back layer
        setTimeout(() => {
          setBackSrc(src);
          setFadeIn(false);
        }, prefersReduced ? 0 : 700); // match CSS transition
      });
    };

    if (!hasVisitedBefore()) {
      // First visit: play sequential build (Stage 1→4) with crossfade
      const target = stages[index];
      if (index === 0) {
        setImageInstant(target);
      } else {
        crossfadeTo(target);
      }

      if (index < stages.length - 1) {
        const t = setTimeout(() => setIndex((i) => i + 1), 2500); // pacing
        return () => clearTimeout(t);
      } else {
        markVisited();
      }
    } else {
      // Repeat visits: random one each load (instant set to avoid constant fading)
      const randomStage = stages[Math.floor(Math.random() * stages.length)];
      setImageInstant(randomStage);
    }
  }, [index]);

  // Subtle parallax on scroll (background drifts least, props drift a bit more)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onScroll() {
      if (ticking || prefersReduced) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const deltaBack = y * 0.04;   // background (slower)
        const deltaFront = y * 0.04;  // keep same for alignment during fade
        const deltaProps = y * 0.06;  // props (slightly faster)

        if (backRef.current) backRef.current.style.transform = `translate3d(0, ${-deltaBack}px, 0)`;
        if (frontRef.current) frontRef.current.style.transform = `translate3d(0, ${-deltaFront}px, 0)`;
        if (propsRef.current) propsRef.current.style.transform = `translate3d(0, ${-deltaProps}px, 0)`;

        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="garage-root">
      {/* Back layer (current) */}
      <div
        ref={backRef}
        className="garage-bg garage-bg--back"
        style={{ backgroundImage: `url(${backSrc})` }}
      />
      {/* Front layer (fading in new) */}
      <div
        ref={frontRef}
        className={`garage-bg garage-bg--front ${fadeIn ? "is-visible" : ""}`}
        style={{ backgroundImage: `url(${frontSrc})` }}
      />
      {/* Veil for readability */}
      <div className="garage-veil" />
      {/* Animated props */}
      <div ref={propsRef} className="garage-props">
        {showProps ? <ToolsLayer /> : null}
      </div>
      {/* Foreground content */}
      <div className="garage-content">{children}</div>

      <style jsx global>{`
        .garage-root {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          isolation: isolate;
          background: #000; /* avoid flash */
        }
        .garage-bg {
          position: fixed;
          inset: 0;
          background-size: cover;
          background-position: center;
          will-change: transform, opacity;
          transform: translate3d(0,0,0);
          z-index: 0;
        }
        .garage-bg--back {
          z-index: 0;
          opacity: 1;
        }
        .garage-bg--front {
          z-index: 0; /* under veil & props; same as back */
          opacity: 0;
          transition: opacity 0.7s ease-in-out;
        }
        .garage-bg--front.is-visible {
          opacity: 1;
        }

        .garage-veil {
          position: fixed;
          inset: 0;
          z-index: 1;
          background: radial-gradient(ellipse at 50% 110%, rgba(0,0,0,0.35), rgba(0,0,0,0.55));
          pointer-events: none;
        }

        .garage-props {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          will-change: transform;
          transform: translate3d(0,0,0);
        }
        .garage-content {
          position: relative;
          z-index: 3;
          min-height: 100vh;
          color: #fff;
        }

        .tools-layer { position: absolute; inset: 0; }
        .tool {
          position: absolute;
          width: 120px;
          height: 120px;
          opacity: 0.75;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));
        }
        .jack-stand   { left: 12%; bottom: 12%; animation: jackSlide 6s ease-in-out infinite; }
        .impact-gun   { left: 64%; bottom: 16%; animation: nudge 5.5s ease-in-out infinite; }
        .shop-light   { left: 28%; bottom: 28%; animation: flicker 4s ease-in-out infinite; opacity: 0.6; }
        .loose-wheel  { left: 78%; bottom: 10%; transform: rotate(-8deg); animation: rollNudge 7s ease-in-out infinite; }

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

        @media (prefers-reduced-motion: reduce) {
          .garage-bg--front { transition: none !important; }
          .garage-bg, .garage-props { transform: none !important; }
          .tool { animation: none !important; }
        }
      `}</style>
    </div>
  );
}