# Ventra Product Context

## Repo status
- Este repositorio es el frontend ejecutable actual de Ventra.
- El alcance vigente es un mockup SaaS de alta fidelidad con shell publico, auth, onboarding y shell privado navegable.
- Backend, persistencia real e integraciones productivas siguen pendientes.
- El frontend simula comportamiento creible con estado local y datasets mock conectados.

## Que es Ventra
Ventra es un `Growth OS` comercial para equipos en LATAM que necesitan descubrir, captar, activar y cerrar mas oportunidades desde un mismo sistema.

Ventra no se posiciona como un conjunto de herramientas sueltas. Su valor esta en mantener discovery, acquisition, conversaciones, voz, pipeline, assets y campanas dentro del mismo contexto operativo.

## Promesa comercial actual
Ventra ayuda a:
- descubrir nuevas cuentas antes del outreach
- capturar mejor la demanda inbound
- crear contexto comercial mas claro
- acelerar handoffs entre discovery, adquisicion y cierre
- mantener ownership visible
- conectar assets y campanas con pipeline
- ejecutar seguimiento con IA sin romper el flujo del operador

## Estado real del frontend
La app actual debe narrarse como un frontend demo premium, no como un sistema ya respaldado por backend real.

Eso significa:
- los datos son mock pero coherentes entre modulos
- los handoffs son visibles en UI, no productivos a nivel API
- Voice AI, Conversations y Campaigns se comportan como superficies simuladas pero conectadas
- Contacts y Pipeline funcionan como backbone conceptual del sistema
- Prospector AI ya esta integrado al resto del producto, aunque siga siendo parte de un mockup

## Rol de Prospector AI dentro del sistema
Prospector AI ya no es una pantalla aislada. En el frontend vigente cumple cuatro funciones:

1. Discovery net-new
- encuentra negocios o cuentas antes de que existan como leads tradicionales
- organiza senales digitales, pain points y oportunidad sugerida

2. Audit comercial
- produce un `audit 360` del prospecto
- resume narrativa comercial, recommended offer, next step y pitch direction

3. Activacion operacional
- permite guardar al prospecto en CRM mock
- puede abrir oportunidad, thread, llamada o motion de campana
- puede alimentar Creative Studio con pitches o mockups

4. Capa de cohesion del producto
- hace mas completa la propuesta de Acquisition
- conecta el sistema desde discovery hasta cierre
- refuerza la promesa de Ventra como plataforma comercial unificada

## Como se conectan hoy las areas
La secuencia visible en el frontend es:

1. Prospector AI descubre un negocio y arma un audit.
2. El prospecto puede guardarse como lead o contacto mock.
3. Ese registro aparece en Contacts con origen y labels de discovery.
4. Puede abrir una oportunidad visible en Pipeline.
5. Puede activar un thread en Conversations.
6. Puede activar una llamada o cola en Voice AI.
7. Puede conectarse a Campaigns.
8. Puede detonar un pitch o mockup en Creative Studio.
9. Overview y Analytics reflejan actividad y contribucion de ese motion.

## Shells implementados

### Public shell
- landing premium
- narrativa comercial
- pricing
- FAQ
- quiz

### Auth shell
- login
- register
- forgot password

### Bootstrap shell
- onboarding
- workspace selection
- workspace creation

### Private shell
- overview
- acquisition
- acquisition / prospector AI
- widgets
- voice AI
- creative studio
- conversations
- pipeline
- campaigns
- contacts
- analytics
- automations
- workspaces
- settings

## Vistas y flujos visibles despues de integrar Prospector AI

### Overview
- muestra metrica de prospecting
- refleja cuentas activadas desde Prospector AI
- incluye timeline y quick actions cruzadas

### Acquisition
- combina inbound capture con discovery net-new
- presenta Prospector AI como capa premium del mismo sistema
- expone lanes de activacion hacia Conversations, Voice AI, Campaigns y Creative Studio

### Contacts
- muestra origen del contacto
- agrega badges y labels de Prospector AI cuando aplica
- mantiene timeline unificado desde discovery hasta follow-up

### Pipeline
- puede mostrar detail view de oportunidad con origen prospecting
- enlaza hacia contacto, campana, llamada y conversacion

### Conversations
- refleja queues y threads provenientes de prospecting
- usa quick actions hacia Pipeline, Voice AI y Creative Studio

### Voice AI
- muestra callbacks y motions activados desde Prospector AI
- mantiene el origen visible en tablas y panels

### Campaigns
- soporta motions ligados a prospectos descubiertos
- conecta linked prospects, assets y pipeline influenciado

### Creative Studio
- produce pitch kits y mockups para prospectos o cuentas estrategicas
- deja de verse como generador aislado

### Analytics
- agrega KPIs de prospecting
- muestra el funnel discovery -> CRM -> opportunity -> outreach

## Ajustes actuales de navegacion y UX
- `Prospector AI` tiene visibilidad propia dentro del shell privado.
- El topbar incluye command search y quick actions cross-module.
- Los quick actions pueden saltar entre Prospector AI, Contacts, Pipeline, Campaigns y Creative Studio.
- El sidebar y el topbar refuerzan la idea de una sola plataforma operativa.
- La UI usa badges de origen, status y timeline para mantener continuidad narrativa.

## Multi-tenant stance
Ventra sigue siendo multi-tenant desde frontend.

El estado actual expone:
- workspace switching
- metricas por workspace
- creacion y seleccion de workspace
- contexto de usuario separado del de workspace

## Branding y direccion del producto
La direccion visual sigue basada en:
- obsidian y midnight navy como base
- electric cyan como primary signal
- violet como secondary accent
- amber como highlight controlado

Prospector AI se integra a esa misma identidad. No debe sentirse como producto paralelo.

## Supuestos explicitos
- No existe backend real todavia.
- No existe sincronizacion real con CRM externo.
- No existe telefonia real detras de Voice AI.
- No existe persistencia productiva para Prospector AI.
- Todo el valor actual esta en la narrativa, arquitectura visual y coherencia del mockup.

## Guidance para el siguiente agente
Hacer cambios futuros manteniendo estas reglas:
- no tratar Prospector AI como modulo separado del resto
- no convertir Ventra en CRM generico
- no romper la continuidad entre discovery, capture, follow-up y close
- no documentar capacidades como si ya fueran backend productivo
- mantener datasets mock consistentes entre Overview, Acquisition, Contacts, Pipeline, Conversations, Voice AI, Campaigns, Creative Studio y Analytics
