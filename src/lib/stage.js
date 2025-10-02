// src/lib/stage.js
// 10 simple stages; feel free to tweak.
const STAGES = Array.from({ length: 10 }).map((_, i) => ({
  hue: (i * 36) % 360,         // color change
  sat: 1 + (i % 3) * 0.2,      // saturation
  bright: 0.9 + ((i % 2) * 0.1), // brightness bump
}));

export function getNextStage(prevIndex) {
  return (prevIndex + 1) % STAGES.length;
}

export function getStageFilter(index) {
  const s = STAGES[index] || STAGES[0];
  return `hue-rotate(${s.hue}deg) saturate(${s.sat}) brightness(${s.bright})`;
}

// Lightweight “tools on floor” randomizer.
// Put images in public/garage/tools/*.png to see them.
const TOOL_FILES = ["wrench.png", "driver.png", "jack.png", "turbo.png", "header.png"];

export function randomTools(seed = 0) {
  // show 0–3 tools with simple positions
  const count = (seed % 3);
  return Array.from({ length: count }).map((_, i) => ({
    file: TOOL_FILES[i % TOOL_FILES.length],
    left: `${10 + (i * 20)}vw`,
    bottom: `${8 + (i % 2) * 6}vh`,
    rotate: (seed * 37 + i * 23) % 360,
  }));
}