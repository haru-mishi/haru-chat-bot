---
name: Haru AI Hub
description: Deep-space, game-like admin console for a self-hosted LLM hub
colors:
  primary: "#7c5cff"
  primary-foreground: "#f4f6ff"
  secondary: "#1b2340"
  secondary-foreground: "#eef1fb"
  accent: "#241f4d"
  accent-foreground: "#eef1fb"
  neutral-bg: "#0a0e1f"
  neutral-fg: "#eef1fb"
  neutral-card: "#131a2e"
  neutral-muted: "#1b2340"
  neutral-muted-fg: "#9aa3c9"
  neutral-border: "#2a3358"
  neutral-sidebar: "#0d1226"
  gold: "#ffc857"
  cyan: "#45d9e0"
  destructive: "#ff5d7a"
  destructive-foreground: "#f4f6ff"
typography:
  display:
    fontFamily: "Fredoka, Fredoka Fallback"
  body:
    fontFamily: "Nunito Sans, Nunito Sans Fallback"
  mono:
    fontFamily: "JetBrains Mono, JetBrains Mono Fallback"
rounded:
  sm: "calc(1.125rem - 6px)"
  md: "calc(1.125rem - 3px)"
  lg: "1.125rem"
  xl: "calc(1.125rem + 6px)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
---

# Design System: Haru AI Hub

## Overview

**Creative North Star: "The Astronaut's Console"**

Haru AI Hub is the control panel a friendly cartoon astronaut (the mascot) would actually use: a deep-space cockpit that's warm and game-like rather than a cold NASA HUD. Every surface floats on a quiet starfield; the mascot's own rounded, chunky silhouette sets the shape language (generous 18px radii, pill buttons, pill badges); the palette reads as a real cosmic scene — nebula violet doing the primary work, starlight gold and planet cyan as secondary accents — not "dark mode plus one accent."

This replaces the previous "Macha AI Hub" mint-tea identity outright (see git history / prior DESIGN.md revision for that system, kept only as anti-reference). Product truth, roles, and page structure were preserved; only the visual world changed.

**Key Characteristics:**
- Deep-space navy scale as the only neutral family (no gray, no white surfaces) — dark is the single committed mode, not a toggle
- Fredoka (rounded, playful) for display headings; Nunito Sans for body/UI; JetBrains Mono for every numeric/data readout (token counts, API keys, user IDs)
- Full cosmic palette: violet primary, gold secondary, cyan tertiary, each doing real work (nav active state, chart series, badges)
- A starfield dot texture on `body` as the pervasive background signature
- Soft violet glow (offset + blur, never a flat zero-offset halo) on primary buttons, the active nav item, and the auth card — the one "depth" device in an otherwise flat, bordered system

## Colors

Single dominant hue (nebula violet) carrying primary actions, on a deep-space navy neutral scale, with gold and cyan as secondary/tertiary accents pulled from the "planet and starlight" motif.

### Primary
- **Nebula Violet** (`#7c5cff`): primary buttons, active nav/tab state, focus ring, links, primary chart series.

### Secondary
- **Starlight Gold** (`#ffc857`): secondary chart series, warm highlight accents.

### Tertiary
- **Planet Cyan** (`#45d9e0`): tertiary chart series, cool accent moments.

### Neutral
- **Deep Space** (`#0a0e1f`): page background (starfield sits on this).
- **Console Navy** (`#131a2e`): card/panel surfaces.
- **Hangar Navy** (`#0d1226`): sidebar surface (one step darker than cards).
- **Panel Fill** (`#1b2340`): inputs, secondary/muted fills, progress track.
- **Violet Tint** (`#241f4d`): accent surfaces (quick-action rows, demo callouts).
- **Orbit Line** (`#2a3358`): all borders/dividers.
- **Starlight Text** (`#eef1fb`): primary text.
- **Comet Trail** (`#9aa3c9`): muted/secondary text, always at full opacity — never dimmed further, since a dimmed muted-on-navy pairing drops below the contrast floor.

### Named Rules
**The One Neutral Family Rule.** Every neutral, from page background to sidebar to card, is a step of the same deep-space navy — no gray ever appears.
**The No-Flat-Halo Rule.** Any glow effect (buttons, active nav, auth card) carries a real offset and blur; a zero-offset colored ring is decoration, not this system's glow.

