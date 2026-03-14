import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SESSION_STORAGE_KEY = "ventra.demo.session";
const USERS_STORAGE_KEY = "ventra.demo.users";

export type DemoAuthUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  workspace: string;
};

const demoUser: DemoAuthUser = {
  id: "demo-user",
  name: "Carla Diaz",
  email: "demo@ventra.io",
  password: "VentraDemo123",
  role: "Admin",
  workspace: "Workspace principal",
};

type DemoAuthContextValue = {
  user: DemoAuthUser | null;
  isAuthenticated: boolean;
  demoCredentials: Pick<DemoAuthUser, "email" | "password">;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  loginAsDemo: () => void;
  register: (input: { name: string; email: string; password: string }) => { ok: boolean; message?: string };
  logout: () => void;
};

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

function readStoredUsers() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DemoAuthUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readStoredSession() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoAuthUser) : null;
  } catch {
    return null;
  }
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [registeredUsers, setRegisteredUsers] = useState<DemoAuthUser[]>([]);
  const [user, setUser] = useState<DemoAuthUser | null>(null);

  useEffect(() => {
    setRegisteredUsers(readStoredUsers());
    setUser(readStoredSession());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!user) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const login = useCallback(
    (email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      const matchedUser = [demoUser, ...registeredUsers].find(
        (candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.password === password,
      );

      if (!matchedUser) {
        return { ok: false, message: "Credenciales invalidas. Usa el usuario demo o una cuenta creada en este navegador." };
      }

      setUser(matchedUser);
      return { ok: true };
    },
    [registeredUsers],
  );

  const loginAsDemo = useCallback(() => {
    setUser(demoUser);
  }, []);

  const register = useCallback(
    (input: { name: string; email: string; password: string }) => {
      const name = input.name.trim();
      const email = input.email.trim().toLowerCase();
      const password = input.password.trim();

      if (!name || !email || !password) {
        return { ok: false, message: "Completa nombre, email y contrasena." };
      }

      if ([demoUser, ...registeredUsers].some((candidate) => candidate.email.toLowerCase() === email)) {
        return { ok: false, message: "Ese email ya existe en este entorno frontend." };
      }

      const nextUser: DemoAuthUser = {
        id: `local-${Date.now()}`,
        name,
        email,
        password,
        role: "Owner",
        workspace: "Nuevo workspace",
      };

      setRegisteredUsers((current) => [...current, nextUser]);
      setUser(nextUser);
      return { ok: true };
    },
    [registeredUsers],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo<DemoAuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      demoCredentials: {
        email: demoUser.email,
        password: demoUser.password,
      },
      login,
      loginAsDemo,
      register,
      logout,
    }),
    [login, loginAsDemo, logout, register, user],
  );

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>;
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);

  if (!context) {
    throw new Error("useDemoAuth must be used inside DemoAuthProvider");
  }

  return context;
}
