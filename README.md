# Atlanta Hard Money Lenders Directory (Mogul)

Static comparison page of hard money / private money lenders that serve **Metro Atlanta and Georgia**. Built for flip, bridge, BRRRR, and construction investors who need a boring, useful shortlist — not hype.

## What’s here

| File | Purpose |
|------|---------|
| `index.html` | The public directory page |
| `styles.css` | Layout and typography |
| `app.js` | Search, loan-type filter, sort |
| `lenders.json` | Machine-readable research data |
| `lenders.embedded.js` | Same data embedded so `file://` works offline |

## Open the page

**Option A — open the file directly** (works offline; embedded data loads automatically):

```bash
# macOS
open /workspace/mogul/atlanta-hard-money/index.html

# Linux (example)
xdg-open /workspace/mogul/atlanta-hard-money/index.html
```

Or point a browser at:

`file:///workspace/mogul/atlanta-hard-money/index.html`

**Option B — local HTTP server:**

```bash
cd /workspace/mogul/atlanta-hard-money
python3 -m http.server 8765
```

Then visit `http://127.0.0.1:8765/`.

## Data sources caveat

- Fields come from **public lender websites** as of the `verified` dates in `lenders.json` (research pass: **2026-10-27**; refresh pass: **2026-10-29** — 9 of 11 rows re-verified on live pages; 100PLD index-only; Lima One not re-checked).
- Missing numbers are labeled **Not published** — we do **not** invent rates or LTVs.
- Terms change. Always confirm with the lender and do your own license/entity checks.
- **100PLD**: still unresolved. 100pld.com returned HTTP 503 “Site Currently Unavailable” on 2026-10-27 and again on 2026-10-29; the row uses search-indexed copies of its home/FAQ/about/contact pages (consistent on 2026-10-29) and keeps its 2026-10-27 verified date until the live site can be checked.
- This is **not** financial, lending, or legal advice and is **not** an endorsement of any lender.

## Next steps

1. **Host** — push this folder to GitHub Pages or Netlify (Origin/GitHub already available on this bot).
2. **Expand** — add more GA-active lenders (e.g. CoreVest, New Silver, RCN, Southeast Bridge) only when GA coverage is clear on their sites.
3. **Refresh cadence** — re-verify LTVs/phones quarterly or when a lender reports a change.
4. **Outreach** — once email is connected, draft listing-correction and featured-listing emails (always with user approval before send).
5. **Tomorrow’s page candidate** — Metro Atlanta STR / Airbnb property managers comparison (fees, markets covered, what’s included).

## Maintainer notes

- Prefer editing `lenders.json`, then regenerate the embed:

```bash
python3 -c "import json; from pathlib import Path; d=json.load(open('lenders.json')); Path('lenders.embedded.js').write_text('window.MOGUL_LENDERS = '+json.dumps(d, indent=2)+';\n')"
```

- Keep the tone professional and local. No fake testimonials or earnings claims.
