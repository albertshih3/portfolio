---
target: whole site (src/app)
total_score: 20
p0_count: 1
p1_count: 3
timestamp: 2026-07-08T05-23-48Z
slug: whole-site-src-app
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | External-link cards give no cue they leave the site; everything else (chat streaming, form states, active nav) communicates clearly. |
| 2 | Match Between System and Real World | 2 | `/blog` claims the blog "is currently being crafted" while `/blog/[slug]` fully renders 5 complete, dated articles — contradictory system status. |
| 3 | User Control and Freedom | 2 | Only `ProjectDetailModal` handles Escape-to-close; `ContactModal` and the chat panel don't. No modal traps focus. |
| 4 | Consistency and Standards | 1 | Two separate contact-form implementations (`/contact` page vs. `ContactModal`); blog pages run an entirely different gray/blue/purple palette and font treatment than the rest of the site. |
| 5 | Error Prevention | 2 | `ContactModal` validates well; the standalone `/contact` page hitting the same API has no client validation beyond native `required`. |
| 6 | Recognition Rather Than Recall | 3 | Nav is icon+label throughout; tags/badges always labeled. |
| 7 | Flexibility and Efficiency of Use | 2 | No keyboard shortcuts anywhere; chat's quick-question chips are a nice accelerator but isolated. |
| 8 | Aesthetic and Minimalist Design | 2 | Home/About/modals are genuinely restrained; About's wall of near-identical bordered cards and the blog subsystem's gradient CTA drag the average down. |
| 9 | Error Recovery | 2 | `ContactModal` preserves input with specific field errors; chat's failure state is a generic "Something went wrong," `/contact`'s toast gives no specifics. |
| 10 | Help and Documentation | 1 | No help/FAQ surface anywhere. |
| **Total** | | **20/40** | **Acceptable — the finished surfaces are strong; real inconsistencies pull the average down.** |

## Anti-Patterns Verdict

**Split verdict, and the split is itself the finding.**

**LLM assessment (Assessment A):** The "front stage" — home, about, sidebar, `ContactModal`, `ProjectCard`/`ProjectDetailModal` — clears the absolute bans cleanly: no cream/sand default, no gradient text, no hero-metric blocks, no identical icon-grid cards, flat-at-rest surfaces with earned hover shadows exactly as DESIGN.md specifies. But two live, indexable "back stage" routes fail hard: `src/app/blog/[slug]/page.tsx` runs a `bg-gradient-to-r from-blue-600 to-purple-600` CTA band, `blue-100`/`blue-800` tag pills, `gray-*` neutrals, and no Fraunces on headings — a second, unrelated design system pasted into the same app. `src/app/contact/page.tsx` similarly drops the sidebar, Fraunces, and all validation. Beyond those two orphaned surfaces, the tiny-uppercase-tracked "eyebrow" label (named in SKILL.md as "the saturated AI scaffold") recurs as the default secondary-heading treatment across six+ finished-page locations (hero eyebrow, four `ProjectDetailModal` section labels, About's "Relevant Coursework", Sidebar's "Connect").

**Deterministic scan (Assessment B, `detect.mjs --json src/app src/components`):** 17 findings, exit code 2. Real, actionable:
- `bounce-easing` at `chat-bar.tsx:283` (`animate-bounce` on the typing-indicator dots) — confirmed real, though Assessment A notes loading-indicator bounce is a conventional, more defensible use than decorative bounce. **The detector did not catch the more severe `chatBounceIn` custom keyframe** (globals.css:41, used at chat-bar.tsx:344) because it's referenced by string name in an inline style, outside the regex's pattern coverage — Assessment A caught this one; the two assessments are complementary here, not redundant.
- `gray-on-color` at `chat-bar.tsx:239` (hover state) and `:268` (prose/code block) — plausible but unconfirmed; needs a manual contrast check, see below.

**False positives (verified by hand against the actual hex values), important not to act on:**
- `gray-on-color` at `about/page.tsx:312` and `page.tsx:241`: both are `bg-amber-500 ... text-stone-950` — `stone-950` (`#0c0a09`) is near-black, not gray, and reads at very high contrast on amber-500. The rule's regex flags any `stone-*` text class near a colored background regardless of which end of the ramp; it doesn't compute an actual ratio.
- `chat-bar.tsx:239`: `text-stone-600` at rest, `hover:bg-amber-100` — `#57534e` on `#fef3c7` computes well above 4.5:1. Likely another instance of the same blunt heuristic.
- All 8 findings in `src/app/api/send-email/route.ts` (overused-font "Arial", colors outside DESIGN.md, 5px radius): this file is an **HTML email template**, not app UI — it correctly uses email-client-safe hardcoded inline styles rather than the site's design tokens, which email clients wouldn't render anyway. Out of scope for this critique; recommend adding an inline `impeccable-disable` comment or a detector ignore rule so future scans don't re-flag it.

