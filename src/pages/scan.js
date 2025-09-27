import { useEffect, useRef, useState, useMemo } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import PageShell from '../components/PageShell';
import TopPredictions from '../components/TopPredictions';
import PartsLinks from '../components/PartsLinks';

export default function Scan(){
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const loopRef = useRef(null);

  // prefs (read once)
  const prefFacing = (typeof window !== 'undefined' && localStorage.getItem('csp_pref_facing')) || 'environment';
  const prefInterval = (typeof window !== 'undefined' && parseInt(localStorage.getItem('csp_pref_interval_ms')||'1100',10)) || 1100;
  const prefSmoothing = (typeof window !== 'undefined' && localStorage.getItem('csp_pref_smoothing')==='1');

  const [started, setStarted] = useState(false);
  const [facing, setFacing] = useState(prefFacing); // 'user' | 'environment'
  const [err, setErr] = useState('');
  const [top, setTop] = useState([]); // array of {className, probability}
  const [bestLabel, setBestLabel] = useState('Camera is idle');
  const [torchOn, setTorchOn] = useState(false);
  const [zoom, setZoom] = useState(null); // number | null
  const [zoomRange, setZoomRange] = useState({min:1,max:1,step:0.1});

  // rolling history for smoothing
  const historyRef = useRef([]);

  function stopLoop() {
    if (loopRef.current) {
      clearTimeout(loopRef.current);
      loopRef.current = null;
    }
  }

  function stopStream() {
    const s = videoRef.current?.srcObject;
    s?.getTracks()?.forEach(t => t.stop());
  }

  async function startStream(kind = facing) {
    setErr('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: kind }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      stopStream();
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStarted(true);

      // camera capabilities (torch/zoom if available)
      const track = stream.getVideoTracks?.()[0];
      const caps = track?.getCapabilities?.();
      if (caps?.zoom) {
        const { min, max, step } = caps.zoom;
        setZoomRange({min:min||1, max:max||1, step:step||0.1});
        setZoom(caps.zoom.min || 1);
      } else {
        setZoom(null);
      }

      if (!modelRef.current) {
        // lazy-load model once
        setBestLabel('Loading model…');
        modelRef.current = await mobilenet.load();
      }

      // kick off classify loop
      setBestLabel('Scanning…');
      tick(prefInterval);
    } catch (e) {
      setErr('Camera error: ' + (e?.message || e));
      setStarted(false);
    }
  }

  async function tick(intervalMs) {
    try {
      if (videoRef.current && modelRef.current) {
        const preds = await modelRef.current.classify(videoRef.current);
        // take top 3
        const list = (preds || []).slice(0,3).map(p => ({
          className: p.className,
          probability: p.probability
        }));

        // smoothing: keep last 10 frames, sum probabilities by class
        if (prefSmoothing) {
          const h = historyRef.current;
          h.push(list);
          if (h.length > 10) h.shift();
          const scores = new Map();
          h.forEach(frame => frame.forEach(p => {
            scores.set(p.className, (scores.get(p.className)||0) + p.probability);
          }));
          const agg = Array.from(scores.entries())
            .map(([className,score]) => ({ className, probability: score / h.length }))
            .sort((a,b)=>b.probability - a.probability)
            .slice(0,3);
          setTop(agg);
          if (agg[0]) setBestLabel(`${agg[0].className} (${Math.round(agg[0].probability*100)}%)`);
        } else {
          setTop(list);
          if (list[0]) setBestLabel(`${list[0].className} (${Math.round(list[0].probability*100)}%)`);
        }
      }
    } catch {/* ignore one-off frame errors */}
    loopRef.current = setTimeout(()=>tick(intervalMs), intervalMs);
  }

  async function handleStart() {
    await startStream(facing);
  }

  async function handleFlip() {
    const next = facing === 'environment' ? 'user' : 'environment';
    setFacing(next);
    stopLoop();
    await startStream(next);
  }

  async function handleTorch() {
    try {
      const track = videoRef.current?.srcObject?.getVideoTracks?.()[0];
      const caps = track?.getCapabilities?.();
      if (!caps?.torch) return; // not supported
      await track.applyConstraints({ advanced: [{ torch: !torchOn }] });
      setTorchOn(v => !v);
    } catch {/* ignore if unsupported */}
  }

  async function handleZoom(val) {
    try {
      const f = parseFloat(val);
      setZoom(f);
      const track = videoRef.current?.srcObject?.getVideoTracks?.()[0];
      await track?.applyConstraints?.({ advanced: [{ zoom: f }] });
    } catch {/* ignore */}
  }

  function handleSnapshot() {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const c = canvasRef.current;
    const w = v.videoWidth || 640, h = v.videoHeight || 360;
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    g.drawImage(v, 0, 0, w, h);
    const url = c.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download = 'carscan-frame.png'; a.click();
  }

  useEffect(() => {
    return () => { stopLoop(); stopStream(); };
  }, []);

  return (
    <PageShell>
      <h1>CarScan Camera</h1>

      <div style={{display:'grid',gap:12,justifyItems:'center'}}>
        <video
          ref={videoRef}
          width="340"
          autoPlay
          muted
          playsInline
          style={{border:'1px solid #ccc',borderRadius:12,background:'#000'}}
        />
        <canvas ref={canvasRef} style={{display:'none'}} />

        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
          {!started && <button className="btn" onClick={handleStart}>Start Camera</button>}
          {started && <button className="btn" onClick={handleFlip}>Flip</button>}
          {started && <button className="btn" onClick={handleSnapshot}>Snapshot</button>}
          {started && <button className="btn" onClick={handleTorch} disabled={torchOn===null}>Torch</button>}
          <span style={{opacity:.85,alignSelf:'center'}}>{bestLabel}</span>
        </div>

        {zoom !== null && (
          <div style={{display:'grid',gap:6,justifyItems:'center'}}>
            <label style={{fontSize:12,opacity:.8}}>Zoom</label>
            <input type="range"
                   min={zoomRange.min} max={zoomRange.max} step={zoomRange.step}
                   value={zoom}
                   onChange={e=>handleZoom(e.target.value)}
                   style={{width:260}} />
          </div>
        )}

        {err && <p style={{color:'crimson',textAlign:'center'}}>{err}</p>}

        <TopPredictions items={top}/>
        <PartsLinks label={top[0]?.className || ''} />
      </div>

      <style jsx>{`
        .btn{padding:8px 12px;border:1px solid #111;border-radius:10px;background:#fff}
        .btn[disabled]{opacity:.5}
      `}</style>
    </PageShell>
  );
}
