# Ventra Product Context

## Que es Ventra

Ventra es una solucion comercial simple para ayudar a un negocio a:
- atraer mejores oportunidades
- atender prospectos automaticamente
- dar seguimiento y cerrar mas ventas

La experiencia del producto ya no debe sentirse como una suite amplia de herramientas IA.
Debe sentirse como un sistema claro, corto y facil de vender.

## Promesa oficial del producto

Ventra comunica un flujo de tres capas:

`Adquisicion -> Atencion automatica -> Cierre`

Cada capa existe para empujar resultado comercial, no complejidad.

## Flujo oficial del producto

### 1. Adquisicion

Mensaje visible:

`Te ayudamos a crear mejores campanas para atraer nuevos clientes.`

Enfoque:
- wizard o quiz corto para definir campana
- generador de ideas para anuncios
- angulos sugeridos
- hooks
- copys
- estructuras de anuncios
- recomendaciones accionables para captar mejores leads

No debe sentirse como:
- un set de tools tecnicas
- un studio inflado
- un modulo centrado en scraping

### 2. Atencion automatica

Mensaje visible:

`Configura tu asistente para atender prospectos automaticamente.`

Enfoque:
- objetivo principal del asistente
- objetivos comunes
- objeciones comunes
- editor simple de instrucciones
- prompt del asistente
- preview conversacional
- mejora iterativa de respuestas

Regla:
- no usar la palabra `Nurturing` en la experiencia visible

### 3. Cierre

Mensaje visible:

`Te ayudamos a dar seguimiento a tus prospectos y empujar el cierre.`

Enfoque:
- etiquetado por interes e intencion
- clasificacion basica de leads
- seguimiento comercial
- mensajes personalizados para uso manual
- metricas simples de conversion

No debe convertirse en:
- un CRM gigante
- un panel saturado de widgets y etapas

## Estructura visible oficial

### Publico

- Landing comercial enfocada en la promesa de sistema comercial de 3 capas
- Landing con hero, problema, solucion, beneficios, como funciona, quiz consultivo, planes, confianza y CTA final
- CTA principal de la landing conectado a un embudo consultivo en `/quiz`
- Embudo publico en `/quiz` con flujo: quiz multistep -> transicion consultiva -> video gate vertical -> CTA con precio -> oferta final
- Landing con soporte claro/oscuro visible
- Landing con lenguaje visual premium tipo glass, cards suaves y jerarquia comercial mas directa
- Quiz
- Login / Register / Forgot password
- Onboarding

### Privado

- Centro de control comercial
- Adquisicion
- Atencion automatica
- Cierre
- Configuracion

## Naturaleza del repo

Este repositorio sigue siendo el frontend ejecutable oficial de Ventra en modo mockup de alta fidelidad.

Eso significa:
- la experiencia es navegable y consistente
- los datasets son mock y viven en frontend
- no existe backend real detras de auth, chatbot, seguimiento o billing
- no existe integracion productiva con WhatsApp, Ads Manager o CRM externo
- el acceso demo se resuelve con almacenamiento local en el navegador

## Posicionamiento comercial

Ventra debe quedar preparado para dos escalones de producto:

- Plan basico: 9.99 USD / mes, incluye solo Atencion automatica
- Plan completo: 99 USD / mes, incluye Adquisicion + Atencion automatica + Cierre

La UI debe hacer evidente que:
- un negocio puede empezar por la capa basica
- luego crecer hacia la solucion completa

## Regla de continuidad futura

Cualquier iteracion futura debe mantener estas reglas:
- menos cosas, mas claridad
- menos modulos visibles, mas foco comercial
- menos lenguaje tecnico, mas lenguaje orientado a negocio
- si una seccion no aporta a Adquisicion, Atencion automatica o Cierre, no debe vivir en el menu principal
