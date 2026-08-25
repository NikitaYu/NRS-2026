# Rollback — How To Videos job 2026-08-25

**Do not delete these unpublished themes without Nikita.**

## Shopify theme copies

| Role | Theme | ID |
|---|---|---|
| **Live now (title-tag fix, no video job)** | NRS-2026-1.5.6 - section upgrade | `150079963287` |
| **Rollback of live at start of this job** | NRS-2026-1.5.6 - before how-to videos 2026-08-25 | `152899879063` |
| Older title-tag backup | NRS-2026-1.5.6 - before title tag fix | `152888705175` |

To undo **theme JSON / Liquid** after a live push: publish `152899879063` (or push that theme’s files back onto live). Live page/collection **CMS HTML was not edited** in this job — old How To Videos body stays in the page as a hidden fallback.

## Git

Branch `feature/nrs-theme-2026-08-24` in `Shopify-Projects/NRS-2026/.worktrees/feature-nrs-theme-2026-08-24`.

Pre-job docs tip: `6e0ffce`. Title-tag Liquid: `fcecc42`.

## CMS snapshots (reference only)

- `how-to-videos.content-chunk.html` — live how-to list before this job
- `letter-changer-poles.video-snippet.html` — legacy “Short Helpful Videos” / suction-cup popup
- `MANIFEST.json` — URLs, YouTube IDs, live section ids

This job keeps extras on How To Videos and does **not** assign a new page template in Admin.
