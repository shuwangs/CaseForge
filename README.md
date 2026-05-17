# CaseForge

CaseForge is a citation analysis dashboard for organizing publication impact evidence. Users can create immigration case projects, import publication records by ORCID, fetch citation data asynchronously, and review citation counts, yearly trends, and geographic impact in a structured dashboard.

The project is designed for evidence-preparation workflows such as EB-1A and NIW cases, where publication history and scholarly influence need to be collected, organized, and explained clearly.

## Project Design
[Project design](https://docs.google.com/document/d/1uBrXL40_HSKAMsKtR2tsXt0LkYKzjACVNEU0j_EcfYg/edit?tab=t.0)

[Detailed Summary for each Milestone](https://docs.google.com/document/d/12vpcjQTAiN4tyualFO1xeST1ph2WFHPYTIVVDce7Q0c/edit?tab=t.0#heading=h.zau7o7onnc1y)

## Features

- Clerk-based authentication
- Project creation and project-specific data ownership
- ORCID-based publication retrieval
- Publication persistence in PostgreSQL
- Asynchronous citation fetching with BullMQ and Redis
- Citation count table by publication
- Yearly citation trend data
- Citation geography data by institution country
- PostgreSQL schema for users, projects, institutions, publications, citations, and summaries
- Docker Compose setup for the React app, Express API, citation worker, and Redis

## Tech Stack

**Frontend**

- React 19
- TypeScript
- Vite
- Tailwind CSS
- AG Grid
- Chart.js
- React SVG World Map
- Clerk React

**Backend**

- Node.js
- Express
- PostgreSQL
- BullMQ
- Redis
- Clerk Express middleware

**Infrastructure**

- Docker Compose
- Render configuration
- Neon PostgreSQL or any compatible PostgreSQL database

## Architecture

```text
client/
  React app, routes, pages, API clients, contexts, dashboard components

server/
  Express API, controllers, services, queues, workers, database schema

Redis
  BullMQ queue backend for citation jobs

PostgreSQL
  Source of truth for users, projects, publications, citation records, and institutions
```

Typical citation flow:

```text
User clicks Fetch Citations
-> Express enqueues BullMQ jobs
-> Citation worker fetches OpenAlex citation data
-> Worker normalizes and saves citation records
-> Dashboard reads saved results from PostgreSQL
```

## Environment Variables

### Client

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Server

Create `server/.env.local` for local development:

```env
PORT=3000
DATABASE_URL=your_postgres_connection_string
PUBLICATION_API=https://api.opencitations.net/meta/v1/author/orcid:
OPENALEX_URL=https://api.openalex.org/works?filter=cites:
REDIS_URL=redis://localhost:6379
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret
```

Create `server/.env.docker` for Docker Compose. When using the Redis service in `compose.yaml`, use:

```env
REDIS_URL=redis://redis:6379
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/CaseForge.git
cd CaseForge
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Configure environment files

Create the client and server environment files described above.

### 4. Set up the database

Run the schema in:

```text
server/db/schema.sql
```

## Run Locally

Start Redis:

```bash
redis-server
```

Start the backend API:

```bash
cd server
npm run dev:local
```

Start the citation worker in a second terminal:

```bash
cd server
npm run worker:citation:dev
```

Start the frontend in a third terminal:

```bash
cd client
npm run dev
```

Default local URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3000
Redis:    redis://localhost:6379
```

## Run With Docker Compose

From the project root:

```bash
docker compose up -d
```

This starts:

```text
caseforge-app              http://localhost:5173
caseforge-server           http://localhost:3000
caseforge-citation-worker
redis                      localhost:6379
```

Stop containers:

```bash
docker compose down
```

Stop containers and remove volumes:

```bash
docker compose down -v
```

## API Overview

Most API routes require Clerk authentication.

### Projects

```text
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Publications

```text
POST /api/publications/search
POST /api/projects/:projectId/publications
```

### Citations

```text
POST /api/projects/:projectId/citations/jobs
GET  /api/projects/:projectId/citations/status
GET  /api/projects/:projectId/citation-counts
GET  /api/projects/:projectId/yearly-counts
GET  /api/projects/:projectId/map
```

## Testing

Run client tests:

```bash
cd client
npm run test
```

Run server tests:

```bash
cd server
npm run test
```

## Notes

- PostgreSQL is the source of truth for saved projects, publications, and citation records.
- Citation fetching is asynchronous. The API enqueues jobs, and the worker processes them separately.
- Redis must be running for BullMQ citation jobs to work.
- The dashboard should read saved citation results from the backend instead of requiring users to fetch citations every time.
