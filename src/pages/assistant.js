import { useState } from 'react';
import PageShell from '../components/PageShell';

export default function Assistant(){
  const [messages,setMessages]=useState([{role:'assistant',content:'Hi! I can help with scans, parts, and repair steps. What are you working on?'}]);
  const [input,setInput]=useState(''); const [loading,setLoading]=useState(false);

  async function send(){
    if(!input.trim()) return;
    const next=[...messages,{role:'user',content:input.trim()}];
    setMessages(next); setInput(''); setLoading(true);
    try{
      const r=await fetch('/api/assistant',{method:'POST',body:JSON.stringify({messages:next})});
      const data=await r.json();
      setMessages(m=>[...m,{role:'assistant',content:data.reply}]);
    }finally{ setLoading(false); }
  }

  return (
    <PageShell>
      <h1>CarScan AI Assistant</h1>
      <div style={{display:'grid',gap:10}}>
        <div style={{maxHeight:320,overflow:'auto',background:'#fff',border:'1px solid #ddd',borderRadius:10,padding:12}}>
          {messages.map((m,i)=>(
            <div key={i} style={{margin:'8px 0'}}>
              <b>{m.role==='user'?'You':'Assistant'}:</b> {m.content}
            </div>
          ))}
          {loading && <div>Assistant is typing…</div>}
        </div>
        <div style={{display:'flex',gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about a repair, part, or tool…" style={{flex:1,padding:10,border:'1px solid #ccc',borderRadius:10}}/>
          <button className="btn" onClick={send}>Send</button>
        </div>
      </div>
      <style jsx>{`.btn{padding:10px 14px;border:1px solid #111;border-radius:10px;background:#fff}`}</style>
    </PageShell>
  );
}
