# Ventra Frontend Project Context

## Snapshot

- Product: `Ventra`
- Repo role: official frontend mockup repo
- Current product shape: focused sales MVP
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
  - workspace interno de Captacion con overview, leads, detail, importacion, formularios, segmentos y campanas WhatsApp
- `/app/prospector`
- `/app/voice-ai`
- `/app/conversations`
- `/app/creative-studio`
- `/app/campaigns`
- `/app/widgets`
- `/app/analytics`
- `/app/settings`

### Compatibility aliases

- `/pricing`
- `/faq`
- `/workspaces/select`
- `/workspaces/new`
- `/app/overview`
- legacy app routes redirected into the focused MVP flow

## Main UI shells

- `LandingPage`
- `LoginPage`
- `RegisterPage`
- `ForgotPasswordPage`
- `OnboardingPage`
- `AppLayout`

## Data stance

- shared demo data lives in `src/lib/mock-data.ts`
- acquisition-specific mock data lives in `src/lib/acquisition/`
- frontend auth lives in `src/lib/demo-auth.tsx`
- session is stored locally for demo use only
- all app modules are static or mock-driven views

## Product structure

- Cockpit de ventas
- Adquisicion
  - Captacion
    - experiencia interna tabbed dentro de `/app/acquisition`
  - Prospeccion IA
- Nurturing
  - Chatbot WhatsApp
  - CRM
- Marketing
  - Generador de ads
  - Variantes de ads
  - Copys
  - Creativos
- Configuracion

## Visual stance

- landing: high-clarity SaaS marketing page
- app shell: compact operational dashboard with light and dark support
- navigation: three focused groups and one compact settings entry
- brand accent: green / teal Ventra
- typography: `Space Grotesk` + `Manrope`
- message: captar leads, nutrir conversaciones y cerrar ventas

## Constraints

- treat the current focused sales MVP as the structural source of truth
- do not revive removed utility modules as first-class navigation
- keep legacy redirects aligned with `docs/contract.md`
- keep the repo described as frontend/mockup, not backend product
