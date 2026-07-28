import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/order")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: () => <Outlet />,
  head: () => ({
    meta: [{ title: "Orders — VintageCvunt Admin" }],
  }),
});
