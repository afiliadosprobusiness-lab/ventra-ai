# Ventra Product Context

## Que es Ventra

Ventra es un sistema de ventas enfocado en revenue. Ya no se presenta como una suite amplia de operaciones, sino como un MVP claro para captar leads, nutrir conversaciones y convertir ventas.

## Que resuelve

Ventra ayuda a:
- generar assets y mensajes comerciales desde Marketing
- captar oportunidades calificadas desde Adquisicion
- responder y dar seguimiento desde Nurturing
- organizar contexto comercial dentro del CRM
- reducir fuga entre lead entrante, conversacion y cierre

## Flujo oficial del producto

El producto debe comunicar siempre este flujo:

`Marketing genera assets y mensajes -> Adquisicion trae leads -> Nurturing conversa y da seguimiento -> CRM organiza -> se cierra la venta`

## Modulos incluidos en la base actual

- Landing comercial
- Quiz de recomendacion
- Login / Register / Forgot password
- Onboarding
- Cockpit de ventas
- Adquisicion
  - Captacion
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

## Naturaleza del repo

Este repositorio es el frontend ejecutable oficial de Ventra en modo mockup de alta fidelidad.

Eso significa:
- la experiencia es navegable y consistente
- los datasets son mock y viven en frontend
- no existe backend real detras de auth, CRM, nurturing o marketing
- no existe integracion productiva con WhatsApp, Ads Manager o billing
- el acceso de prueba se resuelve con almacenamiento local en el navegador

## Base actual del producto

La base oficial vigente parte de la entrega integrada el 2026-03-14 y simplificada el mismo dia hacia un MVP de ventas.

Decisiones clave:
- la experiencia privada visible se redujo a tres modulos
- el dashboard raiz funciona como cockpit comercial y no como overview inflado
- las rutas no prioritarias siguen existiendo solo como compatibilidad mediante redirects
- la marca Ventra se mantiene

## Estado funcional real

La app hoy comunica:
- una landing comercial clara
- un onboarding basico de workspace
- un cockpit privado de revenue
- una navegacion lateral corta con solo tres grupos principales
- un foco visual y verbal en captar, nutrir y cerrar

La app no comunica:
- persistencia real
- permisos reales de backend
- automatizaciones productivas
- una suite operativa extensa o multiproposito

## Regla de continuidad futura

Cualquier iteracion futura debe mantener el producto enfocado en revenue y evitar expandir la navegacion privada fuera del flujo comercial principal salvo que exista una necesidad real y comprobable.
