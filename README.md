# Haru AI Hub

A self-hosted admin console for local LLMs, built around a role-scoped multi-user model: **users** chat and manage their own API keys/usage, **admins** get full visibility and control across everyone's keys, models, and token consumption. Chat talks to a local model over Ollama's API — the model itself is swappable, not hardcoded.

Built with Next.js 16, React 19, Tailwind, and shadcn/Radix UI.

## Features

- **Dashboard** — API key count, models available, token usage, recent chat sessions
- **Chat** — talks to a local Ollama model, with basic prompt-injection/jailbreak guarding
- **API Keys** — scoped per user, each key restricted to an allow-list of models
- **Playgrounds** — Voice-to-text and OCR experimentation surfaces
- **Admin Control Center** — user management, API key oversight, and per-user token limit management with usage charts (admin-only)

## Getting started

```bash
npm install
npm run dev
```

Requires a local [Ollama](https://ollama.com) instance running at `http://localhost:11434` for the Chat page to actually respond — the UI works without it, but chat requests will fail with nothing listening on that port. The default model reference in `context/app-context.tsx` / `components/pages/chat.tsx` is `haru-coder`; either tag a local model that name (`ollama cp <model> haru-coder`) or update the reference to whatever you have pulled.

Demo login: `admin@admin.com` / `admin` (ADMIN role). A second seeded account (`nm@nm.com`) demonstrates the USER role's restricted view.

## Design system

See [`DESIGN.md`](./DESIGN.md) for the full visual system (deep-space palette, Fredoka/Nunito Sans/JetBrains Mono type pairing, component rules) and [`PRODUCT.md`](./PRODUCT.md) for product context and durable constraints.
