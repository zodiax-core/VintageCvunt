import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { SESSION_COOKIE } from "./lib/admin";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const ADMIN_PATH_RE =
  /^\/(admin|analytics|collection|content|coupon|customer|message|order|product|review|setting|investor|finance)(\/|$)/;

const adminSessionMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  if (!ADMIN_PATH_RE.test(url.pathname)) {
    return next();
  }
  const cookies = request.headers.get("cookie") ?? "";
  const hasSessionCookie = cookies
    .split(";")
    .map((c) => c.trim())
    .some((c) => c.startsWith(`${SESSION_COOKIE}=`));
  if (!hasSessionCookie) {
    return new Response(null, {
      status: 302,
      headers: { location: "/auth" },
    });
  }
  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [adminSessionMiddleware, errorMiddleware],
}));
