# Session — GRK/BLD Omen 2026-08-26 wrap

**File:** `logs/Session_GRK-BLD_Omen_2026-08-26_0425.md`  
**Machine:** Omen / `LAPTOP-D7350MDG`  
**Agent:** GRK · **Runtime:** BLD  
**When:** 2026-08-24 machine NRS work → 2026-08-26 04:25 +04:00 phone wrap  
**Surface:** Agent-Bridge child (`AGENT_BRIDGE_CHILD=1`). Bridge not recycled.

## Active place

`Shopify-Projects/NRS-2026/.worktrees/feature-nrs-theme-2026-08-24` · `NikitaYu/NRS-2026` · `feature/nrs-theme-2026-08-24` · matches? yes

Harness L1 not the work folder. Dirty `main` checkout left untouched.

## Goals

1. Ship title-tag fix (done earlier this phone/machine chain).
2. Park John’s Aug 18–19 SEO copy; analyze only.
3. How To Videos + interior embeds; keep extras; backups first.
4. Fix mobile preview layout (crushed columns, gutters, titles, ATC).
5. Wrap / push / end session — **do not** publish live theme.

## Decisions

- Title-tag live on `150079963287`. SEO page fields still parked (A/B/C/D).
- How-to page is default `page.json` + CMS HTML, not a custom page template. Overlay hides CMS body; extras kept; duplicate pole embed removed.
- Interior letter-sets / marquee / repair: custom page JSON templates + `nrs-youtube-block`.
- Collections: handle-gated blocks on shared `collection.json` (do not add video to every collection).
- Menu How To Videos tab already existed — left as-is. Homepage Resources button still `/pages/resources`.
- Unpublished Shopify rollback: `152899879063`. Preview: `152889819287`.
- Did not use Admin API to rewrite page/collection CMS.

## Commands / checks

- `shopify theme duplicate` live → `152899879063`.
- `shopify theme push --theme 152889819287 --nodelete --only …` (never live this wrap).
- Live vs preview HTML titles/embeds verified.
- Placeholder preview URL caused a 404; full URLs given.
- Collection custom CSS 500-char limit: extra gutter rule moved to `nrs-mobile-ui.liquid`.

## Files

- `layout/theme.liquid` — title-tag (live) + `nrs-mobile-ui` include (preview only until ship).
- `sections/nrs-howto-videos-page.liquid`, `sections/nrs-youtube-block.liquid`, `snippets/nrs-youtube-embed.liquid`, `snippets/nrs-mobile-ui.liquid`.
- Templates: `page.json`, `page.letter-sets.json`, `page.marquee-letters.json`, `page.repair.json`, `collection.json`.
- Docs: pending SEO brief, backups/ROLLBACK, this log pair.

## Git

L2 `feature/nrs-theme-2026-08-24` Auto-Sync. Tip at wrap includes this log commit. Never `main`.

## Errors

- Fake `…` in a preview URL → 404 (user).
- Collection product column `calc(100% - 310px)` on mobile.
- Shopify section custom CSS max 500 characters.

## Handoffs

Same surface. Next: **ship** preview to live `150079963287` only on explicit YES, or more preview tweaks. SEO copy still parked.

## Cold Zone

Not run. WIP is on GitHub + Shopify unpublished copies. Offer a zip if Nikita wants one.
