# Ventra Frontend Contract

## 1. Alcance de esta fase
Este documento define el contrato funcional del frontend actual de Ventra.

Incluye:
- arquitectura de informacion
- modulos oficiales
- shells publico y privado
- navegacion principal
- rutas clave
- entidades conceptuales del mockup
- patrones UI obligatorios
- reglas de integracion entre modulos
- flujos visibles del frontend

No incluye:
- backend real
- APIs HTTP productivas
- persistencia real fuera del estado local del demo
- integraciones externas reales
- infraestructura de produccion

## 2. Naturaleza del producto en esta fase
Ventra sigue siendo un frontend demo / mockup de alta fidelidad.

Reglas:
- describir el sistema como producto navegable con datos mock coherentes
- no documentar flujos como si ya existieran servicios backend reales
- no asumir sincronizacion productiva con CRMs, telefonia o canales externos
- dejar el modelo conceptual listo para evolucionar a implementacion real

## 3. Stack vigente
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- TanStack Query

No introducir otro framework base en esta fase.

## 4. Naming oficial

### 4.1 Marca madre
- Nombre visible: `Ventra`
- No dejar rastros de:
  - WhatsWidget
  - LeadMagic
  - Leads Widget
  - WhatsSalesRecovery
  - AI Call Closer

### 4.2 Reglas de naming
- `Ventra` es la unica marca visible.
- `Workspace` es el termino visible para tenant.
- `Contact` es la identidad comercial canonica.
- `Lead` es la entrada o evento de adquisicion.
- `Pipeline` representa oportunidad comercial, no lista de contactos.
- `Creative Studio` agrupa produccion de assets, mockups y templates.
- `Prospector AI` es la capa de descubrimiento net-new dentro de `Acquisition`.
- No usar `CRM` como nombre madre del producto ni como item central de navegacion.

## 5. Arquitectura madre del frontend
Ventra se organiza como una plataforma de crecimiento comercial con cuatro pilares y un nucleo operativo compartido.

### 5.1 Pilares de negocio
- Acquisition
- Creative Studio
- Conversations
- Voice AI
- Community

### 5.2 Nucleo transversal
- Overview
- Pipeline
- Campaigns
- Contacts
- Analytics
- Automations
- Workspaces
- Settings

### 5.3 Regla estructural
Todo modulo debe responder una o mas de estas preguntas:
- de donde llego el lead o prospecto
- que tan calificado esta
- que activo o pitch lo alimenta
- que conversacion o llamada esta en curso
- quien es responsable
- cual es la siguiente accion
- como impacta en pipeline y cierre

Si una vista no conecta con esa logica, sobra o debe reubicarse.

## 6. Shells oficiales

### 6.1 Public Shell
Usado para:
- landing publica
- quiz interactivo
- pricing
- FAQ
- navegacion marketing

### 6.2 Auth Shell
Usado para:
- login
- register
- forgot password

### 6.3 Private Shell
Usado para toda la app autenticada.

Componentes obligatorios:
- sidebar madre
- topbar global
- workspace switcher
- command search
- quick actions
- notificaciones
- area principal con vistas densas
- soporte de dialogs, drawers, sheets y detail panels

Estado actual esperado:
- `Prospector AI` aparece como entrada visible dentro de la experiencia privada
- `Community` aparece como modulo nativo dentro del shell privado
- el topbar permite saltos rapidos entre Prospector AI, Community, Contacts, Pipeline, Campaigns y Creative Studio
- el shell debe reforzar la sensacion de una plataforma unificada, no de modulos pegados

### 6.4 Onboarding Shell
Usado para:
- creacion de workspace
- seleccion de workspace
- onboarding inicial

## 7. Navegacion principal

### 7.1 Estructura visible recomendada
- Overview
- Acquisition
- Prospector AI
- Widgets
- Voice AI
- Creative Studio
- Conversations
- Community
- Pipeline
- Campaigns
- Contacts
- Analytics
- Automations
- Workspaces
- Settings

