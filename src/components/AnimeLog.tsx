import mal from '../data/mal.json';
import styles from '../styles/stats.module.css';

export default function AnimeLog() {
  return <details open className={styles.section}>
    <summary><h2>anime &amp; manga</h2></summary>
    <dl className={styles.lenslyNumbers}>
      <div><dt>anime hours watched</dt><dd>{mal.hours.anime.toLocaleString('en-US')}</dd></div>
      <div><dt>manga hours read</dt><dd>{mal.hours.manga.toLocaleString('en-US')}</dd></div>
    </dl>
    {['anime', 'manga', 'character'].map(kind => {
      const entries = mal.favorites.filter(entry => entry.kind === kind);
      return entries.length > 0 && <div key={kind} className="mt-6"><h3>favorite {kind === 'character' ? 'characters' : kind}</h3>
        <ul className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-3">{entries.map(entry => <li key={entry.url}>
          <img className="mb-1 aspect-[7/11] w-full object-cover" width="140" height="220" loading="lazy" src={entry.image} alt="" />
          <a className="block text-[.8em] leading-tight" href={entry.url}>{entry.title}</a></li>)}</ul></div>;
    })}
    <details className="mt-6"><summary className="cursor-pointer font-tisa_bold">currently watching ({mal.watching.length})</summary>
      <ul className="mt-2 space-y-1 text-[.85em]">{mal.watching.map(entry => <li key={entry.url}><a className="hover:underline" href={entry.url}>{entry.title}</a> · ep {entry.episodes}/{entry.total || '?'}</li>)}</ul>
    </details>
    <h3 className="mt-6">recent list updates</h3>
    <ul className="mt-2 space-y-1 text-[.85em]">{mal.activity.map(entry => <li key={entry.url}><a className="hover:underline" href={entry.url}>{entry.title}</a> · {entry.status}</li>)}</ul>
  </details>;
}
