import StickyPageHead from '../components/StickyPageHead';
import StickyLayout from '../components/StickyLayout';
import GitHubActivity from '../components/GitHubActivity';
import { useVideoAndDarkMode } from '../hooks/useVideoAndDarkMode';
import stats from '../data/stats.json';
import world from '../data/world-map.json';
import styles from '../styles/stats.module.css';

const visited = new Set(stats.countries.map(country => country.code));
const lived = new Set(stats.countries.filter(country => country.lived).map(country => country.code));
const partnerRows = [stats.partners.slice(0, 11), stats.partners.slice(11)];

export default function Stats() {
  const settings = useVideoAndDarkMode();

  return (
    <>
      <StickyPageHead
        title="stats"
        description="Alex in numbers: hackathon awards, games, communities, languages, and a world map of the adventure so far."
        ogUrl="https://alxstai.com/stats"
        canonicalUrl="https://alxstai.com/stats"
        keywords="alex stats, alxstai, hackathons, ETH game lab, Lensly, Crypto Valley, travel"
      />
      <StickyLayout {...settings}>
        <div className={styles.page}>
          <header className={styles.header}>
            <h1 className="font-tisa_bold text-4xl md:text-5xl dark:text-gray-400">stats</h1>
            <p className="mt-3 font-tisa text-black/70 dark:text-gray-400">some numbers, lots of side quests</p>
          </header>

          <div className={styles.logbook}>
            <section className={styles.intro} aria-labelledby="adventure-title">
              <div className={styles.introCopy}>
                <h2 id="adventure-title">building things.<br />following my own path.</h2>
                <div className={styles.eternalPose} aria-hidden="true">
                  <picture>
                    <img className={styles.logPose} src="/images/eternal-log-pose.webp" alt="" width="1024" height="1257" />
                  </picture>
                </div>
              </div>
              <dl className={styles.totals}>
                <div><dt>hackathon awards</dt><dd>{stats.hackathons.length}</dd></div>
                <div><dt>worth of bugs found</dt><dd>$25k</dd></div>
                <div><dt>countries explored</dt><dd>{visited.size}</dd></div>
                <div><dt>countries called home</dt><dd>{lived.size}</dd></div>
              </dl>
            </section>

            <section className={styles.partners} aria-labelledby="partners-title">
              <h2 id="partners-title">trusted by</h2>
              <div className={styles.marquees}>
                {partnerRows.map((partners, row) => (
                  <div className={styles.marquee} key={row}>
                    <div className={styles.track}>
                      {[0, 1].map(copy => (
                        <ul key={copy} className={copy === 1 ? styles.duplicate : undefined} aria-hidden={copy === 1 ? true : undefined}>
                          {partners.map(partner => (
                            <li key={partner.name}>
                              <a href={partner.href} target="_blank" rel="noopener noreferrer" tabIndex={copy === 1 ? -1 : undefined} aria-label={`${partner.name} (opens in a new tab)`} title={partner.name}>
                                <img src={`/images/partners/${partner.logo}`} alt="" width="144" height="46" draggable={false} />
                              </a>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="awards-title">
              <div className={styles.sectionTop}>
                <h2 id="awards-title">some competitions</h2>
              </div>
              <div className={styles.awardsGrid}>
                <div className={styles.hackathons}>
                  <ol>
                    {stats.hackathons.map(hackathon => (
                      <li key={hackathon.name}>
                        <span className={styles.year}>{hackathon.year}</span>
                        <div><h3>{hackathon.name}</h3><p>{hackathon.place}</p></div>
                        <span className={styles.award}>{hackathon.award}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <article className={styles.gameAward}>
                  <span className={styles.year}>ETH Game Lab · 2026</span>
                  <h3>Soot &amp; Steel</h3>
                  <dl>
                    <div><dt>Audience Award</dt><dd>1st</dd></div>
                    <div><dt>Jury Award</dt><dd>3rd</dd></div>
                  </dl>
                  <p>Judged by game devs that worked on <em>Hogwarts Legacy</em>.</p>
                  <div className={styles.rawTalent}><strong>Raw Talent cohort · 2026</strong><p>Handpicked by ETH Zurich Game Lab to present our game at Gamescom.</p></div>
                  <iframe
                    className={styles.gameVideo}
                    src="https://www.youtube-nocookie.com/embed/7cGiY-7hZrk"
                    title="Soot & Steel video"
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture; fullscreen"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  <a className={styles.videoLink} href="https://www.youtube.com/watch?v=7cGiY-7hZrk" target="_blank" rel="noopener noreferrer">watch on YouTube <span aria-hidden="true">↗</span></a>
                </article>
              </div>
            </section>

            <section className={styles.impact} aria-labelledby="impact-title">
              <h2 id="impact-title">built for the real world</h2>
              <div className={styles.impactGrid}>
                <article className={styles.lensly}>
                  <a href="https://farcaster.xyz/~/mini-apps/launch?domain=lensly.seraphim.zone" target="_blank" rel="noopener noreferrer" className={styles.productLink}>
                    <img src="/images/logos/lensly.svg" alt="" width="34" height="34" />
                    <h3>Lensly</h3><span aria-hidden="true">↗</span>
                  </a>
                  <dl className={styles.lenslyNumbers}>
                    <div><dt>users</dt><dd>20k+</dd></div>
                    <div><dt>events logged</dt><dd>180k+</dd></div>
                  </dl>
                  <p>Used by Vitalik and Farcaster co-founders Dan Romero and Varun Srinivasan.</p>
                </article>
                <article className={styles.reports}>
                  <span className={styles.reportYears}>2025 + 2026</span>
                  <h3>Crypto Valley<br />Top 50</h3>
                  <p>Authored the Crypto Valley Top 50 Ecosystem Reports.</p>
                  <a href="https://www.cvvc.com/insights" target="_blank" rel="noopener noreferrer">explore the reports <span aria-hidden="true">↗</span></a>
                </article>
              </div>
            </section>

            <GitHubActivity />

            <section className={styles.section} aria-labelledby="travel-title">
              <div className={styles.sectionTop}>
                <h2 id="travel-title">traveling around the world</h2>
              </div>
              <figure className={styles.mapFigure}>
                <svg viewBox="0 0 900 365" role="img" aria-label="World travel map" aria-describedby="map-description" className={styles.map}>
                  <desc id="map-description">{visited.size} countries explored. Visited countries are indigo; Bulgaria, Germany, USA, Switzerland, and France, where I’ve lived, are pink. A full country list follows the map.</desc>
                  <defs><pattern id="sea-grid" width="75" height="75" patternUnits="userSpaceOnUse"><path d="M75 0H0V75" fill="none" stroke="currentColor" strokeWidth="0.35" /></pattern></defs>
                  <rect width="900" height="365" fill="url(#sea-grid)" opacity="0.15" />
                  <g strokeWidth="0.45" strokeLinejoin="round">
                    {world.map(country => (
                      <path key={country.code} data-country={country.code} d={country.path} className={lived.has(country.code) ? styles.mapLived : visited.has(country.code) ? styles.mapVisited : styles.mapUnvisited} />
                    ))}
                  </g>
                  {/* Microstates would otherwise disappear at world scale. */}
                  <g className={styles.mapVisited} strokeWidth="0.7">
                    <circle cx="468.5" cy="103.2" r="1.8" /><circle cx="481.1" cy="107.7" r="1.8" />
                  </g>
                </svg>
                <figcaption className={styles.legend}>
                  <span><i className={styles.visitedDot} />visited</span>
                  <span><i className={styles.livedDot} />lived here</span>
                </figcaption>
              </figure>
              <div className={styles.homeCountries}><span>called home</span><p>{stats.countries.filter(country => country.lived).map(country => country.name).join(' · ')}</p></div>
              <details className={styles.countryList}>
                <summary>all {visited.size} countries explored</summary>
                <ul>{stats.countries.map(country => <li key={country.code}>{country.name}</li>)}</ul>
              </details>
            </section>

            <div className={styles.bottomGrid}>
              <section className={styles.languages} aria-labelledby="languages-title">
                <h2 id="languages-title">talk to me in</h2>
                <ul>{stats.languages.map(language => (
                  <li key={language.name}>
                    <div><label htmlFor={`language-${language.name}`}>{language.name}</label><span>{language.level}</span></div>
                    <meter id={`language-${language.name}`} min="0" max="100" value={language.fill} aria-valuetext={language.level}>{language.level}</meter>
                  </li>
                ))}</ul>
              </section>
              <section className={styles.communities} aria-labelledby="communities-title">
                <h2 id="communities-title">better with a crew</h2>
                <div className={styles.communityItem}><span className={styles.communityNumber}>02</span><div><h3>communities in Zurich</h3><p>Helped build as a core contributor.</p><p><a href="https://zurich3.space/" target="_blank" rel="noopener noreferrer">zurich3.space ↗</a><br /><a href="https://swissdao.space/" target="_blank" rel="noopener noreferrer">swissdao.space ↗</a></p></div></div>
                <div className={styles.communityItem}><span className={styles.communityNumber}>00</span><div><h3>Trajectory · cohort 0</h3><p>ETH Entrepreneur Club’s founder programme.</p></div></div>
                <div className={styles.communityItem}><span className={styles.communityNumber}>2×</span><div><h3>START Foundation</h3><p>Hacker house participant.</p></div></div>
              </section>
            </div>
            <footer className={styles.footer}><a href="/projects">see what i’m building <span aria-hidden="true">↗</span></a></footer>
          </div>
        </div>
      </StickyLayout>
    </>
  );
}
