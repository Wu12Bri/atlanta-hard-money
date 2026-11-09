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

- Fields come from **public lender websites** as of the `verified` dates in `lenders.json` (research pass: **2026-10-27**; refresh passes: **2026-10-29** — 9 of 11 rows re-verified; **2026-10-30** — Lima One, Kiavi, Georgia Private Lending re-verified, 100PLD re-checked; **2026-11-02** — Silliman and Mainspring re-verified with DSCR details added, 100PLD re-checked; **2026-11-03** — AHP, Fairview, Atlanta Private Lending, Peach Tree, Groundfloor re-verified, 100PLD re-checked; **2026-11-04** — Kiavi and Lima One re-verified, Georgia Private Lending blocked by a bot-verification challenge (row unchanged), 100PLD re-checked; **2026-11-05** — Silliman and Mainspring re-verified, 100PLD re-checked; **2026-11-09** — Georgia Private Lending, Groundfloor, Kiavi, Lima One re-verified, 100PLD re-checked).
- Missing numbers are labeled **Not published** — we do **not** invent rates or LTVs.
- Terms change. Always confirm with the lender and do your own license/entity checks.
- **100PLD**: site offline since Oct 27, 2026 — not currently verifiable. 100pld.com returned HTTP 503 “Site Currently Unavailable” on nine checks: 2026-10-27, 2026-10-29, 2026-10-30, 2026-11-02, 2026-11-03, 2026-11-04, 2026-11-05, 2026-11-06, and 2026-11-09 (the 10-30 through 11-09 responses carried an `x-suspended-vhost` header). The row is kept (not deleted), uses older search-indexed copies of its pages, keeps its 2026-10-27 verified date, and shows a visible `status_flag` warning in the table.
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
