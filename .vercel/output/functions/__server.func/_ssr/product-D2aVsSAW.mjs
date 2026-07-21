import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ChevronLeft, C as PenLine, b as Plus, c as Trash2, h as Search, z as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-D2aVsSAW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var products = [
	{
		id: "1",
		name: "Obsidian Tailcoat",
		sku: "VNT-001",
		category: "Outerwear",
		price: 890,
		stock: 12,
		status: "Active"
	},
	{
		id: "2",
		name: "Argentine Cuff",
		sku: "VNT-002",
		category: "Silverwork",
		price: 245,
		stock: 3,
		status: "Active"
	},
	{
		id: "3",
		name: "Noir Leather Boots",
		sku: "VNT-003",
		category: "Footwear",
		price: 670,
		stock: 28,
		status: "Active"
	},
	{
		id: "4",
		name: "Silver Mesh Gloves",
		sku: "VNT-004",
		category: "Adornment",
		price: 320,
		stock: 45,
		status: "Draft"
	},
	{
		id: "5",
		name: "Onyx Pendant",
		sku: "VNT-005",
		category: "Adornment",
		price: 180,
		stock: 2,
		status: "Active"
	},
	{
		id: "6",
		name: "Crimson Velvet Jacket",
		sku: "VNT-006",
		category: "Outerwear",
		price: 1200,
		stock: 8,
		status: "Active"
	},
	{
		id: "7",
		name: "Bronze Buckle Belt",
		sku: "VNT-007",
		category: "Adornment",
		price: 160,
		stock: 35,
		status: "Active"
	},
	{
		id: "8",
		name: "Smoke Glass Ring",
		sku: "VNT-008",
		category: "Silverwork",
		price: 95,
		stock: 4,
		status: "Draft"
	},
	{
		id: "9",
		name: "Raven Wool Scarf",
		sku: "VNT-009",
		category: "Outerwear",
		price: 210,
		stock: 18,
		status: "Archived"
	},
	{
		id: "10",
		name: "Antique Locket",
		sku: "VNT-010",
		category: "Silverwork",
		price: 340,
		stock: 1,
		status: "Active"
	},
	{
		id: "11",
		name: "Patina Cargo Pants",
		sku: "VNT-011",
		category: "Bottoms",
		price: 450,
		stock: 22,
		status: "Active"
	},
	{
		id: "12",
		name: "Slate Derby Shoes",
		sku: "VNT-012",
		category: "Footwear",
		price: 520,
		stock: 7,
		status: "Draft"
	}
];
var categories = [
	"All",
	"Outerwear",
	"Footwear",
	"Silverwork",
	"Adornment",
	"Tops",
	"Bottoms"
];
function statusBadge(status) {
	const base = "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] border";
	const styles = {
		Active: "bg-green-500/10 text-green-400 border-green-500/20",
		Draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
		Archived: "bg-gray-500/10 text-gray-400 border-gray-500/20"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `${base} ${styles[status] || styles.Active}`,
		children: status
	});
}
function Products() {
	const isMobile = useIsMobile();
	const [search, setSearch] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [page, setPage] = (0, import_react.useState)(1);
	const perPage = 5;
	const filtered = (0, import_react.useMemo)(() => {
		return products.filter((p) => {
			const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
			const matchCat = category === "All" || p.category === category;
			return matchSearch && matchCat;
		});
	}, [search, category]);
	const totalPages = Math.ceil(filtered.length / perPage);
	const paginated = filtered.slice((page - 1) * perPage, page * perPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl md:text-2xl font-display",
				children: "Products"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
				children: "Manage your product catalog"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-md w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 14,
						className: "absolute left-3 top-1/2 -translate-y-1/2 text-chrome-dim"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => {
							setSearch(e.target.value);
							setPage(1);
						},
						placeholder: "Search products...",
						className: "w-full rounded-xl border border-chrome/20 bg-graphite py-2 pl-9 pr-4 font-mono text-[12px] text-foreground placeholder:text-chrome-dim/40 outline-none focus:border-chrome/50 transition-colors"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: category,
					onChange: (e) => {
						setCategory(e.target.value);
						setPage(1);
					},
					className: "rounded-xl border border-chrome/20 bg-graphite px-4 py-2 font-mono text-[12px] text-foreground outline-none focus:border-chrome/50 transition-colors",
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c,
						children: c
					}, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/product/new",
					className: "btn-chrome btn-chrome-inner ml-auto shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-label",
						children: "Add Product"
					})]
				})
			]
		}),
		isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: paginated.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `bg-graphite border rounded-2xl p-4 ${product.stock < 5 ? "border-orange-500/50" : "border-chrome/20"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-lg bg-graphite-2 flex items-center justify-center font-mono text-sm text-chrome-dim",
								children: product.name.charAt(0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px]",
								children: product.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] text-chrome-dim",
								children: product.sku
							})] })]
						}), statusBadge(product.status)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2 mb-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] mt-0.5",
								children: product.category
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Price"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] mt-0.5",
								children: ["$", product.price]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Stock"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `font-mono text-[10px] mt-0.5 ${product.stock < 5 ? "text-orange-400" : ""}`,
								children: product.stock
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 pt-3 border-t border-chrome/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/product/$id/edit",
							params: { id: product.id },
							className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim hover:text-foreground hover:bg-foreground/5 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 12 }), " Edit"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }), " Delete"]
						})]
					})
				]
			}, product.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Image"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Name"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "SKU"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Category"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Price"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Stock"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em]",
					children: "Status"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Actions"
					})
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: paginated.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
				className: product.stock < 5 ? "border-l-2 border-l-orange-500" : "",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-10 w-10 rounded-lg bg-graphite-2 flex items-center justify-center font-mono text-sm text-chrome-dim",
						children: product.name.charAt(0)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px]",
						children: product.name
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-chrome-dim",
						children: product.sku
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px]",
						children: product.category
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[11px]",
						children: ["$", product.price]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-mono text-[11px] ${product.stock < 5 ? "text-orange-400" : ""}`,
						children: product.stock
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: statusBadge(product.status) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$id/edit",
								params: { id: product.id },
								className: "flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/5 transition-colors text-chrome-dim hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 14 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors text-chrome-dim hover:text-red-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							})]
						})
					})
				]
			}, product.id)) })] })
		}),
		totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[10px] text-chrome-dim",
				children: [
					"Page ",
					page,
					" of ",
					totalPages
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPage(Math.max(1, page - 1)),
					disabled: page === 1,
					className: "flex items-center justify-center h-8 w-8 rounded-lg border border-chrome/20 bg-graphite text-chrome-dim hover:text-foreground hover:border-chrome/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 14 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPage(Math.min(totalPages, page + 1)),
					disabled: page === totalPages,
					className: "flex items-center justify-center h-8 w-8 rounded-lg border border-chrome/20 bg-graphite text-chrome-dim hover:text-foreground hover:border-chrome/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })
				})]
			})]
		})
	] });
}
//#endregion
export { Products as component };
