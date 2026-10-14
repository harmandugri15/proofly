# Proofly — AI-Powered Verified Student Talent Platform

Proofly is an AI-assisted, evidence-based student talent platform that unifies student project evidence, verified certifications, GitHub contributions, and algorithmic problem-solving into a single, verifiable, shareable portfolio.

---

## 🌟 Key Features

### For Students
- **Verified Evidence Portfolio**: Showcase education, work experience, projects, skills, and credentials with transparent verification states.
- **GitHub Integration**: Connect GitHub via OAuth or Personal Access Token to showcase repositories, primary languages, stars, and commit recency.
- **Coding Platform Adapters**: Link LeetCode and HackerRank profiles with public problem counts and contest ratings without data fabrication.
- **Certificate Verification Engine**: Distinguish clearly between self-reported links, reachable issuer pages, official issuer validation (Credly, Coursera, freeCodeCamp), and pending review.
- **Technical Case Studies**: Publish Markdown articles, project write-ups, and engineering reflections.
- **Granular Privacy**: Toggle visibility between `PUBLIC`, `RECRUITER_ONLY`, and `PRIVATE`.
- **AI Profile Completeness Assistant**: Receive prioritized, actionable recommendations to improve project proof and evidence coverage.

### For Recruiters
- **Candidate Discovery**: Search and filter by verified skills, education, graduation year, and repository evidence.
- **Deep Evidence Inspection**: Inspect direct commit history, live demos, and credential provenance before contacting candidates.
- **Side-by-Side Comparison**: Compare candidates against job requirements on a structured matrix.
- **Jobs & Talent Shortlists**: Manage job openings, define required/preferred skills, organize candidate talent pools, and record private notes.
- **AI Recruiter Research Assistant**: Ask questions about candidate depth with answers grounded in retrieved database evidence and explicit citations.
- **Explainable Matching**: Transparent, score-weighted candidate matching that explains *why* a candidate fits a role.

---

## 🏗️ Architecture & Technology Stack

- **Monorepo Structure**:
  - `packages/shared`: Shared TypeScript types, enums, DTOs, and Zod validation schemas.
  - `packages/backend`: Node.js, Express, TypeScript, Prisma ORM, JWT in HTTP-Only cookies, Rate Limiting, AI Orchestrator.
  - `packages/frontend`: React 18, Vite, TypeScript, Tailwind CSS, Lucide icons, TanStack Query, React Hook Form + Zod, Recharts.
- **Database**: PostgreSQL (production & Docker) / SQLite (zero-config local development).
- **AI Provider**: Google Gemini / OpenAI with deterministic heuristic fallback when API keys are absent.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+ (tested on v22)
- npm v9+

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone <repo-url> proofly
cd proofly
npm install
```

### 2. Configure Environment
Copy the example environment file:
```bash
cp .env.example .env
```

### 3. Initialize Database & Seed Demo Data
Push schema and seed realistic candidate, recruiter, organization, and project data:
```bash
npm run db:push
npm run db:seed
```

### 4. Run Development Servers
Start both backend API (`http://localhost:4000`) and frontend app (`http://localhost:5173`):
```bash
npm run dev
```

### 5. Running Tests
Run all unit and integration test suites:
```bash
npm test
```

---

## 📚 Documentation Directory

- [PRD (Product Requirements Document)](docs/PRD.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [Threat Model & Security Controls](docs/THREAT_MODEL.md)
- [REST API Specification](docs/API.md)
- [Data Model & Schema](docs/DATA_MODEL.md)
- [Integrations & Provider Adapters](docs/INTEGRATIONS.md)
- [Deployment & Operations](docs/DEPLOYMENT.md)
- [Known Limitations](docs/KNOWN_LIMITATIONS.md)
