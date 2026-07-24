import { notFound, redirect } from "@tanstack/react-router";

export function requireAdmin() {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem("vc_user");
  if (!raw) throw notFound();
  try {
    const user = JSON.parse(raw);
    if (!user.email || user.email.toLowerCase() !== "zodiaxcore@gmail.com") {
      throw notFound();
    }
  } catch {
    throw notFound();
  }
}

export function requireCustomer() {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem("vc_user");
  if (!raw) throw notFound();
  try {
    const user = JSON.parse(raw);
    if (!user.email || user.role !== "customer") {
      throw notFound();
    }
  } catch {
    throw notFound();
  }
}
