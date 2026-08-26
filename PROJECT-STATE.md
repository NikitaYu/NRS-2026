# PROJECT-STATE — NRS-2026

**Last Updated:** 2026-08-26 04:25 +04:00  
**Machine:** Omen · **Agent:** GRK/BLD  
**Active place:** `Shopify-Projects/NRS-2026/.worktrees/feature-nrs-theme-2026-08-24` · remote `NikitaYu/NRS-2026` · branch `feature/nrs-theme-2026-08-24`

Older snapshot: `PROJECT-STATE_2026-05-02_2054.md` (Letter Master URL pre-select). Do not treat that date as current.

## Store / theme

- Store: `national-readerboard-supply-company.myshopify.com` (public `www.nationalreaderboard.com`)
- **Live:** NRS-2026-1.5.6 - section upgrade · id `150079963287` (title-tag fix only; **no How To Videos job**)
- **Rollback copy before How To Videos:** NRS-2026-1.5.6 - before how-to videos 2026-08-25 · id `152899879063`
- **Older title-tag backup:** NRS-2026-1.5.6 - before title tag fix · id `152888705175`
- **Preview (unpublished/dev):** Development (6bbb15-LAPTOP-D7350MDG) · id `152889819287`

## What is live

- HTML `<title>` skips shop-name suffix when a custom SEO title is set (`layout/theme.liquid`). Shipped 2026-08-24.
- How To Videos menu tab already existed → `/pages/how-to-videos`.
- Isolated worktree is the working copy. **Do not** commit dirty leftovers on the `main` checkout.

## How To Videos — preview only (not shipped)

John’s interior embeds + how-to page overlay (extras kept). CMS page HTML was **not** overwritten.

Preview: `?preview_theme_id=152889819287`  
Rollback notes: `docs/backups/howto-videos-2026-08-25/ROLLBACK.md`

Mobile preview fixes applied: collection column full width, 16px product gutters, 28px H1s, smaller ATC buttons (`snippets/nrs-mobile-ui.liquid`).

## Parked

John Saldi Aug 18–19 **page SEO copy** — `docs/Pending_SEO-page-copy_John-Aug18-19_GRK-BLD_Omen_2026-08-25.md`  
Needs A/B/C/D confirmation. Not started.

## Next

1. Nikita says **ship** → push preview files onto live theme `150079963287` only after YES.
2. Or more preview tweaks.
3. SEO copy still waits for A/B/C/D.

## Do not

- Auto-commit `Shopify-Projects/NRS-2026` on `main`.
- Edit production through Shopify’s browser theme editor.
- Recycle Agent-Bridge / port 8765 from a child turn.