### 7.2 Regla de agrupacion
- `Acquisition` es el paraguas estrategico.
- `Prospector AI` vive dentro de `Acquisition`, pero debe sentirse como capa premium de descubrimiento y activacion.
- `Widgets` y `Voice AI` merecen entrada visible propia porque son areas operativas frecuentes.
- `Creative Studio` vive como modulo autonomo, pero enlazado a Campaigns, Acquisition y motions de cierre.
- `Conversations`, `Pipeline` y `Contacts` forman el nucleo diario comercial.

## 8. Rutas clave

### 8.1 Publicas
- `/`
- `/quiz`
- `/pricing`
- `/faq`
- `/login`
- `/register`
- `/forgot-password`

### 8.2 Bootstrap autenticado
- `/onboarding`
- `/workspaces/select`
- `/workspaces/new`

### 8.3 App privada
- `/app/overview`
- `/app/acquisition`
- `/app/acquisition/prospector-ai`
- `/app/acquisition/widgets`
- `/app/acquisition/forms`
- `/app/acquisition/quiz`
- `/app/acquisition/sources`
- `/app/widgets`
- `/app/widgets/new`
- `/app/widgets/:widgetId`
- `/app/voice-ai`
- `/app/voice-ai/inbound`
- `/app/voice-ai/outbound`
- `/app/voice-ai/calls/:callId`
- `/app/creative-studio`
- `/app/creative-studio/projects/new`
- `/app/creative-studio/projects/:projectId`
- `/app/creative-studio/assets`
- `/app/creative-studio/templates`
- `/app/conversations`
- `/app/conversations/:threadId`
- `/app/community`
- `/app/community/setup`
- `/app/community/home`
- `/app/community/feed`
- `/app/community/members`
- `/app/community/events`
- `/app/community/settings`
- `/app/pipeline`
- `/app/pipeline/:dealId`
- `/app/campaigns`
- `/app/campaigns/:campaignId`
- `/app/contacts`
- `/app/contacts/:contactId`
- `/app/analytics`
- `/app/automations`
- `/app/workspaces`
- `/app/workspaces/:workspaceId`
- `/app/settings`
- `/app/settings/profile`
- `/app/settings/team`
- `/app/settings/branding`
- `/app/settings/billing`
- `/app/settings/integrations`

## 9. Modulos oficiales

### 9.1 Overview
Objetivo:
- dar lectura ejecutiva y operativa del workspace

Debe mostrar:
- KPIs principales
- actividad reciente
- pipeline resumido
- conversaciones urgentes
- llamadas activas o recientes
- campanas activas
- alertas y recomendaciones
- actividad y metrica de Prospector AI cuando exista discovery activo

### 9.2 Acquisition
Objetivo:
- coordinar captura, discovery y pre-calificacion

Subareas:
- Prospector AI
- sources
- funnels
- forms

### 9.3 Community
Objetivo:
- permitir que cada workspace lance una comunidad privada sin salir de Ventra
- convertir audiencia, clientes y partners en miembros visibles dentro del mismo sistema
- unificar contenido, sesiones, miembros y engagement con el resto del contexto comercial

Debe mostrar:
- dashboard del modulo con KPIs y quick actions
- builder / setup de comunidad
- home con hero, espacios, destacados y actividad reciente
- feed de publicaciones con comentarios y reacciones mock
- directorio de miembros con roles y estado
- eventos o sesiones programadas
- settings de branding, acceso, categorias, moderacion, invitaciones y dominio mock

Integraciones visibles:
- Workspaces define el contexto multi-tenant
- Contacts puede actuar como origen o lookup comercial del miembro
- Campaigns alimenta invitaciones, sesiones y activacion
- Analytics debe poder leer engagement y contribucion
- Settings convive con la configuracion propia del modulo

## Changelog

### 2026-03-13
- Cambio: se agrega `Community` como modulo privado mock con overview, setup, home, feed, members, events y settings.
- Tipo: non-breaking
- Impacto: nuevas rutas y nuevas superficies UI dentro del shell privado, sin backend ni cambios de contrato HTTP.
- quiz
- intent scoring
- handoff inicial

Regla:
- Acquisition no solo captura inbound; tambien debe descubrir cuentas net-new y convertirlas en acciones visibles para el resto del sistema.

### 9.3 Prospector AI
Objetivo:
- descubrir negocios net-new
- construir un audit comercial mock
- sugerir oportunidad, offer y siguiente accion
- activar handoffs al resto del sistema

