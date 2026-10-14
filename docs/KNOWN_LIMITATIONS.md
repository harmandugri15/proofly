# Proofly — Known Limitations & Assumptions

## 1. Third-Party Integrations & External Limits

### 1.1 GitHub API Rate Limits
- Unauthenticated GitHub API calls are limited to 60 requests per hour per IP.
- With an authenticated OAuth token or Personal Access Token (PAT), the limit expands to 5,000 requests per hour per user.
- **Handling**: Proofly caches repository metadata and commit history. When remaining requests fall below 10, Proofly transitions to cached mode and postpones background synchronization.

### 1.2 LeetCode & HackerRank Scraping Boundaries
- Neither LeetCode nor HackerRank offers an official open public developer REST API for external third-party platforms with SLA guarantees.
- LeetCode exposes a public GraphQL endpoint that can be accessed without credentials, but is subject to Cloudflare WAF protections.
- **Handling**: Proofly uses a resilient adapter pattern. If LeetCode or HackerRank returns a 403/429 or requires anti-bot challenges, the adapter reports `FAILED_VERIFICATION` or `RATE_LIMITED` and saves the verified profile URL. Proofly strictly avoids fabricating mock statistics.

### 1.3 Certificate Issuer Coverage
- Automated API verification is directly implemented for structured issuers with standardized public verification schemes (Credly, Coursera, freeCodeCamp, edX).
- For unlisted private universities or bespoke PDF certs, Proofly marks the credential as `URL_CHECK` (confirming link reachability) or `PENDING_REVIEW` until manual administrative verification is performed.

---

## 2. AI Agent Model Fallbacks

- If `GEMINI_API_KEY` or `OPENAI_API_KEY` is not provided in `.env`, the system automatically activates the **Deterministic AI Engine**:
  - Profile Completeness uses a deterministic weighted heuristic scoring matrix (0-100%).
  - Skills Mapping performs exact and synonym-based token matching between job requirements and candidate records.
  - Candidate Matching uses weighted cosine/set similarity across verified skills and projects.
  - Recruiter Q&A provides direct structured evidence extractions without external LLM dependencies.
- This guarantees that Proofly never crashes or becomes unusable due to missing AI API keys or third-party AI downtime.

---

## 3. Platform & Host Assumptions

- Local developer workstation without Docker: Proofly supports file-based SQLite database with zero external dependencies for instant testing, as well as PostgreSQL for Docker and production.
- All file uploads are currently stored in local persistent disk storage with S3-compatible adapter interface for AWS S3 / Cloudflare R2 production deployments.
