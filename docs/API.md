# Proofly — REST API Specification (`/api/v1`)

## 1. Global Conventions

- **Base URL**: `/api/v1`
- **Content Type**: `application/json`
- **Authentication**: HTTP-Only cookie `proofly_session` containing signed JWT, or `Authorization: Bearer <token>` for programmatic access.
- **Response Format**:
  ```json
  // Success
  {
    "success": true,
    "data": { ... },
    "meta": { "timestamp": "2026-10-14T06:00:00Z" }
  }

  // Error
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid request parameters",
      "details": [{ "field": "email", "issue": "Invalid email address" }]
    }
  }
  ```

---

## 2. API Endpoints Catalog

### 2.1 Authentication & Session (`/api/v1/auth`)
- `POST /register` — Register student or recruiter account. Body: `{ email, password, role, name, ... }`.
- `POST /login` — Authenticate and receive session cookie. Body: `{ email, password }`.
- `POST /logout` — Invalidate session and clear cookie.
- `GET /me` — Retrieve current authenticated user and profile state.
- `POST /verify-email` — Verify email token.
- `POST /forgot-password` — Request password reset link.
- `POST /reset-password` — Submit new password with reset token.

### 2.2 Student Profile Management (`/api/v1/student/profile`)
- `GET /` — Get current student profile (including all education, experience, skills, projects, certs).
- `PUT /` — Update student bio, headline, graduation year, visibility (`PUBLIC`, `RECRUITER_ONLY`, `PRIVATE`).
- `POST /education` / `PUT /education/:id` / `DELETE /education/:id` — Education CRUD.
- `POST /experience` / `PUT /experience/:id` / `DELETE /experience/:id` — Experience CRUD.
- `POST /skills` / `PUT /skills/:id` / `DELETE /skills/:id` — Skills CRUD.
- `POST /projects` / `PUT /projects/:id` / `DELETE /projects/:id` — Projects CRUD.
- `POST /certificates` / `PUT /certificates/:id` / `DELETE /certificates/:id` — Certificate CRUD.
- `POST /certificates/:id/verify` — Trigger automated verification workflow for this credential.
### 2.2 Student Profile Management (`/api/v1/student`)
- `GET /profile` — Retrieve full profile with projects, credentials, coding stats, and settings.
- `PUT /profile` — Update headline, bio, location, visibility, open to work status.
- `POST /projects` — Create project. Body: `{ title, tagline, description, repositoryUrl, demoUrl, skills }`.
- `POST /projects/auto-fetch` — **1-Click GitHub Repository Crawler**. Body: `{ repositoryUrl }`. Crawls repository metadata, README excerpt, live demo link, star count, and language byte percentages.
- `POST /projects/:id/verify` — Trigger automated evidence verification for repository & demo reachability.
- `DELETE /projects/:id` — Delete project.
- `POST /certificates` — Submit certificate with verification URL or credential ID.
- `POST /certificates/:id/verify` — Trigger issuer verification engine.
- `GET /share-link` — **Recruiter Fast-Pass Link**. Returns unique share token and instant bypass URL (`/u/:username?pass=:shareToken`).
- `GET /preview` — Preview profile as a public viewer or recruiter.

### 2.3 External Integrations (`/api/v1/integrations`)
- `GET /github/status` — Get GitHub connection status, rate-limit quota, and last synced timestamp.
- `POST /github/connect` — Connect GitHub via OAuth code or Personal Access Token.
- `POST /github/sync` — Trigger immediate synchronization of repositories, commits, and 52-week activity heatmap.
- `PUT /github/repositories` — Select/deselect which repos appear on public profile.
- `POST /coding-profiles` — Add LeetCode, HackerRank, or Codeforces profile link. Body: `{ platform, username }`.
- `POST /coding-profiles/:id/sync` — Trigger provider adapter sync (computes acceptance rates, streaks, and difficulty breakdowns).
- `DELETE /coding-profiles/:id` — Disconnect external profile.

### 2.4 Technical Content & Case Studies (`/api/v1/posts`)
- `GET /` — List public published posts with pagination and tag filter.
- `GET /my-posts` — List current student's posts (drafts and published).
- `POST /` — Create draft post. Body: `{ title, summary, content, tags }`.
- `PUT /:id` — Update post.
- `POST /:id/publish` — Toggle published state.
- `DELETE /:id` — Delete post.
- `GET /:slug` — Read published post by slug.

### 2.5 Recruiter Workspace (`/api/v1/recruiter`)
- `GET /candidates` — Search candidates by skills, query, graduation year, and verified project count.
- `GET /candidates/:id` — View full candidate profile with evidence provenance, 52-week heatmap, and coding profile signals.
- `POST /candidates/compare` — Compare up to 4 candidates side-by-side against specific criteria.
- `GET /jobs` / `POST /jobs` / `PUT /jobs/:id` / `DELETE /jobs/:id` — Manage organization job postings.
- `GET /shortlists` / `POST /shortlists` / `DELETE /shortlists/:id` — Manage shortlists.
- `POST /shortlists/:id/candidates` — Add candidate to shortlist.
- `DELETE /shortlists/:id/candidates/:candidateId` — Remove candidate from shortlist.
- `GET /candidates/:id/notes` / `POST /candidates/:id/notes` — Organization private notes.
- `GET /candidates/:id/export` — Export candidate summary in JSON or printable format.

### 2.6 AI Assistant Orchestrator (`/api/v1/ai`)
- `POST /profile-completeness` — Run Profile Completeness Assistant on student's own profile.
- `POST /verify-evidence` — Run Evidence Verification Assistant on a project or credential.
- `POST /map-skills` — Map a job description's requirements to candidate evidence.
- `POST /research-candidate` — Recruiter asks question about candidate with citations.
- `POST /match-candidate` — Compute explainable candidate match score against a job.

### 2.7 Public Endpoints
- `GET /api/v1/public/profile/:username` — Public student portfolio view (accepts optional `?pass=:shareToken` for recruiter fast-pass access).
- `GET /api/v1/public/posts/:slug` — Public article view.
- `GET /api/v1/health` — Liveness & readiness probe (DB status, cache status, uptime).
