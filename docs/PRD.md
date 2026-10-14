# Proofly — Product Requirements Document (PRD)

## 1. Executive Summary & Vision

**Proofly** is an AI-assisted, evidence-based student talent platform designed to replace fragmented hiring signals (PDF resumes, self-reported skills, unverified certificates, scattered GitHub repos, separate LeetCode/HackerRank tabs) with a single, verifiable, shareable candidate portfolio.

### The Problem
- **Recruiters** waste dozens of hours jumping between resumes, LinkedIn, personal sites, and code repositories to substantiate claims. They face resume inflation and lack objective signals of hands-on ability.
- **Students** build impressive projects, earn certifications, and solve complex algorithms, but their achievements get buried in one-page text resumes or ignored by keyword-based ATS filters.
- **Trust Deficit**: Self-reported skill lists on resumes have near-zero verification, while existing social networks prioritize engagement vanity metrics over verifiable proof of work.

### The Proofly Solution
- **Evidence-First Architecture**: Every significant qualification (projects, skills, certificates, repositories, algorithmic benchmarks) is backed by verifiable provenance: source URLs, API validation states, raw metrics, and retrieval timestamps.
- **Granular Student Privacy**: Students own their data. They decide which projects, credentials, and sections are public, private, or visible only to verified recruiter organizations.
- **Recruiter Superpowers**: Search and filter by verified evidence, inspect direct links to source code and commit history, compare candidates side-by-side on job requirements, and query an AI Research Assistant that answers questions strictly grounded in candidate evidence.
- **Responsible AI**: AI models act as structured assistants for profile completeness, skills mapping, and explainable job matching, backed by deterministic fallbacks and transparent evidence citations. AI never makes autonomous hiring decisions.

---

## 2. Target Personas & Core Journeys

### Persona A: Student Candidate ("Alex", CS Junior)
- **Motivations**: Showcase real full-stack and algorithmic projects, stand out without brand-name internships, maintain privacy while selectively sharing profile with tech recruiters.
- **Key Workflows**:
  1. Register via email/password, verify account.
  2. Build profile: Education, experience, skills, and bio.
  3. Connect GitHub via OAuth / token to import selected repositories with languages, stars, and commit recency.
  4. Link LeetCode / HackerRank profiles to show verified public contest ratings, problem stats, and badges.
  5. Add credentials/certificates with issuer details, verification URLs, and credential IDs with transparent verification status indicators.
  6. Publish technical write-ups / project case studies in safe Markdown.
  7. Use Profile Completeness Assistant to receive concrete, actionable improvement recommendations.
  8. Toggle visibility settings (public vs. recruiter-only vs. draft) and generate a clean public profile link (`/u/:username`).

### Persona B: Technical Recruiter / Hiring Manager ("Elena", Staff Tech Recruiter)
- **Motivations**: Quickly evaluate candidate technical depth, verify that claims match actual repository code and commit history, compare candidates fairly against job specs, reduce time-to-screen.
- **Key Workflows**:
  1. Register with recruiter account, create or join an Organization profile.
  2. Search candidates by required skills, experience level, verified credentials, and GitHub activity.
  3. Inspect candidate evidence drill-downs (inspect commit cadence, verified certificates, project README summaries, and platform problem solves).
  4. Create Job Profiles with required/preferred skills.
  5. Run Evidence-Based Candidate Matching to see an explainable match breakdown and evidence gaps.
  6. Ask the AI Research Assistant questions (e.g., "What full-stack projects has this candidate built with PostgreSQL?"), receiving citations to exact database records and repo links.
  7. Add candidates to shortlists, record private recruiter notes and tags, and export structured candidate summaries.

---

## 3. Product Scope & Functional Modules

### Module A: Authentication & Role-Based Access Control (RBAC)
- **Roles**: `STUDENT`, `RECRUITER`, `ADMIN`.
- **Session Management**: Secure, HTTP-only, SameSite cookies with signed session tokens / JWTs; CSRF defense; secure logout.
- **Tenant Isolation**: Recruiters belong to an `Organization`. Recruiter notes, job postings, and candidate shortlists are strictly scoped to the recruiter's organization and invisible to other companies.
- **Student Privacy Levels**: Profiles support `PUBLIC` (anyone with link), `RECRUITER_ONLY` (verified recruiters only), and `PRIVATE` (owner only). Individual sections/evidence items can also be hidden.

