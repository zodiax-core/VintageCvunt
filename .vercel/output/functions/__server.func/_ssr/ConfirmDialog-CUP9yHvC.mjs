import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { c as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ConfirmDialog-CUP9yHvC.js
var import_jsx_runtime = require_jsx_runtime();
function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "danger" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 300
			},
			className: "bg-graphite border border-chrome/20 rounded-2xl p-6 max-w-md w-full shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `rounded-full p-2 shrink-0 ${variant === "danger" ? "bg-red-500/20" : "bg-yellow-500/20"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
							size: 20,
							className: variant === "danger" ? "text-red-400" : "text-yellow-400"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg mb-1 text-foreground",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[12px] text-chrome-dim leading-relaxed",
							children: message
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "p-1 shrink-0 hover:bg-foreground/5 rounded-lg transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							size: 16,
							className: "text-chrome-dim"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-3 mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-xl border border-chrome/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-foreground hover:bg-foreground/5 transition-colors",
					children: cancelLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onConfirm,
					className: `rounded-xl px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors ${variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-yellow-600 hover:bg-yellow-700"}`,
					children: confirmLabel
				})]
			})]
		})
	}) });
}
//#endregion
export { ConfirmDialog as t };
