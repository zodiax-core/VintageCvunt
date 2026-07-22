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
  isAdmin: boolean;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.email) {
          // If email is zodiaxcore@gmail.com ensure role is admin
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

  const isAdmin = Boolean(user && (user.role === "admin" || user.email.toLowerCase() === "zodiaxcore@gmail.com"));

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
