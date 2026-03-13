import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { demoUser, type DemoUser, type Workspace, workspaces as seedWorkspaces } from "@/data/mock-data";

type StoredSession = {
  user: DemoUser | null;
  activeWorkspaceId: string | null;
  onboardingCompleted: boolean;
};

type SessionContextValue = {
  user: DemoUser | null;
  isAuthenticated: boolean;
  activeWorkspaceId: string | null;
  onboardingCompleted: boolean;
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  selectWorkspace: (workspaceId: string) => void;
  completeOnboarding: () => void;
  createWorkspace: (payload: { name: string; industry: string; region: string }) => Workspace;
};

const STORAGE_KEY = "ventra-demo-session-v1";
const SessionContext = createContext<SessionContextValue | undefined>(undefined);

function readStoredSession(): StoredSession {
  if (typeof window === "undefined") {
    return { user: null, activeWorkspaceId: null, onboardingCompleted: false };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { user: null, activeWorkspaceId: null, onboardingCompleted: false };
  }

  try {
    const parsed = JSON.parse(raw) as StoredSession;
    return {
      user: parsed.user ?? null,
      activeWorkspaceId: parsed.activeWorkspaceId ?? null,
      onboardingCompleted: Boolean(parsed.onboardingCompleted),
    };
  } catch {
    return { user: null, activeWorkspaceId: null, onboardingCompleted: false };
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>(seedWorkspaces);

  useEffect(() => {
    const stored = readStoredSession();
    setUser(stored.user);
    setActiveWorkspaceId(stored.activeWorkspaceId);
    setOnboardingCompleted(stored.onboardingCompleted);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: StoredSession = { user, activeWorkspaceId, onboardingCompleted };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [activeWorkspaceId, onboardingCompleted, user]);

  const currentWorkspace = useMemo(
    () => workspaceList.find((workspace) => workspace.id === activeWorkspaceId) ?? null,
    [activeWorkspaceId, workspaceList],
  );

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      activeWorkspaceId,
      onboardingCompleted,
      workspaces: workspaceList,
      currentWorkspace,
      login: (email: string) => {
        setUser({ ...demoUser, email });
        setOnboardingCompleted(true);
        setActiveWorkspaceId(seedWorkspaces[0].id);
      },
      register: (name: string, email: string) => {
        setUser({ ...demoUser, name, email });
        setOnboardingCompleted(false);
        setActiveWorkspaceId(null);
      },
      logout: () => {
        setUser(null);
        setActiveWorkspaceId(null);
        setOnboardingCompleted(false);
      },
      selectWorkspace: (workspaceId: string) => setActiveWorkspaceId(workspaceId),
      completeOnboarding: () => setOnboardingCompleted(true),
      createWorkspace: (payload) => {
        const workspace: Workspace = {
          id: `ws-${Date.now()}`,
          slug: payload.name.toLowerCase().replace(/\s+/g, "-"),
          name: payload.name,
          industry: payload.industry,
          region: payload.region,
          plan: "Growth",
          members: 1,
          activeContacts: 0,
          monthlyPipeline: "$0",
        };
        setWorkspaceList((previous) => [workspace, ...previous]);
        setActiveWorkspaceId(workspace.id);
        return workspace;
      },
    }),
    [activeWorkspaceId, currentWorkspace, onboardingCompleted, user, workspaceList],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
}
