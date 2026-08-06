import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { isAdminEmail, getSessionToken, setSessionToken } from "./admin";

export type AuthUser = {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "customer";
};

const STORAGE_KEY = "vc_user";

const AuthContext = createContext<{
  user: AuthUser | null;
  sessionToken: string | null;
  login: (user: AuthUser, sessionToken?: string | null) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  isAdmin: boolean;
  isCustomer: boolean;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sessionToken, setToken] = useState<string | null>(null);
  const revokeSession = useMutation(api.admin.revokeSession);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.email) {
          if (isAdminEmail(parsed.email)) {
            parsed.role = "admin";
          }
          setUser(parsed);
        }
      }
      setToken(getSessionToken());
    } catch {}
  }, []);

  const login = (userData: AuthUser, token?: string | null) => {
    const isAdmin = isAdminEmail(userData.email) || userData.role === "admin";
    const fullUser: AuthUser = {
      ...userData,
      role: isAdmin ? "admin" : "customer",
    };
    setUser(fullUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
    if (token) {
      setSessionToken(token);
      setToken(token);
    }
  };

  const logout = () => {
    const token = sessionToken || getSessionToken();
    if (token) {
      revokeSession({ sessionToken: token }).catch(() => {});
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
    setSessionToken(null);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isAdmin = Boolean(user && (user.role === "admin" || isAdminEmail(user.email)));
  const isCustomer = Boolean(user && user.role === "customer");

  return (
    <AuthContext.Provider
      value={{ user, sessionToken, login, logout, updateUser, isAdmin, isCustomer }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
