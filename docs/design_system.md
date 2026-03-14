# Ventra Design System

## Brand intent
Ventra should feel like a revenue operating system for LATAM: premium, commercially confident and operationally clear.

## Core tokens

### Color roles
- Public shell: deep obsidian and midnight navy
- Private shell: clean warm-light surfaces with dark matte sidebar
- Primary: operational green / teal
- Secondary: soft neutral surfaces
- Accent highlight: restrained info / warning states
- Success: green reserved for positive outcomes and member / workflow health

### Typography
- Display: `Space Grotesk`
- Body/UI: `Manrope`

### Radius
- Global radius token: `1.25rem`
- Large cards and major surfaces use 24px to 32px feel

## Surface recipes

### `ventra-card`
Use for:
- dashboard panels
- premium cards
- pricing blocks
- detail modules

Characteristics:
- private shell: light operational surface, thin border and soft shadow
- public shell: can still use elevated dramatic treatment when needed
- keep spacing generous and avoid decorative glow in operator views

### `ventra-panel`
Use for:
- secondary grouped blocks inside a card
- quiet contextual sections

## Shell rules

### Sidebar
- dark, matte, premium
- grouped navigation
- visible active state
- user identity near bottom

### Topbar
- sticky
- thin border bottom
- clean light background in the private shell
- search, workspace switcher, quick actions and notifications

## Interaction patterns
- Use dialogs for lightweight creation
- Use drawers for contextual detail and editing
- Use split layouts for Conversations and similar operator flows
- Prefer keeping users in context instead of forcing full route changes for every detail
- Use cross-module quick action tiles when a record needs to jump into another operational surface without losing narrative continuity

## Data display rules

### Prospector workspace
Use a dual-surface layout:
- search composer on the left
- dense results plus audit 360 on the right

The module should feel like a premium market radar, not a generic CRM table.
Saved searches, score badges, signal chips and action layers should stay visible at the same time.

### Metrics
- high-value number first
- delta second
- icon tertiary

### Tables
- compact rows
- subtle hover
- badge-supported statuses
- commercial relevance over exhaustive column count

### Community module
- use the same private-shell visual system
- combine hero, metrics, feed, member directory and event cards without looking like a separate app
- keep a clear sub-navigation between overview, builder, home, feed, members, events and settings

### Status language
- `success`: active, won, live, ready, recovered
- `warning`: optimizing, waiting, proposal, review
- `info`: draft, scheduled, discovery
- `neutral`: baseline or inactive

## Motion
- Keep motion minimal and purposeful
- Landing can use light reveal and glow
- Private app motion should stay subtle and operational

## Accessibility baseline
- Preserve contrast on dark surfaces
- Keep forms large enough for comfortable input
- Maintain clear focus rings through shared tokenized button and input styles

## Expansion guidance
- Any new module should adopt shared card, badge, spacing and shell patterns first
- If a new view needs a new pattern, document it here before repeating it across the app
