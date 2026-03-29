# Puppy Simulator — PLAN.md

Implementation plan derived from [BRAINSTORM.md](./BRAINSTORM.md), tuned for a small MVP that is shippable quickly and easy to iterate on.

## 1) Product Intent (MVP)

- Build a tiny, cute, desktop-oriented puppy sandbox.
- Preserve the loop: **interact → love changes → money ticks → buy upgrades → repeat**.
- Keep systems intentionally simple so tuning can happen later.

## 2) Guardrails

- Single-page SvelteKit experience.
- Client-side simulation only.
- `localStorage` persistence only (flat save blob, reset on schema mismatch).
- JSON-driven copy/content.
- No audio, no server backend, no mobile layout target, no win/lose conditions.

## 3) Build Order

### Phase A — App shell and layout

1. Bootstrap SvelteKit app with Tailwind v4 and Skeleton.
2. Create two-column layout:
   - Left/main: puppy stage + interaction buttons.
   - Right pane: love meter, money counter, shop list.
3. Add placeholder puppy asset in `static/`.

**Done when:** App starts and layout reflects the intended desktop composition.

### Phase B — Core state + tick loop

1. Introduce game state (`love`, `money`, `ownedItems`, optional `lastTickAt`).
2. Implement one centralized tick loop that:
   - applies love decay,
   - computes passive money,
   - applies auto-petter effects,
   - triggers debounced persistence.
3. Keep all economy constants in a single module.

**Done when:** Without shop logic, petting changes love and money grows over time.

### Phase C — Interactions and feedback

1. Implement actions: `pet`, `feed`, `toy`.
2. Keep effects intentionally simple and tunable (delta-based rules).
3. Add visual mood feedback via CSS transitions tied to love bands.

**Done when:** Actions feel distinct and puppy mood is visually legible.

### Phase D — Shop + progression

1. Create JSON-backed shop catalog (`id`, `label`, `price`, `effectType`, `effectValue`).
2. Render shop from data; disable purchase when funds are insufficient.
3. Support:
   - instant consumables (love/money boosts),
   - passive auto-petters for tick-based scaling.

**Done when:** Spending money meaningfully accelerates the loop.

### Phase E — Persistence + stabilization

1. Save/load from `localStorage` with parse guards.
2. On invalid or incompatible data, reset to defaults.
3. Perform quick tuning pass for “good vibes / fun to play”.

**Done when:** Refresh keeps progress and the loop remains stable for a 5–10 minute play session.

## 4) Suggested File Layout

```txt
src/
  lib/
    game/
      state.ts
      economy.ts
      tick.ts
      actions.ts
      persistence.ts
    content/
      shop.json
      strings.json
  routes/
    +page.svelte
static/
  puppy.png
```

Notes:
- Keep simulation logic out of route components.
- Keep constants/data out of UI markup.

## 5) Acceptance Checklist

- [ ] Core loop is playable end-to-end in one browser session.
- [ ] Love meter can rise/fall and affects money generation.
- [ ] Shop content is fully data-driven via JSON.
- [ ] Economy tuning is centralized in one module.
- [ ] Progress persists across refresh in the same browser.
- [ ] MVP tone remains cute/chaotic and lightweight.

## 6) Non-Goals for MVP

- Multiplayer or server saves
- Data migrations and long-term save compatibility
- Audio, advanced animation rigs, or narrative progression
- Accessibility hardening and mobile optimization (deferred)
