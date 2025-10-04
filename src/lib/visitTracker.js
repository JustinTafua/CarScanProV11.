// src/lib/visitTracker.js
export function hasVisitedBefore() {
  return localStorage.getItem("hasVisited") === "true";
}

export function markVisited() {
  localStorage.setItem("hasVisited", "true");
}