Vistas minimas:
- search composer
- saved searches
- results view
- audit 360 del prospecto
- action dialog
- pitch/mockup drawer

Destinos visibles:
- save to CRM mock
- create opportunity
- send to Conversations
- send to Voice AI
- add to Campaigns
- generate pitch/mockup via Creative Studio

### 9.4 Widgets
Objetivo:
- crear y medir puntos de captura que conecten con Contacts, Conversations y Pipeline

### 9.5 Voice AI
Objetivo:
- gestionar llamadas IA conectadas al registro comercial

Integracion esperada:
- recibir handoffs desde Leads tradicionales o desde Prospector AI
- exponer origen y siguiente accion dentro del mismo contexto comercial

### 9.6 Creative Studio
Objetivo:
- producir y organizar activos comerciales

Integracion esperada:
- generar propuestas, pitches o mockups ligados a campanas activas o a prospectos descubiertos por Prospector AI

### 9.7 Conversations
Objetivo:
- operar seguimiento y cierre conversacional

Integracion esperada:
- mostrar colas o threads provenientes de Prospector AI
- incluir quick actions hacia Pipeline, Voice AI y Creative Studio

### 9.8 Pipeline
Objetivo:
- mostrar oportunidades, responsables y estado comercial

Integracion esperada:
- el detail view debe poder mostrar que la oportunidad provino de Prospector AI o de una superficie de Acquisition

### 9.9 Campaigns
Objetivo:
- conectar acquisition, assets y outreach

Integracion esperada:
- alojar motions orientados a cuentas descubiertas
- reflejar linked prospects, creative proof y pipeline influenciado

### 9.10 Contacts
Objetivo:
- ser la libreta comercial canonica del workspace

Integracion esperada:
- mostrar origen del contacto
- badges y labels de discovery
- timeline continuo desde Prospector AI hasta cierre

### 9.11 Analytics
Objetivo:
- convertir actividad operativa en lectura comercial

Integracion esperada:
- incluir KPIs de Prospector AI
- mostrar embudo mock discovery -> CRM -> opportunity -> outreach

### 9.12 Automations
Objetivo:
- simular reglas operativas e inteligentes

### 9.13 Workspaces
Objetivo:
- reflejar multi-tenant desde frontend

### 9.14 Settings
Objetivo:
- centralizar configuracion de usuario y workspace

## 10. Tipos de vista obligatorios
- executive dashboard
- dense operational dashboard
- split inbox view
- kanban board
- data table
- multi-step flow
- editor con panel lateral
- detail drawer
- modal de accion
- empty state
- settings tabs

## 11. Entidades conceptuales del frontend

### 11.1 Multi-tenant
- `User`
- `Workspace`
- `WorkspaceMember`
- `WorkspaceInvite`
- `Role`
- `PermissionSet`
- `WorkspaceBranding`

### 11.2 Comercial
- `Prospect`
- `ProspectAudit`
- `ProspectorSavedSearch`
- `Lead`
- `Contact`
- `PipelineDeal`
- `ConversationThread`
- `Message`
- `Call`
- `Task`
- `ActivityEvent`

### 11.3 Acquisition
- `Widget`
- `CaptureForm`
- `QuizFlow`
- `IntentSignal`
- `QualificationScore`

### 11.4 Marketing y creatividad
- `CreativeProject`
- `CreativeAsset`
- `CreativeTemplate`
- `Campaign`
- `CampaignAudience`

### 11.5 Sistema
- `Automation`
- `AnalyticsSnapshot`
- `FilterPreset`
- `Notification`

## 12. Relacion entre entidades
- `Workspace` envuelve todo.
- `Prospect` representa un negocio descubierto por Prospector AI antes de convertirse en `Lead` o `Contact`.
- `ProspectAudit` resume senales, problemas detectados, oportunidad sugerida y recomendacion comercial en modo mock.
- `Lead` es un evento de adquisicion que puede crear o enriquecer un `Contact`.
- `Contact` es la entidad comercial madre dentro del sistema.
- `ConversationThread`, `Call`, `PipelineDeal`, `Task` y `ActivityEvent` cuelgan de `Contact`.
- `Campaign` puede vincularse a `CreativeAsset`, `Widget`, `CaptureForm`, `LeadSource` o `Prospect`.
- `CreativeProject` puede producir assets usados por `Campaigns`, `Acquisition` o pitches de prospecting.
- `QualificationScore` debe alimentar `Contacts`, `Pipeline`, `Conversations` y `Voice AI`.

