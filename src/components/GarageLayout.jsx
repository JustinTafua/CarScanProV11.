import { useMemo, useState, useEffect } from 'react';
import theme from '../config/garageTheme.json';

function seededRand(seed){ let x=Math.sin(seed)*10000; return x - Math.floor(x); }

export default function GarageLayout({ children, stageIndex=0 }){
  const W = 920, H = 520;

  // Scatter tools in new spots every ~6 hours
  const tools = useMemo(()=>{
    const seed = Math.floor(Date.now()/(6*60*60*1000));
    return theme.tools.map((src, i)=>{
      const r1 = seededRand(seed + i);
      const r2 = seededRand(seed + i*7);
      return { src, x: Math.round(140 + r1*(W-260)), y: Math.round(280 + r2*180), s: 0.7 + seededRand(seed + i*13)*0.6 };
    });
  },[]);

  // Fade animation when stage changes
  const [fade, setFade] = useState(false);
  useEffect(()=>{ setFade(true); const t=setTimeout(()=>setFade(false), 400); return ()=>clearTimeout(t); }, [stageIndex]);

  return (
    <div style={{minHeight:'100dvh',background:'#111',display:'grid',placeItems:'center',padding:'12px'}}>
      <div style={{position:'relative',width:W,height:H,background:'#222',borderRadius:12,overflow:'hidden',boxShadow:'0 10px 40px rgba(0,0,0,.45)'}}>
        {/* Background */}
        <img src={theme.fixed.background} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>

        {/* Posters + toolbox (fixed) */}
        {theme.fixed.posters.map((p,idx)=>(
          <img key={idx} src={p.src} alt="" style={{position:'absolute',left:p.x,top:p.y,width:p.w}}/>
        ))}
        <img src={theme.fixed.toolbox.src} alt="" style={{position:'absolute',left:theme.fixed.toolbox.x,top:theme.fixed.toolbox.y,width:theme.fixed.toolbox.w}}/>

        {/* Car (continuous build state) */}
        <CarStage stageIndex={stageIndex} fade={fade} />

        {/* Tools/parts scattered */}
        {tools.map((t,idx)=>(
          <img key={idx} src={t.src} alt="" style={{position:'absolute',left:t.x,top:t.y,transform:`scale(${t.s})`,opacity:.95}}/>
        ))}

        {/* Page content */}
        <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',padding:24}}>
          <div style={{width:'min(780px,95%)'}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function CarStage({ stageIndex=0, fade }){
  const s = theme.carStages[stageIndex] || theme.carStages[0];
  return (
    <div style={{position:'absolute',left:200,top:230,filter:'drop-shadow(0 10px 16px rgba(0,0,0,.45))', transition:'opacity .4s ease', opacity: fade?0.3:1}}>
      {/* color tint */}
      <div style={{position:'absolute',inset:0,background:s.color, mixBlendMode:'multiply',opacity:.6, borderRadius:8}}/>
      <img src={s.body}   alt="" style={{position:'relative', width:480}}/>
      <img src={s.kit}    alt="" style={{position:'absolute',left:0,top:0,width:480}}/>
      <img src={s.wheels} alt="" style={{position:'absolute',left:0,top:0,width:480}}/>
    </div>
  );
}
