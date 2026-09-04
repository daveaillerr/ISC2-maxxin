<div align="center">

# ISC2-MAXXIN

**ISC2 Certified in Cybersecurity exam preparation platform**
A browser-based study, practice, and review tool for the ISC2 CC certification.

[![ISC2 CC](https://img.shields.io/badge/ISC2-CC-00A859?style=for-the-badge&logo=isc2&logoColor=white)](https://www.isc2.org/certifications/cc)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

> An independent React application for ISC2 CC preparation, combining timed exam simulation, domain-focused practice, structured study materials, glossary search, and client-side progress tracking.

| # | Category | Topics Covered | Files |
|---|----------|-----------------|-------|
| 1 | [Study Content](#study-content) | Certification domains, topics, glossary, references | 4 data files |
| 2 | [Exam Simulation](#exam-simulation) | Full exams, domain diagnostics, practice mode | 3 page files |
| 3 | [Progress and Review](#progress-and-review) | Scoring, results, domain performance, attempt history | 4 page files |
| 4 | [Application Shell](#application-shell) | Navigation, routing, layout, responsive interface | 6 source files |

## Study Content

> Path: [`/src/data`](./src/data/)

The study repository organizes ISC2 CC material into five certification domains. It also provides searchable terminology and curated external references for additional study.

| Project | Description |
|---------|-------------|
| [`domains.json`](./src/data/domains.json) | Defines the five ISC2 CC domains, their descriptions, coverage percentages, and 19 study topics. |
| [`questions.json`](./src/data/questions.json) | Contains 250 multiple-choice questions used by full, domain-focused, and practice sessions. |
| [`glossary.json`](./src/data/glossary.json) | Provides 53 searchable security terms and abbreviations grouped by domain. |
| [`references.json`](./src/data/references.json) | Lists eight official, community, video, and course resources with descriptions and external links. |

## Exam Simulation

> Path: [`/src/pages`](./src/pages/)

The exam hub offers several ways to practice the ISC2 CC syllabus, from a complete timed assessment to focused domain drills and untimed learning sessions.

| Project | Description |
|---------|-------------|
| [`ExamHub.tsx`](./src/pages/ExamHub.tsx) | Configures a 100-question, 120-minute full exam; a 20-question, 30-minute domain diagnostic; or a 25-question untimed practice session. |
| [`ExamSession.tsx`](./src/pages/ExamSession.tsx) | Randomizes questions, manages answers and flags, displays the timer, and submits an exam attempt. |
| [`ReviewerDomain.tsx`](./src/pages/ReviewerDomain.tsx) | Presents detailed topic and question content for an individual certification domain. |

## Progress and Review

> Path: [`/src/pages`](./src/pages/)

Exam attempts are stored in the browser so learners can return to their results without a server-side account. Results include scaled scoring, pass status, domain breakdowns, flagged questions, and answer review.

| Project | Description |
|---------|-------------|
| [`ExamResults.tsx`](./src/pages/ExamResults.tsx) | Displays the 1,000-point scaled score, percentage, pass threshold, domain chart, exam details, and question review. |
| [`Home.tsx`](./src/pages/Home.tsx) | Provides the preparation dashboard with exam details, domain coverage, recent activity, and aggregate attempt statistics. |
| [`Reviewer.tsx`](./src/pages/Reviewer.tsx) | Supports searching the five core modules and eight external resources by topic, term, description, or category. |
| [`Glossary.tsx`](./src/pages/Glossary.tsx) | Filters 53 terminology entries by search query and security domain. |

## Application Shell

> Path: [`/src`](./src/)

The application uses React Router for page navigation and a shared responsive layout for the home page, reviewer, exam simulator, and glossary.

| Project | Description |
|---------|-------------|
| [`App.tsx`](./src/App.tsx) | Defines routes for the dashboard, reviewer, domain pages, exam flow, results, and glossary. |
| [`components/layout/Layout.tsx`](./src/components/layout/Layout.tsx) | Provides the shared page layout and nested route outlet. |
| [`components/layout/Navbar.tsx`](./src/components/layout/Navbar.tsx) | Renders desktop and mobile navigation for the main application areas. |
| [`components/layout/Footer.tsx`](./src/components/layout/Footer.tsx) | Provides resource links, support links, and the independent-study disclaimer. |
| [`types/index.ts`](./src/types/index.ts) | Defines the TypeScript models used for domains, questions, exam configurations, and attempts. |
| [`index.css`](./src/index.css) | Defines Tailwind CSS integration and application-specific visual styles. |

## Tools and Requirements

| Tool | Version | Purpose |
|------|---------|---------|
| [Node.js](https://nodejs.org/) | 20 or later recommended | Runs the development server and build tooling. |
| [npm](https://www.npmjs.com/) | Bundled with Node.js | Installs dependencies and runs project scripts. |
| [React](https://react.dev/) | 19 | Provides the component-based user interface. |
| [Vite](https://vite.dev/) | 8 | Provides development, bundling, and preview commands. |
| [TypeScript](https://www.typescriptlang.org/) | 6 | Supplies static typing and project compilation. |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Provides utility styling and responsive layout classes. |

> Exam attempts and progress statistics are stored in `localStorage`; no backend or account service is required.

## Concepts Practiced

```text
Exam simulation       ████████████████████  Timed, domain-focused, and untimed assessment flows
Progress analytics    █████████████████░░░  Scaled scores, pass status, domain charts, and history
Study organization    ████████████████████  Domain modules, topics, glossary entries, and references
Client-side state     ████████████████░░░░  Browser-persisted attempts and in-session exam state
Responsive UI         █████████████████░░░  Shared navigation and layouts for desktop and mobile screens
```

## Repository Structure

```text
isc2-maxxin/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Footer.tsx
│   │       ├── Layout.tsx
│   │       └── Navbar.tsx
│   ├── data/
│   │   ├── domains.json
│   │   ├── glossary.json
│   │   ├── questions.json
│   │   └── references.json
│   ├── pages/
│   │   ├── ExamHub.tsx
│   │   ├── ExamResults.tsx
│   │   ├── ExamSession.tsx
│   │   ├── Glossary.tsx
│   │   ├── Home.tsx
│   │   ├── Reviewer.tsx
│   │   └── ReviewerDomain.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types/
│       └── index.ts
│
├── index.html
├── DESIGN.md
├── PRODUCT.md
├── package.json
├── package-lock.json
├── README_TEMPLATE_FORMAT.md
├── eslint.config.js
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md  ← current file
```

## Getting Started

1. Install [Node.js](https://nodejs.org/) and npm.
2. Clone this repository.
   ```bash
   git clone https://github.com/daveaillerr/ISC2-maxxin.git
   cd ISC2-maxxin
   ```
3. Install project dependencies.
   ```bash
   npm install
   ```
4. Start the development server.
   ```bash
   npm run dev
   ```
5. Open the local URL shown by Vite, typically `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## License

No license file is currently included in this repository. The project is an independent study tool and is not affiliated with or endorsed by ISC2.

<div align="center">

Built with React, TypeScript, Vite, and Tailwind CSS.

Independent study software for ISC2 Certified in Cybersecurity candidates.

</div>
