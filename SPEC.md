# Worm Tamagotchi — System Design

---

## 1. Overview

Two connected apps sharing a single backend:

| App | Platform | Purpose |
|---|---|---|
| **Creator Studio** | Desktop web app | One-time pet creation, outputs QR code |
| **Worm Care PWA** | Mobile web (PWA) | Ongoing care, games, evolution |

---

## 2. Backend

**Recommended: Supabase** (Postgres + Auth + Realtime + Storage — all free tier friendly)

### Core Tables

**`worms`**
| Field | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Chosen at creation |
| owner_token | text | Secret token encoded in QR |
| hat | text | Cosmetic slot |
| shades | text | Cosmetic slot |
| trait | text | e.g. "grumpy", "bubbly" |
| color | text | Hex or enum |
| stage | enum | `baby \| adult \| elder` |
| mood | int (0–100) | Happiness score |
| hunger | int (0–100) | Hunger score |
| is_sick | bool | Neglect flag |
| xp | int | Drives evolution |
| created_at | timestamp | |
| last_interaction | timestamp | For neglect decay calc |

**`milestones`** — tracks which cosmetics/achievements each worm has unlocked

**`interactions`** — log of feedings, games, care actions (used for XP + decay logic)

---

## 3. Creator Studio (Desktop)

### Flow
1. User visits the Creator Studio URL
2. Customizes their worm:
   - **Name** — free text
   - **Color** — preset palette (5–8 worm body colors)
   - **Hat** — select from ~6 starter options
   - **Shades** — select from ~4 starter options
   - **Trait** — pick one personality tag (e.g. Sleepy, Hyper, Grumpy, Chill)
3. Hits **"Hatch My Worm"**
4. Backend creates worm record, generates a unique `owner_token`
5. Screen displays:
   - Animated worm preview
   - QR code encoding `https://worm.app/care?token=<owner_token>`
   - Option to also copy/text the link

### Tech
- React SPA (can be same repo as PWA or separate)
- Worm rendered as SVG with layered parts (body, hat, shades)
- QR generated client-side via `qrcode.react`

---

## 4. Worm Care PWA

### First Launch
- User scans QR → opens PWA URL with token in query string
- Token is saved to `localStorage` — no login required
- PWA prompts "Add to Home Screen" for native-feel experience

### Main Screen
- Animated worm (reflects current mood + stage + sickness state)
- Mood bar (happiness %)
- Hunger bar
- Stage badge (Baby / Adult / Elder)
- Action buttons: Feed · Play · Cuddle · Heal (if sick)

### Care Mechanics

**Mood decay** — happiness drops ~5pts/hour passively. Interaction restores it.

**Hunger decay** — hunger drops ~8pts/hour. Low hunger accelerates mood decay.

**Sickness** — triggers if mood stays below 20 for 4+ hours. Worm visually changes (pale color, droopy eyes). Requires "Heal" action to recover.

**No death** — worm never dies, just gets sick and sad. Always recoverable.

### Mini-Games (3 starter games)
| Game | Mechanic | XP Reward |
|---|---|---|
| **Wiggle Race** | Tap rapidly to make worm race | +15 XP |
| **Bug Catch** | Tap falling bugs, dodge rocks | +20 XP |
| **Memory Munch** | Simon-says food sequence | +25 XP |

Each game also boosts mood +10–20 pts.

### Evolution & Growth

| Stage | XP Threshold | Visual Change |
|---|---|---|
| Baby | 0 | Small, stubby worm |
| Adult | 500 XP + 3 days old | Longer, more defined features |
| Elder | 2000 XP + 14 days old | Larger, crown cosmetic auto-unlocked |

Both XP **and** age gates must be met (hybrid model).

### Milestone Cosmetic Unlocks
| Milestone | Unlock |
|---|---|
| Play 10 games | "Sunglasses #2" shades |
| Reach Adult stage | "Party Hat" |
| Feed 50 times | "Chef Hat" |
| Reach Elder stage | "Crown" (auto-equipped) |
| 7-day login streak | "Halo" |

---

## 5. QR Code & Linking Architecture

```
Creator Studio
     │
     ▼
POST /api/worms  →  Supabase worms table
     │
     ▼
owner_token (UUID)  →  encoded into QR
     │
     ▼
https://worm.app/care?token=<uuid>
     │
     ▼
PWA loads token → fetches worm → saves token to localStorage
```

The token acts as the "password" — no user account needed. If lost, worm is inaccessible (can add email recovery later).

---

## 6. Tech Stack Summary

| Layer | Choice |
|---|---|
| Creator Studio | React + Vite |
| Care PWA | React + Vite + PWA plugin (Workbox) |
| Worm rendering | SVG layers (body, eyes, hat, shades, expressions) |
| Backend | Supabase (Postgres + Edge Functions for decay logic) |
| QR generation | `qrcode.react` |
| Hosting | Vercel or Netlify (both free tier) |
| Decay/tick logic | Supabase Edge Function on cron (every 30 min) |

---

## 7. Build Sequence (Recommended Order)

1. **Supabase schema** — set up tables, RLS policies
2. **SVG worm component** — layered, supports all cosmetic slots + expressions
3. **Creator Studio** — customization UI + worm creation API call + QR output
4. **PWA shell** — token loading, worm fetch, main care screen
5. **Decay logic** — Supabase cron Edge Function
6. **Mini-games** — one at a time, starting with Wiggle Race
7. **Milestone system** — unlock tracking + cosmetic equipping
8. **Evolution stages** — visual upgrades + XP/age gating
