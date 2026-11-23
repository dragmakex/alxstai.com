# Run from repo root: uv run --with beautifulsoup4==4.15.0 scripts/update-mal.py
import json
import os
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen

from bs4 import BeautifulSoup

BASE = 'https://myanimelist.net'


def link(path, host='myanimelist.net'):
    url = urljoin(BASE, path)
    if urlparse(url).scheme != 'https' or urlparse(url).hostname != host:
        raise ValueError(f'Unexpected MAL link: {url}')
    return url


def fetch(path):
    with urlopen(BASE + path, timeout=20) as response:
        return response.read()


username = os.environ.get('MAL_USERNAME', '')
if not re.fullmatch(r'[A-Za-z0-9_-]+', username):
    raise SystemExit('Set the MAL_USERNAME secret to refresh the public stats.')
profile = BeautifulSoup(fetch(f'/profile/{username}'), 'html.parser')
hours = {}
for kind in ('anime', 'manga'):
    label = profile.select_one(f'.stats.{kind} .stat-score .al').get_text(strip=True)
    assert label.startswith('Days:')
    hours[kind] = round(float(label.split(':')[1].replace(',', '')) * 24)

favorites = []
for item in profile.select('li.btn-fav'):
    url = link(item.a['href'])
    kind = urlparse(url).path.split('/')[1]
    if kind in ('anime', 'manga', 'character'):
        favorites.append(dict(kind=kind, title=item['title'], url=url,
                              image=link(item.img['data-src'], 'cdn.myanimelist.net')))

activity = []
for item in profile.select('.statistics-updates .data'):
    entry = item.select_one('a')
    status = item.select_one(':scope > .fn-grey2').get_text(' ', strip=True)
    activity.append(dict(title=entry.get_text(strip=True), url=link(entry['href']), status=' '.join(status.split())))

watching = []
while True:
    page = json.loads(fetch(f'/animelist/{username}/load.json?status=1&offset={len(watching)}'))
    assert isinstance(page, list)
    for row in page:
        watching.append(dict(title=row['anime_title'], url=link(row['anime_url']), episodes=row['num_watched_episodes'], total=row['anime_num_episodes']))
    if len(page) < 300:
        break

snapshot = dict(hours=hours, favorites=favorites, watching=watching, activity=activity)
public_json = json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n'
if username.casefold() in public_json.casefold():
    raise SystemExit('Refusing to publish an account identifier.')
Path('src/data/mal.json').write_text(public_json)
