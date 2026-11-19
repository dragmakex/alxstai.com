import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isGitHubActivity } from '../src/data/githubActivity.ts';

const levels = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];
const query = `query Activity($from: DateTime!, $to: DateTime!) {
  user(login: "dragmakex") {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date weekday contributionCount contributionLevel } }
      }
    }
  }
}`;

export async function fetchActivity(token, now = new Date()) {
  if (!token) throw new Error('GITHUB_TOKEN is required to fetch GitHub activity');
  const year = now.getUTCFullYear();
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'alxstai-portfolio-stats',
    },
    body: JSON.stringify({ query, variables: { from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` } }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`GitHub API returned HTTP ${response.status}`);
  const result = await response.json();
  if (result.errors?.length) throw new Error('GitHub GraphQL returned errors; check token permissions');
  const collection = result.data?.user?.contributionsCollection;
  const calendar = collection?.contributionCalendar;
  if (!Array.isArray(calendar?.weeks)) throw new Error('GitHub returned no contribution calendar');
  const snapshot = {
    username: 'dragmakex',
    year,
    updatedAt: now.toISOString(),
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map(week => week.contributionDays?.map(day => ({
      date: day.date,
      weekday: day.weekday,
      count: day.contributionCount,
      level: levels.indexOf(day.contributionLevel),
    }))),
  };
  if (!isGitHubActivity(snapshot)) throw new Error('GitHub returned an invalid contribution calendar');
  return snapshot;
}

export function saveActivity(snapshot, destination) {
  if (!isGitHubActivity(snapshot)) throw new Error('Refusing to save invalid GitHub activity');
  if (existsSync(destination)) {
    const previous = JSON.parse(readFileSync(destination, 'utf8'));
    if (isGitHubActivity(previous)) {
      const { updatedAt: previousTime, ...previousData } = previous;
      const { updatedAt: currentTime, ...currentData } = snapshot;
      if (JSON.stringify(previousData) === JSON.stringify(currentData)) return false;
    }
  }
  mkdirSync(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  renameSync(temporary, destination);
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const snapshot = await fetchActivity(process.env.GITHUB_TOKEN);
    const destination = fileURLToPath(new URL('../public/data/github-activity.json', import.meta.url));
    const changed = saveActivity(snapshot, destination);
    console.log(changed ? `Saved ${snapshot.totalContributions} contributions for ${snapshot.year}` : 'GitHub activity is unchanged');
  } catch (error) {
    console.error('GitHub activity update failed:', error instanceof Error ? error.message : 'Unknown error');
    process.exitCode = 1;
  }
}
