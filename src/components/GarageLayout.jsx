import { useEffect, useState } from "react";
import { hasVisitedBefore, markVisited } from "../lib/visitTracker";

const stages = [
  "/mockup_stage1.png",
  "/mockup_stage2.png",
  "/mockup_stage3.png",
  "/mockup_stage4.png",
];

export default function GarageLayout({ children }) {
  const [background, setBackground] = useState(stages[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!hasVisitedBefore()) {
      // Sequential build for first visit
      setBackground(stages[index]);
      if (index < stages.length - 1) {
        const timer = setTimeout(() => setIndex(index + 1), 3000);
        return () => clearTimeout(timer);
      } else {
        markVisited(); // After reaching final build, mark as visited
      }
    } else {
      // Random stage for repeat visits
      const randomStage = stages[Math.floor(Math.random() * stages.length)];
      setBackground(randomStage);
    }
  }, [index]);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}