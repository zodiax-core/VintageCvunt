import { redirect } from "@tanstack/react-router";
import { isAdminEmail, getSessionToken, setSessionToken, clearSessionCookie } from "./admin";
import { CONVEX_URL } from "./convex";

function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("vc_user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function validateSessionToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${CONVEX_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "admin:validateSession", args: { sessionToken: token } }),
    });
    if (!res.ok) return false;
    const json = await res.json();
    const value = json && typeof json === "object" && "value" in json ? json.value : json;
    return value?.valid === true;
  } catch {
    return true;
  }
}

export async function requireAdmin() {
  if (typeof window === "undefined") return;
  const user = getStoredUser();
  if (!user) throw redirect({ to: "/auth" });
  const isAdmin = user.role === "admin" || isAdminEmail(user.email);
  if (!isAdmin) throw redirect({ to: "/" });
  const token = getSessionToken();
  if (!token) throw redirect({ to: "/auth" });
  const valid = await validateSessionToken(token);
  if (!valid) {
    setSessionToken(null);
    clearSessionCookie();
    localStorage.removeItem("vc_user");
    throw redirect({ to: "/auth" });
  }
}

export function requireCustomer() {
  if (typeof window === "undefined") return;
  const user = getStoredUser();
  if (!user) throw redirect({ to: "/auth" });
  if (!user.email) throw redirect({ to: "/auth" });
}
