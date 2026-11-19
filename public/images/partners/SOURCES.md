# Stats page assets

Logos are stored locally so the banner does not depend on a third-party logo API at runtime. They identify the linked organisations; they are not newly designed marks. Raster backdrops and extra SVG whitespace were removed where needed for monochrome display.

| Asset | Source |
| --- | --- |
| Julius Baer | Website favicon, retrieved via Google's favicon cache for `juliusbaer.com`; isolated the JB mark |
| OneFootball | Inline header SVG at https://onefootball.com/ |
| Coinbase | https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/coinbase.svg (viewBox trimmed) |
| 512M | Inline header symbol at https://512m-website.vercel.app/, with the site's 512M name |
| ETH Zurich | Inline header SVG at https://ethz.ch/en.html |
| Eraneos | https://www.eraneos.com/wp-content/themes/stuurlui/assets/img/logo.svg |
| dTech.vision | https://dtech.vision/dTechLogoWhite.png |
| Farcaster | https://farcaster.xyz/og-logo-v3.png |
| CV VC | https://512m-website.vercel.app/clients/cvvc.svg |
| Crypto Valley | https://512m-website.vercel.app/clients/crypto-valley-association.svg |
| SWIC Digital | https://swic.digital/wp-content/uploads/2024/10/Logo-White-without-dot-300x89.png |
| UZH Blockchain Center | https://www.blockchain.uzh.ch/wp-content/uploads/BCC-logo-sw.png |
| DISCO | Text-based header identity reproduced from https://disco.ethz.ch/ (the group uses text, not a separate pictorial logo) |
| École polytechnique | Inline header SVG at https://www.polytechnique.edu/ |
| Accessa | https://accessa.ch/img/logo/logo.jpg |
| ETH Entrepreneur Club | https://www.entrepreneur-club.org/assets/ethec.svg |
| START Foundation | https://www.start-foundation.com/logo-white.svg |
| European Union | https://european-union.europa.eu/themes/contrib/oe_theme/dist/eu/images/logo/standard-version/positive/logo-eu--en.svg |
| Student Project House | https://sph.ethz.ch/uploads/images/ETH_SPH_Logo.svg |
| VIS | Inline VIS wordmark SVG at https://vis.ethz.ch/ |
| ETH Cryptography | https://crypto.ethz.ch/assets/images/eth.svg with the group name used in its website header |
| Hack Club | https://hackclub.com/assets/hackClubLogoRed.svg |

## World map

`src/data/world-map.json` contains simplified paths from Natural Earth's public-domain 1:50m Admin 0 countries data:
https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson

Paths use a static equirectangular projection: `x = (longitude + 180) × 2.5`, `y = (85 − latitude) × 2.5`, rounded to one decimal place. Coastlines are simplified at 0.1 degrees. Antarctica is omitted; the viewBox stops at 61°S. Monaco and Vatican City have small additional dots so they remain visible at world scale. Country colours are derived from `src/data/stats.json` at render time, with lived-in countries taking priority over visited countries. No map scripts or external requests are used.
