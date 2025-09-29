// src/components/GarageLayout.jsx
import { useMemo } from 'react';

// Defensive loader for theme config (works even if file is missing or arrays are empty)
function loadTheme() {
  try {
    // eslint-disable-next-line global-require
    const t = require('../config/garageTheme.json');
    return t && typeof t === 'object' ? t : {};
  } catch {
    return {};
  }
}

export default function GarageLayout({ children }) {
  const theme = loadTheme();

  // Safe defaults so .map() is never called on undefined
  const colors = Array.isArray(theme.colors)
    ? theme.colors
    : ['#7a7a7a', '#1e40af', '#f59e0b', '#10b981', '#ef4444', '#111827'];

  const rims = Array.isArray(theme.rims) ? theme.rims : [];                 // URLs to transparent PNGs
  const tools = Array.isArray(theme.tools) ? theme.tools : [];              // URLs to transparent PNGs
  const placements = Array.isArray(theme.placements) ? theme.placements : [];// [{x:0..1, y:0..1}, ...]

  // “Continuous build” selector: varies as time passes and across routes
  const seed = useMemo(() => {
    // change every ~15s so moving between pages shows a new build state
    return Math.floor(Date.now() / 15000);
  }, []);

  const color = colors[seed % colors.length];
  const rim = rims.length ? rims[seed % rims.length] : null;

  return (
    <div className="garage">
      {/* Background garage stays constant */}
      <div className="bg" />

      {/* Random tools placed around the floor, using placements if provided */}
      {tools.slice(0, placements.length).map((url, i) => {
        const p = placements[i] || { x: 0.5, y: 0.9 };
        return (
          <img
            key={i}
            src={url}
            alt=""
            className="tool"
            style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
          />
        );
      })}

      {/* Car base + color overlay (keeps body lines while color changes) */}
      <img src="/garage/car_base.png" alt="1992 Nissan Skyline R32 (sedan)" className="car" />
      <div className="car-color" style={{ background: color }} />

      {/* Optional rim overlay */}
      {rim && <img src={rim} alt="" className="rim" />}

      {/* Page content */}
      <div className="content">{children}</div>

      <style jsx>{`
        .garage {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
        }
        .bg {
          position: absolute;
          inset: 0;
          background: url('/garage/bg.jpg') center/cover no-repeat;
          filter: saturate(0.95);
          z-index: 0;
        }
        .tool {
          position: absolute;
          transform: translate(-50%, -50%);
          width: clamp(60px, 12vw, 120px);
          opacity: 0.85;
          z-index: 1;
          pointer-events: none;
        }
        .car {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: min(92vw, 1100px);
          z-index: 2;
          filter: drop-shadow(0 18px 28px rgba(0,0,0,.45));
          pointer-events: none;
        }
        .car-color {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: min(92vw, 1100px);
          height: clamp(180px, 30vw, 420px); /* approximate body area */
          mix-blend-mode: color;
          border-radius: 12px;
          z-index: 3;
          pointer-events: none;
        }
        .rim {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: min(92vw, 1100px);
          z-index: 4;
          pointer-events: none;
        }
        .content {
          position: relative;
          z-index: 5;
        }
      `}</style>
    </div>
  );
}
