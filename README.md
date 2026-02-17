# Acronymle

Acronymle is a daily word puzzle application where users decode a daily acronym into its full-text phrase. Inspired by the "Wordle" mechanic, it focuses on word-level matching rather than letter-level matching.

## Features

- **Daily Challenge**: A new acronym to decode every 24 hours.
- **Word-Level Feedback**:
  - 🟩 **Green**: Correct word in the correct position.
  - 🟨 **Bright Yellow**: Correct word in a different position OR only 1 letter off (typo).
  - 🟡 **Faded Yellow**: Close! The word is 2 letters away from a correct word.
  - ⬛ **Gray**: Word does not exist in the phrase.
- **Hint System**: Reveals the category of the acronym (e.g., "Science", "Technology").
- **Statistics**: Track your total games, win percentage, and current/max streaks.
- **Sharing**: Copy your results to the clipboard with a spoiler-free emoji grid.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Hosting**: Vercel

## Architecture

The application follows a modern web architecture:
- **Frontend**: React Client Components using custom hooks (`useGame`, `useStats`) for state management.
- **API**: Next.js API Routes handle acronym metadata retrieval and guess validation.
- **Storage**: 
  - `sessionStorage`: Prevents refresh-cheating during an active session.
  - `localStorage`: Persists user statistics across days.

## File Structure

- `src/app/`: Next.js pages and API routes.
- `src/components/game/`: Specialized game UI components (Header, Grid, Input, Modal).
- `src/hooks/`: Custom React hooks for game logic and statistics.
- `src/data/`: Static acronym registry (`acronyms.json`).
- `src/lib/`: Utility functions (Normalization, Tailwind merging).

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

### Installation

```bash
bun install
```

### Running Locally

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
bun run build
```

## How to Play

1. Look at the daily acronym (e.g., **NASA**).
2. Type in your guess for the full phrase (e.g., "National Aeronautics and Space Administration").
3. You have **5 attempts**.
4. Use the **Hint** button if you're stuck (it will mark your score with a 💡).
5. Share your results with friends!
