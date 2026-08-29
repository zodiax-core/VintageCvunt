import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-B0N4M6pc.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as getSessionToken } from "./admin-D4iRQZfC.mjs";
import { _ as Link, l as useLocation, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Plus, ct as ChevronLeft, d as Trash2, j as PenLine, p as Star, st as ChevronRight, x as Search } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-CEycyE9k.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { t as useIsMobile } from "./use-mobile-DM96sOa1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-D4aVHA3T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const { pathname } = useLocation();
	const isMobile = useIsMobile();
	const [search, setSearch] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [page, setPage] = (0, import_react.useState)(1);
	const perPage = 10;
	const allProducts = useQuery(api.products.list) ?? [];
	const deleteProduct = useMutation(api.products.remove);
	const updateProduct = useMutation(api.products.update);
	const toggleFeatured = async (id, current) => {
		try {
			await updateProduct({
				sessionToken: getSessionToken() ?? "",
				id,
				featured: !current
			});
		} catch (err) {
			console.error("Failed to toggle featured", err);
		}
	};
	const slugCounts = (0, import_react.useMemo)(() => {
		const counts = {};
		for (const p of allProducts) counts[p.slug] = (counts[p.slug] || 0) + 1;
		return counts;
	}, [allProducts]);
	const products = (0, import_react.useMemo)(() => {
		return allProducts.map((p) => ({
			_id: p._id,
			name: p.name,
			slug: p.slug,
			category: p.category,
			price: p.price,
			stockCount: p.stockCount,
			inStock: p.inStock,
			imageUrl: p.imageUrls?.[0] || null,
			featured: p.featured,
			status: p.inStock ? "Active" : "Draft",
			slugDuplicate: (slugCounts[p.slug] || 0) > 1
		}));
	}, [allProducts, slugCounts]);
	const filtered = (0, import_react.useMemo)(() => {
		return products.filter((p) => {
			const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
			const matchCat = category === "All" || p.category === category;
			return matchSearch && matchCat;
		});
	}, [
		search,
		category,
		products
	]);
	const totalPages = Math.ceil(filtered.length / perPage);
	const paginated = filtered.slice((page - 1) * perPage, page * perPage);
	const handleDelete = async (id, name) => {
		if (!window.confirm(`Delete "${name}"?`)) return;
		try {
			await deleteProduct({
				sessionToken: getSessionToken() ?? "",
				id
			});
		} catch (err) {
			console.error("Failed to delete product", err);
		}
	};
	if (pathname !== "/product") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
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
				className: `bg-graphite border rounded-2xl p-4 ${product.stockCount < 5 ? "border-orange-500/50" : "border-chrome/20"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-lg bg-graphite-2 flex items-center justify-center font-mono text-sm text-chrome-dim",
								children: product.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.imageUrl,
									alt: "",
									className: "h-full w-full object-cover rounded-lg"
								}) : product.name.charAt(0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px]",
								children: product.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[9px] text-chrome-dim",
								children: [product.slug, product.slugDuplicate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-[8px] bg-red-500/20 text-red-400 rounded px-1.5 py-0.5 font-mono",
									children: "dup"
								})]
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
								className: `font-mono text-[10px] mt-0.5 ${product.stockCount < 5 ? "text-orange-400" : ""}`,
								children: product.stockCount
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 pt-3 border-t border-chrome/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => toggleFeatured(product._id, product.featured),
								className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${product.featured ? "text-yellow-400" : "text-chrome-dim hover:text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
										size: 12,
										fill: product.featured ? "currentColor" : "none"
									}),
									" ",
									product.featured ? "Featured" : "Feature"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/product/$id/edit",
								params: { id: product._id },
								className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim hover:text-foreground hover:bg-foreground/5 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 12 }), " Edit"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleDelete(product._id, product.name),
								className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }), " Delete"]
							})
						]
					})
				]
			}, product._id))
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
					children: "Slug"
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
					children: "Featured"
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
				className: product.stockCount < 5 ? "border-l-2 border-l-orange-500" : "",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: product.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.imageUrl,
						alt: "",
						className: "h-10 w-10 rounded-lg object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-10 w-10 rounded-lg bg-graphite-2 flex items-center justify-center font-mono text-sm text-chrome-dim",
						children: product.name.charAt(0)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px]",
						children: product.name
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[11px] text-chrome-dim",
						children: [product.slug, product.slugDuplicate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-[8px] bg-red-500/20 text-red-400 rounded px-1.5 py-0.5 font-mono",
							children: "dup"
						})]
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
						className: `font-mono text-[11px] ${product.stockCount < 5 ? "text-orange-400" : ""}`,
						children: product.stockCount
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => toggleFeatured(product._id, product.featured),
						className: `flex items-center justify-center h-8 w-8 rounded-lg transition-colors ${product.featured ? "text-yellow-400 hover:text-yellow-300" : "text-chrome-dim hover:text-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 14,
							fill: product.featured ? "currentColor" : "none"
						})
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: statusBadge(product.status) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$id/edit",
								params: { id: product._id },
								className: "flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/5 transition-colors text-chrome-dim hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 14 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(product._id, product.name),
								className: "flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors text-chrome-dim hover:text-red-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							})]
						})
					})
				]
			}, product._id)) })] })
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