## Typography

**Display Font:** Fredoka (with Fredoka Fallback) — page titles, card titles, the product name.
**Body Font:** Nunito Sans (with Nunito Sans Fallback) — everything else.
**Mono Font:** JetBrains Mono (with JetBrains Mono Fallback) — token counts, API key strings, user IDs, chart tick values.

**Character:** Fredoka's rounded, slightly bouncy letterforms carry the "friendly game console" personality at heading scale; Nunito Sans is a quiet, warm workhorse for body copy so the display face doesn't have to do double duty; JetBrains Mono marks anything that is literally data or a measurement, never used as a "technical" costume elsewhere.

### Named Rules
**The Mono-Means-Data Rule.** Monospace only appears on real numbers/identifiers (usage stats, key strings, user IDs) — never as decoration implying "technical."

## Layout

Unchanged from the incumbent structure (preserved per product truth): fixed-width left sidebar + fluid content area, card-grid dashboard, single-column chat with a docked input bar, tabbed admin console. The redesign is a full skin change, not an information-architecture change.

## Elevation & Depth

Mostly flat, separated by hue steps and 1px borders — same discipline as the prior system. The one addition: a bounded set of soft violet glows (real offset + blur, ~35–60% opacity) on the three highest-intent elements — primary buttons, the active sidebar item, and the auth card. Everything else stays flat; the glow is reserved for "this is the thing to notice," not scattered everywhere.

### Shadow Vocabulary
- **Button/nav glow** (`box-shadow: 0 4px 20px -2px rgba(124,92,255,0.45)`, deeper on hover): the primary call-to-action signal.
- **Card ambient glow** (`box-shadow: 0 8px 40px -8px rgba(124,92,255,0.35)`): reserved for the single-card auth screen, where the card is the entire page.

## Shapes

Radius scale bumped up from the prior system's 10px base to an 18px base (`--radius: 1.125rem`), because the mascot itself is all rounded blobs — buttons read as pills, cards have visibly soft corners. `sm`/`md`/`xl` steps derive ±6/3px from the base, same pattern as before, just bigger.

## Components

### Buttons
- **Shape:** 18px radius, pill-like at button height.
- **Primary:** nebula violet fill, near-white text, soft violet glow (offset+blur), deepens on hover.
- **Secondary/Ghost/Ghost:** unchanged shadcn behavior, recolored to the new tokens (violet-tinted accent surface on hover).

### Cards / Containers
- **Corner Style:** 18px radius.
- **Background:** console navy, one step lighter than page background.
- **Shadow Strategy:** flat by default; the single-card auth screen gets the ambient glow (see above).
- **Border:** 1px orbit-line border on every card/panel.

### Navigation
- Fixed sidebar (hangar navy), active item is a solid violet pill with glow; inactive items plain text + icon, violet-tinted hover fill.

### Data Displays
- Every numeric readout (dashboard stat cards, token usage numbers, API key strings, admin table User ID column) renders in JetBrains Mono — the recurring "HUD data" signature.

## Do's and Don'ts

### Do:
- **Do** put every neutral on the deep-space navy scale — no gray, no white surface, ever.
- **Do** render numbers/identifiers in JetBrains Mono; it's the system's data signature.
- **Do** keep the starfield on `body` visible — don't let a full-bleed opaque wrapper block it (this broke twice during the build; check any new full-height container doesn't paint over `body`'s background-image).
- **Do** give any new glow effect a real offset + blur, matching the two shadow tokens above.

### Don't:
- **Don't** reintroduce the old mint-tea palette, teacup mascot, or "Macha" naming — that system is fully retired, not a fallback.
- **Don't** add a light-mode calibration; dark is the one committed identity, `.dark` and `:root` are intentionally identical.
- **Don't** dim muted text below full opacity — the placeholder-text contrast bug (muted color at 60% opacity) dropped below the 4.5:1 floor and was fixed; don't reintroduce that pattern.
- **Don't** scatter the violet glow everywhere — it's reserved for primary buttons, active nav, and the auth card only.
