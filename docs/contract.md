# Ventra Frontend Contract

## Changelog

| Fecha | Cambio | Tipo | Impacto |
| --- | --- | --- | --- |
| 2026-03-14 | La landing comercial fue refactorizada para vender la promesa de sistema comercial en 3 capas e incluir dark mode y un wizard consultivo reutilizable. | non-breaking | No cambia rutas canonicas; cambia la narrativa publica, el flujo visual y la reutilizacion del diagnostico entre `/` y `/quiz`. |
| 2026-03-14 | La app privada se reorganizo oficialmente en tres capas visibles: `/app/acquisition`, `/app/automatic-attention` y `/app/closing`. | breaking | Las rutas canonicas del producto cambiaron para simplificar la experiencia; las rutas legacy se mantienen como redirects para no romper accesos previos. |
| 2026-03-14 | Se preparo la experiencia para una escalera comercial con plan basico y plan completo. | non-breaking | No agrega backend ni billing real; cambia el posicionamiento visible del producto. |

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
- no prometer integraciones reales con CRM, WhatsApp, Ads Manager o billing
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
- `src/lib/mock-data.ts`: datasets mock compartidos del frontend
- `src/lib/acquisition/`: datasets y helpers legacy reutilizables, fuera del menu principal
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
- `/app/automatic-attention`
- `/app/closing`
- `/app/settings`

### 5.2 Aliases legacy soportados

Se mantienen redirecciones limpias para no romper accesos previos:

- `/pricing` y `/faq` vuelven a la landing
- `/workspaces/select` y `/workspaces/new` redirigen a `/onboarding`
- `/app/overview` redirige a `/app`
- rutas legacy del frontend anterior redirigen a una de las tres capas activas

Ejemplos:
- `/app/prospector` -> `/app/acquisition`
- `/app/creative-studio` -> `/app/acquisition`
- `/app/campaigns` -> `/app/acquisition`
- `/app/widgets` -> `/app/acquisition`
- `/app/analytics` -> `/app/acquisition`
- `/app/voice-ai` -> `/app/automatic-attention`
- `/app/automations` -> `/app/automatic-attention`
- `/app/conversations` -> `/app/closing`
- `/app/pipeline` -> `/app/closing`
- `/app/contacts` -> `/app/closing`
- `/app/community/*` -> `/app`
- `/app/workspaces/*` -> `/app`

## 6. Modulos visibles

### 6.1 Publicos

- Landing comercial con narrativa de sistema comercial en 3 capas
- Diagnostico consultivo embebido dentro de la landing
- Quiz de recomendacion
- Login
- Register
- Forgot password
- Onboarding

### 6.2 Privados

- Centro de control comercial
- Adquisicion
  - wizard / quiz de campana
  - ideas para anuncios
  - hooks
  - copys
  - recomendaciones accionables
- Atencion automatica
  - configuracion del asistente
  - objetivos
  - objeciones
  - prompt e instrucciones
  - preview conversacional
- Cierre
  - clasificacion y etiquetas
  - seguimiento comercial
  - copys personalizados
  - metricas simples de conversion
- Configuracion

## 7. Posicionamiento y planes

La UI debe soportar este esquema visible:

- Plan basico: `9.99 USD / mes`, incluye solo `Atencion automatica`
- Plan completo: `99 USD / mes`, incluye `Adquisicion + Atencion automatica + Cierre`

Regla:
- la experiencia debe hacer evidente que el producto puede crecer por capas

## 8. Restricciones

- La marca visible debe seguir siendo `Ventra`.
- No se debe usar `Nurturing` como nombre visible en la experiencia.
- No se deben reintroducir menus utilitarios largos que compitan con el flujo comercial principal.
- El shell privado debe seguir siendo una sola experiencia enfocada en atraer, atender y cerrar.
- Los datos siguen siendo mock y pueden vivir en archivos de dominio mientras mantengan tipado y consistencia con el frontend.

## 9. Alcance real del frontend

El repo actual representa:
- un mockup comercial navegable
- una base oficial de UI para seguir iterando producto
- una demostracion coherente de Ventra como sistema comercial simple

El repo no representa:
- producto listo para produccion backend
- autorizacion real de servidor
- seguridad real de credenciales
- automatizaciones productivas
- modulos operativos fuera del flujo de Adquisicion, Atencion automatica y Cierre
