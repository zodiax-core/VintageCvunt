import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DLpWP-3B.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function cleanError(err) {
	const msg = typeof err === "string" ? err : err && typeof err === "object" && "message" in err ? err.message : String(err);
	if (typeof msg !== "string") return "An unexpected error occurred.";
	const match = msg.match(/Server Error(?:\s+Uncaught\s+Error)?:\s*(.+?)(?:\.?\s*at\s+handler|$)/);
	if (match) return match[1].trim();
	if (msg.length > 200 || msg.includes("\n")) return "An unexpected error occurred.";
	return msg;
}
//#endregion
export { cn as n, cleanError as t };
