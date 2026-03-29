# Puppy Simulator — Implementation Plan

This plan implements the intent of [BRAINSTORM.md](./BRAINSTORM.md). It fixes **order of work** and **scope boundaries**; tunable numbers and copy stay flexible.

## Goals

- Ship a **single-session**, **client-only** sandbox: pet → love reacts → money ticks → spend → repeat.
- **Prove the loop** with minimal UI and one clear economy formula; polish and balance later.
- **No** win/lose, **no** deep progression arc, **no** mobile-first layout for MVP.

## Tech Stack (fixed)

| Layer | Choice |
|--------|--------|
| Framework | SvelteKit |
| Styling | Tailwind CSS v4 |
| Components | Skeleton UI |
| Copy / data | JSON (imported or loaded from `src`) |
| Assets | Static files under `static/` (checked in) |
| Persistence | `localStorage` flat blob; no migration story for MVP |

## Architecture Summary

- **One primary route** (e.g. `/`) — SPA feel; all simulation on the **client**.
- **Game state** in a small module (Svelte stores or a single store + derived values): love, money, owned upgrades, optional last-tick time.
- **Tick loop** in one place (`setInterval` or `requestAnimationFrame` with fixed step): apply decay, passive income, auto-petter effects, then persist if needed.
- **Economy** in one module: constants + `moneyPerTick`-style helpers so tuning does not scatter across components.

## Phased Delivery

### Phase 0 — Project shell

- Initialize SvelteKit; add Tailwind v4 and Skeleton per their current docs.
- **Layout**: two columns — **main stage** (puppy) + **right pane** (love, money, shop). No separate HUD strip.
- **Desktop-only** assumption: comfortable min-width; no requirement for narrow viewports.
- Stub placeholder puppy image in `static/` until real art lands.

**Exit:** App runs, layout matches two-column intent, empty right pane ready.

### Phase 1 — Content plumbing

- Add JSON for: shop catalog (id, label, price, effect type), optional mood / flavor strings.
- Wire copy into UI via imports or a tiny loader — **no** hardcoded long strings in layout components.

**Exit:** Changing JSON updates labels and shop rows without touching markup logic.

### Phase 2 — Core simulation (no shop yet)

- Implement **love** (clamped numeric meter) and **primary interaction**: **pet** (click/tap target on puppy).
- Add **slow love decay** over time (per BRAINSTORM: “can dip over time”; keep it gentle).
- Implement **tick loop** and **money accrual** aligned with direction **Love × action → Money** (e.g. base rate × current love per tick, plus explicit bumps on pet if desired). Centralize multipliers in one place.

**Exit:** Player can pet, see love change, see money rise in ticks; decay is noticeable but not punishing.

### Phase 3 — Actions and feedback

- Add **feed** and **use toy** as additional interactions (minimal differentiation: different love/money deltas or cooldowns — keep rules dumb and tunable).
- **Visual feedback** for mood/love: CSS transitions on the puppy container (scale, opacity, filter) driven by love bands or discrete states — no audio for MVP.

**Exit:** Multiple interaction types feel distinct enough to be fun; puppy readably reflects state.

### Phase 4 — Shop and passive progression

- **Shop** in right pane: list from JSON, buttons disabled when broke.
- **Treats / toys**: one-time or consumable effects (love bump, temporary multiplier) — simplest viable rules.
- **Auto-petters**: passive effect each tick (e.g. +love per owned, or +money scaling with love). Prefer **one** clear passive rule for MVP.

**Exit:** Full loop: earn → spend → feel stronger idle/play.

### Phase 5 — Persistence

- Serialize game state to `localStorage` on a debounced schedule or after material changes.
- Load on startup; if parse fails or schema is wrong, **reset** (no migrations per BRAINSTORM).

**Exit:** Refresh preserves progress within the same browser.

### Phase 6 — Assets and pass

- Replace stub with final puppy image(s) in `static/`; keep **transitions** as the main “animation.”
- Light pass: readable typography, spacing, Skeleton components for buttons/cards only where they help.

**Exit:** Matches “good vibes / fun to play” smoke test.

## Suggested Repository Shape (non-prescriptive)

```
src/
  lib/
    game/
      state.ts          # stores + types
      tick.ts           # loop + dt
      economy.ts        # formulas + constants
      persistence.ts    # localStorage read/write
    content/
      shop.json
      strings.json      # or split by domain
  routes/
    +page.svelte        # main shell
  ...
static/
  puppy.png             # (or similar)
```

Adjust names to taste; **keep simulation out of `+page.svelte`** so the page stays layout + wiring.

## Explicitly Out of Scope (MVP)

- Database or server-side game state
- Save migrations and robust backward compatibility
- Audio and sound effects
- Accessibility hardening (deferred per BRAINSTORM)
- Mobile / narrow layout targets
- Win/lose conditions and narrative arcs

## Success Check

- [ ] BRAINSTORM core loop is playable in one sitting without crashes.
- [ ] Copy and shop data are editable via JSON without refactoring components.
- [ ] Economy tuning is mostly **one module** of constants.
- [ ] BRAINSTORM success criteria: **good vibes**, **fun to play** (subjective — quick team playtest).

## References

- Product intent and tone: [BRAINSTORM.md](./BRAINSTORM.md)
