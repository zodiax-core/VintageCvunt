import { redirect } from "@tanstack/react-router";
import { isAdminEmail, getSessionToken } from "./admin";

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

export function requireAdmin() {
  if (typeof window === "undefined") return;
  const user = getStoredUser();
  if (!user) throw redirect({ to: "/auth" });
  const isAdmin = user.role === "admin" || isAdminEmail(user.email);
  if (!isAdmin) throw redirect({ to: "/" });
  if (!getSessionToken()) throw redirect({ to: "/auth" });
}

export function requireCustomer() {
  if (typeof window === "undefined") return;
  const user = getStoredUser();
  if (!user) throw redirect({ to: "/auth" });
  if (!user.email) throw redirect({ to: "/auth" });
}
