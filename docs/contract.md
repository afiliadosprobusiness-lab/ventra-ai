# Ventra Frontend Contract

## Changelog

| Fecha | Cambio | Tipo | Impacto |
| --- | --- | --- | --- |
| 2026-03-14 | Se reemplazo la base anterior del frontend por la nueva base oficial y se redujo el mapa de vistas a una sola arquitectura coherente. | breaking | Las rutas canonicas cambiaron; varias rutas legacy ahora redirigen a vistas consolidadas. |

## 1. Alcance actual

Este contrato describe la base oficial vigente del frontend de Ventra despues del reemplazo por la nueva base del producto.

Incluye:
- estructura real del frontend
- rutas canonicas
- aliases legacy conservados por compatibilidad
- modulos visibles en la UI
- reglas de alcance del mockup

No incluye:
- backend real
- persistencia productiva de servidor
- integraciones externas reales
- multi-tenant funcional a nivel servidor
- workflows profundos por entidad

## 2. Naturaleza del producto

Ventra sigue siendo un frontend mockup de alta fidelidad.

Reglas:
- describir la app como demo navegable con datos mock
- no prometer integraciones reales con CRM, WhatsApp, telefonia o billing
- no documentar automatizaciones como si ejecutaran procesos productivos
- usar la base oficial actual como source of truth de estructura y experiencia
- el acceso demo usa solo `localStorage` del navegador

## 3. Stack vigente

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Recharts
- Framer Motion

No introducir otro framework base.

## 4. Estructura actual del frontend

### 4.1 Shells activos

- Public shell: landing comercial y quiz
- Auth shell: login, registro y recuperacion de password
- Onboarding shell: configuracion inicial del workspace
- App shell: sidebar + topbar + vistas operativas

### 4.2 Estructura de codigo

- `src/pages/`: pantallas publicas, auth y onboarding
- `src/pages/app/`: modulos operativos visibles
- `src/components/app/`: sidebar y topbar del producto
- `src/components/ui/`: primitives de shadcn/ui
- `src/layouts/`: layout principal autenticado
- `src/lib/mock-data.ts`: datasets mock unificados
- `src/lib/demo-auth.tsx`: sesion mock, usuario demo y registro local

## 5. Rutas principales

### 5.1 Rutas canonicas

- `/`
- `/quiz`
- `/login`
- `/register`
- `/forgot-password`
- `/onboarding`
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

### 5.2 Aliases legacy soportados

Se mantienen redirecciones limpias para no romper accesos previos:

- `/pricing` y `/faq` vuelven a la landing
- `/workspaces/select` y `/workspaces/new` redirigen a `/onboarding`
- `/app/overview` redirige a `/app`
- rutas detalladas o anidadas del frontend anterior redirigen a su modulo canonico

Ejemplos:
- `/app/acquisition/prospector-ai` -> `/app/prospector`
- `/app/widgets/:widgetId` -> `/app/widgets`
- `/app/voice-ai/calls/:callId` -> `/app/voice-ai`
- `/app/community/members` -> `/app/community`
- `/app/settings/profile` -> `/app/settings`

## 6. Modulos visibles

### 6.1 Publicos

- Landing comercial
- Quiz de recomendacion
- Login
- Register
- Forgot password
- Onboarding

### 6.2 Privados

- Overview
- Acquisition
- Prospector AI
- Widgets
- Voice AI
- Creative Studio
- Conversations
- Pipeline
- Contacts
- Campaigns
- Analytics
- Automations
- Community
- Workspaces
- Settings

## 7. Restricciones

- La marca visible debe seguir siendo `Ventra`.
- No se deben reintroducir modulos del frontend viejo como vistas paralelas.
- No se deben recrear detail pages antiguas salvo que la nueva base las necesite de verdad.
- El shell privado debe seguir siendo una sola experiencia; no mezclar layouts viejos con la base actual.
- Los datos siguen siendo mock y centralizados en `src/lib/mock-data.ts`.

## 8. Alcance real del frontend

El repo actual representa:
- un mockup comercial navegable
- una base oficial de UI para seguir iterando producto
- una demostracion coherente de Ventra como Revenue OS

El repo no representa:
- producto listo para produccion backend
- autorizacion real de servidor
- seguridad real de credenciales
- flujos operativos profundos por entidad
