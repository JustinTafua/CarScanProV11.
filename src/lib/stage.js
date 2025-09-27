export function getNextStage() {
  try {
    const cur = parseInt(localStorage.getItem('csp_stage') || '0', 10) || 0;
    const next = (cur + 1) % 4; // 4 carStages in garageTheme.json
    localStorage.setItem('csp_stage', String(next));
    return next;
  } catch {
    return 0;
  }
}

export function getStage() {
  try { return parseInt(localStorage.getItem('csp_stage') || '0', 10) || 0; }
  catch { return 0; }
}
