# Ventra Design System

## Brand intent
Ventra should feel like a revenue operating system for LATAM: premium, dark, fast and commercially confident.

## Core tokens

### Color roles
- Background: deep obsidian and midnight navy
- Foreground: soft white with cool slate secondaries
- Primary: electric cyan
- Secondary: vivid violet
- Accent highlight: restrained amber
- Success: green reserved for positive outcomes, not brand identity

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
- dark elevated surface
- subtle top-light gradient
- thin border
- soft backdrop blur
- deep shadow with controlled glow

### `ventra-panel`
Use for:
- secondary grouped blocks inside a card
- quiet contextual sections

## Shell rules

### Sidebar
- dark, matte, premium
- grouped navigation
- visible active state
- workspace summary near top
- user identity near bottom

### Topbar
- sticky
- thin border bottom
- translucent dark background
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
