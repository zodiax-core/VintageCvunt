import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { I as DollarSign, S as Pencil, a as Truck, b as Plus, c as Trash2, t as X, x as Percent } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose$1, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coupon-CQyiS8bV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogClose = DialogClose$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose$1, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var initialCoupons = [
	{
		id: 1,
		code: "WELCOME20",
		type: "percentage",
		value: "20%",
		minOrder: "$0",
		usage: "145/200",
		expiry: "2026-12-31",
		status: "Active"
	},
	{
		id: 2,
		code: "SUMMER25",
		type: "fixed",
		value: "$25",
		minOrder: "$100",
		usage: "78/150",
		expiry: "2026-09-01",
		status: "Active"
	},
	{
		id: 3,
		code: "VIP15",
		type: "percentage",
		value: "15%",
		minOrder: "$50",
		usage: "34/100",
		expiry: "2026-08-15",
		status: "Scheduled"
	},
	{
		id: 4,
		code: "FREESHIP",
		type: "free_shipping",
		value: "Free",
		minOrder: "$75",
		usage: "203/500",
		expiry: "2026-12-31",
		status: "Active"
	},
	{
		id: 5,
		code: "FLASH30",
		type: "percentage",
		value: "30%",
		minOrder: "$0",
		usage: "56/100",
		expiry: "2026-07-25",
		status: "Active"
	},
	{
		id: 6,
		code: "BUNDLE10",
		type: "fixed",
		value: "$10",
		minOrder: "$60",
		usage: "22/50",
		expiry: "2026-10-01",
		status: "Scheduled"
	},
	{
		id: 7,
		code: "LOYAL20",
		type: "percentage",
		value: "20%",
		minOrder: "$0",
		usage: "89/300",
		expiry: "2026-06-30",
		status: "Expired"
	},
	{
		id: 8,
		code: "CLEAR50",
		type: "percentage",
		value: "50%",
		minOrder: "$150",
		usage: "12/50",
		expiry: "2026-08-20",
		status: "Active"
	}
];
var statusStyles = {
	Active: "bg-green-500/20 text-green-400 border-green-500/30",
	Expired: "bg-red-500/20 text-red-400 border-red-500/30",
	Scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30"
};
var typeIcons = {
	percentage: Percent,
	fixed: DollarSign,
	free_shipping: Truck
};
var typeColors = {
	percentage: "bg-green-500/20 text-green-400 border-green-500/30",
	fixed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	free_shipping: "bg-purple-500/20 text-purple-400 border-purple-500/30"
};
var emptyForm = {
	code: "",
	type: "percentage",
	value: "",
	minOrder: "",
	usageLimit: "",
	expiry: "",
	status: "Active"
};
function Coupons() {
	const [coupons, setCoupons] = (0, import_react.useState)(initialCoupons);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	function openAdd() {
		setEditing(null);
		setForm(emptyForm);
		setOpen(true);
	}
	function openEdit(coupon) {
		setEditing(coupon);
		setForm({
			code: coupon.code,
			type: coupon.type,
			value: coupon.type === "free_shipping" ? "" : coupon.value.replace(/[$%]/g, ""),
			minOrder: coupon.minOrder.replace("$", ""),
			usageLimit: coupon.usage.split("/")[1],
			expiry: coupon.expiry,
			status: coupon.status
		});
		setOpen(true);
	}
	function handleSave() {
		if (editing) setCoupons((prev) => prev.map((c) => c.id === editing.id ? {
			...c,
			code: form.code,
			type: form.type,
			value: form.type === "percentage" ? `${form.value}%` : form.type === "fixed" ? `$${form.value}` : "Free",
			minOrder: `$${form.minOrder || "0"}`,
			usage: `${c.usage.split("/")[0]}/${form.usageLimit}`,
			expiry: form.expiry,
			status: form.status
		} : c));
		else setCoupons((prev) => [...prev, {
			id: Math.max(...prev.map((c) => c.id)) + 1,
			code: form.code,
			type: form.type,
			value: form.type === "percentage" ? `${form.value}%` : form.type === "fixed" ? `$${form.value}` : "Free",
			minOrder: `$${form.minOrder || "0"}`,
			usage: `0/${form.usageLimit}`,
			expiry: form.expiry,
			status: form.status
		}]);
		setOpen(false);
	}
	function handleDelete(id) {
		setCoupons((prev) => prev.filter((c) => c.id !== id));
	}
	function StatusBadge({ status }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusStyles[status] || ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), status]
		});
	}
	function TypeBadge({ type }) {
		const Icon = typeIcons[type];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${typeColors[type] || ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 10 }), type === "percentage" ? "%" : type === "fixed" ? "$" : "Free Shipping"]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl md:text-2xl font-display",
						children: "Coupons"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
						children: "Manage discount codes"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openAdd,
					className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "btn-label",
						children: "Add Coupon"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Value"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Min Order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Usage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Expiry"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: coupons.map((coupon) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10 hover:bg-chrome/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-mono text-[11px] font-medium text-foreground",
								children: coupon.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeBadge, { type: coupon.type }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-foreground",
								children: coupon.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: coupon.minOrder
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: coupon.usage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: coupon.expiry
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: coupon.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => openEdit(coupon),
										className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleDelete(coupon.id),
										className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						]
					}, coupon.id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden space-y-3",
				children: coupons.map((coupon) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[13px] font-medium text-foreground",
								children: coupon.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: coupon.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeBadge, { type: coupon.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground font-mono text-sm",
								children: coupon.value
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Min: ", coupon.minOrder] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Used: ", coupon.usage] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted-foreground",
							children: ["Expires: ", coupon.expiry]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openEdit(coupon),
								className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5 mr-1 inline" }), " Edit"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleDelete(coupon.id),
								className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 mr-1 inline" }), " Delete"]
							})]
						})
					]
				}, coupon.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "bg-background border border-chrome/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Edit Coupon" : "Add Coupon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: editing ? "Update coupon details" : "Create a new discount coupon"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.code,
										onChange: (e) => setForm({
											...form,
											code: e.target.value.toUpperCase()
										}),
										placeholder: "e.g. SAVE20",
										className: "w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Discount Type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: form.type,
										onChange: (e) => setForm({
											...form,
											type: e.target.value
										}),
										className: "w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "percentage",
												children: "Percentage (%)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "fixed",
												children: "Fixed ($)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "free_shipping",
												children: "Free Shipping"
											})
										]
									})]
								}),
								form.type !== "free_shipping" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Value"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: form.value,
										onChange: (e) => setForm({
											...form,
											value: e.target.value
										}),
										placeholder: form.type === "percentage" ? "20" : "25",
										className: "w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Min Order ($)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: form.minOrder,
										onChange: (e) => setForm({
											...form,
											minOrder: e.target.value
										}),
										placeholder: "0",
										className: "w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Usage Limit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: form.usageLimit,
										onChange: (e) => setForm({
											...form,
											usageLimit: e.target.value
										}),
										placeholder: "100",
										className: "w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Expiry Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: form.expiry,
										onChange: (e) => setForm({
											...form,
											expiry: e.target.value
										}),
										className: "w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: form.status,
										onChange: (e) => setForm({
											...form,
											status: e.target.value
										}),
										className: "w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Active",
												children: "Active"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Scheduled",
												children: "Scheduled"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Expired",
												children: "Expired"
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									children: "Cancel"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleSave,
							disabled: !form.code || !form.value && form.type !== "free_shipping",
							className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 disabled:opacity-30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								children: editing ? "Update" : "Create"
							})
						})] })
					]
				})
			})
		]
	}) });
}
//#endregion
export { Coupons as component };
