import { useRouter } from 'next/router';
import PageShell from '../../components/PageShell';

const META={
  'brake-disc': {name:'Brake Disc'},
  'turbo': {name:'Turbocharger'},
  'o2-sensor': {name:'O₂ Sensor'},
  'alternator': {name:'Alternator'},
  'spark-plug': {name:'Spark Plug'},
  'oil-filter': {name:'Oil Filter'}
};

export default function GuideDetail(){
  const { query } = useRouter();
  const slug = query.slug;
  const item = META[slug] || {name: 'Part'};
  const q = encodeURIComponent(item.name);

  return (
    <PageShell>
      <h1>{item.name}</h1>
      <div className="card">
        <b>Quick links</b>
        <ul>
          <li><a target="_blank" rel="noreferrer" href={`https://www.google.com/search?q=${q}`}>Google</a></li>
          <li><a target="_blank" rel="noreferrer" href={`https://www.youtube.com/results?search_query=${q} install`}>YouTube tutorials</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://www.rockauto.com/en/catalog/">RockAuto</a></li>
          <li><a target="_blank" rel="noreferrer" href="https://www.autozone.com/">AutoZone</a></li>
          <li><a target="_blank" rel="noreferrer" href={`https://www.amazon.com/s?k=${q}`}>Amazon</a></li>
        </ul>
      </div>
      <a className="btn" href="/guides" style={{marginTop:12,display:'inline-block'}}>Back to Guides</a>
    </PageShell>
  );
}