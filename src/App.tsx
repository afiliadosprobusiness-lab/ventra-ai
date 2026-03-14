import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/shell/app-shell";
import { SessionProvider, useSession } from "@/lib/session";
import {
  AcquisitionPage,
  AnalyticsPage,
  AutomationsPage,
  CampaignDetailPage,
  CampaignsPage,
  ContactsPage,
  ConversationsPage,
  CreativeProjectPage,
  CreativeStudioPage,
  OverviewPage,
  PipelinePage,
  ProspectorAIPage,
  SettingsPage,
  VoiceAICallPage,
  VoiceAIPage,
  WidgetStudioPage,
  WidgetsPage,
  WorkspacesPage,
} from "@/pages/app-pages";
import {
  CommunityEventsPage,
  CommunityFeedPage,
  CommunityHomePage,
  CommunityMembersPage,
  CommunityOverviewPage,
  CommunitySettingsPage,
  CommunitySetupPage,
} from "@/modules/community/community-page";
import {
  ForgotPasswordPage,
  LandingPage,
  LoginPage,
  NotFoundPage,
  OnboardingPage,
  QuizPage,
  RegisterPage,
  WorkspaceCreatePage,
  WorkspaceSelectPage,
} from "@/pages/public-pages";

function GuestGuard() {
  const { isAuthenticated, onboardingCompleted, activeWorkspaceId } = useSession();

  if (!isAuthenticated) return <Outlet />;
  if (!onboardingCompleted) return <Navigate to="/onboarding" replace />;
  if (!activeWorkspaceId) return <Navigate to="/workspaces/select" replace />;
  return <Navigate to="/app/overview" replace />;
}

function AuthGuard() {
  const { isAuthenticated } = useSession();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

function OnboardingGuard() {
  const { isAuthenticated, onboardingCompleted } = useSession();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (onboardingCompleted) return <Navigate to="/workspaces/select" replace />;
  return <Outlet />;
}

function WorkspaceGuard() {
  const { isAuthenticated, onboardingCompleted, activeWorkspaceId } = useSession();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!onboardingCompleted) return <Navigate to="/onboarding" replace />;
  if (!activeWorkspaceId) return <Navigate to="/workspaces/select" replace />;
  return <Outlet />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<LandingPage />} />
      <Route path="/faq" element={<LandingPage />} />
      <Route path="/quiz" element={<QuizPage />} />

      <Route element={<GuestGuard />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<OnboardingGuard />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>

      <Route element={<AuthGuard />}>
        <Route path="/workspaces/select" element={<WorkspaceSelectPage />} />
        <Route path="/workspaces/new" element={<WorkspaceCreatePage />} />
      </Route>

      <Route element={<WorkspaceGuard />}>
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="acquisition" element={<AcquisitionPage />} />
          <Route path="acquisition/prospector-ai" element={<ProspectorAIPage />} />
          <Route path="acquisition/widgets" element={<WidgetsPage />} />
          <Route path="acquisition/forms" element={<WidgetStudioPage />} />
          <Route path="acquisition/quiz" element={<AcquisitionPage />} />
          <Route path="acquisition/sources" element={<AcquisitionPage />} />
          <Route path="widgets" element={<WidgetsPage />} />
          <Route path="widgets/new" element={<WidgetStudioPage />} />
          <Route path="widgets/:widgetId" element={<WidgetStudioPage />} />
          <Route path="voice-ai" element={<VoiceAIPage />} />
          <Route path="voice-ai/inbound" element={<VoiceAIPage />} />
          <Route path="voice-ai/outbound" element={<VoiceAIPage />} />
          <Route path="voice-ai/calls/:callId" element={<VoiceAICallPage />} />
          <Route path="creative-studio" element={<CreativeStudioPage />} />
          <Route path="creative-studio/projects/new" element={<CreativeProjectPage />} />
          <Route path="creative-studio/projects/:projectId" element={<CreativeProjectPage />} />
          <Route path="creative-studio/assets" element={<CreativeStudioPage />} />
          <Route path="creative-studio/templates" element={<CreativeStudioPage />} />
          <Route path="conversations" element={<ConversationsPage />} />
          <Route path="conversations/:threadId" element={<ConversationsPage />} />
          <Route path="community" element={<CommunityOverviewPage />} />
          <Route path="community/setup" element={<CommunitySetupPage />} />
          <Route path="community/home" element={<CommunityHomePage />} />
          <Route path="community/feed" element={<CommunityFeedPage />} />
          <Route path="community/members" element={<CommunityMembersPage />} />
          <Route path="community/events" element={<CommunityEventsPage />} />
          <Route path="community/settings" element={<CommunitySettingsPage />} />
          <Route path="pipeline" element={<PipelinePage />} />
          <Route path="pipeline/:dealId" element={<PipelinePage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="campaigns/:campaignId" element={<CampaignDetailPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="contacts/:contactId" element={<ContactsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="automations" element={<AutomationsPage />} />
          <Route path="workspaces" element={<WorkspacesPage />} />
          <Route path="workspaces/:workspaceId" element={<WorkspacesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/profile" element={<SettingsPage />} />
          <Route path="settings/team" element={<SettingsPage />} />
          <Route path="settings/branding" element={<SettingsPage />} />
          <Route path="settings/billing" element={<SettingsPage />} />
          <Route path="settings/integrations" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
    [],
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <TooltipProvider>
            <BrowserRouter>
              <AppRoutes />
              <Toaster richColors closeButton position="top-right" />
            </BrowserRouter>
          </TooltipProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
