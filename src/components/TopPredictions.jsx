export default function TopPredictions({ items=[] }){
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
                <span>{p.className}</span>
                <span>{pct}%</span>
              </div>
              <div style={{height:8,background:'#eee',borderRadius:999,overflow:'hidden'}}>
                <div style={{width:`${pct}%`,height:'100%'}} />
              </div>
              <style jsx>{`
                div > div > div > div { background: linear-gradient(90deg,#0b5fff,#51b3ff); }
              `}</style>
            </div>
          );
        })}
      </div>
    </div>
  );
}
