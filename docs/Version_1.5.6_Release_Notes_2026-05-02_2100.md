# NRS-2026 Theme: Version 1.5.6 Release Notes
**Generated On:** 2026-05-02 21:00 +04:00
**Branch:** `feature/theme-1.5.6-pull`

## Overview
Version 1.5.6 introduces URL parameter pre-selection support for the "Letter Master Order" section. This update dramatically improves external link handling and user experience without compromising the core architecture of the Master View. It enables legacy links (e.g., `?type=set` or `/collections/handle`) to automatically open the correct collection tab inside the `indv_only` and `set_only` configured section templates.

## Key Changes & Implementations

### 1. Dynamic URL Parameter Pre-selection
The most significant change is the overhaul of the initial loading script.
- The section now actively checks the URL on page load for a `?collection=` parameter.
- **Legacy Support:** It also seamlessly parses the URL pathname (e.g., `/collections/[handle]`) as a fallback to support older links from previous store iterations.
- **Smart Matching Logic:** The extracted value is compared against the globally injected `masterCollectionsData` object, looking for matches in both the `handle` and `parent_handle` properties. 

### 2. Mode-Aware Initialization
The pre-selection logic respects the configuration mode of the section:
- **Master View (`full` mode):** URL parameters are ignored to preserve the default behavior of the master page (which defaults to the first individual letter collection).
- **Sub-templates (`indv_only` / `set_only`):** The URL parameters are evaluated. If a match is found, the system simulates a UI click on the side grid, automatically loading that collection's properties and variants into the active view. If no valid parameter is found, it gracefully falls back to the first available item in the respective tab.

### 3. File Modifications
*   **`sections/letter-master-order-2.liquid`**
    *   **Action:** Removed brittle, inline Javascript that was manually forcing `set_only` mode initializations. 
    *   **Result:** Cleaned up the file and allowed Javascript initialization to be centralized externally.
*   **`assets/letter-master-order.js`**
    *   **Action:** Removed old `init()` triggers. Added a comprehensive URL parsing block at the bottom of the script utilizing `URLSearchParams` and regex path matching.
    *   **Result:** Centralized, robust logic for handling all permutations of collection loading.
*   **`templates/collection.indv-collection.json`** [NEW]
    *   **Action:** Created via local Shopify Theme Editor and synchronized down.
    *   **Result:** Dedicated JSON template designed explicitly to host the Letter Master Order section configured in `indv_only` mode.
*   **`templates/collection.set-collection.json`** [NEW]
    *   **Action:** Created via local Shopify Theme Editor and synchronized down.
    *   **Result:** Dedicated JSON template designed explicitly to host the Letter Master Order section configured in `set_only` mode.

## Validation & Verification
The following edge cases have been accounted for and tested:
- Standard Master View load (no parameter) -> Loads first `indv` item.
- Link targeting `set_only` template with `?type=set` appended -> Loads specific set.
- Link targeting `indv_only` with exact handle -> Loads exact individual item.
- Missing or malformed handle -> Gracefully defaults to first tab item without throwing JS console errors.

## Next Steps
1. Perform physical verification of the `NRS-2026-1.5.6 - section upgrade` unpublished theme on the live Shopify environment.
2. Manually assign all relevant live collections to the newly created `indv-collection` and `set-collection` templates via the Shopify Admin UI.
3. Merge `feature/theme-1.5.6-pull` into the main production branch upon final QA approval.
