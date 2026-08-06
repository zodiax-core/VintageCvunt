import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/investor")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: () => <Outlet />,
  head: () => ({
    meta: [{ title: "Investors — VintageCvunt Admin" }],
  }),
});
