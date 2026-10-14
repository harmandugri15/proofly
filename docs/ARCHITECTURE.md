# Proofly — System Architecture & Design

## 1. High-Level Architectural Overview

Proofly is structured as a **modular monolith** with clean boundary segregation between domains, providing rapid developer velocity, high reliability, and low operational overhead.

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Layer (Frontend)"]
        SPA["React 18 + Vite + TypeScript SPA"]
        Router["React Router v6"]
        Query["TanStack Query (State & Caching)"]
        UI["shadcn/ui + Tailwind CSS + Lucide"]
        Forms["React Hook Form + Zod Validation"]
    end

    subgraph APILayer ["Backend API Layer (Express + TypeScript)"]
        MW["Middleware (Auth, RateLimiter, Helmet, CORS, AuditLog)"]
        RouterAPI["REST API Router (/api/v1)"]
        
        subgraph Controllers ["Domain Modules"]
            AuthMod["Auth & RBAC Module"]
            StudentMod["Student Profile & Evidence"]
            VerifyMod["Certificate Verification"]
            IntegrateMod["GitHub / LeetCode Adapters"]
            RecruiterMod["Recruiter Workspace & Search"]
            ContentMod["Technical Content / Posts"]
            AgentMod["AI Agent Orchestrator"]
        end
    end

    subgraph AgentEngine ["AI & Evidence Engine"]
        Orchestrator["Agent Orchestrator"]
        ProfileAgent["Profile Completeness Assistant"]
        VerifyAgent["Evidence Verification Assistant"]
        SkillsAgent["Skills Mapping Assistant"]
        ResearchAgent["Recruiter Research Assistant"]
        MatchAgent["Candidate Matching Assistant"]
        LLMProvider["LLM Provider Abstraction (Gemini / OpenAI / Deterministic Fallback)"]
    end

    subgraph DataLayer ["Data & Storage Layer"]
        ORM["Prisma ORM"]
        DB[("PostgreSQL Primary Database")]
        Storage["Local / S3-Compatible Object Store"]
        Cache["In-Memory / Redis Cache & Rate Limiting"]
    end

    ClientLayer -->|HTTP/REST with Secure Cookies| MW
    MW --> RouterAPI
    RouterAPI --> Controllers
    Controllers --> ORM
    Controllers --> AgentEngine
    AgentEngine --> LLMProvider
    AgentEngine --> ORM
    ORM --> DB
    Controllers --> Storage
    Controllers --> Cache
