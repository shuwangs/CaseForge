# ✨ CaseForge

CaseForge is a citation analysis dashboard that helps users retrieve, organize, and interpret publication impact data from academic sources. The platform is designed to support workflows where understanding scholarly influence is important, such as immigration-related evidence preparation for EB-1A or NIW cases.

## 📌 Project Description

CaseForge allows authenticated users to create projects, enter an ORCID ID, retrieve publication data, import citation-related records from external academic APIs, and view the results in a structured dashboard. The dashboard presents citation tables, publication tables, yearly citation trends, geographic citation distribution, and AI-assisted summaries.

## 📢 Core Features

- User authentication with Clerk
- Project creation and project-specific data storage
- ORCID-based publication retrieval
- Citation retrieval from academic data sources
- Publication and citation result tables
- Yearly citation trend visualization
- Geographic citation distribution view
- AI-assisted summaries
- Downloadable outputs


## 🧱Tech Stack
**Frontend**: React + TypeScript + Tailwind CSS  
**Backend**: Node.js + Express.js + Python  
**Database**: Neon PostgreSQL  
**Deployment**: Render + Docker  
**Testing**: React Testing Library + Vitest + Jest

## Data Schema
See it in [LucidChart](https://lucid.app/lucidchart/ef84a645-25a5-410e-8a57-82d62346958f/edit?viewport_loc=-1462%2C-1357%2C2556%2C2229%2C0_0&invitationId=inv_82550b6a-9543-42c9-bea0-3a3daa04a6fd)


## Wireframes
[Wireframe](https://whimsical.com/shu-s-project/caseforge-wireframe-KZAevhXCaLBMzJUHBLbDeu)

## Setup
CaseForge can be run in two ways:

1. Docker setup
Recommended if you want a containerized development environment for the client, server, and database.

2. Local setup
Recommended if you do not use Docker and want to run the project directly on your machine.


### Option 1: Run With Docker
- Prerequisites
Docker Desktop installed
Docker Compose available

## Setup Environment 
Make sure these files exist before starting:

1. `client/.env`

`VITE_API_BASE_URL=http://localhost:3000`

2. server/.env.docker
```md
cp .env.docker.example .env.docker
```

#### Start the app
From the project root, run:

`docker compose up --build`

This will start:
```md
caseforge-app on http://localhost:5173
caseforge-server on http://localhost:3000
caseforge-db on localhost:5432
```

#### Stop containers
`docker compose down`

#### Remove containers and database volume
`docker compose down -v`


## Run Locally
### 1. Clone repo

git clone https://github.com/yourname/caseforge.git
cd caseforge

### 2. Setup environment variables

Create `server/.env.docker`:

DATABASE_URL=your_neon_connection_string
PORT=3000

Create `client/.env`:

VITE_API_BASE_URL=http://localhost:3000

### 3. Install dependencies (optional if using Docker)

cd server && npm install
cd ../client && npm install

### 4. Run with Docker

docker compose up --build
