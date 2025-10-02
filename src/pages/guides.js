import PageShell from '../components/PageShell';
const PARTS=[
  {key:'brake-disc', name:'Brake Disc'},
  {key:'turbo',      name:'Turbocharger'},
  {key:'o2-sensor',  name:'O₂ Sensor'},
  {key:'alternator', name:'Alternator'},
  {key:'spark-plug', name:'Spark Plug'},
  {key:'oil-filter', name:'Oil Filter'}
];
export default function Guides(){
  return (
    <PageShell>
      <h1>Guides</h1>
      <p className="card">Browse popular parts without scanning. Tap a part for Google/YouTube/vendor links.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:12}}>
        {PARTS.map(p=>(
          <a key={p.key} href={`/guides/${p.key}`} className="card" style={{textAlign:'center',textDecoration:'none',color:'#111'}}>
            <div style={{height:96,display:'grid',placeItems:'center',fontWeight:700}}>{p.name}</div>
            <small>Open</small>
          </a>
        ))}
      </div>
    </PageShell>
  );
}