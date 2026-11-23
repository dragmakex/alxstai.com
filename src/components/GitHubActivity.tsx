import { useEffect, useState } from 'react';
import snapshot from '../../public/data/github-activity.json';
import { isGitHubActivity, type GitHubActivity as Activity } from '../data/githubActivity';
import GitHubHeatmap from './GitHubHeatmap';
import { contributionOpacities } from './githubHover';
import styles from '../styles/stats.module.css';

const source = 'https://raw.githubusercontent.com/dragmakex/alxstai.com/main/public/data/github-activity.json';

export default function GitHubActivity() {
  const [activity, setActivity] = useState<Activity>(snapshot);

  useEffect(() => {
    let stopped = false;
    let request: AbortController | undefined;
    const refresh = async () => {
      request?.abort();
      const current = new AbortController();
      request = current;
      const timeout = setTimeout(() => current.abort(), 15_000);
      try {
        const response = await fetch(source, { signal: current.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('Activity snapshot unavailable');
        const latest: unknown = await response.json();
        if (!isGitHubActivity(latest)) throw new Error('Invalid activity snapshot');
        if (!stopped) setActivity(current => Date.parse(latest.updatedAt) >= Date.parse(current.updatedAt) ? latest : current);
      } catch {
        // Keep the last good calendar without displaying refresh diagnostics.
      } finally {
        clearTimeout(timeout);
      }
    };
    void refresh();
    const interval = setInterval(refresh, 3_600_000);
    return () => {
      stopped = true;
      clearInterval(interval);
      request?.abort();
    };
  }, []);

  return (
    <details open className={`${styles.section} ${styles.githubActivity}`}>
      <summary><h2 id="github-activity-title">GitHub activity</h2></summary>
      <p className={styles.githubTotals}>
        <strong>{activity.totalContributions.toLocaleString('en')}</strong> contributions in {activity.year}
      </p>
      <GitHubHeatmap activity={activity} />
      <div className={styles.githubLegend} aria-label="Contribution intensity, from less to more">
        <span>less</span>
        <svg width="88" height="12" viewBox="0 0 88 12" aria-hidden="true">
          {[0, 1, 2, 3, 4].map(level => <rect key={level} x={level * 19} width="12" height="12" rx="2" opacity={contributionOpacities[level]} data-level={level} />)}
        </svg>
        <span>more</span>
      </div>
      <div className={styles.githubFooter}>
        <a href="https://github.com/dragmakex" target="_blank" rel="noopener noreferrer">github.com/dragmakex <span aria-hidden="true">↗</span></a>
      </div>
    </details>
  );
}
