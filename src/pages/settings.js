import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';

export default function Settings(){
  const [facing,setFacing] = useState('environment');
  const [intervalMs,setIntervalMs] = useState(1100);
  const [smoothing,setSmoothing] = useState(true);

  useEffect(()=>{
    if (typeof window==='undefined') return;
    setFacing(localStorage.getItem('csp_pref_facing') || 'environment');
    setIntervalMs(parseInt(localStorage.getItem('csp_pref_interval_ms')||'1100',10));
    setSmoothing(localStorage.getItem('csp_pref_smoothing')!=='0');
  },[]);

  function save(){
    localStorage.setItem('csp_pref_facing', facing);
    localStorage.setItem('csp_pref_interval_ms', String(intervalMs));
    localStorage.setItem('csp_pref_smoothing', smoothing ? '1':'0');
    alert('Saved!');
  }

  return (
    <PageShell>
      <h1>Settings</h1>
      <div style={{display:'grid',gap:14,maxWidth:520}}>
        <label>Default camera
          <select value={facing} onChange={e=>setFacing(e.target.value)} style={{marginLeft:8}}>
            <option value="environment">Rear</option>
            <option value="user">Front</option>
          </select>
        </label>

        <label>Scan interval (ms)
          <input type="number" min="300" step="100" value={intervalMs} onChange={e=>setIntervalMs(parseInt(e.target.value||'1100',10))}
                 style={{marginLeft:8,width:120}}/>
        </label>

        <label>
          <input type="checkbox" checked={smoothing} onChange={e=>setSmoothing(e.target.checked)} />
          <span style={{marginLeft:8}}>Smooth predictions (more stable)</span>
        </label>

        <button className="btn" onClick={save}>Save</button>
      </div>
      <style jsx>{`.btn{padding:10px 14px;border:1px solid #111;border-radius:10px;background:#fff}`}</style>
    </PageShell>
  );
}
