# Personal Portfolio

A small website displaying my social media links and a minimalistic blog.

## GitHub activity on Stats

The contribution heatmap uses GitHub's unified contribution calendar for `dragmakex`. Counts follow GitHub's contribution rules and visibility settings.

- `.github/workflows/github-activity.yml` refreshes the current UTC year's data **hourly, at minute 17**, and supports manual runs in GitHub Actions.
- The job uses the built-in `GITHUB_TOKEN` with `contents: write`. No Vercel cron plan, paid service, or browser-exposed token is needed.
- Only `public/data/github-activity.json` is committed, and only when the activity changes. Timestamp-only checks do not generate commits. Updates are authored by the Actions bot, not the profile owner.
- The page renders the bundled snapshot immediately, then reads the public `main`-branch JSON on load and once per hour. New activity can appear without a site redeploy. On failure, the last good snapshot remains visible.
- Refresh failures quietly retain the last good data. Snapshot timestamps are kept internally to reject older cached data, not displayed on the page.

**Publishing:** push these files to the default branch and ensure GitHub Actions and bot writes are allowed. The schedule cannot run from local files. Run “Refresh GitHub activity” manually for an immediate first refresh. GitHub schedules are best-effort and can be delayed; public-repo schedules can be disabled after 60 days of repository inactivity.

Local refresh with Bun and an authenticated GitHub CLI session:

```sh
GITHUB_TOKEN="$(gh auth token)" bun run update:github
```

The token is used only by the local/Actions updater; never put it in a `NEXT_PUBLIC_` environment variable.
