# File System App Client

React (Vite + TypeScript) UI for browsing a name-only folder/file tree: create folders and files, delete, and search files by name prefix (top 10 typeahead) in the current folder or across all files. Exact-name search is on the API, not in this UI.

The full app (Postgres, API, this UI, HTTPS) lives in the parent repo: [file-system-app](https://github.com/231jk0/file-system-app). Use that README to clone with submodules and run everything.

## Prerequisites

- Node.js 22+
- npm
- Docker
- Docker Compose

**Node.js** and **npm** are required for `npm run dev` / `npm run build` in this directory.

**Docker** and **Docker Compose** (v2: `docker compose`) are not used from this directory alone. This folder has a `Dockerfile`; the parent repo builds it with Docker Compose (`docker-compose.yml`) and injects `VITE_SERVER_URL=/api/v1` at build time. For local Postgres + API + this UI with hot reload, follow the parent README (that path also uses Docker and Docker Compose for Postgres).

## Local development

The API must already be running (parent repo: `npm run dev:server`, default `http://localhost:3000`). That API expects Postgres, which the parent starts with Docker Compose (`npm run postgres:up`).

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

`VITE_SERVER_URL` is baked in at build time. The parent Docker Compose stack passes `/api/v1` (same origin; Traefik routes `/api` to the server).

## Docker

This directory’s `Dockerfile` builds the Vite app and serves it with nginx. Env is not copied into the image — pass `VITE_SERVER_URL` as a build arg.

Prefer the parent `docker-compose.yml` (needs Docker and Docker Compose) rather than running this image by itself. The UI needs the API.
