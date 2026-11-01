# Coop-games: Slop Schedule

Coop-games is a web app in development for friends who want to plan co-op playthroughs together. Its goal is to give each group a shared game plan where members can compare what they want to play and track their individual progress.

The project is currently at an early stage. Google sign-in, nickname-based profiles, multilingual UI, and a starter game-library screen are in place. Group management and live game-catalog features are part of the product direction and are still being built.

## What the project is for

Co-op games often get lost in chats and scattered lists. Coop-games is designed to give a friend group one shared place to:

- collect games the group might play;
- compare each member’s interest and game rating;
- track individual play status;
- preserve a history of completed group playthroughs.

The app is intended for small groups of friends. A player’s status is personal, so one member can mark a game complete while another is still playing or has not started.

## Languages and sign-in

The interface is available in English, Russian, and Ukrainian. English is the default. Users sign in with Google and choose a unique nickname for their profile. The app does not store Google email addresses.

## Technology

- Next.js App Router, React, and TypeScript
- Tailwind CSS
- Auth.js with Google OAuth and JWT sessions
- PostgreSQL on Neon, accessed through Prisma and the PostgreSQL adapter
- `next-intl` for localized routes and messages

The Prisma schema includes users, OAuth identities, groups, group membership and roles, a shared game catalog, games added to groups, and per-member ratings and play statuses. The current game-library screen uses sample data; group workflows, persistent game management, Steam metadata, and playthrough history are not implemented yet.

## Run locally

1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env` and set `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `DATABASE_URL`, and `DIRECT_URL`.
3. Add `http://localhost:3000` as an authorized JavaScript origin and `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI in your Google OAuth client.
4. Apply database migrations: `npx prisma migrate dev`.
5. Start the app: `npm run dev`, then open [http://localhost:3000](http://localhost:3000).

Generate an Auth.js secret with `npx auth secret`. The `.env` file is ignored by Git. For local development, Next.js can also read `.env.development.local`; Prisma CLI reads `.env` through the project’s Prisma config.