## 13. Flujos obligatorios

### 13.1 Landing a quiz
1. Usuario entra a landing.
2. Ve propuesta de valor y modulos.
3. Activa CTA principal o CTA de quiz.
4. El quiz segmenta.
5. El resultado deriva a signup, demo o recomendacion de modulo.

### 13.2 Acquisition inbound a cierre
1. Se crea un widget o formulario.
2. Se publica.
3. Se captura un lead.
4. Se calcula score o intencion.
5. Se crea o actualiza contacto.
6. Se abre conversacion, llamada u oportunidad.
7. Pipeline refleja siguiente accion.

### 13.3 Prospector AI a cierre
1. El operador ejecuta una busqueda o saved search.
2. El sistema mock detecta un negocio y arma un audit comercial.
3. El operador decide guardarlo en CRM mock o enriquecer una cuenta.
4. Se abre oportunidad, thread, llamada o motion de campana.
5. Creative Studio puede generar pitch o mockup para ese prospecto.
6. Contacts, Pipeline, Conversations, Voice AI, Campaigns y Analytics reflejan la misma historia operativa.

### 13.4 Creative Studio a campana
1. Usuario crea proyecto creativo.
2. Genera assets o mockups.
3. Conecta el output a campana o motion comercial.
4. Campaigns y Analytics muestran esos activos como parte del sistema.

### 13.5 Voice AI conectado al contacto
1. Se programa o recibe llamada.
2. La llamada queda asociada a contacto o prospect-origin contact.
3. El sistema muestra estado, resumen y continuidad comercial.
4. La actividad impacta pipeline, tasks y timeline.

### 13.6 Conversations conectado al pipeline
1. Un thread se atiende desde inbox.
2. Se asigna owner.
3. Se ejecuta quick action.
4. Se actualiza deal stage o handoff.
5. El timeline del contacto refleja todo.

## 14. Patrones principales de componentes
- metric cards
- KPI strips
- status badges
- data tables
- filter bars
- command search
- quick action tiles cross-module
- tabs densas
- drawers laterales
- split panes
- timeline feed
- cards de insight
- action menus
- forms seccionados
- progress headers
- empty states con CTA

## 15. Principios de integracion entre modulos
- Un prospecto descubierto debe sentirse conectando Prospector AI -> Contacts -> Pipeline -> Conversations -> Voice AI.
- Un lead captado debe sentirse conectando Acquisition -> Contacts -> Pipeline -> Conversations -> Voice AI.
- Un asset creativo no puede quedar aislado; debe poder relacionarse con Campaigns, Acquisition o prospecting motions.
- Una llamada debe aparecer en el timeline del contacto.
- Un contacto debe consolidar formularios, quiz, campanas, conversaciones, llamadas y origen cuando aplique.
- Un contacto o deal con origen en Prospector AI debe exponer ese origen en badges, labels, timeline o detail views.
- Workspace debe estar visible y conmutable en toda la app privada.
- Los datos mock deben ser coherentes entre vistas; no se permiten datasets rotos por modulo.

## 16. Restricciones
- No usar branding anterior en UI, rutas o docs.
- No construir modulos desconectados.
- No disenar la app como un CRM plano.
- No documentar el sistema como si ya existiera backend real.
- No introducir dependencias o frameworks nuevos en esta fase.
- Preparar frontend con estado simulado pero creible.

## 17. Resultado contractual para master-frontend
Este documento es la fuente de verdad para:
- naming
- rutas
- shells
- modulos
- flujos
- entidades conceptuales
- relaciones entre areas
- estado actual del mockup conectado

## 18. Changelog del contrato

### 2026-03-13
- Cambio: se formaliza Prospector AI como capa de descubrimiento integrada dentro de Acquisition y conectada al CRM mock, Conversations, Voice AI, Campaigns, Creative Studio, Overview y Analytics.
- Tipo: non-breaking
- Impacto: alinea el contrato con el estado real del frontend demo y sus vistas cross-module actuales.
