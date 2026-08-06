export const ADMIN_EMAILS: string[] = ["zodiaxcore@gmail.com", "vintagecvunt@gmail.com"];

export function isAdminEmail(email?: string | null): boolean {
  return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase().trim()));
}

export const SESSION_STORAGE_KEY = "vc_admin_session";

export function getSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_STORAGE_KEY);
}

export function setSessionToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(SESSION_STORAGE_KEY, token);
  else localStorage.removeItem(SESSION_STORAGE_KEY);
}