No browser overlay was run — no browser-automation tool is available in this session. This is an explicit, allowed fallback per the skill's own rules (CLI detector output is sufficient to avoid a failed run), not a missing step.

## Overall Impression

This site has two separable design maturities living in the same repository. The primary flow — home → projects → about → contact modal — is a genuinely well-executed, restrained interpretation of the documented "Amber Workbench" system: flat cards, earned hover states, a real photo instead of stock imagery, direct non-hype copy. Then there's a second layer — the standalone `/contact` page and the entire `/blog` tree — that looks like it was built on a different day against a different brief and never reconciled. **The single biggest opportunity is closing the gap between what's finished and polished versus what's half-built and still publicly reachable, before any quieter/delight/layout polish on the already-strong pages.** A recruiter on the happy path gets a strong, credible impression; a recruiter who clicks one wrong link gets whiplash.

## What's Working

- **`ContactModal`**: inline field validation with specific messages ("Enter a valid email address," not "Invalid input"), preserves user input on failure, distinct loading/disabled/success states, a success message in the owner's actual voice. This is "quiet delight through craft" done right — the bar the rest of the site should be held to.
- **Elevation discipline on project cards**: flat at rest, hover lift (`whileHover={{ y: -4 }}` + amber border tint) only on interaction, precisely implementing DESIGN.md's Flat-At-Rest Rule. The detail modal's information tiering (Role → Overview/Features → de-emphasized Challenges/Learnings) is genuinely considered, not templated.
- **Hero composition**: avoids every anti-reference — no gradient text, no stat blocks, a real photo of the person, copy stating real facts instead of hype.

## Priority Issues

**[P0] Blog subsystem is a contradictory, off-brand template hiding in plain sight**
- **Why it matters**: `blog/page.tsx` says the blog "is currently being crafted" while `blog/[slug]/page.tsx` fully renders five complete articles at real routes, styled with a completely different palette (gray/blue/purple instead of stone/amber) and no Fraunces. Anyone reaching a post directly — search index, shared link, guessed slug — sees a page that looks like a different, generic, dated site pasted inside this one, including a banned decorative gradient CTA band.
- **Fix**: Pick one truth. Either finish the blog inside the real stone/amber/Fraunces system and remove the "under construction" gate, or remove/noindex the `[slug]` route until it's ready.
- **Suggested command**: `$impeccable harden`, then `$impeccable colorize`/`$impeccable typeset` if kept.

**[P1] Duplicate, degraded contact form at `/contact`**
- **Why it matters**: A second, weaker implementation of the site's highest-stakes interaction, hitting the same API as `ContactModal`. Drops the sidebar (dead end), drops Fraunces on its `<h1>`, has zero client-side validation, uses placeholder-only labels (a WCAG label failure once typed), generic error toast.
- **Fix**: Delete the standalone route and redirect `/contact` to `/` with the modal auto-opened, or rebuild it to reuse `ContactModal`'s logic directly.
- **Suggested command**: `$impeccable harden`

**[P1] Uppercase-tracked "eyebrow" label used as the default secondary-heading treatment site-wide**
- **Why it matters**: SKILL.md names this exact pattern as "the saturated AI scaffold." It's the reflexive answer for nearly every secondary label here: hero eyebrow, four `ProjectDetailModal` section labels, About's "Relevant Coursework," Sidebar's "Connect." One deliberate kicker is voice; six recurring instances is scaffolding.
- **Fix**: Reserve caps+tracking for one deliberate, named element (or drop it) and give the rest weight/size contrast instead.
- **Suggested command**: `$impeccable typeset`

