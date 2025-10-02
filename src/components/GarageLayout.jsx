// src/components/GarageLayout.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import theme from "../config/garageTheme.json";

const rims = Array.isArray(theme?.rims) ? theme.rims : [];
const tools = Array.isArray(theme?.tools) ? theme.tools : [];
const colors = Array.isArray(theme?.colors) ? theme.colors : ["#C0C0C0"];
const INTERVAL = Number(theme?.intervalSec || 12) * 1000;

function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.random() * (max - min) + min; }

export default function GarageLayout({ children }) {
  const [state, setState] = useState({
    color: randItem(colors),
    rim: randItem(rims || []),
    toolSet: []
  });
  const timer = useRef(null);

  // pick a few random tools each cycle
  const nextState = () => ({
    color: randItem(colors),
    rim: randItem(rims || []),
    toolSet: (tools || []).sort(() => Math.random() - 0.5).slice(0, 3).map(t => ({
      file: t,
      left: `${rand(4, 70)}%`,
      top: `${rand(55, 82)}%`,
      rotate: `${rand(-12, 12)}deg`,
      scale: rand(0.7, 1.1)
    }))
  });

  useEffect(() => {
    // client only
    setState(nextState());
    timer.current = setInterval(() => setState(nextState()), INTERVAL);
    return () => clearInterval(timer.current);
  }, []);

  // keep values stable within a render
  const memo = useMemo(() => state, [state]);

  return (
    <div style={styles.wrap}>
      {/* fixed garage */}
      <img src="/garage/bg.jpg" alt="" style={styles.bg} />

      {/* color tint over the car region (full for now) */}
      <div style={{
        ...styles.tint,
        background: memo.color,
        mixBlendMode: "soft-light",
        opacity: 0.45
      }} />

      {/* rim overlay (optional) */}
      {memo.rim && (
        <img src={`/garage/rims/${memo.rim}`} alt="" style={styles.rim} />
      )}

      {/* scattered tools */}
      {(memo.toolSet || []).map((t, i) => (
        <img
          key={i}
          src={`/garage/tools/${t.file}`}
          alt=""
          style={{
            ...styles.tool,
            left: t.left, top: t.top,
            transform: `rotate(${t.rotate}) scale(${t.scale})`
          }}
        />
      ))}

      {/* page content on top */}
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  wrap: { position: "relative", minHeight: "100vh", overflow: "hidden" },
  bg: {
    position: "fixed", inset: 0,
    width: "100%", height: "100%", objectFit: "cover",
    zIndex: 0
  },
  tint: {
    position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none"
  },
  rim: {
    position: "fixed",
    bottom: "14%", left: "55%",
    width: "20%",
    zIndex: 2, opacity: 0.9, pointerEvents: "none"
  },
  tool: {
    position: "fixed", zIndex: 2, width: "16%", opacity: 0.9, pointerEvents: "none"
  },
  content: { position: "relative", zIndex: 3 }
};