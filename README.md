# CaseForge

CaseForge helps researchers and immigration applicants build stronger EB-1A and NIW cases by transforming publication and citation data into evidence-ready analytics.

Users can import publications through ORCID, automatically collect citation records, analyze research impact through interactive dashboards, and generate AI-powered evidence summaries. The platform provides journal impact analytics, citation trend visualizations, geographic citation insights, and exportable evidence artifacts to support immigration petitions.

By automating data collection and analysis, CaseForge reduces the manual effort required to document scholarly influence and helps applicants present their research achievements more effectively.

## Project Links
- [Planning document](https://docs.google.com/document/d/1uBrXL40_HSKAMsKtR2tsXt0LkYKzjACVNEU0j_EcfYg/edit?tab=t.0)

- [Detailed Summary for each Milestone](https://docs.google.com/document/d/12vpcjQTAiN4tyualFO1xeST1ph2WFHPYTIVVDce7Q0c/edit?tab=t.0#heading=h.zau7o7onnc1y)

- [Deployment on Render](https://caseforge-web.onrender.com/)
  
- [Demo Video](https://www.youtube.com/watch?v=9HTRYQloK8w)

**Deployment Limitation**: Citation fetching is temporarily unavailable in the deployed version due to background worker hosting limitations. The feature works in the local development environment.

---

## Features

- Clerk-based authentication and project ownership
- ORCID-based publication retrieval and persistence
- Asynchronous citation processing with BullMQ and Redis
- Citation processing progress tracking
- Journal impact analytics table
- Citation trend visualization
- Geographic citation analysis
- AI-generated evidence summaries powered by Gemini
- Summary persistence and retrieval
- CSV export for analytics tables
- PNG export for citation visualizations
- Automated testing with Vitest

## Screenshots
**Landing Page**
![Landing Page](/client/public/image.png)

**Project Dashboard**
![Project Page](/client/public/image-1.png)

**Project Detail Page**
![Project Progress Page](/client/public/image-2.png)

**Analytica and AI Summaries**
![Analytic Dashboard Page](/client/public/image-4.png)


## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- AG Grid
- Chart.js
- React SVG World Map
- Clerk React

### Backend

- Node.js
- Express
- PostgreSQL
- BullMQ
- Redis
- Clerk Express middleware
- Google Gemini API


### Testing

- Vitest
- React Testing Library
  
### Infrastructure

- Docker Compose
- Render configuration
- Neon PostgreSQL


## Core Workflow

```text
Create project
→ Import publications from ORCID
→ Review publication list
→ Fetch citations
→ Citation worker processes jobs in the background
→ Dashboard renders saved citation analytics
→ Generate AI evidence summaries
→ Saved summaries reload on future visit
```

## Architecture

```text
## Project Structure

```text
CaseForge/
├── client/              # React + Vite frontend
│   └── src/
│       ├── pages/       # Landing, projects, publications, dashboard
│       ├── components/  # UI, dashboard, project components
│       ├── contexts/    # Project, publication, citation, summary state
│       └── apis/        # Frontend API clients
├── server/              # Express backend
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic and external API calls
│   ├── workers/         # BullMQ citation worker
│   ├── queues/          # Redis/BullMQ queue setup
│   └── db/              # PostgreSQL schema and seed
└── compose.yaml         # Docker Compose services

```


## Setup

### Local Setup

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/CaseForge.git
cd CaseForge
```

#### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Configure environment files

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Create `server/.env.local` for local development:

```env
PORT=3000
DATABASE_URL=your_postgres_connection_string
PUBLICATION_API=https://api.opencitations.net/meta/v1/author/orcid:
OPENALEX_URL=https://api.openalex.org/works?filter=cites:
REDIS_URL=redis://localhost:6379
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret
GEMINI_API_KEY=your_gemini_api_key
```

For Docker Compose, create `server/.env.docker` with the same server variables,
but use the Compose Redis service hostname:

```env
PORT=3000
DATABASE_URL=your_postgres_connection_string
PUBLICATION_API=https://api.opencitations.net/meta/v1/author/orcid:
OPENALEX_URL=https://api.openalex.org/works?filter=cites:
REDIS_URL=redis://redis:6379
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Set up the database

Run the schema in:

```text
server/db/schema.sql
```

#### 5. Run Locally

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

### Clerk Webhooks With ngrok

CaseForge uses Clerk for authentication and a Clerk webhook to sync signed-up
users into the local PostgreSQL database.

For local development, browser sign-in works without ngrok, but Clerk webhooks
cannot reach `localhost`. If you need to test new user signup and user sync
locally, expose the backend with ngrok:

```bash
ngrok http 3000
```

Copy the generated HTTPS forwarding URL and configure the Clerk webhook endpoint
as:

```text
https://your-ngrok-url.ngrok-free.app/api/webhook
```

Make sure `server/.env.local` includes:

```env
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret
```

If your local database already contains the signed-in Clerk user, ngrok is not
required for ordinary app usage.

### Run With Docker Compose

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

### User
```text
GET /api/user/me
```

### Projects

```text
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
GET    /api/projects/:projectId/status

```

### Publications

```text
POST /api/projects/:projectId/publications/import
GET  /api/projects/:projectId/publications
POST /api/projects/:projectId/publications

```

### Citations

```text

POST /api/projects/:projectId/citations/jobs
GET  /api/projects/:projectId/citations/status
GET  /api/projects/:projectId/yearly-counts
GET  /api/projects/:projectId/map
GET  /api/projects/:projectId/journals

```
### AI Summaries
```text
POST /api/projects/:projectId/ai/journal-impact-summary
POST /api/projects/:projectId/ai/trend-summary
POST /api/projects/:projectId/ai/map-summary
GET  /api/projects/:projectId/ai/summary
```

## AI Summary Pipeline 
```text
Fetch analytics
→ Build structured insights
→ Generate prompt
→ Call Gemini
→ Save summary to PostgreSQL
→ Render saved summary in dashboard
```
CaseForge currently generates summaries for:

Journal/publication impact
Citation trend
Geographic citation reach
The AI is constrained to use only provided analytics data and avoid unsupported legal conclusions.


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

## Known Limitations
- Citation fetching requires Redis and the worker process to be running.
- Upload functionality is not fully implemented yet.
