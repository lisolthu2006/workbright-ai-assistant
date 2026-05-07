# WorkSmart AI Assistant

> **Boost Workplace Productivity with AI** ⚡

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-FF4154?logo=react&logoColor=white)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Project Description

**WorkSmart AI Assistant** is a modern, AI-powered productivity platform built to help professionals automate the repetitive workplace tasks that eat into their day — drafting emails, summarizing meetings, planning schedules, conducting quick research, and chatting with an AI co-worker.

By combining a clean, distraction-free UI with a Large Language Model (LLM) backend, WorkSmart turns vague intents ("reschedule Friday's review", "summarize this transcript") into polished, structured outputs in seconds. The result is less time spent on busywork and more time spent on the work that actually matters.

**Built for:** young professionals · recent graduates · office workers · remote teams.

---

## ✨ Features

### 📧 Smart Email Generator
Generate professional emails from a short brief. Choose **tone** (formal, informal, persuasive, friendly, concise) and **audience** (manager, client, colleague, team, external partner). Output includes a subject line, greeting, body, and sign-off — ready to copy.

### 📝 Meeting Notes Summarizer
Paste raw meeting notes or a transcript and get a structured recap with **Summary**, **Key Decisions**, **Action Items** (with owners and deadlines), and **Deadlines** sections.

### 📅 AI Task Planner / Scheduler
List your tasks and constraints; receive a **prioritized daily or weekly plan** built on Eisenhower-matrix logic (urgent × important), complete with time estimates, P1/P2/P3 priorities, and suggested time blocks.

### 🔍 AI Research Assistant
Drop in a topic, question, or article. Get a **TL;DR**, **Key Insights**, **Recommendations**, and a **Plain-Language Explanation** — perfect for prepping a meeting in 30 seconds.

### 💬 AI Chatbot Interface
A general-purpose conversational assistant with quick-start prompts, markdown rendering, and context-aware replies for any work task that doesn't fit neatly into the other tools.

---

## 📸 Screenshots

| | |
|---|---|
| **Chat / Dashboard** | **Email Generator** |
| ![Dashboard](./docs/screenshots/dashboard.png) | ![Email Generator](./docs/screenshots/email.png) |
| **Meeting Summarizer** | **Task Planner** |
| ![Summarizer](./docs/screenshots/summarizer.png) | ![Planner](./docs/screenshots/planner.png) |
| **Research Assistant** | **Chatbot** |
| ![Research](./docs/screenshots/research.png) | ![Chatbot](./docs/screenshots/chat.png) |

> _Replace placeholder images in `/docs/screenshots/` with your own captures._

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TanStack Start, TanStack Router |
| **Styling** | Tailwind CSS v4, shadcn/ui, OKLCH design tokens |
| **Language** | TypeScript |
| **AI / LLM** | OpenAI / Gemini via AI Gateway |
| **Backend** | Server Functions (`createServerFn`) on Edge runtime |
| **Database / Auth** | Supabase (optional) |
| **Build Tool** | Vite 7 |
| **Markdown** | `react-markdown` + `@tailwindcss/typography` |

---

## 🚀 Installation Guide

### 1. Clone the repository
```bash
git clone https://github.com/your-username/worksmart-ai-assistant.git
cd worksmart-ai-assistant
```

### 2. Install dependencies
```bash
bun install
# or
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root (see next section).

### 4. Run the development server
```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env` file at the project root:

```env
# AI provider
OPENAI_API_KEY=your_openai_api_key
# or, when using the Lovable AI Gateway
LOVABLE_API_KEY=your_gateway_api_key

# Supabase (optional — only if using auth/storage)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

> ⚠️ Never commit `.env` to version control.

---

## 🧭 Usage Guide

| You want to… | Go to | What you do |
|---|---|---|
| Draft a professional email | **Email** | Pick tone + audience, describe the goal, click *Generate* |
| Recap a meeting | **Summarizer** | Paste notes/transcript, click *Summarize* |
| Plan your day or week | **Planner** | List tasks + constraints, click *Build Plan* |
| Research a topic quickly | **Research** | Enter a topic or paste an article, click *Research* |
| Ask anything else | **Chat** | Type a message — or pick a quick-start prompt |

Every output supports **Copy** and **Export to Markdown**.

---

## 🧠 AI Prompt Engineering

WorkSmart applies several prompt-engineering techniques to keep outputs accurate, structured, and on-brand:

- **Structured system prompts** — each feature has a dedicated system prompt enforcing the exact output shape (e.g. *Summary → Decisions → Action Items → Deadlines*).
- **Tone & audience control** — user-selected variables are injected into the prompt so the model adapts register without losing intent.
- **Context-aware responses** — chat passes full conversation history; other tools pass user-supplied constraints (deadlines, key points) directly into the prompt.
- **Markdown-first outputs** — models are instructed to return Markdown so results render cleanly and export directly.
- **Output discipline** — prompts explicitly forbid preambles ("Sure, here is…") so the result is immediately usable.

---

## 🛡 Responsible AI

> ⚠️ **AI-generated content should be reviewed before use.**

- **Human-in-the-loop** — every output is editable; nothing is sent or filed automatically.
- **Bias awareness** — prompts encourage neutral, professional language; users are reminded to validate factual claims.
- **Privacy** — input is sent to the configured LLM provider only for inference; do not paste confidential data unless your provider contract permits it.
- **Transparency** — every result panel displays a visible disclaimer.

---

## 🔮 Future Improvements

- 📄 **PDF / DOCX export** for plans and summaries
- 🎙 **Voice assistant** (speech-to-text + text-to-speech)
- 👥 **Team collaboration** — shared workspaces and history
- 📅 **Calendar integration** (Google Calendar, Outlook)
- 🌍 **Multi-language support**
- 🧩 **Custom templates** for emails and plans
- 📊 **Productivity analytics** dashboard

---

## 🎯 Project Goals

This project demonstrates:

- **Practical AI usage** — applying LLMs to real, repetitive workplace problems
- **Productivity improvement** — measurable time savings on routine writing/planning tasks
- **Prompt engineering** — structured, role-based prompts with strict output contracts
- **Modern web development** — TanStack Start, React 19, Tailwind v4, type-safe routing, server functions, and a token-based design system

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow the existing code style, keep PRs focused, and add a short description of what changed and why.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Developed by:** _[Your Name]_

- 🌐 Portfolio: [your-portfolio.com](https://your-portfolio.com)
- 💼 LinkedIn: [linkedin.com/in/your-handle](https://linkedin.com/in/your-handle)
- 🐙 GitHub: [@your-handle](https://github.com/your-handle)

---

<p align="center">Built with ❤️ to help professionals work smarter, not harder.</p>
