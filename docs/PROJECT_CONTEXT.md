# Ventra Frontend Project Context

## Snapshot
- Product: `Ventra`
- Repo role: active frontend implementation repo
- Stack: React 18, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui, TanStack Query
- State mode: mock-driven frontend with local session persistence
- Visual mode: dark premium SaaS with Ventra logo palette

## Current architecture

### Public routes
- `/`
- `/pricing`
- `/faq`
- `/quiz`
- `/login`
- `/register`
- `/forgot-password`

### Bootstrap routes
- `/onboarding`
- `/workspaces/select`
- `/workspaces/new`

### Private routes
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

## Guards and session behavior
- Guest routes redirect authenticated users into the product.
- Onboarding routes require auth and stop after onboarding is complete.
- Private app routes require:
  - authenticated user
  - onboarding completed
  - selected workspace
- Session state is stored in local storage through `src/lib/session.tsx`.

## Main UI shells
- `LandingPage`: premium public narrative
- `AuthShell`: login/register/forgot
- `OnboardingPage`, `WorkspaceSelectPage`, `WorkspaceCreatePage`
- `AppShell`: sidebar + topbar + routed workspace views

## Core frontend entities already mocked
- User
- Workspace
- Metric
- Lead
- Contact
- Thread
- VoiceCall
- Widget
- CreativeProject
- Campaign
- Deal
- Automation
- Event
- Insight
- Notification
- Prospect
- ProspectAudit
- ProspectorSavedSearch

## Integration stance
- Contacts are the commercial anchor.
- Leads originate in acquisition surfaces.
- Prospector AI discovers net-new businesses before they become leads or contacts.
- Calls, conversations, campaigns and deals reflect the same workspace data graph.
- Creative Studio assets are represented as campaign-connected production objects.

## Visible Prospector AI integration
- Overview and Analytics now expose prospecting metrics, funnel state and routed-account activity.
- Contacts and Pipeline explicitly show prospecting origin, badges and timeline continuity.
- Conversations and Voice AI include prospect-origin handoff queues as part of their normal operator flow.
- Creative Studio and Campaigns can present pitch/proposal motions connected to prospecting accounts.
- The private shell includes cross-module quick actions so prospecting can jump into Contacts, Pipeline, Conversations, Voice AI and Campaigns without breaking context.

## Documentation stance
- The product must still be described as a frontend demo / mockup, not as a backend-connected production system.
- Prospector AI should be documented as an integrated discovery layer inside Acquisition that already affects CRM mock, outreach, assets and analytics views.

## Branding and visual rules
- Base palette from the Ventra logo: cyan, violet, amber over dark obsidian/navy
- Fonts: `Space Grotesk` + `Manrope`
- Shared card treatment via `.ventra-card`
- Private shell optimized for dense operational screens
- Landing optimized for conversion and narrative
- Public messaging now sells Ventra as an end-to-end revenue system: discover, diagnose, capture, contact, follow up, close and reactivate

## Constraints for future work
- Do not rename modules away from the Ventra naming contract.
- Do not reintroduce legacy product names.
- Do not replace the premium dark design system with generic admin styling.
- Extend mock data coherently across modules.
- Keep route aliases aligned with `docs/contract.md`.
- Keep the quiz tied to module recommendations such as Prospector AI, Widgets, Conversations, Voice AI and Creative Studio.
