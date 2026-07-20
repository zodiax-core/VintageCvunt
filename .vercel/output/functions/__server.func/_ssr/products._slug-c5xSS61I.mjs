import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-c5xSS61I.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "flex min-h-screen items-center justify-center bg-background px-4",
	"data-tsd-source": "/src/routes/products.$slug.tsx:24:5",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-md text-center",
		"data-tsd-source": "/src/routes/products.$slug.tsx:25:7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-7xl italic text-chrome-h",
				"data-tsd-source": "/src/routes/products.$slug.tsx:26:9",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-xs uppercase tracking-[0.24em] text-chrome-dim",
				"data-tsd-source": "/src/routes/products.$slug.tsx:27:9",
				children: "Object not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-8 inline-block btn-chrome btn-chrome-inner",
				"data-tsd-source": "/src/routes/products.$slug.tsx:28:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn-label",
					"data-tsd-source": "/src/routes/products.$slug.tsx:29:11",
					children: "Return to shop"
				})
			})
		]
	})
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
