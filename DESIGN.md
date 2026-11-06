---
name: Albert Shih — Portfolio
description: A software engineer's portfolio built on warm stone neutrals and a single amber accent
colors:
  ink: "#1c1917"
  ink-inverse: "#fafaf9"
  surface: "#fafaf9"
  surface-dark: "#0c0a09"
  surface-raised: "#ffffff"
  surface-raised-dark: "#1c1917"
  surface-muted: "#f5f5f4"
  surface-muted-dark: "#292524"
  border: "#e7e5e4"
  border-dark: "#292524"
  text-secondary: "#57534e"
  text-tertiary: "#a8a29e"
  amber-primary: "#d97706"
  amber-primary-hover: "#b45309"
  amber-bright: "#f59e0b"
  amber-bright-hover: "#fbbf24"
  amber-tint: "#fffbeb"
typography:
  display:
    fontFamily: "Fraunces, ui-serif, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.amber-primary}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.amber-primary-hover}"
  card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Albert Shih — Portfolio

## 1. Overview

**Creative North Star: "The Amber Workbench, Turned Up"**

A craftsperson's workspace, not a showroom — but the craftsperson now works at full scale and with full confidence: warm stone surfaces, one deliberate accent color, nothing decorative left lying around, but headlines and hierarchy that commit instead of playing it safe. The system still reads as personal and hand-considered rather than templated — closer to a well-kept studio than a SaaS landing page — but "well-kept" no longer means "quiet." Personality shows up in committed scale and typographic risk as much as in small, specific details (a precise hover, a considered empty state, exact copy); none of it comes from gradients, saturated color fields, or motion for its own sake. This system explicitly rejects the generic AI-portfolio look: no cream/sand-as-default background dressed up as "warm," no gradient text, no uppercase tracked eyebrows above every section, no hero-metric blocks, no identical icon-card grids — evolving toward boldness (2026-07 revamp) doesn't reopen any of these.

The palette stays intentionally narrow — stone neutrals doing almost all the work, amber appearing only where it earns attention (primary actions, active states, one accent moment per view; still capped by the One Accent Rule). Typography carries the craft signal and now also carries the drama: a serif display face for headlines paired with a clean grotesque for everything functional, both already-shipping choices this system preserves rather than replaces — but the display face is now asked to commit to real scale and weight contrast rather than a modest, safe size.

**Key Characteristics:**
- Restrained, stone-neutral surface with a single warm accent — still the only saturated color
- Committed scale and decisive hierarchy — dramatic size and weight contrast, not timid 1.2× steps
- Serif display + sans body, high contrast between the two
- Flat-by-default surfaces; elevation is a response to interaction, not decoration
- Motion is functional and calm — no bounce, no unexplained flourish
- Personality lives in scale, craft, and small interaction details, not ornament

## 2. Colors

A near-monochrome stone scale carries the interface; amber is the only saturated color, and it is rationed.

### Primary
- **Amber Workbench** (`#d97706`): The single call-to-action color — primary buttons, links that need to stand out, active/selected states. Used sparingly; if more than roughly 10% of a screen is amber, it's over-used.
- **Amber Bright** (`#f59e0b`): A slightly hotter variant used on dark surfaces (e.g. the closing CTA band) where the deeper amber would lose contrast.

### Neutral
- **Warm Paper** (`#fafaf9`): Light-mode body background.
- **Near-Black Stone** (`#0c0a09`): Dark-mode body background.
- **Ink** (`#1c1917`): Primary text on light surfaces; also the dark-mode "raised surface" color (cards, modals).
- **Paper White** (`#ffffff`): Raised surfaces in light mode (cards, modals, the sidebar).
- **Ash** (`#f5f5f4`): Subtle fills — hover backgrounds, muted chips.
- **Fog** (`#a8a29e`): Tertiary text, placeholder text, disabled states.
- **Slate Stone** (`#57534e`): Secondary body text where full-ink contrast would be too heavy.
- **Hairline** (`#e7e5e4` light / `#292524` dark): Borders and dividers.

### Named Rules
**The One Accent Rule.** Amber is the only saturated color in the system. It appears on primary actions and nothing else competes with it — no secondary brand color, no decorative gradients.

**The Cream-Bg Check.** `#fafaf9` sits at the edge of the generic "AI portfolio cream" band. It stays because it's near-zero chroma (true off-white, not a warm-tinted sand), not because "warm" was the reflex — if any future pass pushes it warmer/more saturated, that's a regression, not a refinement.

## 3. Typography

**Display Font:** Fraunces (serif, with Georgia fallback)
**Body Font:** Plus Jakarta Sans (grotesque sans, with system-ui fallback)

**Character:** A confident serif/sans contrast pair — Fraunces brings warmth and craft to headlines, Plus Jakarta Sans keeps body copy and UI clean and legible. The pairing is an already-shipped identity choice; it is preserved and refined here, not replaced.

