# Ventra Frontend Project Context

## Snapshot

- Product: `Ventra`
- Repo role: official frontend mockup repo
- Current product shape: simple commercial system in three layers
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
- `LoginPage`
- `RegisterPage`
- `ForgotPasswordPage`
- `OnboardingPage`
- `AppLayout`

## Data stance

- shared demo data lives in `src/lib/mock-data.ts`
- acquisition-specific mock data remains available in `src/lib/acquisition/`
- frontend auth lives in `src/lib/demo-auth.tsx`
- session is stored locally for demo use only
- all app modules are static or mock-driven views

## Product structure

- Centro de control comercial
- Adquisicion
  - campanas guiadas
  - ideas de anuncios
  - hooks
  - copys
  - recomendaciones accionables
- Atencion automatica
  - configuracion del asistente
  - objetivos y objeciones
  - prompt e instrucciones
  - preview conversacional
- Cierre
  - seguimiento comercial
  - etiquetas e intencion
  - mensajes personalizados
  - metricas simples de conversion
- Configuracion

## Visual stance

- landing: narrativa comercial clara con lenguaje visual premium, nav glass, hero centrado y wizard consultivo reutilizable
- app shell: compacta, premium y sobria
- navigation: solo tres capas principales y una entrada de configuracion
- dashboard: centro de control corto y orientado a resultado
- brand accent: green / teal Ventra
- typography: `Space Grotesk` + `Manrope`
- message: atraer clientes, atenderlos automaticamente y cerrar mas ventas

## Constraints

- `docs/context.md` is the product source of truth
- treat the three-layer model as the official structure
- keep legacy redirects aligned with `docs/contract.md`
- keep the repo described as frontend/mockup, not backend product
- do not revive hidden legacy modules as first-class navigation
