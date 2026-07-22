import { ConvexReactClient } from "convex/react";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

let convexClient: ConvexReactClient | null = null;

function getConvexClient(): ConvexReactClient {
  if (!convexClient) {
    convexClient = new ConvexReactClient(CONVEX_URL, {
      skipConvexDeploymentCheck: typeof window === "undefined",
    });
  }
  return convexClient;
}

export { getConvexClient, CONVEX_URL };
