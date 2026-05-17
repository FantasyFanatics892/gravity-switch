# Gravity Switch

A mobile-first clone of the popular "Gravity Switch" endless runner game built with React, TypeScript, and HTML5 Canvas.

## Game Mechanics

- **Tap/Click** to flip gravity (switch between floor and ceiling)
- Cube auto-runs forward continuously
- Avoid spikes and blocks on both floor and ceiling
- Score points for each obstacle passed
- Speed gradually increases

## Obstacle Types

- **Floor Spike** - Spike pointing up from floor
- **Ceiling Spike** - Spike pointing down from ceiling
- **Both Spikes** - Spikes on both surfaces
- **Floor Block** - Block obstacle on floor
- **Ceiling Block** - Block obstacle on ceiling
- **Gap Block** - Blocks on both with narrow gap in middle

## Features

- 🎮 One-tap gravity flip mechanic
- 🏃 Auto-running endless gameplay
- 📈 Progressive difficulty (speed increases)
- ⚡ Smooth physics and animations
- ✨ Particle effects and trail
- 🔊 Sound effects
- 📱 Mobile-optimized touch controls
- 🏆 High score persistence

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- HTML5 Canvas
- Web Audio API

## Getting Started

```bash
# Install dependencies
npm install

# Start the frontend and backend together
npm run dev

# Build frontend assets for production
npm run build
```

## Backend

The app now includes a local Node.js + Express backend with SQLite storage. The backend is located in `server/` and writes the database to `server/data/game.db`.

### Available API routes

- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/user`
- `POST /api/score`
- `GET /api/leaderboard`

### Environment

Create a `.env` file from `.env.example` to configure the backend port and session secret.

## Controls

- **Mobile**: Tap anywhere to flip gravity
- **Desktop**: Click anywhere or press Space/Up/Down to flip

## Project Structure

```
src/
├── components/     # React components
│   ├── Game.tsx   # Main game component
│   └── ui/        # UI components
├── hooks/         # Custom React hooks
│   └── useGame.ts # Game logic hook
├── lib/           # Utilities and helpers
│   ├── game/      # Game engine modules
│   └── utils.ts   # General utilities
├── pages/         # Page components
└── App.tsx        # Root component
```

## License

MIT
