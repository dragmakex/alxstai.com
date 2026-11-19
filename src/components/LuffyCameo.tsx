import { useEffect, useState } from 'react';
import styles from '../styles/stats.module.css';

export default function LuffyCameo() {
  const [appearance, setAppearance] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout>;
    let occurrence = 0;

    const schedule = () => {
      // Show the first cameo promptly; later starts stay 20–30 seconds apart.
      const delay = occurrence === 0 ? 1_500 : 20_000 + Math.random() * 10_000;
      timer = setTimeout(() => {
        setLoaded(false);
        setAppearance(++occurrence);
        schedule();
      }, delay);
    };
    const sync = () => {
      clearTimeout(timer);
      setAppearance(null);
      if (!reducedMotion.matches && !document.hidden) schedule();
    };

    sync();
    reducedMotion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      clearTimeout(timer);
      reducedMotion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    if (appearance === null || !loaded) return;
    const timer = setTimeout(() => setAppearance(null), 2_000);
    return () => clearTimeout(timer);
  }, [appearance, loaded]);

  return (
    <div className={styles.cameoSlot} aria-hidden="true" data-luffy-cameo data-visible={appearance !== null}>
      {appearance !== null && (
        <picture key={appearance}>
          <source type="image/webp" srcSet="/images/luffy-log-pose.webp" />
          <img
            className={styles.logPose}
            src="/images/luffy-log-pose.gif"
            alt=""
            width="768"
            height="480"
            onLoad={() => setLoaded(true)}
            onError={() => setAppearance(null)}
          />
        </picture>
      )}
    </div>
  );
}
