# 5th Box Visibility Fix Report

**Date:** January 25, 2026  
**Theme:** NRS-2026-1.5-test (ID: 147772604567)  
**Status:** ✅ Deployed

---

## Problem

The "5th Box Shortcut" (which switches users from Individual Letters to Letter Sets tab) was appearing in all contexts, including sections where there is no Sets tab available to switch to.

## Solution

Added a `master_mode` parameter to control when the 5th box appears. It now only shows in Master View sections where both tabs are available.

---

## Files Modified

### 1. `snippets/letter-collection-selector.liquid`

**Change:** Added `master_mode` parameter and updated the 5th box condition.

```diff
 {%- liquid
   assign parent_handles = all_parent_handles
   assign current_tab = current_tab | default: 'indv'
+  assign master_mode = master_mode | default: false
   assign inventory_suffix = ''
   if current_tab == 'set'
     assign inventory_suffix = '-set'
   else
     assign inventory_suffix = '-indv'
   endif
 -%}
```

```diff
-    {%- comment %} GMN-AG: 5th Box Shortcut to Sets {% endcomment -%}
-    {%- if current_tab == 'indv' -%}
+    {%- comment %} GMN-AG: 5th Box Shortcut to Sets (Master View Only) {% endcomment -%}
+    {%- if current_tab == 'indv' and master_mode -%}
```

---

### 2. `sections/letter-master-order.liquid`

**Change:** Pass `master_mode: true` to enable 5th box.

```diff
-      {%- render 'letter-collection-selector', current_tab: 'indv', all_parent_handles: all_parent_handles -%}
+      {%- render 'letter-collection-selector', current_tab: 'indv', all_parent_handles: all_parent_handles, master_mode: true -%}
```

---

### 3. `sections/letter-master-order-2.liquid`

**Change:** Dynamically set `master_mode` based on display mode.

```diff
+      {%- if mode == 'full' -%}{%- assign is_master_mode = true -%}{%- else -%}{%- assign is_master_mode = false -%}{%- endif -%}
-      {%- render 'letter-collection-selector', current_tab: 'indv', all_parent_handles: all_parent_handles -%}
+      {%- render 'letter-collection-selector', current_tab: 'indv', all_parent_handles: all_parent_handles, master_mode: is_master_mode -%}
```

---

### 4. `sections/letter-order-individual.liquid`

**Change:** Pass `master_mode: false` to disable 5th box.

```diff
-      {%- render 'letter-collection-selector', current_tab: 'indv', all_parent_handles: all_parent_handles -%}
+      {%- render 'letter-collection-selector', current_tab: 'indv', all_parent_handles: all_parent_handles, master_mode: false -%}
```

---

### 5. `sections/letter-order-sets.liquid`

**Change:** Pass `master_mode: false` to disable 5th box.

```diff
-      {%- render 'letter-collection-selector', current_tab: 'set', all_parent_handles: all_parent_handles -%}
+      {%- render 'letter-collection-selector', current_tab: 'set', all_parent_handles: all_parent_handles, master_mode: false -%}
```

---

## Git Commits

1. `cbdaa78` - before 5th box fix
2. `8a335bf` - Fix 5th box visibility - restrict to Master View only
3. `223075b` - Fix Liquid syntax error in letter-master-order-2

---

## Expected Behavior

| Section Type | 5th Box Visible? |
|--------------|------------------|
| Master View (Full) | ✅ Yes |
| Individual Only | ❌ No |
| Sets Only | ❌ No |

---

## Preview URL

https://national-readerboard-supply-company.myshopify.com?preview_theme_id=147772604567
