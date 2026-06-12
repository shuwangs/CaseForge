# ⚖️ CaseForge

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-Queue-orange)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-AI-8E75FF?logo=google-gemini&logoColor=white)

CaseForge is a full-stack TypeScript web application that helps researchers and immigration applicants transform publication and citation data into evidence-ready analytics for EB-1A and NIW petitions.

Users can import publications through ORCID, automatically collect citation records, analyze research impact through interactive dashboards, and generate AI-powered evidence summaries. The platform provides journal impact analytics, citation trend visualizations, geographic citation insights, and exportable evidence artifacts to support immigration petitions.

By automating data collection and analysis, CaseForge reduces the manual effort required to document scholarly influence and helps applicants present their research achievements more effectively.

## 🎬 Live DEMO 
![CaseForge](/client/public/caseforge.gif) 

## 🔗 Project Links
- [Deployment on Render](https://caseforge-web.onrender.com/)
- [Demo Video](https://youtu.be/CCA1onFAI0g)
- [Planning document](https://docs.google.com/document/d/1uBrXL40_HSKAMsKtR2tsXt0LkYKzjACVNEU0j_EcfYg/edit?tab=t.0)
- [Milestone Summary](https://docs.google.com/document/d/12vpcjQTAiN4tyualFO1xeST1ph2WFHPYTIVVDce7Q0c/edit?tab=t.0#heading=h.zau7o7onnc1y)
  
> **Deployment Limitation:** Citation fetching is unavailable in the deployed version due to production worker hosting limitations. The feature works correctly in local and Dockerized environments.

---

## ❓ Problem 
Researchers preparing EB-1A or NIW petitions often need to:

- Collect publication records from multiple sources
- Gather citation evidence
- Analyze research impact
- Prepare supporting documentation

This process is time-consuming and highly manual.

## 💡 Solution

CaseForge automates publication collection, citation analysis, and evidence generation, allowing applicants to focus on presenting their achievements rather than gathering data.

## ✨ Features

- ORCID-based publication retrieval and persistence
- Asynchronous citation collection and processing
- Citation processing progress tracking
- Journal impact analytics dashboard
- Citation trend visualization and Geographic citation analysis
- AI-generated evidence summaries powered by Gemini
- Summary persistence and retrieval
- Clerk-based authentication and project ownership
- CSV export for analytics tables and PNG export for citation visualizations

## 🚀 Engineering Highlights

- Migrated the backend from JavaScript to TypeScript to improve type safety and maintainability.
- Designed an asynchronous processing pipeline using BullMQ, Redis, and background workers for citation collection.
- Built AI-powered analytics summaries using Gemini with persisted results stored in PostgreSQL.
- Containerized the application using Docker Compose for reproducible local development.
- Configured automated testing with Vitest, React Testing Library, and Supertest.
- Implemented automated testing using Vitest, React Testing Library, and Supertes
- Added code quality and CI validation through Biome formatting and automated test checks.
- Configured deployment environments using Render, PostgreSQL, Redis, and worker services.
  
## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- AG Grid
- Chart.js
- React SVG World Map
- Clerk React

### Backend

- TypeScript
- Express
- PostgreSQL
- BullMQ
- Redis
- Clerk Express middleware
- Google Gemini API


### Testing

- Vitest
- React Testing Library
- Supertest
  
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

## 🏗️ Architecture
### System Architecture
![Design Architecture](/client/public/caseforge-architecture.png)

## ⚙️ Setup

### Local Setup

#### 1. Clone the repository

```bash
git clone https://github.com/shuwangs/CaseForge.git
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

## 📡 API Overview

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

## 🤖 AI Summary Pipeline 
```text
Fetch analytics
→ Build structured insights
→ Generate prompt
→ Call Gemini
→ Save summary to PostgreSQL
→ Render saved summary in dashboard
```
CaseForge currently generates summaries for:

- Journal/publication impact
- Citation trend
- Geographic citation reach
The AI is constrained to use only provided analytics data and avoid unsupported legal conclusions.


## 🔬 Testing

Run client tests:

```bash
cd client
npm run test
npm run coverage
```

Run server tests:

```bash
cd server
npm run test
npm run coverage
```

### Testing coverage
| Layer    | Coverage |
| -------- | -------- |
| Frontend | 64.4%    |
| Backend  | 70.1%    |

Coverage reports are generated using Vitest, React Testing Library and Supertest.

## 🔮 Future Improvements

- Deploy citation workers in production
- Support additional citation providers
- Generate downloadable evidence reports
- Add file upload and document management
- Improve AI-generated evidence drafting