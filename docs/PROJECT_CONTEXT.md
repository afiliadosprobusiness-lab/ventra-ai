# Ventra Frontend Project Context

## Snapshot

- Product: `Ventra`
- Repo role: official frontend mockup repo
- Current product shape: premium commercial implementation in three layers
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
- `/app/automatic-attention`
- `/app/closing`
- `/app/settings`

### Compatibility aliases

- `/pricing`
- `/faq`
- `/workspaces/select`
- `/workspaces/new`
- `/app/overview`
- legacy app routes redirected into one of the three active layers

## Main UI shells

- `LandingPage`
- `QuizPage` con funnel consultivo multietapa
- `LoginPage`
- `RegisterPage`
- `ForgotPasswordPage`
- `OnboardingPage`
- `AppLayout`

## Data stance

- shared demo data lives in `src/lib/mock-data.ts`
- new commercial mock content lives in `src/lib/commercial-hub.ts`
- frontend auth lives in `src/lib/demo-auth.tsx`
- session is stored locally for demo use only
- all app modules are static or mock-driven views

## Product structure

- Centro de control comercial
- Adquisicion
  - wizard consultivo multistep
  - transicion de generacion premium
  - reporte estrategico in-app
  - hooks, copys y conceptos de campana
  - PDF brandeado descargable
- Atencion automatica
  - configuracion del asistente
  - objetivos y objeciones
  - preview conversacional
  - reglas de derivacion
- Cierre
  - pipeline simple
  - etiquetas de intencion
  - mensajes de seguimiento
  - metricas simples de conversion
- Configuracion

## Visual stance

- landing: narrativa comercial premium enfocada en implementacion, no en SaaS barato
- quiz funnel: experiencia consultiva con explicacion previa y oferta final seria
- app shell: compacta, premium, sobria y centrada en tres capas
- navigation: overview + tres capas + configuracion
- dashboard: centro de control corto y orientado a revenue y operacion
- brand accent: green / teal Ventra
- typography: `Space Grotesk` + `Manrope`
- message: atraer clientes, atenderlos automaticamente y cerrar mas ventas

## Constraints

- `docs/context.md` is the product source of truth
- treat the three-layer model as the official structure
- keep legacy redirects aligned with `docs/contract.md`
- keep the repo described as frontend/mockup, not backend product
- do not revive hidden legacy modules as first-class navigation
