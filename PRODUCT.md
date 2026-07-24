# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two roles, role-scoped:
- **Users**: can chat with the connected model and use their own API keys/usage. Cannot see other users' keys, cannot see whole-platform model usage, cannot edit other users' tokens.
- **Admins**: full visibility and control across all users, keys, and usage (Admin Control Center).

Primary audience for this build is a portfolio demonstration (an internship application project), but the app is architected to actually function as a real self-hosted tool, not a mockup.

## Product Purpose

A self-hosted admin hub for local LLMs run via Ollama. Lets a user chat and experiment with a connected model while giving admins oversight and control of API keys, token usage, and access across all users. The model backend is deliberately left pluggable — no specific model is hardcoded; connecting a real local Ollama model is a later step, the UI already assumes that connection point.

## Positioning

Unlike a bare Ollama chat UI, this hub adds: (1) role-scoped multi-user access — a user's keys and usage are isolated from other users; (2) an elevated admin layer with full visibility/control that regular users never see; (3) secondary experimentation tools (Playgrounds, referenced in-app as voice and OCR features) beyond plain chat.

## Operating Context

Next.js 16 / React 19 app (shadcn/Radix UI components). Chat calls a local Ollama endpoint (`http://localhost:11434/api/chat`) — assumes the model runs on the same host/network as the app, not a hosted API.

## Capabilities and Constraints

Existing surfaces: Dashboard (API key count, models available, token usage, chat sessions), Chat (model selector, currently "Local LLM"), API Keys, Playgrounds (voice/OCR mentioned), Profile Settings, Admin Control Center. Auth: email/password login (demo credentials currently in UI copy — should be removed before any real deployment, not addressed in this pass).

## Brand Commitments

**Rebrand in progress.** Current name/branding ("Macha AI Hub," mint/sage-green palette, teacup mascot, frog-ish sidebar icon) originated from client work and is being fully replaced, not preserved:

- New name: **Haru AI** (chatbot/hub).
- New mascot: an astronaut/space-suited character (user-supplied image, background removed → `haru-ai-logo.png`).
- New visual direction: **space/galaxy theme** — rockets, planets, galaxy motifs. This explicitly replaces the current mint-tea palette and teacup identity; this is a redesign, not a re-skin of the existing look.

The current implementation should be treated as functional/structural evidence (roles, layout, information architecture) but visual anti-reference (palette, mascot, tea motif) per the redesign.

## Evidence on Hand

Original client-authored repo (private) cloned locally for this rebrand. New logo asset at `/mnt/c/Users/USER/Downloads/haru-ai-logo.png` (transparent PNG, background already removed).

## Product Principles

- Role-scoped access (user vs admin) is a first-class constraint on every surface, not an afterthought.
- Admin oversight stays clearly separated/elevated from user self-service — never blur who can see what.
- The model backend stays swappable (Ollama-agnostic to any specific local model); don't hardcode assumptions about which model is connected.
- Visual identity is being fully replaced (space/galaxy), not incrementally tinted — treat the current mint-tea look as reference for structure only.
