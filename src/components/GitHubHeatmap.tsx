import { useEffect, useMemo, useRef, useState } from 'react';
import type { GitHubActivity, GitHubDay } from '../data/githubActivity';
import { advanceContributionHover, contributionOpacities } from './githubHover';
import styles from '../styles/stats.module.css';

const month = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' });
const dateLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });

export default function GitHubHeatmap({ activity }: { activity: GitHubActivity }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const baseRects = useRef<(SVGRectElement | null)[]>([]);
  const hoverRects = useRef<(SVGRectElement | null)[]>([]);
  const [hoveredDay, setHoveredDay] = useState<GitHubDay | null>(null);
  const cells = useMemo(() => activity.weeks.flatMap((week, column) => week.map(day => ({
    day, x: column * 16 + 1.44, y: 22 + day.weekday * 16 + 1.44,
  }))), [activity.weeks]);
  const width = activity.weeks.length * 16;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const influences = new Float32Array(cells.length);
    const pointer = { x: 0, y: 0, on: false };
    let frame = 0;
    let nearest = -1;

    const draw = () => {
      frame = 0;
      const bounds = svg.getBoundingClientRect();
      let moving = false;
      cells.forEach((cell, index) => {
        const cx = cell.x + 6.56, cy = cell.y + 6.56;
        const distance = pointer.on ? Math.hypot(bounds.left + cx * bounds.width / width - pointer.x, bounds.top + cy * bounds.height / 136 - pointer.y) : Infinity;
        const { influence, scale, opacity } = advanceContributionHover(influences[index], distance, cell.day.level);
        if (influence === 0 && influences[index] === 0) return;
        influences[index] = influence;
        if (influence > .004) moving = true;
        // Raised cells render in a second layer, above their neighbours.
        const raised = influence > .02;
        for (const [rect, visible] of [[baseRects.current[index], !raised], [hoverRects.current[index], raised]] as const) {
          if (!rect) continue;
          rect.style.opacity = visible ? String(opacity) : '0';
          if (visible) {
            rect.setAttribute('transform', `translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`);
            const pixelScale = scale * bounds.width / width;
            rect.setAttribute('rx', String(Math.min(3, 13.12 * pixelScale * .2) / pixelScale));
          }
        }
      });
      if (moving || pointer.on) frame = requestAnimationFrame(draw);
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const leave = () => {
      pointer.on = false;
      nearest = -1;
      setHoveredDay(null);
      start();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.on = true;
      const bounds = svg.getBoundingClientRect();
      let closest = -1, distance = Infinity;
      cells.forEach((cell, index) => {
        const d = Math.hypot(bounds.left + (cell.x + 6.56) * bounds.width / width - pointer.x, bounds.top + (cell.y + 6.56) * bounds.height / 136 - pointer.y);
        if (d < distance) { distance = d; closest = index; }
      });
      if (distance >= 13.12 * bounds.width / width * 1.2) closest = -1;
      if (closest !== nearest) {
        nearest = closest;
        setHoveredDay(closest < 0 ? null : cells[closest].day);
      }
      start();
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pointer.on = false;
      nearest = -1;
      influences.fill(0);
      const pixelScale = svg.getBoundingClientRect().width / width;
      cells.forEach((cell, index) => {
        const base = baseRects.current[index], hover = hoverRects.current[index];
        if (base) {
          base.style.opacity = String(contributionOpacities[cell.day.level]);
          base.removeAttribute('transform');
          base.setAttribute('rx', String(Math.min(3 / pixelScale, 2.624)));
        }
        if (hover) hover.style.opacity = '0';
      });
      setHoveredDay(null);
    };
    reset();
    const resize = new ResizeObserver(reset);
    resize.observe(svg);
    svg.addEventListener('pointermove', move);
    svg.addEventListener('pointerleave', leave);
    reducedMotion.addEventListener('change', reset);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      svg.removeEventListener('pointermove', move);
      svg.removeEventListener('pointerleave', leave);
      reducedMotion.removeEventListener('change', reset);
    };
  }, [cells, width]);

  return (
    <>
      <div className={styles.heatmapScroll} tabIndex={0} role="region" aria-label={`GitHub contribution calendar for ${activity.year}. Scroll horizontally to see the full year.`}>
        <svg ref={svgRef} className={styles.heatmap} viewBox={`0 0 ${width} 136`} role="img" aria-label={`${activity.totalContributions.toLocaleString('en')} GitHub contributions in ${activity.year}; one square per day`}>
          {activity.weeks.map((week, column) => week.filter(day => day.date.endsWith('-01')).map(day => (
            <text key={day.date} x={column * 16} y="11">{month.format(new Date(`${day.date}T00:00:00Z`))}</text>
          )))}
          <g data-heatmap-layer="base">
            {cells.map(({ day, x, y }, index) => (
              <rect key={day.date} ref={el => { baseRects.current[index] = el; }} x={x} y={y} width="13.12" height="13.12" rx="2.624" opacity={contributionOpacities[day.level]} data-level={day.level} data-date={day.date} />
            ))}
          </g>
          <g data-heatmap-layer="hover" aria-hidden="true" pointerEvents="none">
            {cells.map(({ day, x, y }, index) => (
              <rect key={day.date} ref={el => { hoverRects.current[index] = el; }} x={x} y={y} width="13.12" height="13.12" rx="2.624" opacity="0" data-level={day.level} />
            ))}
          </g>
        </svg>
      </div>
      <p className={styles.githubHover} data-github-hover aria-hidden="true">{hoveredDay ? `${dateLabel.format(new Date(`${hoveredDay.date}T00:00:00Z`))}: ${hoveredDay.count} ${hoveredDay.count === 1 ? 'contribution' : 'contributions'}` : '\u00a0'}</p>
    </>
  );
}
