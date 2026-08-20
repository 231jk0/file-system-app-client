# File System App Client

React (Vite + TypeScript) UI for browsing a name-only folder/file tree: create folders and files, delete, and search files by name prefix (top 10 typeahead) in the current folder or across all files.

The full app (Postgres, API, this UI, HTTPS) lives in the parent repo: [file-system-app](https://github.com/231jk0/file-system-app). Use that README to clone with submodules and run everything.

## Prerequisites

- Node.js 22+ and npm — for `npm run dev` / `npm run build` on this package.
- Docker — only if you use the parent repo’s Compose stack (this directory has a `Dockerfile`; it is built from the parent `docker-compose.yml`).
- Docker Compose v2 (`docker compose`) — same; not used from this directory alone.

## Local development

The API must already be running (parent repo: `npm run dev:server`, default `http://localhost:3000`).

```bash
cp .env.example .env
npm install
npm run dev
```

`.env`:

```
VITE_SERVER_URL=http://localhost:3000/api/v1
```

Open [http://localhost:5173](http://localhost:5173). Vite serves the UI; requests go to `VITE_SERVER_URL`.

From the parent repo: `npm run dev:client` (same command).

## Production-style build

```bash
npm run build
```

`VITE_SERVER_URL` is baked in at build time. The parent Compose stack passes `/api/v1` (same origin, Traefik routes `/api` to the server).

## Docker

This directory’s `Dockerfile` builds the Vite app and serves it with nginx. Env is not copied into the image; pass `VITE_SERVER_URL` as a build arg. Prefer the parent `docker-compose.yml` rather than running this image by itself (the UI needs the API).
