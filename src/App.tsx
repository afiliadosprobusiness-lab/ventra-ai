import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DemoAuthProvider, useDemoAuth } from "@/lib/demo-auth";
import NotFound from "./pages/NotFound.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import OnboardingPage from "./pages/OnboardingPage.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import OverviewPage from "./pages/app/OverviewPage.tsx";
import AcquisitionPage from "./pages/app/AcquisitionPage.tsx";
import ProspectorPage from "./pages/app/ProspectorPage.tsx";
import WidgetsPage from "./pages/app/WidgetsPage.tsx";
import VoiceAIPage from "./pages/app/VoiceAIPage.tsx";
import CreativeStudioPage from "./pages/app/CreativeStudioPage.tsx";
import ConversationsPage from "./pages/app/ConversationsPage.tsx";
import CampaignsPage from "./pages/app/CampaignsPage.tsx";
import AnalyticsPage from "./pages/app/AnalyticsPage.tsx";
import SettingsPage from "./pages/app/SettingsPage.tsx";

const queryClient = new QueryClient();

function GuestOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useDemoAuth();
  return isAuthenticated ? <Navigate to="/app" replace /> : <>{children}</>;
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useDemoAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DemoAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<LandingPage />} />
            <Route path="/faq" element={<LandingPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/login" element={<GuestOnlyRoute><LoginPage /></GuestOnlyRoute>} />
            <Route path="/register" element={<GuestOnlyRoute><RegisterPage /></GuestOnlyRoute>} />
            <Route path="/forgot-password" element={<GuestOnlyRoute><ForgotPasswordPage /></GuestOnlyRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
            <Route path="/workspaces/select" element={<Navigate to="/onboarding" replace />} />
            <Route path="/workspaces/new" element={<Navigate to="/onboarding" replace />} />
            <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<OverviewPage />} />
              <Route path="overview" element={<Navigate to="/app" replace />} />
              <Route path="acquisition" element={<AcquisitionPage />} />
              <Route path="prospector" element={<ProspectorPage />} />
              <Route path="acquisition/prospector-ai" element={<Navigate to="/app/prospector" replace />} />
              <Route path="acquisition/widgets" element={<Navigate to="/app/acquisition" replace />} />
              <Route path="acquisition/forms" element={<Navigate to="/app/acquisition" replace />} />
              <Route path="acquisition/quiz" element={<Navigate to="/app/acquisition" replace />} />
              <Route path="acquisition/sources" element={<Navigate to="/app/acquisition" replace />} />
              <Route path="widgets" element={<WidgetsPage />} />
              <Route path="widgets/new" element={<Navigate to="/app/widgets" replace />} />
              <Route path="widgets/:widgetId" element={<Navigate to="/app/widgets" replace />} />
              <Route path="voice-ai" element={<VoiceAIPage />} />
              <Route path="voice-ai/inbound" element={<Navigate to="/app/voice-ai" replace />} />
              <Route path="voice-ai/outbound" element={<Navigate to="/app/voice-ai" replace />} />
              <Route path="voice-ai/calls/:callId" element={<Navigate to="/app/voice-ai" replace />} />
              <Route path="creative-studio" element={<CreativeStudioPage />} />
              <Route path="creative-studio/projects/new" element={<Navigate to="/app/creative-studio" replace />} />
              <Route path="creative-studio/projects/:projectId" element={<Navigate to="/app/creative-studio" replace />} />
              <Route path="creative-studio/assets" element={<Navigate to="/app/creative-studio" replace />} />
              <Route path="creative-studio/templates" element={<Navigate to="/app/creative-studio" replace />} />
              <Route path="conversations" element={<ConversationsPage />} />
              <Route path="conversations/:threadId" element={<Navigate to="/app/conversations" replace />} />
              <Route path="pipeline" element={<Navigate to="/app/conversations" replace />} />
              <Route path="pipeline/:dealId" element={<Navigate to="/app/conversations" replace />} />
              <Route path="contacts" element={<Navigate to="/app/conversations" replace />} />
              <Route path="contacts/:contactId" element={<Navigate to="/app/conversations" replace />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="campaigns/:campaignId" element={<Navigate to="/app/campaigns" replace />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="automations" element={<Navigate to="/app/voice-ai" replace />} />
              <Route path="community" element={<Navigate to="/app" replace />} />
              <Route path="community/setup" element={<Navigate to="/app" replace />} />
              <Route path="community/home" element={<Navigate to="/app" replace />} />
              <Route path="community/feed" element={<Navigate to="/app" replace />} />
              <Route path="community/members" element={<Navigate to="/app" replace />} />
              <Route path="community/events" element={<Navigate to="/app" replace />} />
              <Route path="community/settings" element={<Navigate to="/app" replace />} />
              <Route path="workspaces" element={<Navigate to="/app" replace />} />
              <Route path="workspaces/:workspaceId" element={<Navigate to="/app" replace />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="settings/profile" element={<Navigate to="/app/settings" replace />} />
              <Route path="settings/team" element={<Navigate to="/app/settings" replace />} />
              <Route path="settings/branding" element={<Navigate to="/app/settings" replace />} />
              <Route path="settings/billing" element={<Navigate to="/app/settings" replace />} />
              <Route path="settings/integrations" element={<Navigate to="/app/settings" replace />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DemoAuthProvider>
  </QueryClientProvider>
);

export default App;
