# Ventra Frontend Contract

## Changelog

| Fecha | Cambio | Tipo | Impacto |
| --- | --- | --- | --- |
| 2026-03-14 | El modulo `/app/acquisition` ahora concentra un workspace interno completo de Captacion con overview, listado, detail view, importacion, formularios, segmentos y campanas WhatsApp mock. | non-breaking | No cambia rutas canonicas; la profundidad del modulo vive dentro de la misma ruta para mantener compatibilidad con el MVP. |
| 2026-03-14 | Se simplifico la experiencia privada a un MVP de ventas con solo tres modulos visibles: Adquisicion, Nurturing y Marketing. | non-breaking | Las rutas legacy siguen respondiendo, pero varias ahora redirigen al flujo comercial enfocado. |
| 2026-03-14 | Se reemplazo la base anterior del frontend por la nueva base oficial y se redujo el mapa de vistas a una sola arquitectura coherente. | breaking | Las rutas canonicas cambiaron; varias rutas legacy ahora redirigen a vistas consolidadas. |

## 1. Alcance actual

Este contrato describe la base oficial vigente del frontend de Ventra.

Incluye:
- estructura real del frontend
- rutas canonicas visibles
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
- `src/lib/mock-data.ts`: datasets mock compartidos del cockpit base
- `src/lib/acquisition/`: tipos, config, helpers y datasets mock del workspace de Captacion
- `src/lib/demo-auth.tsx`: sesion mock, usuario demo y registro local

## 5. Rutas principales

### 5.1 Rutas canonicas visibles

- `/`
- `/quiz`
- `/login`
- `/register`
- `/forgot-password`
- `/onboarding`
- `/app`
- `/app/acquisition`
- `/app/prospector`
- `/app/voice-ai`
- `/app/conversations`
- `/app/creative-studio`
- `/app/campaigns`
- `/app/widgets`
- `/app/analytics`
- `/app/settings`

### 5.2 Aliases legacy soportados

Se mantienen redirecciones limpias para no romper accesos previos:

- `/pricing` y `/faq` vuelven a la landing
- `/workspaces/select` y `/workspaces/new` redirigen a `/onboarding`
- `/app/overview` redirige a `/app`
- rutas secundarias o legacy del dashboard anterior redirigen a un modulo vigente del MVP

Ejemplos:
- `/app/acquisition/prospector-ai` -> `/app/prospector`
- `/app/acquisition/widgets` -> `/app/acquisition`
- `/app/widgets/:widgetId` -> `/app/widgets`
- `/app/voice-ai/calls/:callId` -> `/app/voice-ai`
- `/app/pipeline` -> `/app/conversations`
- `/app/contacts` -> `/app/conversations`
- `/app/automations` -> `/app/voice-ai`
- `/app/community/*` -> `/app`
- `/app/workspaces/*` -> `/app`

## 6. Modulos visibles

### 6.1 Publicos

- Landing comercial
- Quiz de recomendacion
- Login
- Register
- Forgot password
- Onboarding

### 6.2 Privados

- Cockpit de ventas
- Adquisicion de clientes
  - Captacion
    - overview operativo
    - listado y detail view
    - importacion CSV
    - formularios y widgets
    - segmentos
    - campanas WhatsApp
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

## 7. Restricciones

- La marca visible debe seguir siendo `Ventra`.
- No se deben reintroducir modulos del frontend viejo como vistas paralelas.
- No se deben crear menus utilitarios largos que compitan con el flujo comercial principal.
- El shell privado debe seguir siendo una sola experiencia enfocada en revenue.
- Los datos siguen siendo mock y pueden vivir en archivos de dominio mientras mantengan tipado y consistencia con el MVP.

## 8. Alcance real del frontend

El repo actual representa:
- un mockup comercial navegable
- una base oficial de UI para seguir iterando producto
- una demostracion coherente de Ventra como sistema de ventas enfocado en revenue

El repo no representa:
- producto listo para produccion backend
- autorizacion real de servidor
- seguridad real de credenciales
- automatizaciones productivas
- modulos operativos fuera del flujo de captar, nutrir y cerrar
