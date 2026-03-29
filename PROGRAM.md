# Puppy Simulator

This document is for brainstorming and discussion. Not final design doc.

## Overview

This app is a cute puppy sim with chaotic humor. The vibe should stay adorable at all times, while the writing can derail into dark, raunchy, out-of-pocket jokes.

This is an MVP focused on a single sit-down session. Target playtime ranges from a quick 60-second check-in to up to about an hour of messing around.

## Features

- Pet the puppy (core interaction)
- Love meter that can go up and down (Tamagotchi-style, but less punishing)
- Tick-based money gains, inspired by Cookie Clicker-style progression
- Money formula direction: Love Meter x Action = Money
- Buy treats and toys with money
- Purchase auto-petters for passive progression
- Visual feedback for puppy mood/love state

MVP scope rule: KISS. Focus on the core game loop only.

## Core Loop (MVP)

- Interact with puppy (pet / feed / use toys)
- Love meter reacts and can dip over time
- Money accrues in ticks and is influenced by current love and actions
- Spend money on treats, toys, and auto-petters
- Repeat

No deep progression arc for MVP. Keep it immediately fun.

## Tech Stack

Keep it simple...

- SvelteKit
- No database; localStorage for MVP game state (throwaway—expect to replace later)
- Tailwind CSS v4
- Skeleton UI framework
- Copy and structured text: **JSON**
- Puppy / UI images: **static files** in the repo (download and check in assets; animate with transition effects)

## UI Philosophy

Minimal. FOCUS ON THE PUPPY.

We want a minimal, cute aesthetic that feels organic, playful, and natural.

Tone direction: keep visuals wholesome and cute, while the humor/text can be edgy and unhinged.

Single Page app.

Accessibility is deferred for MVP.

### Page layout (discussion)

**Direction:** Center stage + edge HUD. The puppy stays the visual anchor; economy stays visible but secondary.

- **Main stage (center, primary column):** Large centered puppy and core interactions (pet, feed, toys, mood feedback). This column gets most of the space.
- **Secondary pane (right):** Economy and shop together—money, purchases (treats, toys, auto-petters), prices and affordance. Keeps progression readable without crowding the puppy.
- **Top edge (optional, thin):** Global readouts such as love meter and money if we want at-a-glance HUD without duplicating detail from the right pane.

**Responsive:** On wide layouts, two columns (stage | economy). On narrow viewports, collapse the right pane into a bottom sheet, slide-over, or collapsible “Economy” control so the puppy remains center stage.

## UI Features

KISS for MVP:

- No audio/FX for now
- Keep UI simple and lightweight
- Prioritize puppy interactions and readable game state

## Success Criteria (MVP)

- Good vibes
- Fun to play

## Architecture

**Shape:** Single-page SvelteKit app. The tick loop and all game logic run on the client only.

**Content:** Strings and structured copy live in JSON so writing can iterate without entangling layout code.

**Assets:** Images ship as static files checked into the repo—no live random URLs.

**Persistence:** localStorage holds a flat save blob for MVP. It does not need to be robust; we will likely replace it later. No save migrations for MVP—schema changes can mean reset or manual wipe.

**Simulation & economy:** KISS. Simple tick/timer rules and a small set of tunable numbers; tune by feel, not heavy modeling.

**Goal:** Validate the idea, not build a long-lived platform.
