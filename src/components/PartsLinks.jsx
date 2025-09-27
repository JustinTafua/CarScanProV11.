import affiliates from '../config/affiliates.json';

export default function PartsLinks({ label='' }){
  const q = encodeURIComponent(label || 'auto part');
  const links = [
    ...(affiliates.parts||[]).map(a => ({ name:a.name, url: a.url })),
    { name:'Google', url:`https://www.google.com/search?q=${q}` },
    { name:'YouTube Tutorials', url:`https://www.youtube.com/results?search_query=${q}+repair` }
  ];
  return (
    <div style={{marginTop:12,width:'100%',maxWidth:520,background:'#fff',border:'1px solid #ddd',borderRadius:12,padding:12}}>
      <b>Find this part online</b>
      <ul style={{marginTop:8,display:'grid',gap:6, paddingLeft:18}}>
        {links.map((l,i)=>(
          <li key={i}><a href={l.url} target="_blank" rel="noreferrer">{l.name}</a></li>
        ))}
      </ul>
      <div style={{fontSize:12,opacity:.7}}>Affiliate links may earn CarScan Pro a commission.</div>
    </div>
  );
}