### Module B: Student Profile & Evidence Provenance Engine
- Normalized entities: Education, Experience, Skills (categorized by Languages, Frameworks, Databases, Tools), Projects, Certifications, External Profiles, Publications.
- **Provenance Standard**: Every evidence record stores:
  - `sourceUrl`: Direct link to original source.
  - `evidenceType`: Enum (`GITHUB_REPO`, `ISSUER_CREDENTIAL`, `LEETCODE_STATS`, `HACKERRANK_STATS`, `LIVE_DEMO`, `MANUAL_DOCUMENT`).
  - `verificationStatus`: Enum (`UNVERIFIED`, `ISSUER_VERIFIED`, `PENDING_REVIEW`, `FAILED_VERIFICATION`, `EXPIRED`).
  - `lastCheckedAt`: ISO timestamp of latest background sync.
  - `metadata`: JSON payload containing raw API response snapshots.

### Module C: Certificate Verification Engine
- Supports credential URL submission and issuer categorization.
- Verification Tiers:
  1. *Student-Provided URL*: Checked for HTTP 200 reachability and domain consistency (e.g. `coursera.org`, `credly.com`, `freecodecamp.org`).
  2. *Issuer Credential Validation*: Regex and automated pattern verification against supported credential providers.
  3. *Manual/Pending Review*: Fallback state for unsupported providers or unconfirmed files.
  4. *Honest Reporting*: Expired or non-200 links are marked clearly; platform never displays false badges.

### Module D: GitHub Integration & Activity Engine
- GitHub OAuth & Personal Access Token support for local testing/production.
- Read-only scopes (`read:user`, `repo` read-only where selected).
- Features:
  - Import selected repositories (filter out forks or homework boilerplate).
  - Extract primary languages, star counts, descriptions, topics, and recent commit dates.
  - Activity snapshot: commit volume and contribution indicators.
  - Background synchronization job with rate-limit respect and exponential backoff.

### Module E: Coding Platform Adapters (LeetCode & HackerRank)
- Adapter pattern architecture.
- Queries public GraphQL / REST profiles where available without violating Terms of Service.
- Graceful degradation: If a platform rate-limits or changes its public interface, records the last known good snapshot, logs the event, and provides a direct profile link with clear confidence metrics.
- Zero data fabrication: Never mock fake numbers when an integration fails.

### Module F: Technical Content & Case Studies
- Markdown editor with live preview and safe sanitized HTML rendering (XSS protection).
- Supports code blocks with syntax highlighting, architectural diagrams, project context, challenges, and measurable outcomes.
- Draft vs. Published states; tags for skills and topics; moderation/flagging controls.

### Module G: Recruiter Workspace & Candidate Discovery
- Indexed PostgreSQL full-text and parameterized multi-attribute search (skills, graduation year, education, verified projects).
- Side-by-side candidate comparison matrix.
- Job Description management with required vs. preferred skill weighting.
- Shortlists, private candidate notes, hiring stage tags (`Applied`, `Screening`, `Shortlisted`, `Rejected`, `Offered`).
- JSON/CSV candidate summary export.

---

## 4. AI Agent System Architecture

1. **Profile Completeness Assistant**: Evaluates completeness score (0-100%), analyzes weak project descriptions, flags missing repository links or unverified certs, and yields a prioritized checklist.
2. **Evidence Verification Assistant**: Analyzes claims against imported evidence, detects discrepancies (e.g. claim of 3 years React experience with only 1 repo created last month), and flags expired credentials.
3. **Skills Mapping Assistant**: Extracts hard skills from JD text, correlates them with candidate repos, project descriptions, and credentials with direct proof links.
4. **Recruiter Research Assistant**: Interactive chat interface for recruiters to ask grounded questions about candidate depth. Answers include explicit inline citations (`[Source: GitHub repo X]`, `[Source: Credential Y]`). Refuses to answer if evidence is absent.
5. **Candidate Matching Assistant**: Deterministic baseline scoring (0-100 match score based on required/preferred skills and evidence validation weight) combined with an LLM-generated explainable rationale.

*LLM Abstraction*: Works with Gemini, OpenAI, Anthropic, or an internal deterministic mock fallback when external LLM API keys are not supplied.

---

## 5. Non-Goals & MVP Boundaries

- **Non-Goal 1**: Automated hiring/rejection decisions or algorithmic ranking based on personal demographics.
- **Non-Goal 2**: Invasive desktop proctoring, webcam tracking, or covert test monitoring.
- **Non-Goal 3**: Building a generic social media feed, algorithmic popularity feeds, or viral comment networks.
- **Non-Goal 4**: Complex distributed microservices, Kubernetes clusters, or heavy vector database infrastructure before traffic justifies them. Proofly uses a clean modular monolith with PostgreSQL.

---

## 6. Success Metrics & Validation

- **Student Metric**: Time to complete a verified profile with at least 1 verified project and 1 external integration (< 10 minutes).
- **Recruiter Metric**: Time saved per candidate screening (from ~15 minutes down to < 3 minutes).
- **Quality Metric**: Zero false-positive "Verified" badges; 100% of AI claims backed by clickable evidence links.
- **System Metric**: API response times < 150ms p95; 100% test pass rate across unit, integration, and e2e suites.
