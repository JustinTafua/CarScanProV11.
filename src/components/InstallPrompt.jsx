import { useEffect, useState } from 'react';
export default function InstallPrompt({ className="" }) {
  const [evt,setEvt]=useState(null); const [ok,setOk]=useState(false);
  useEffect(()=>{ const h=e=>{e.preventDefault();setEvt(e);setOk(true)}; 
    window.addEventListener('beforeinstallprompt',h); 
    return()=>window.removeEventListener('beforeinstallprompt',h);
  },[]);
  const isiOS = typeof navigator!=='undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);
  if(isiOS) return <span className={className}>iPhone: Share → “Add to Home Screen”</span>;
  return <button disabled={!ok} onClick={async()=>{evt?.prompt();await evt?.userChoice;setEvt(null);}} className={className}>
    {ok?'Install App':'Install (not supported)'}
  </button>;
}
