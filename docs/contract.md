# Ventra Frontend Contract

## Changelog

| Fecha | Cambio | Tipo | Impacto |
| --- | --- | --- | --- |
| 2026-03-14 | La capa `/app/acquisition` fue redefinida como `Diagnostico de captacion` con wizard multistep, transicion de generacion, reporte estrategico y exportacion PDF brandeada en frontend. | non-breaking | No cambia rutas canonicas; reemplaza el flujo interno del modulo por una experiencia consultiva premium lista para conectar luego con backend o IA real. |
| 2026-03-14 | La app privada fue refactorizada visual y funcionalmente para operar como un centro comercial premium con overview, adquisicion, atencion automatica, cierre y configuracion. | non-breaking | No cambia rutas canonicas; cambia fuerte la jerarquia visual, el contenido mock y la narrativa operativa del dashboard. |
| 2026-03-14 | La landing y el funnel fueron alineados a un posicionamiento de implementacion premium con software incluido. | non-breaking | No cambia rutas publicas; elimina contradicciones entre SaaS barato e implementacion premium dentro del frontend. |
| 2026-03-14 | Login, register, forgot password, onboarding y not found fueron alineados con la nueva identidad comercial del producto. | non-breaking | No cambia flujos de acceso ni rutas; mejora consistencia visual, copy y foco comercial en pantallas satelite. |
| 2026-03-14 | El CTA principal de la landing ahora dirige a un embudo consultivo en `/quiz` con diagnostico, video gate y oferta final con precio explicito. | non-breaking | No cambia rutas publicas; cambia el flujo comercial del CTA principal para filtrar mejor prospectos y preparar la aplicacion a implementacion. |
| 2026-03-14 | La app privada se reorganizo oficialmente en tres capas visibles: `/app/acquisition`, `/app/automatic-attention` y `/app/closing`. | breaking | Las rutas canonicas del producto cambiaron para simplificar la experiencia; las rutas legacy se mantienen como redirects para no romper accesos previos. |

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
- `src/lib/commercial-hub.ts`: datasets mock compartidos del dashboard activo
- `src/lib/landing-content.ts`: narrativa publica y diagnostico ligero
- `src/lib/landing-funnel.ts`: embudo consultivo y oferta final
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

- Landing comercial con narrativa de implementacion premium
- CTA principal conectado a un embudo consultivo completo
- Embudo consultivo en `/quiz`
  - quiz multistep
  - diagnostico y data capture
  - transicion consultiva
  - video gate
  - oferta final con precio explicito
  - siguientes pasos para aplicar, seguir o evaluar encaje
- Login
- Register
- Forgot password
- Onboarding

### 6.2 Privados

- Centro de control comercial
- Adquisicion
  - wizard consultivo multistep
  - transicion premium de generacion
  - reporte estrategico in-app
  - promesa, angulos, hooks y copys base
  - ideas de anuncios y recomendacion de campana
  - exportacion PDF brandeada con Ventra AI
- Atencion automatica
  - configuracion del asistente
  - objetivos
  - objeciones
  - preview conversacional
  - reglas de handoff
- Cierre
  - pipeline simple
  - clasificacion y etiquetas
  - mensajes personalizados
  - metricas simples de conversion
- Configuracion

## 7. Posicionamiento y modelo comercial

La UI debe soportar este esquema visible:

- entrada consultiva mediante diagnostico
- recomendacion de capa prioritaria
- implementacion premium desde `1000 USD`
- acompanamiento base y continuidad posterior

Regla:
- la experiencia debe dejar claro que la oferta principal es servicio/implementacion con software incluido

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
- una demostracion coherente de Ventra como sistema comercial premium

El repo no representa:
- producto listo para produccion backend
- autorizacion real de servidor
- seguridad real de credenciales
- automatizaciones productivas
- modulos operativos fuera del flujo de Adquisicion, Atencion automatica y Cierre
