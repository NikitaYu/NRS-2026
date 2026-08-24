# Pending — NRS page SEO copy (John / Traci 2026-08-18–19)

**Status:** PARKED. Do **not** execute until Nikita confirms A/B/C/D (or a mix).  
**Machine:** Omen · **Agent:** GRK/BLD · **Saved:** 2026-08-25 03:52 +04:00  
**Place:** `Shopify-Projects/NRS-2026/.worktrees/feature-nrs-theme-2026-08-24` · `NikitaYu/NRS-2026` · `feature/nrs-theme-2026-08-24`

These edits live in **Shopify Pages** (Admin SEO fields), not the theme. They go **live immediately**. Use Shopify CLI / Admin API — do **not** use the theme code editor.

## Already done (do not redo)

- Live HTML title suffix fix is **shipped** on theme **NRS-2026-1.5.6 - section upgrade** (`150079963287`).
- Only `layout/theme.liquid` was uploaded to live.
- Unpublished backup: **NRS-2026-1.5.6 - before title tag fix** (`152888705175`).
- Custom SEO titles no longer get ` – National Readerboard Supply`. Default titles (products, collections, Policies) still do.
- Homepage live title has **no** shop suffix (differs from Claude’s “always suffix homepage” snippet). Leave unless Nikita asks.

## John’s requested titles (verbatim)

| URL | Requested SEO title |
|---|---|
| `/pages/letter-sets` | Readerboard Letters Sets. Rigid Bold Font Letter Sets. |
| `/pages/numbers-panels` | Readerboard Numbers and Price Points. All Sizes For Marquee Readerboards - etc |
| `/pages/contact` | Contact National Readerboard For Individual and Letter Sets |
| `/pages/readerboard-repair-and-replacements` | Outdoor Readerboard Replacement and Repair, Custom Quotes Now. |

Letter-sets: “then expand description tag” — **no new description text provided**.  
Numbers-panels: title ends with **“etc”** — not finished description copy.

## Live baseline when parked (2026-08-24/25)

| URL | Live title | Live description |
|---|---|---|
| `/` | Readerboard Sign Lettering and Marquee Letters for Signs | Readerboard Sign Letters, Marquee Letters, lettering for sign boards by National Readerboard Supply. (100) |
| `/pages/letter-sets` | Full Set of Readerboard Sign Letters and Numbers | Readerboard sign letters, numbers and punctuation set. Styles include Flexible Bold and Narrow Condensed, ADM Standard, Modern, Condensed and Halftone. (151) |
| `/pages/numbers-panels` | Readerboard Sign Numbers \| Custom Word Panels | Custom sign word panels and numbers for readerboards and marquees. Specialty giant numbers and price points, custom word panels and Marquee Graphics®. (150) |
| `/pages/contact` | Readerboard and Marquee Signs, Letters & Accessories | National Readerboard Supply offers readerboard and marquee signs, letters, word panels, accessories and sign repair services. Contact us today! (143) |
| `/pages/readerboard-repair-and-replacements` | Readerboard Sign Repair and Replacement Services | National Readerboard Supply provides marquee and readerboard sign repair and replacement services. Durable materials for upgrade or sign face replacement. (154) |

The four requested pages do **not** share duplicate descriptions with each other (checked then). Full-catalog duplicate scan not re-run at wrap.

## Flags (do not silently “correct”)

- **“Letters Sets”** — likely grammar (`Letter Sets`).
- **“Rigid Bold”** — live description lists **Flexible Bold**, not Rigid Bold.
- Numbers **“etc”** is not shippable description copy.
- Contact title is a real contact title; current title reads like a store pitch.
- Traci was going to update other tags; John parked that for Nikita. Stay on these four URLs unless expanded.

## Confirmation options (from phone analysis)

- **A)** Ship John’s four titles **verbatim**; keep current descriptions.
- **B)** Same, but fix `Letters Sets` → `Letter Sets` and/or Rigid → Flexible.
- **C)** Titles + Nikita pastes/writes the missing descriptions.
- **D)** Also add homepage shop-name suffix (theme change; currently not requested).

## Execute steps (after YES)

1. Confirm A/B/C/D. No theme change unless D.
2. Update the four Pages SEO titles (and descriptions only if C / new text exists).
3. Optional: duplicate-description scan of all published pages; fix only with approval.
4. Verify the four URLs live (title + description). Do not publish a new theme.
5. Optional: Nikita requests Google recrawl in Search Console (home + four URLs). Agent cannot do GSC without access.

## Rollback

- Theme title logic: republish or push from backup theme `152888705175`, or restore previous `layout/theme.liquid`.
- Page SEO: set fields back to the live baseline table above.
