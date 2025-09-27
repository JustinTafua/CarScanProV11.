import { useEffect, useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import PageShell from '../components/PageShell';

// inline TopPredictions (so it's one file)
function TopPredictions({ items=[] }){
  if (!items.length) return null;
  return (
    <div style={{width:'100%',maxWidth:520,background:'#fff',border:'1px solid #ddd',borderRadius:12,padding:12}}>
      <b>Top predictions</b>
      <div style={{display:'grid',gap:10,marginTop:8}}>
        {items.map((p,i)=>{
          const pct = Math.round(p.probability*100);
          return (
            <div key={i}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
                <span>{p.className}</span><span>{pct}%</span>
              </div>
              <div style={{height:8,background:'#eee',borderRadius:999,overflow:'hidden'}}>
                <div style={{width:`${pct}%`,height:'100%',background:'linear-gradient(90deg,#0b5fff,#51b3ff)'}} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Scan(){
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const loopRef = useRef(null);
  const historyRef = useRef([]);

  // prefs
  const prefFacing = (typeof window!=='undefined' && localStorage.getItem('csp_pref_facing')) || 'environment';
  const prefInterval = (typeof window!=='undefined' && parseInt(localStorage.getItem('csp_pref_interval_ms')||'1100',10)) || 1100;
  const prefSmoothing = (typeof window!=='undefined' && localStorage.getItem('csp_pref_smoothing')==='1');

  const [started, setStarted] = useState(false);
  const [facing, setFacing] = useState(prefFacing);
  const [err, setErr] = useState('');
  const [top, setTop] = useState([]);
  const [bestLabel, setBestLabel] = useState('Camera is idle');
  const [torchOn, setTorchOn] = useState(null); // null = unsupported
  const [zoom, setZoom] = useState(null);
  const [zoomRange, setZoomRange] = useState({min:1,max:1,step:0.1});

  function stopLoop(){ if(loopRef.current){ clearTimeout(loopRef.current); loopRef.current=null; } }
  function stopStream(){ const s=videoRef.current?.srcObject; s?.getTracks()?.forEach(t=>t.stop()); }

  async function startStream(kind=facing){
    setErr('');
    try{
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: kind }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      stopStream();
      if(videoRef.current){ videoRef.current.srcObject=stream; await videoRef.current.play(); }
      setStarted(true);

      // capabilities
      const track = stream.getVideoTracks?.()[0];
      const caps = track?.getCapabilities?.();
      if (caps?.torch !== undefined) setTorchOn(false); else setTorchOn(null);
      if (caps?.zoom){
        const { min, max, step } = caps.zoom;
        setZoomRange({min:min||1,max:max||1,step:step||0.1});
        setZoom(min||1);
        try{ await track.applyConstraints({ advanced:[{ zoom:min||1 }] }); }catch{}
      } else { setZoom(null); }

      if(!modelRef.current){ setBestLabel('Loading model…'); modelRef.current = await mobilenet.load(); }
      setBestLabel('Scanning…');
      tick(prefInterval);
    }catch(e){ setErr('Camera error: ' + (e?.message||e)); setStarted(false); }
  }

  async function tick(ms){
    try{
      if(videoRef.current && modelRef.current){
        const preds = await modelRef.current.classify(videoRef.current);
        const list = (preds||[]).slice(0,3).map(p=>({ className:p.className, probability:p.probability }));

        if (prefSmoothing){
          const h=historyRef.current; h.push(list); if(h.length>10) h.shift();
          const scores=new Map();
          h.forEach(frame=>frame.forEach(p=>{
            scores.set(p.className,(scores.get(p.className)||0)+p.probability);
          }));
          const agg = Array.from(scores.entries())
            .map(([className,score])=>({className,probability:score/h.length}))
            .sort((a,b)=>b.probability-a.probability).slice(0,3);
          setTop(agg);
          if(agg[0]) setBestLabel(`${agg[0].className} (${Math.round(agg[0].probability*100)}%)`);
        }else{
          setTop(list);
          if(list[0]) setBestLabel(`${list[0].className} (${Math.round(list[0].probability*100)}%)`);
        }
      }
    }catch{}
    loopRef.current = setTimeout(()=>tick(ms), ms);
  }

  async function handleStart(){ await startStream(facing); }
  async function handleFlip(){ const next=facing==='environment'?'user':'environment'; setFacing(next); stopLoop(); await startStream(next); }
  async function handleTorch(){
    try{
      const track = videoRef.current?.srcObject?.getVideoTracks?.()[0];
      const caps = track?.getCapabilities?.();
      if(!caps?.torch) return; // unsupported
      await track.applyConstraints({ advanced:[{ torch: !(torchOn===true) }] });
      setTorchOn(v=>!(v===true));
    }catch{}
  }
  async function handleZoom(val){
    try{
      const z=parseFloat(val); setZoom(z);
      const track = videoRef.current?.srcObject?.getVideoTracks?.()[0];
      await track?.applyConstraints?.({ advanced:[{ zoom:z }] });
    }catch{}
  }
  function handleSnapshot(){
    const v=videoRef.current, c=canvasRef.current; if(!v||!c) return;
    const w=v.videoWidth||640, h=v.videoHeight||360; c.width=w; c.height=h;
    const g=c.getContext('2d'); g.drawImage(v,0,0,w,h);
    const url=c.toDataURL('image/png'); const a=document.createElement('a'); a.href=url; a.download='carscan-frame.png'; a.click();
  }

  useEffect(()=>()=>{ stopLoop(); stopStream(); },[]);

  return (
    <PageShell>
      <h1>CarScan Camera</h1>

      <div style={{display:'grid',gap:12,justifyItems:'center'}}>
        <video ref={videoRef} width="340" autoPlay muted playsInline
               style={{border:'1px solid #ccc',borderRadius:12,background:'#000'}}/>
        <canvas ref={canvasRef} style={{display:'none'}}/>

        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
          {!started && <button className="btn" onClick={handleStart}>Start Camera</button>}
          {started && <button className="btn" onClick={handleFlip}>Flip</button>}
          {started && <button className="btn" onClick={handleSnapshot}>Snapshot</button>}
          {started && <button className="btn" onClick={handleTorch} disabled={torchOn===null}>Torch</button>}
          <span style={{opacity:.85,alignSelf:'center'}}>{bestLabel}</span>
        </div>

        {zoom!==null && (
          <div style={{display:'grid',gap:6,justifyItems:'center'}}>
            <label style={{fontSize:12,opacity:.8}}>Zoom</label>
            <input type="range" min={zoomRange.min} max={zoomRange.max} step={zoomRange.step}
                   value={zoom} onChange={e=>handleZoom(e.target.value)} style={{width:260}}/>
          </div>
        )}

        {err && <p style={{color:'crimson',textAlign:'center'}}>{err}</p>}

        <TopPredictions items={top}/>
        <div style={{marginTop:12,width:'100%',maxWidth:520,background:'#fff',border:'1px solid #ddd',borderRadius:12,padding:12}}>
          <b>Find this part online</b>
          <ul style={{marginTop:8,paddingLeft:18}}>
            <li><a href={`https://www.google.com/search?q=${encodeURIComponent(top[0]?.className||'auto part')}`} target="_blank" rel="noreferrer">Google</a></li>
            <li><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent((top[0]?.className||'auto part')+' repair')}`} target="_blank" rel="noreferrer">YouTube Tutorials</a></li>
          </ul>
          <div style={{fontSize:12,opacity:.7}}>Add your affiliate links later in Settings or a config file.</div>
        </div>
      </div>

      <style jsx>{`.btn{padding:8px 12px;border:1px solid #111;border-radius:10px;background:#fff}.btn[disabled]{opacity:.5}`}</style>
    </PageShell>
  );
}
