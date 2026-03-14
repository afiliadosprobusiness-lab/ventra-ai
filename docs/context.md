# Ventra Product Context

## Que es Ventra

Ventra es un Revenue OS comercial para equipos que necesitan descubrir demanda, captar oportunidades, operar conversaciones, seguir pipeline y medir revenue desde una sola interfaz.

No se describe como un CRM generico ni como un set de herramientas sueltas. La propuesta es una sola plataforma operativa con foco comercial.

## Que resuelve

Ventra ayuda a:
- descubrir prospectos con mayor intencion
- centralizar seguimiento comercial
- mantener pipeline, conversaciones y campanas dentro del mismo contexto
- reducir fuga entre captacion, contacto y cierre
- dar visibilidad ejecutiva del rendimiento comercial

## Modulos incluidos en la base actual

- Landing comercial
- Quiz de recomendacion
- Login / Register / Forgot password
- Onboarding
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

## Naturaleza del repo

Este repositorio es el frontend ejecutable oficial de Ventra en modo mockup de alta fidelidad.

Eso significa:
- la experiencia es navegable y consistente
- los datasets son mock y viven en frontend
- no existe backend real detras de auth, contacts, pipeline o analytics
- no existe integracion productiva con CRM, WhatsApp, Voice AI o billing
- el acceso de prueba se resuelve con almacenamiento local en el navegador

## Base actual del producto

La base oficial vigente proviene de la nueva entrega integrada a este repo el 2026-03-14.

Decisiones clave:
- la base oficial actual es la referencia principal de estructura, layout y composicion
- se mantuvo la marca Ventra
- se conservaron aliases de rutas antiguas solo como compatibilidad
- no se mantuvieron modulos viejos en paralelo

## Estado funcional real

La app hoy comunica:
- una landing comercial clara
- un onboarding basico de workspace
- una app privada con modulos resumidos pero coherentes
- una navegacion privada jerarquica en sidebar con accordion por etapa comercial y atajos secundarios compactos
- un switch de tema claro/oscuro persistente dentro del shell autenticado
- un sistema visual listo para seguir iterando

La app no comunica:
- persistencia real
- permisos reales de backend
- detalle profundo por entidad
- automatizaciones o llamadas ejecutadas en produccion

## Regla de continuidad futura

Cualquier iteracion futura debe partir de esta base y no reabrir el frontend anterior como segunda referencia.
