# Product

## Register

brand

## Users

Recruiters, hiring managers, engineering leads, and potential collaborators or clients who land on this site to evaluate the owner's work and decide whether to reach out. They arrive with a specific question in mind ("is this person good, and is this person right for what I need?") and typically skim before reading — project work and clarity of communication carry more weight than volume of content. Context is often a quick screen between other tabs, sometimes mobile.

## Product Purpose

A personal portfolio for a software engineer: showcase real projects, communicate who the owner is and how they work, and make it effortless to reach out. Success is a visitor leaving with a clear, credible impression and a low-friction path to contact — not maximal information density.

## Brand Personality

Confident, craft-forward, quietly dramatic. Confidence now expressed through committed scale and typographic risk as much as through small-detail craft: the site should feel like it was made by someone who knows exactly what they're doing, not someone performing "modern portfolio" by template. Voice stays warm and direct, never corporate or hype-driven — the drama is visual and structural, not in the copy.

**Governing design principle — "elegant drama":** personality comes through committed scale, decisive hierarchy, and typographic risk, layered on top of craft and voice (a well-timed easing curve, a considered empty/error state, a tasteful hover detail, precise copy) — not through added color, ornament, or motion volume. This is a deliberate evolution from the site's original "quiet delight" restraint (2026-07 revamp), not a reflex rebrand: the palette and type family stay exactly the same, but scale and hierarchy are now allowed to be bold where they used to default to safe. Refinement passes (quieter, layout) still land before personality passes (delight/bolder), so delight can't re-introduce noise a quieter pass just removed.

## Anti-references

Still fully in force — evolving toward "elegant drama" does not unlock any of these:

- The generic AI-portfolio template: cream/sand backgrounds, gradient text, tiny uppercase tracked eyebrows above every section, hero-metric blocks (big number + small label + gradient accent), identical icon-grid cards repeated endlessly.
- Loud SaaS/startup marketing tone: aggressive CTAs, hype copy, oversaturated color blocks. Too salesy for a personal portfolio — bolder means bigger and more confident, not sales-y.
- Editorial-magazine default (display-serif-italic + small mono labels + ruled columns) as a reflex choice — the existing Fraunces/Jakarta pairing is a committed, already-shipping identity, not a fresh reflex pick, so identity-preservation wins over the reflex-reject list here. Don't let future work drift toward the editorial lane just because Fraunces is in play.

## Design Principles

1. **Elegant drama** — personality through committed scale, typographic risk, and decisive hierarchy, layered on the existing restraint-and-craft foundation — never through added ornament, new saturated color, or motion volume.
2. **Structure before tone** — fix layout/hierarchy problems before adjusting color or motion; most "off" feelings are spacing problems wearing a color costume.
3. **Motion is intentional or absent** — every animation has a reason and a `prefers-reduced-motion` fallback; no decorative flourishes.
4. **Say the true thing plainly** — copy and error/empty states speak in the owner's actual voice, not corporate boilerplate.
5. **One Accent Rule stays** — amber remains the only saturated color in the system; bold is expressed through type, scale, and layout, never a second brand color.
6. **Identity-preserving craft** — the shipped visual system (Fraunces + Plus Jakarta Sans, stone/amber palette) is the brand's committed identity; the "elegant drama" evolution refines how boldly that identity is expressed, it doesn't replace the identity itself.

## Accessibility & Inclusion

WCAG 2.1 AA baseline across the site (contrast, focus visibility, keyboard operability, labeled interactive elements). Full `prefers-reduced-motion` support is a hard requirement — the current codebase has zero handling for it, so every entrance/decorative animation needs a reduced-motion fallback (instant or crossfade) as part of this overhaul, not a follow-up.
