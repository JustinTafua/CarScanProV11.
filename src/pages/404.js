export default function NotFound(){
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',textAlign:'center',padding:24}}>
      <div>
        <h1>404</h1>
        <p>Page not found.</p>
        <a href="/" style={{textDecoration:'none',border:'1px solid #111',padding:'8px 12px',borderRadius:10}}>Go Home</a>
      </div>
    </main>
  );
}
