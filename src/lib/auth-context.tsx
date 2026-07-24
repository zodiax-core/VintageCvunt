import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type AuthUser = {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "customer";
};

const STORAGE_KEY = "vc_user";

const AuthContext = createContext<{
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  isAdmin: boolean;
  isCustomer: boolean;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.email) {
          if (parsed.email.toLowerCase() === "zodiaxcore@gmail.com") {
            parsed.role = "admin";
          }
          setUser(parsed);
        }
      }
    } catch {}
  }, []);

  const login = (userData: AuthUser) => {
    const isAdmin = userData.email.toLowerCase() === "zodiaxcore@gmail.com" || userData.role === "admin";
    const fullUser: AuthUser = {
      ...userData,
      role: isAdmin ? "admin" : "customer",
    };
    setUser(fullUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isAdmin = Boolean(user && (user.role === "admin" || user.email.toLowerCase() === "zodiaxcore@gmail.com"));
  const isCustomer = Boolean(user && user.role === "customer");

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAdmin, isCustomer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
