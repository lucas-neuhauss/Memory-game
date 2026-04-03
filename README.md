# 🧠 Jogo de Memória

A fun, multilingual memory card game built with **SvelteKit**, **Svelte 5**, and **Tailwind CSS**. Fully client-side — no server needed.

Match pairs of cards across three themed decks, compete with up to 4 players, and enjoy satisfying animations when you score!

> **[🃏 Play Now](https://your-username.github.io/jogo-memoria/)** *(update link after deploying)*

---

## ✨ Features

- **3 themed decks** — Dinosaurs 🦕, Dogs 🐕, Superheroes 🦸 (18 pairs each)
- **1–4 players** — take turns matching cards, with live score tracking
- **Customizable grid** — from 2×2 up to 6×6
- **Mixed themes** — select multiple themes and cards are split evenly
- **Juicy animations** — 3D card flips, match celebrations, confetti bursts, floating score popups
- **AI-generated card art** — beautiful kawaii illustrations (emoji fallback for missing images)
- **Persistent state** — game auto-saves to localStorage, resume anytime
- **Fully static** — pre-rendered SPA, works offline, no backend
- **Mobile friendly** — responsive grid and touch-friendly controls

## 🎮 How to Play

1. **Choose your settings** — pick themes, grid size, and player names
2. **Start the game** — cards are shuffled and laid face-down
3. **Flip two cards** per turn:
   - **Match** → Score a point + play again 🎉
   - **Mismatch** → Cards flip back, next player's turn
4. **Game ends** when all pairs are found — highest score wins!

## 🛠️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | [SvelteKit](https://kit.svelte.dev/) with [Svelte 5](https://svelte-5-preview.vercel.app/) runes |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Adapter | `@sveltejs/adapter-static` (SPA fallback) |
| Language | TypeScript |
| Build | Vite |
| Art | AI-generated kawaii illustrations + emoji fallback |
| Deployment | GitHub Pages via GitHub Actions |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (22 recommended)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/jogo-memoria.git
cd jogo-memoria

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `./build`. Preview it with:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── themes.ts             # Card definitions (emoji + images)
│   ├── components/
│   │   ├── Card.svelte       # 3D flip card with match animation
│   │   ├── GameBoard.svelte  # CSS Grid card layout
│   │   ├── Scoreboard.svelte # Live scores + match celebrations
│   │   ├── Confetti.svelte   # Particle burst on match
│   │   ├── GameScreen.svelte # Active game view
│   │   ├── HomeScreen.svelte # Setup / configuration screen
│   │   ├── PlayerSetup.svelte
│   │   ├── GridSetup.svelte
│   │   └── ThemePicker.svelte
│   └── stores/
│       ├── game.svelte.ts    # Core game logic (Svelte 5 runes)
│       └── persistence.svelte.ts  # localStorage save/load
├── routes/
│   ├── +layout.ts            # Pre-render config
│   └── +page.svelte          # Root page (home/game routing)
static/
└── images/
    ├── dinosaur/             # AI-generated card art
    ├── dogs/                 # (add images here)
    └── superheroes/          # (add images here)
```

## 🖼️ Adding Card Art

Cards use images from `static/images/{theme}/` when available, falling back to emoji.

To add an image:

1. Drop a PNG into the right theme folder (e.g. `static/images/dinosaur/dino-butterfly.png`)
2. Add `image: '/images/dinosaur/dino-butterfly.png'` to that card's entry in `src/lib/themes.ts`

See [`IMAGE_PROMPTS.md`](./IMAGE_PROMPTS.md) for ready-to-use DALL·E 3 prompts to generate the full set.

## 🌐 Deploying to GitHub Pages

This project is pre-configured for GitHub Pages deployment via GitHub Actions.

### Setup

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to `main` — the workflow in `.github/workflows/deploy.yml` will build and deploy automatically

The build uses `basePath: '/jogo-memoria'` when the `GITHUB_PAGES` env var is set. **If you rename the repo**, update the `basePath` in `svelte.config.js` to match.

### Custom domain (optional)

1. Add a `CNAME` file to `static/` with your domain
2. Configure DNS with your domain provider
3. In GitHub repo settings → Pages → Custom domain, enter your domain
4. Remove the `basePath` line in `svelte.config.js` (or set it to `''`)

## 📝 License

MIT — feel free to fork, modify, and share!
