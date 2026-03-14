# Ventra Design

## Objetivo visual

La version oficial actual debe verse como un SaaS comercial moderno, limpio y listo para demos. La referencia principal es la entrega de Lovable, no el frontend anterior.

## Principios visuales

- claridad primero: cards legibles, KPIs visibles y jerarquia simple
- marca Ventra: verde/teal como acento principal
- contraste controlado: landing con mas energia, app privada con tono operativo claro
- composicion compacta: dashboards directos, sin ruido ni exceso de bloques
- motion discreta: aparicion suave, sin efectos innecesarios

## Sistema de layout

### Landing

- navbar sticky
- hero central con CTA principal y CTA secundario
- secciones apiladas por narrativa: beneficios, problema/solucion, modulos, pricing y FAQ
- grid responsive con tarjetas uniformes

### App privada

- layout principal de dos zonas: sidebar + contenido
- topbar fija en la parte superior del area de trabajo
- contenido con padding estable y grids 2, 3 y 4 columnas segun modulo
- maximos anchos moderados en pantallas de onboarding y auth

## Sidebar y topbar

### Sidebar

- contiene la marca Ventra
- agrupa navegacion en `Principal` e `Inteligencia`
- usa active state simple con acento verde
- incluye acceso a Settings y estado de cuenta demo al final

### Topbar

- muestra el titulo de la vista activa
- incluye buscador compacto
- expone selector de workspace
- mantiene CTA primaria para crear lead
- conserva notificaciones y salida

## Tipo de dashboard

El dashboard actual es un business dashboard ligero:
- KPIs arriba
- chart de revenue
- insights de IA
- tablas resumidas
- actividad reciente

No busca profundidad operacional por entidad. Busca lectura rapida y coherencia de producto.

## Reglas de consistencia visual

- usar siempre el mismo radio, sombras y espaciado de la base Lovable
- no reintroducir glassmorphism, shells oscuros complejos ni paneles heredados del frontend viejo
- mantener tipografia `Space Grotesk` para headings y `Manrope` para UI
- conservar gradientes verdes de Ventra para CTAs y elementos de marca
- mantener las vistas privadas dentro del mismo lenguaje de cards blancas y fondo neutro
- cualquier nuevo modulo debe encajar en el mismo sidebar, topbar y sistema de cards

## Decisiones tomadas a partir de Lovable

- la arquitectura visual oficial ahora es la de Lovable
- el mapa de paginas se simplifico a una sola version por modulo
- el shell privado adopta un dashboard claro y mas directo
- el onboarding y auth usan la misma direccion de UI que la app
- se conservaron solo redirects para rutas legacy, no layouts ni pantallas antiguas

## Que no debe romperse en futuras iteraciones

- la marca `Ventra`
- el layout base de landing + auth/onboarding + app shell
- la navegacion lateral agrupada
- la topbar con acciones globales
- la paleta principal verde/teal
- la consistencia entre overview, acquisition, prospector, pipeline, campaigns y analytics
- el principio de una sola base oficial, sin fusionar de nuevo con el frontend anterior
