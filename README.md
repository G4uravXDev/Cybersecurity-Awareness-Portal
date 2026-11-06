# 🛡️ Cybersecurity Awareness Portal

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.1-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-1.5_Flash-8E75B2?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An enterprise-grade, full-stack cybersecurity education and threat intelligence platform designed to cultivate digital defense literacy, explain complex vulnerability dynamics, and provide actionable security engineering practices.

Featuring an **Enterprise SOC (Security Operations Center) Minimalist UI**, real-time threat intelligence dashboards, interactive modular courses, dynamic skill quizzes, downloadable verification certificates, and **CyberSafe AI**—an AI SOC analyst assistant equipped with strict defensive guardrails.

---

## ✨ Key Features

### 🤖 CyberSafe AI SOC Analyst Assistant
- **Strict Scope Guardrails**: Exclusively handles cybersecurity awareness, threat mitigation, digital privacy, compliance (NIST, ISO 27001, GDPR), and personal cyber hygiene. Automatically and politely declines off-topic queries.
- **Defensive & Legal Safety Rules**: Hard refusal against offensive weaponization (exploit payloads, malware/ransomware generation, credential harvesting, password cracking, Wi-Fi hacking, or DDoS scripts). Automatically pivots any vulnerability inquiry to detection, patching, and remediation.
- **Dynamic Contextual Synthesis**: Free from static canned templates. Dynamically customizes answers with direct insights, threat mechanics, and prioritized defensive checklists.
- **Offline Defensive Engine**: Automatically falls back to an intelligent local threat analysis engine if cloud AI quotas or networks disconnect.
- **Rich Markdown Formatting**: Supports structured headings, bold callouts, ordered steps, and inline code formatting.

### 📚 Interactive Learning Hub & Syllabi
- **Curated Defense Tracks**: From fundamentals (phishing identification, password security) to advanced concepts (Zero Trust architecture, Cloud IAM hardening, Ransomware incident response).
- **Module Progress Tracking**: Interactive course enrollment, syllabus breakdowns, and practical defensive checklists.

### ⚠️ Threat Intelligence & Telemetry
- **Threat Encyclopedia**: Deep-dive breakdowns into prevalent attack vectors (Ransomware, Man-in-the-Middle, DNS Spoofing, Supply Chain compromises).
- **CVE & MITRE ATT&CK Mapping**: Real-world architectural context for defensive engineers and everyday users alike.
- **Live SOC Threat Ticker**: Real-time threat telemetry bar reflecting active global defense advisories.

### 🎯 Skill Verification Quizzes & Analytics
- **Dynamic Quiz Engine**: Multiple-choice assessments with immediate scoring, rationale explanations, and difficulty ratings.
- **AI-Powered Question Generation**: Leverages the Gemini API to dynamically generate custom quizzes for specific security domains and difficulty tiers.

### 📜 Digital Certificate Generator
- **Verifiable Credentials**: Generate high-resolution, branded completion certificates upon course or quiz mastery.
- **Client-Side Canvas Rendering**: Export crisp PNG credentials stamped with dynamic verification IDs, user display names, and completion timestamps.

### 🔐 Flexible Dual-Mode Authentication
- **Production Firebase Auth**: Google OAuth popup authentication + Email/Password registration.
- **Sandbox Demo Mode**: Automatically provides a seamless fallback authentication state when API keys are being configured.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 (SPA), TypeScript, React Router 6, Radix UI Primitives, Lucide Icons |
| **Styling** | TailwindCSS 3, Deep Midnight & Cobalt SOC Palette (`#060913`, `#2563EB`), Custom Keyframe Animations |
| **Backend** | Express 4, Node.js, Vite Dev Server middleware |
| **AI / Intelligence** | Google Gemini 1.5 Flash (`generativelanguage.googleapis.com`) |
| **Authentication & Cloud** | Firebase 11 (Auth, Google OAuth Provider, Analytics) |
| **Testing & Quality** | Vitest, TypeScript strict mode, Zod validation |

---

## 📁 Project Structure

```plaintext
Cybersecurity-Awareness-Portal/
├── client/                     # React 18 SPA Frontend
│   ├── components/
│   │   ├── auth/              # LoginGate and authentication boundaries
│   │   ├── certificate/       # HTML5 Canvas certificate generator
│   │   ├── chat/              # CyberSafe AI drawer & floating trigger
│   │   ├── home/              # Hero, telemetry cards, stats sections
│   │   ├── layout/            # Frosted glass Header & Footer
│   │   └── ui/                # Radix UI + Tailwind design components
│   ├── contexts/              # AuthContext (Firebase + Demo dual-mode)
│   ├── lib/
│   │   ├── firebase.ts        # Firebase app & Auth initialization
│   │   ├── geminiApi.ts       # CyberSafe AI service, guardrails & quiz generator
│   │   ├── quizzesData.ts     # Static & fallback quiz database
│   │   └── utils.ts           # Class merging (clsx + tailwind-merge)
│   ├── pages/                 # Route components (Index, Dashboard, Learning, Threats, Quiz, News)
│   ├── App.tsx                # Client entry point & React Router configuration
│   └── global.css             # Tailwind design tokens & dark SOC theme
├── server/                     # Express Backend
│   ├── routes/                # API endpoint handlers
│   └── index.ts               # Express application initialization
├── shared/                     # Shared TypeScript interfaces & types
├── public/                     # Static assets, badges, and icons
├── .env                        # Local environment variables (Ignored by Git)
├── tailwind.config.ts          # Tailwind theme & animation configurations
└── package.json                # Project dependencies and script declarations
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** installed on your system

### 1. Clone the Repository
```bash
git clone https://github.com/GauravNayyar19/Cybersecurity-Awareness-Portal.git
cd Cybersecurity-Awareness-Portal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:

```env
# Firebase Authentication & Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google Gemini API Key (for CyberSafe AI & Dynamic Quizzes)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> **Note**: If Firebase credentials are not provided, the application runs seamlessly in **Sandbox Demo Mode**, allowing you to explore all features, dashboards, and quizzes without blocking on setup.

### 4. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:8080/`.

---

## 📜 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Launches the Vite + Express integrated development server with hot-reload |
| `npm run typecheck` | Executes TypeScript type validation across client, server, and shared directories |
| `npm test` | Runs the Vitest test suite |
| `npm run build` | Builds both client SPA (`dist/spa`) and server bundle (`dist/server`) for production |
| `npm run start` | Starts the production Express server |
| `npm run format.fix` | Formats all source files using Prettier |

---

## 🛡️ AI Safety & Guardrails Policy

CyberSafe AI is strictly configured with comprehensive boundary checks:
1. **Scope Restriction**: Rejects any non-cybersecurity inquiry.
2. **Defensive Only**: Will not write malicious exploits, malware, cracking tools, or attack code under any circumstance (including hypothetical scenarios or jailbreaks).
3. **Dual-Use Transformation**: When vulnerabilities (such as SQL Injection or XSS) are queried, CyberSafe AI explains the vulnerability conceptually and provides secure coding standards, input validation, and defensive mitigations.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

