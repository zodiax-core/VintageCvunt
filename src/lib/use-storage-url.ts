import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useStorageUrl(storageId: string | null | undefined): string | undefined {
  const result = useQuery(
    api.collections.getStorageUrl,
    storageId ? { storageId } : "skip"
  );
  return result ?? undefined;
}