### Hierarchy
- **Display** (700, `clamp(3rem, 8vw, 6rem)`, 0.95 line-height, -0.02em tracking): The home hero headline only — the site's one committed "elegant drama" moment. Fraunces.
- **Page title** (700, 3rem–3.75rem (`text-5xl`/`text-6xl`), 1.1 line-height, tracking-tight): Route-level H1s (About, Projects, Writing) — confidently scaled, but clearly subordinate to Display. Fraunces.
- **Headline** (700, 1.875rem–2.25rem, 1.2 line-height): In-page section headings. Fraunces.
- **Title** (600, 1.125rem–1.25rem, 1.3 line-height): Card titles, modal headings. Plus Jakarta Sans.
- **Body** (400, 1rem, 1.6 line-height, capped at 65–75ch): Paragraph copy, descriptions. Plus Jakarta Sans.
- **Label** (500, 0.8125rem–0.875rem, 1.4 line-height): Buttons, badges, nav items, form labels. Plus Jakarta Sans.

### Named Rules
**The Serif-Only-For-Display Rule.** Fraunces appears only in headlines. Body copy, UI chrome, and labels are always Plus Jakarta Sans — mixing the display face into functional text reads as decorative, not intentional.

## 4. Elevation

Flat by default. The system uses borders (1px, hairline color) rather than shadows to separate surfaces at rest; shadow appears only as a hover/focus response on interactive cards, never as ambient decoration.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 4px 12px rgba(28,25,23,0.08)`): Applied to project cards on hover only, paired with a small upward transform. Never present at rest.
- **Modal** (`box-shadow: 0 20px 40px rgba(28,25,23,0.15)`): Contact modal and detail modals, to separate them from the backdrop.

### Named Rules
**The Flat-At-Rest Rule.** No surface carries a shadow in its default state. Shadows are earned by interaction (hover, open/focus), never decorative.

## 5. Components

### Buttons
- **Shape:** Rounded corners (8px, `rounded-lg`); pill shape (`rounded-full`) reserved for tags/badges only.
- **Primary:** Amber Workbench background, white text, medium weight label, 12px/28px padding. Hover shifts to Amber Primary Hover (`#b45309`); no scale or shadow change on hover, color shift only.
- **Secondary / Ghost:** Transparent or stone-100 background, hairline border, ink text. Hover fills with Ash (`#f5f5f4`).

### Cards
- **Corner Style:** 12px radius (`rounded-xl`).
- **Background:** Paper White / Ink (dark mode).
- **Shadow Strategy:** Flat at rest; hover lift per the Elevation section, paired with a small `-4px` translateY.
- **Border:** 1px hairline, shifts to a subtle amber tint on hover to signal interactivity without a heavy color change.
- **Internal Padding:** 24px.

### Chips / Badges
- **Style:** Ash background, slate-stone text, full pill radius, small label-scale text.
- **State:** No selected/unselected variants currently; used for topic tags, always in the same neutral treatment.

### Inputs / Fields
- **Style:** 1px hairline border, 8px radius, white/stone-800 background.
- **Focus:** 2px amber ring plus border color shift to amber — no glow or shadow.
- **Error / Disabled:** Disabled uses Fog background with reduced-opacity text; no dedicated error style exists yet.

### Navigation (Sidebar)
- **Style:** Fixed-width panel, Paper White / Ink background, hairline right border. Nav items use Label-scale type, Ash hover background, amber-tinted active state.
- **Mobile:** Same panel becomes an off-canvas drawer with a transform-based slide transition.

## 6. Do's and Don'ts

### Do:
- **Do** keep amber to primary actions and single accent moments — the One Accent Rule.
- **Do** use Fraunces exclusively for display/headline text; everything functional stays Plus Jakarta Sans.
- **Do** keep surfaces flat at rest; earn shadows through interaction only.
- **Do** pair every entrance or decorative animation with a `prefers-reduced-motion` fallback (instant or crossfade) — site-wide via global CSS + `MotionConfig`; any new motion (overdrive entrance, route transitions) must extend this, never bypass it.
- **Do** use ease-out-quart-style easing for motion; keep distances small (10–20px).
- **Do** commit to scale — headline sizing and weight contrast should feel decisive, not safe ("elegant drama"); a hierarchy jump should read as obviously intentional, not a 1.2× nudge.

### Don't:
- **Don't** ship the generic AI-portfolio template: no cream/sand background pushed warmer than the current near-zero-chroma paper tone, no gradient text, no uppercase tracked eyebrows above every section, no hero-metric blocks (big number + label + gradient), no identical icon-grid cards.
- **Don't** use bounce or elastic easing (e.g. the current `chatBounceIn` keyframe's overshoot) — motion stays calm and settles without overshoot.
- **Don't** introduce a second saturated brand color; amber is the only one — bold comes from type/scale/layout, never a second color.
- **Don't** nest cards inside cards, or default to a card for every piece of content. Equal-weight card grids (e.g. a row of identical "entry point" cards) are the identical-card-grid ban even when the cards link somewhere new.
- **Don't** use loud SaaS/startup marketing tone in copy — no hype language, no aggressive CTAs.
- **Don't** mistake "bolder" for "more effects" — the amplification is in scale, hierarchy, and type, not new ornament, glow, or color.
