import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanError(err: unknown): string {
  const msg =
    typeof err === "string"
      ? err
      : err && typeof err === "object" && "message" in err
        ? (err as any).message
        : String(err);

  if (typeof msg !== "string") return "An unexpected error occurred.";

  const match = msg.match(
    /Server Error(?:\s+Uncaught\s+Error)?:\s*(.+?)(?:\.?\s*at\s+handler|$)/,
  );
  if (match) return match[1].trim();

  if (msg.length > 200 || msg.includes("\n")) return "An unexpected error occurred.";
  return msg;
}
