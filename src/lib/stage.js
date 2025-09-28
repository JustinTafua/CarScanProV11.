import cfg from '../config/garageTheme.json';
function makeRng(seed){ let s=(seed>>>0)||123456789; return ()=> (s=(s*1664525+1013904223)>>>0)/0xffffffff; }
function pickMany(list,n,rng){ const a=[...list]; for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a.slice(0,Math.min(n,a.length)); }
function hashStr(str){ let h=2166136261; for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h+= (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);} return h>>>0; }

export function computeBuildState(route='/'){
  const period=Math.floor(Date.now()/10000);
  const seed=Math.abs(hashStr(String(period)+'|'+route));
  const rng=makeRng(seed);
  const color = cfg.colors[Math.floor(rng()*cfg.colors.length)];
  const rim = cfg.wheelOverlays?.length ? cfg.wheelOverlays[Math.floor(rng()*cfg.wheelOverlays.length)] : null;
  const howMany = 3+Math.floor(rng()*4);
  const tools=(cfg.toolSprites?.length?pickMany(cfg.toolSprites,howMany,rng):[]).map(src=>({
    src, left:Math.round(5+rng()*80), top:Math.round(68+rng()*22), scale:0.7+rng()*0.6
  }));
  return { background:cfg.background, carBase:cfg.carBase, rimOverlay:rim, color, tools };
}
