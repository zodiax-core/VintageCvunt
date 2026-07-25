import { redirect } from "@tanstack/react-router";

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
  const user = getStoredUser();
  if (!user) throw redirect({ to: "/auth" });
  const isAdmin = user.role === "admin" || user.email?.toLowerCase() === "zodiaxcore@gmail.com";
  if (!isAdmin) throw redirect({ to: "/" });
}

export function requireCustomer() {
  const user = getStoredUser();
  if (!user) throw redirect({ to: "/auth" });
  // Both customers AND admins can access customer pages
  if (!user.email) throw redirect({ to: "/auth" });
}

