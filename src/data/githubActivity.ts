export type GitHubDay = {
  date: string;
  weekday: number;
  count: number;
  level: number;
};

export type GitHubActivity = {
  username: string;
  year: number;
  updatedAt: string;
  totalContributions: number;
  weeks: GitHubDay[][];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

export function isGitHubActivity(value: unknown): value is GitHubActivity {
  if (!isRecord(value) || value.username !== 'dragmakex') return false;
  if (!isCount(value.year) || value.year < 2008 || value.year > 9999) return false;
  if (typeof value.updatedAt !== 'string' || !Number.isFinite(Date.parse(value.updatedAt))) return false;
  if (!isCount(value.totalContributions)) return false;
  if (!Array.isArray(value.weeks) || value.weeks.length < 53 || value.weeks.length > 54) return false;

  const first = Date.UTC(value.year, 0, 1);
  const expectedDays = (Date.UTC(value.year + 1, 0, 1) - first) / 86_400_000;
  const firstWeekday = new Date(first).getUTCDay();
  let index = 0;
  let total = 0;
  for (let weekIndex = 0; weekIndex < value.weeks.length; weekIndex++) {
    const week: unknown = value.weeks[weekIndex];
    if (!Array.isArray(week) || week.length < 1 || week.length > 7) return false;
    for (const day of week) {
      if (!isRecord(day)) return false;
      const expected = new Date(first + index * 86_400_000);
      if (day.date !== expected.toISOString().slice(0, 10) || day.weekday !== expected.getUTCDay()) return false;
      if (Math.floor((index + firstWeekday) / 7) !== weekIndex) return false;
      if (!isCount(day.count) || !isCount(day.level) || day.level > 4) return false;
      if ((day.count === 0) !== (day.level === 0)) return false;
      total += day.count;
      index++;
    }
  }
  return index === expectedDays && total === value.totalContributions;
}
