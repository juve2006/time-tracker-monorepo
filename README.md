# Time Tracker (Monorepo)

This is a small Turborepo monorepo with:

- `apps/back`: NestJS API + Prisma + SQLite
- `apps/front`: Next.js (App Router) frontend

---

## Prerequisites

- Node.js (LTS recommended)
- npm (repo is set up for npm workspaces)

---

## Install dependencies

From the repo root:

```bash
npm install
```

This installs root dev tooling + both app workspaces (`apps/*`).

---

## Database setup (backend / Prisma)

The backend uses SQLite. Prisma migrations live in `apps/back/prisma/migrations`.


### Apply migrations

From `apps/back`:

```bash
npx prisma migrate dev
```

(Optional) Regenerate Prisma Client (output is configured to `apps/back/generated/prisma`):

```bash
npx prisma generate
```
---

## Run in development

### Run both apps together (recommended)

From the repo root (Turborepo):

```bash
npm run dev
```

- Backend listens on `PORT` (default `8000`)
- Frontend runs on Next’s default dev port (usually `3000`)

### Run apps individually

Backend (NestJS), from `apps/back`:

```bash
npm run dev
```

Frontend (Next.js), from `apps/front`:

```bash
npm run dev
```

---

## Environment variables

### Backend (`apps/back`)

- `PORT` (optional): API port (defaults to `8000`)
- `DATABASE_URL` (optional but recommended): SQLite DB location (see notes above)

CORS is enabled in the backend bootstrap.

### Frontend (`apps/front`)

The frontend expects the API base URL to be set:

- `NEXT_PUBLIC_API_URL` (required): e.g. `http://localhost:8000`

Example (from `apps/front`):

```bash
export NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Architecture (brief)

### Backend (`apps/back`)

- **NestJS** application
- SQLite via `@prisma/adapter-better-sqlite3`
- Feature module under `src/time-entry/` (controller/service/module)
- Prisma integration under `src/prisma/`

### Frontend (`apps/front`)

- **Next.js 16** + React (App Router)
- Pages/layout in `app/`
- UI/feature components in `components/`
- Data hooks in `hooks/`
- API wrapper in `lib/api.ts` (calls `${NEXT_PUBLIC_API_URL}/time-entry`)

### Tooling

- **Turborepo** orchestrates `dev`, `build`, `lint` across workspaces (`turbo.json`).
