# Ventra Frontend Project Context

## Snapshot

- Product: `Ventra`
- Repo role: official frontend mockup repo
- Current base: official frontend base integrated on 2026-03-14
- Stack: React 18, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui, TanStack Query
- State mode: static mock data in frontend

## Active route model

### Canonical public routes

- `/`
- `/quiz`
- `/login`
- `/register`
- `/forgot-password`
- `/onboarding`

### Canonical app routes

- `/app`
- `/app/acquisition`
- `/app/prospector`
- `/app/widgets`
- `/app/voice-ai`
- `/app/creative-studio`
- `/app/conversations`
- `/app/pipeline`
- `/app/contacts`
- `/app/campaigns`
- `/app/analytics`
- `/app/automations`
- `/app/community`
- `/app/workspaces`
- `/app/settings`

### Compatibility aliases

- `/pricing`
- `/faq`
- `/workspaces/select`
- `/workspaces/new`
- old detail and nested routes redirected to canonical modules

## Main UI shells

- `LandingPage`
- `LoginPage`
- `RegisterPage`
- `ForgotPasswordPage`
- `OnboardingPage`
- `AppLayout`

## Data stance

- core demo data lives in `src/lib/mock-data.ts`
- frontend auth now lives in `src/lib/demo-auth.tsx`
- session is stored locally for demo use only
- all app modules are present as static or mock-driven views

## Visual stance

- landing: high-clarity SaaS marketing page
- app shell: operational dashboard with light and dark support
- navigation: sidebar with accordion groups for primary modules + compact secondary links and topbar with theme switch
- brand accent: green / teal Ventra
- typography: `Space Grotesk` + `Manrope`

## Constraints

- treat the current official base as the structural source of truth
- do not revive the removed frontend tree
- keep legacy redirects aligned with `docs/contract.md`
- keep the repo described as frontend/mockup, not backend product
