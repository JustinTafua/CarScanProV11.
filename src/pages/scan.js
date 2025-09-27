import { useEffect, useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import PageShell from '../components/PageShell';
import ResultCard from '../components/ResultCard';

export default function Scan(){
  const videoRef = useRef(null);
  const [facing,setFacing] = useState('environment'); // 'user' or 'environment'
  const [label,setLabel] = useState('Waiting to start…');
  const [running,setRunning] = useState(false);
  const [err,setErr] = useState('');

  async function startStream(kind=facing){
    setErr('');
    try{
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: kind, width:{ideal:1280}, height:{ideal:720} },
        audio: false
      });
      if (videoRef.current){
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    }catch(e){ setErr('Camera error: ' + (e?.message||e)); }
  }

  function stopStream(){
    const s = videoRef.current?.srcObject;
    s?.getTracks()?.forEach(t=>t.stop());
  }

  async function toggleFacing(){
    const next = facing==='environment' ? 'user' : 'environment';
    setFacing(next);
    stopStream();
    await startStream(next);
  }

  useEffect(()=>{
    let loopId; let model;
    async function boot(){
      await startStream();
      model = await mobilenet.load();
      setRunning(true);
      setLabel('Scanning…');
      async function tick(){
        try{
          if (videoRef.current && model){
            const preds = await model.classify(videoRef.current);
            if (preds?.length){
              const p = preds[0];
              setLabel(`${p.className} (${Math.round(p.probability*100)}%)`);
            }
          }
        }catch{}
        loopId = setTimeout(tick, 1100);
      }
      tick();
    }
    boot();
    return ()=>{ stopStream(); if(loopId) clearTimeout(loopId); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <PageShell>
      <h1>CarScan Camera</h1>
      <div style={{display:'grid',gap:10,justifyItems:'center'}}>
        <video ref={videoRef} width="340" autoPlay muted playsInline style={{border:'1px solid #ccc',borderRadius:12,background:'#000'}}/>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn" onClick={toggleFacing}>Flip Camera</button>
          <span style={{opacity:.85}}>{label}</span>
        </div>
        {err && <p style={{color:'crimson'}}>{err}</p>}

        <ResultCard label={label} />
      </div>
      <style jsx>{`.btn{padding:8px 12px;border:1px solid #111;border-radius:10px;background:#fff}`}</style>
    </PageShell>
  );
}
