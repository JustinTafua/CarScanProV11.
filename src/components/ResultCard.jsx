export default function ResultCard({ label }) {
  return (
    <div style={{marginTop:8,padding:12,border:'1px solid #ddd',borderRadius:10,background:'#fff'}}>
      <b>Top Match:</b> <span style={{opacity:.9}}>{label}</span>
      <div style={{fontSize:12,opacity:.7,marginTop:6}}>
        For best results, use good lighting and fill the frame with the part.
      </div>
    </div>
  );
}