**[P1] Muted-gray text (`stone-400`) fails WCAG AA contrast in recurring spots on light surfaces**
- **Why it matters**: `text-stone-400` (`#a8a29e`) against `#fafaf9`/white computes to roughly 2.5:1 — well under the 4.5:1 AA floor. Recurs at `ProjectDetailModal`'s section labels, Sidebar's "Connect" header, About's "Relevant Coursework" label, and chat's placeholder/disclaimer text. `text-stone-500` (~4.8:1) is what DESIGN.md actually designates for secondary copy — the fix is mechanical. (Note: `stone-400` on the *dark* CTA bands, e.g. `page.tsx:235`, is fine — this issue is specifically the light-surface instances.)
- **Fix**: Swap `stone-400` → `stone-500` (or darker) everywhere it carries real text content on light surfaces; reserve `stone-400` for decorative/disabled use only.
- **Suggested command**: `$impeccable audit`

**[P2] No `prefers-reduced-motion` handling anywhere, and `chatBounceIn` violates DESIGN.md's own named rule**
- **Why it matters**: DESIGN.md's own Do's and Don'ts already state "Don't use bounce or elastic easing (e.g. the current `chatBounceIn` keyframe's overshoot)" and call reduced-motion support "a hard requirement." Neither has been implemented: `chatBounceIn` (globals.css:41-57, an overshoot keyframe) still fires on the chat entrance, and every staggered `motion.div` entrance across every page has zero reduced-motion fallback.
- **Fix**: Replace `chatBounceIn` with a calm ease-out-quart slide/fade; add a shared reduced-motion check that swaps every entrance to instant/crossfade.
- **Suggested command**: `$impeccable quieter` (this overhaul folds "calmer animations" into quieter's motion-reduction work rather than a separate `animate` pass, per the plan already agreed with the user).

## Persona Red Flags

**Jordan (First-Timer — the primary target user, a recruiter skimming)**
- Reaching a shared/indexed blog post lands on a page with a different palette, different font, and a gradient CTA — reasonably wonders if they're still on the same person's site, directly undermining the "credible, consistent impression" success metric in PRODUCT.md.
- Project cards give no textual cue that the whole card opens a detail modal vs. the two icon buttons that open new tabs — may miss the richer content and just bounce off the terse card description.
- An old resume link straight to `/contact` lands on a bare, sidebar-less form with no path back except browser-back — a dead end at the site's most important action.

**Sam (Accessibility-Dependent)**
- Section labels at ~2.5:1 contrast (`stone-400`) fail WCAG AA outright for low-vision users.
- `ContactModal` and the chat panel have no Escape-key handler (only `ProjectDetailModal` does) — inconsistent keyboard behavior across the three modals.
- Chat responses stream with no `aria-live` region — a screen reader user gets no notification an answer arrived.
- Homepage project tabs use `role="tab"`/`"tablist"` but no arrow-key roving-tabindex and no `aria-controls`/`id` pairing — breaks the standard ARIA tabs pattern.

**Riley (Stress Tester)**
- A guessed/discovered blog slug fully renders while `/blog` insists it's "currently being crafted" — an easily found, flat contradiction.
- `/contact` provides a second, unvalidated path to the same API the hardened `ContactModal` protects.
- Refreshing mid-conversation wipes chat history instantly with no warning.

## Minor Observations

- Amber appears in many independent places on one screen at once (language pill on every project card, active tab fill, active nav item, hover border, three separate CTA buttons) — worth a periodic check against DESIGN.md's own "≤10% of a screen" guidance, particularly on the projects grid.
- Sidebar's profile image `onError` handler hides the broken image entirely, leaving an empty circle with no initials/icon fallback.
- Home and About both close on near-identical dark CTA bands with very similar copy — fine in isolation, slightly repetitive back-to-back.
- The chat bar's rotating placeholder text (5s interval, opacity fade) is continuous, unprompted motion on a persistent, always-visible element on every page.
- About's card treatment (bordered `rounded-xl` box for every section — Quick Facts, 6 skill categories, 4 experience entries, Education, CTA) is the "default to a card for every piece of content" pattern DESIGN.md's Don'ts explicitly names; not nested, but wall-to-wall.

## Questions to Consider

- If the blog isn't ready, why does `/blog/[slug]` already contain five complete, publishable-quality articles? What's actually blocking a real launch versus gating it behind a placeholder page?
- The contact modal is genuinely well-crafted — why does a second, weaker contact form exist at `/contact` at all?
- "Quiet delight" is the stated governing principle — does a bounce-in chat bar and an off-brand gradient blog CTA actually match that register, or are they auditioning for a louder site than the one already shipping?
