// src/components/GarageLayout.jsx
import { useEffect, useMemo, useState } from "react";
import { getNextStage, getStageFilter, randomTools } from "../lib/stage";

export default function GarageLayout({ children }) {
  const [stage, setStage] = useState(0);

  // advance stage every 6s as users move around
  useEffect(() => {
    const id = setInterval(() => setStage((s) => getNextStage(s)), 6000);
    return () => clearInterval(id);
  }, []);

  const filter = useMemo(() => getStageFilter(stage), [stage]);
  const tools = useMemo(() => randomTools(stage), [stage]);

  return (
    <div style={styles.wrap}>
      {/* Fixed garage image */}
      <div style={styles.backdrop} />
      {/* Scrim for readability */}
      <div style={styles.scrim} />

      {/* Skyline overlay that changes (color/filter/rims illusion) */}
      <div style={{ ...styles.car, filter }} />

      {/* Random tool decals (optional images) */}
      {tools.map((t, i) => (
        <img
          key={i}
          src={`/garage/tools/${t.file}`}
          alt=""
          style={{
            ...styles.tool,
            left: t.left,
            bottom: t.bottom,
            transform: `rotate(${t.rotate}deg)`,
            display: t.file ? "block" : "none",
          }}
          loading="lazy"
        />
      ))}

      {/* Content sits above visuals */}
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  wrap: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#0a0b0f",
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('/garage/backdrop.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "none",
    zIndex: 0,
  },
  scrim: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.45) 40%, rgba(0,0,0,.6) 100%)",
    zIndex: 5,
    pointerEvents: "none",
  },
  car: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    width: "min(1200px, 96vw)",
    height: "56vh",
    transform: "translateX(-50%)",
    backgroundImage: "url('/garage/skyline.png')",
    backgroundPosition: "bottom center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    zIndex: 6,
    pointerEvents: "none",
    transition: "filter 600ms ease",
  },
  tool: {
    position: "absolute",
    width: 64,
    opacity: 0.9,
    zIndex: 4,
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 10,
    color: "#fff",
    textShadow: "0 3px 18px rgba(0,0,0,.7)",
    paddingTop: 80,
    paddingBottom: 64,
  },
};