```

---

## 2. Component Design & Responsibilities

### 2.1 Frontend Architecture (`packages/frontend`)
- **Vite + React 18 + TypeScript**: Lightning-fast HMR and type-safe JSX.
- **Routing & Guarding**:
  - `PublicRoute`: Accessible to all (landing, `/u/:username`, `/posts/:slug`, `/login`, `/register`).
  - `StudentRoute`: Requires authenticated user with role `STUDENT`.
  - `RecruiterRoute`: Requires authenticated user with role `RECRUITER` and verified organization membership.
- **State Management**:
  - Server state: TanStack Query with optimistic updates, smart invalidation, and configurable stale times.
  - Client state: React context for Auth session and theme.
- **UI & Accessibility**:
  - Tailwind CSS with semantic design tokens (neutral palette, accessible contrast ratios >= 4.5:1).
  - Component library built on accessible primitives (Radix UI / shadcn style) for Dialogs, Dropdowns, Tabs, Tooltips, and Modals.
  - Data visualizations: Recharts for GitHub commit distribution and skill proficiencies.

### 2.2 Backend Architecture (`packages/backend`)
- **Express + TypeScript**: Versioned REST API under `/api/v1`.
- **Security & Middlewares**:
  - `helmet`: Security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options).
  - `cors`: Strictly whitelisted origins with `credentials: true`.
  - `cookie-parser`: Secure HTTP-only cookies for token storage.
  - `rateLimit`: IP and user-based throttling for auth endpoints and AI agent endpoints.
  - `validateRequest`: Zod middleware that intercepts requests before reaching controllers.
  - `errorHandler`: Centralized error handler returning structured JSON (`{ success: false, error: { code, message, details } }`).
  - `auditLogger`: Immutable logging of security-critical actions (role changes, org invites, credential verifications, profile visibility updates).

### 2.3 Shared Contract Layer (`packages/shared`)
- Single source of truth for TypeScript types, enums, DTOs, and Zod validation schemas.
- Ensures zero drift between frontend form validation and backend endpoint validation.

---

## 3. Database Architecture & Multi-Tenancy

- **Database Engine**: PostgreSQL with Prisma ORM.
- **Multi-Tenancy Model**:
  - Students: Scoped by `userId` and `studentProfileId`.
  - Recruiters: Scoped by `organizationId`. Recruiters can only access candidate notes, shortlists, and job postings belonging to their own organization.
- **Integrity & Indexing**:
  - Foreign keys with appropriate `ON DELETE CASCADE` or `RESTRICT` constraints.
  - Composite indexes on frequently queried fields (e.g. `[studentProfileId, name]`, `[organizationId, createdAt]`, `[status, visibility]`).
  - PostgreSQL full-text search indexes on candidate skills, project descriptions, and bio.

---

## 4. Integration Adapter Pattern

All third-party services adhere to an explicit interface:
```typescript
interface PlatformAdapter {
  platformName: string;
  fetchProfileStats(identifier: string): Promise<AdapterResult<PublicCodingStats>>;
  verifyProfileUrl(url: string): boolean;
}
```
- **Resilience**: Every adapter implements timeouts, exponential backoff, and circuit breaking.
- **Provenance**: Data returned from external platforms is wrapped in a provenance envelope containing `retrievedAt`, `sourceUrl`, `confidenceScore`, and `rawPayload`.
- **Graceful Failure**: If a platform changes its format or throttles requests, the adapter returns `{ success: false, error: "RATE_LIMITED", cached: true }` without crashing the application.

---

## 5. Agent Architecture & Safeguards

```mermaid
sequenceDiagram
    autonumber
    actor Recruiter as Recruiter
    participant API as Recruiter API
    participant Agent as Recruiter Research Agent
    participant Guard as Input & Permission Guard
    participant Tools as Evidence Retrieval Tools
    participant LLM as LLM Provider
    participant DB as Database (Prisma)

    Recruiter->>API: Query: "Does candidate have verified AWS experience?"
    API->>Guard: Validate session, org membership, candidate visibility
    Guard-->>API: Authorized
    API->>Agent: Run Research Workflow
    Agent->>Tools: getCandidateEvidence(candidateId)
    Tools->>DB: Query certificates & projects
    DB-->>Tools: Return records (with provenance)
    Tools-->>Agent: Evidence records
    Agent->>LLM: Prompt with evidence context & strict citation instructions
    LLM-->>Agent: Structured JSON with claims & source links
    Agent->>Guard: Validate citations match retrieved evidence
    Guard-->>Agent: Output verified
    Agent-->>API: Structured response
    API-->>Recruiter: Answer with clickable evidence links
```

### Safety Principles:
1. **No Hallucinated Claims**: LLM cannot create evidence records. Only deterministic API responses can alter verification status.
2. **Strict Tool Scoping**: Agents only query data permitted by the user's role and organization boundary.
3. **Structured Validation**: All LLM outputs must parse against Zod schemas. If parsing fails, fallback to deterministic extraction.
4. **Prompt Injection Defense**: Untrusted text (candidate bios, project READMEs) is sanitized and enclosed in delimiter tags (`<untrusted_content>`) with explicit instructions to ignore embedded instructions.
5. **Deterministic Fallbacks**: Every agent capability operates even if LLM API keys are unset or external AI services are offline.
