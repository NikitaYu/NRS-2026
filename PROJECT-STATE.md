# PROJECT-STATE — NRS-2026

**Last Updated:** 2026-08-25 03:52 +04:00  
**Machine:** Omen · **Agent:** GRK/BLD  
**Active place:** `Shopify-Projects/NRS-2026/.worktrees/feature-nrs-theme-2026-08-24` · remote `NikitaYu/NRS-2026` · branch `feature/nrs-theme-2026-08-24`

Older snapshot: `PROJECT-STATE_2026-05-02_2054.md` (Letter Master URL pre-select). Do not treat that date as current.

## Store / theme

- Store: `national-readerboard-supply-company.myshopify.com` (public `www.nationalreaderboard.com`)
- **Live:** NRS-2026-1.5.6 - section upgrade · id `150079963287`
- **Backup (pre title-tag):** NRS-2026-1.5.6 - before title tag fix · id `152888705175`
- Dev preview from the title job: `152889819287` (may still exist; not live)

## What works now

- Live HTML `<title>` no longer appends shop name when a **custom SEO title** is set (`layout/theme.liquid` only). Shipped 2026-08-24.
- Verified live: home + letter-sets + numbers-panels + contact + repair have custom titles **without** ` – National Readerboard Supply`. Policies and collection default titles still suffix (expected).
- Isolated worktree is the working copy. **Do not** commit dirty leftovers on the `main` checkout.

## Parked (do not execute until Nikita confirms)

Page SEO copy from John Saldi 2026-08-18/19. Full brief:

`docs/Pending_SEO-page-copy_John-Aug18-19_GRK-BLD_Omen_2026-08-25.md`

Needs A/B/C/D (verbatim titles vs grammar/style fixes vs new descriptions vs homepage suffix).

## How To Videos (in progress, not live)

- Extras on `/pages/how-to-videos` **kept**. Duplicate pole embed removed in the theme overlay.
- CMS page HTML was **not** rewritten (hidden while new section is on). Rollback: publish unpublished theme `152899879063`.
- Brief: `docs/backups/howto-videos-2026-08-25/ROLLBACK.md`
- Not live until Nikita says ship.

## Next

- Preview unpublished how-to/video theme, then ship only after YES.
- Parked SEO copy still waits for A/B/C/D.

## Do not

- Auto-commit `Shopify-Projects/NRS-2026` on `main` (pre-existing card/placeholder dirt).
- Edit production through Shopify’s browser theme editor.
- Recycle Agent-Bridge / port 8765 from a child turn.
