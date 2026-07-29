import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Maximize2, D as Package, G as CircleX, S as Phone, Y as Check, c as Trash2, t as X, tt as ArrowLeft, y as Receipt, z as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BhQ-pVpk.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
import { t as Route } from "./order._id-BX8TXe3C.mjs";
import { r as generateReceiptPDF } from "./pdf-utils-C7bt-qoI.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-CUP9yHvC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-DnaGMKP0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusColors = {
	Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
	Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
	Cancelled: "bg-red-500/20 text-red-400 border-red-500/30"
};
var quickActions = {
	Pending: [{
		label: "Confirm",
		nextStatus: "Processing",
		color: "text-green-400",
		icon: Check
	}, {
		label: "Cancel",
		nextStatus: "Cancelled",
		color: "text-red-400",
		icon: X
	}],
	Processing: [{
		label: "Mark Shipped",
		nextStatus: "Shipped",
		color: "text-purple-400",
		icon: Check
	}, {
		label: "Cancel",
		nextStatus: "Cancelled",
		color: "text-red-400",
		icon: X
	}],
	Shipped: [{
		label: "Mark Delivered",
		nextStatus: "Delivered",
		color: "text-green-400",
		icon: Check
	}]
};
function OrderDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const order = useQuery(api.orders.getById, { id });
	const settings = useQuery(api.settings.get);
	const allProducts = useQuery(api.products.list) ?? [];
	const updateOrder = useMutation(api.orders.update);
	const removeOrder = useMutation(api.orders.remove);
	const [status, setStatus] = (0, import_react.useState)("");
	const [showSuccess, setShowSuccess] = (0, import_react.useState)(false);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(false);
	const [successMsg, setSuccessMsg] = (0, import_react.useState)("");
	const [lightboxImg, setLightboxImg] = (0, import_react.useState)(null);
	const productMap = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const p of allProducts) map.set(p._id, {
			slug: p.slug,
			imageUrl: p.imageUrls?.[0]
		});
		return map;
	}, [allProducts]);
	(0, import_react.useEffect)(() => {
		if (order) setStatus(order.status);
	}, [id, order]);
	function flashSuccess(msg) {
		setSuccessMsg(msg);
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 2e3);
	}
	if (order === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-12 w-12 text-muted-foreground mb-4 animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground mb-2",
				children: "Loading order..."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: "Fetching details..."
			})
		]
	}) });
	if (order === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-12 w-12 text-muted-foreground mb-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground mb-2",
				children: "Order not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground text-sm mb-6",
				children: [
					"No order matches the ID \"",
					id,
					"\"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/order",
				className: "btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm",
				children: "Back to Orders"
			})
		]
	}) });
	const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
	const profit = (order.shipping || 0) + (order.tax || 0) - (order.discount || 0);
	async function handleUpdate() {
		try {
			await updateOrder({
				id: order._id,
				status
			});
			flashSuccess("Status updated!");
		} catch (err) {
			console.error("Failed to update order", err);
		}
	}
	async function handleQuickAction(nextStatus) {
		try {
			await updateOrder({
				id: order._id,
				status: nextStatus
			});
			setStatus(nextStatus);
			flashSuccess(`Order ${nextStatus.toLowerCase()}!`);
		} catch (err) {
			console.error("Failed to update order", err);
		}
	}
	async function handleDelete() {
		try {
			await removeOrder({ id: order._id });
			navigate({ to: "/order" });
		} catch (err) {
			console.error("Failed to delete order", err);
		}
		setDeleteTarget(false);
	}
	const actions = quickActions[order.status] || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 md:space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/order",
						className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Orders"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => generateReceiptPDF({
							...order,
							id: order._id,
							discount: order.discount ?? 0
						}, settings ? {
							name: settings.storeName,
							tagline: "Objects / Chrome / Bone",
							address: "Karachi, Pakistan",
							phone: "+92 21 1123 4567",
							email: settings.storeEmail
						} : void 0),
						className: "btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm w-fit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }), " Download Receipt"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl md:text-2xl font-semibold text-foreground",
							children: order.orderNumber
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[order.status]}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), order.status]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: new Date(order.createdAt).toLocaleDateString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-2 space-y-4 md:space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-4 md:px-5 py-4 border-b border-chrome/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
										children: "Order Items"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden md:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										className: "border-chrome/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
												children: "Product"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
												children: "SKU"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
												children: "Variant"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
												children: "Price"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
												children: "Qty"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
												children: "Subtotal"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: order.items.map((item, i) => {
										const product = productMap.get(item.productId);
										const imgSrc = item.image || product?.imageUrl;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											className: "border-chrome/10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [imgSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: product ? `/products/${product.slug}` : "#",
														className: "shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: imgSrc,
															alt: item.name,
															className: "h-10 w-10 rounded-lg object-cover border border-chrome/20"
														})
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-10 w-10 rounded-lg bg-chrome/10 flex items-center justify-center font-mono text-sm text-chrome-dim shrink-0",
														children: item.name.charAt(0)
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: product ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
														to: `/products/${product.slug}`,
														className: "text-foreground font-medium hover:text-chrome-h transition-colors flex items-center gap-1",
														children: [
															item.name,
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
														]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-foreground font-medium",
														children: item.name
													}) })]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													className: "font-mono text-xs text-muted-foreground",
													children: item.productId.slice(0, 8)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													className: "font-mono text-xs text-muted-foreground",
													children: item.size || item.color ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [item.size, item.color].filter(Boolean).join(" / ") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-chrome-dim/40",
														children: "—"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													className: "text-right text-muted-foreground",
													children: ["PKR ", item.price.toFixed(2)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													className: "text-right text-muted-foreground",
													children: item.quantity
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													className: "text-right text-foreground",
													children: ["PKR ", (item.price * item.quantity).toFixed(2)]
												})
											]
										}, i);
									}) })] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:hidden divide-y divide-chrome/10",
									children: order.items.map((item, i) => {
										const product = productMap.get(item.productId);
										const imgSrc = item.image || product?.imageUrl;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [
													imgSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: product ? `/products/${product.slug}` : "#",
														className: "shrink-0",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: imgSrc,
															alt: item.name,
															className: "h-12 w-12 rounded-lg object-cover border border-chrome/20"
														})
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-12 w-12 rounded-lg bg-chrome/10 flex items-center justify-center font-mono text-sm text-chrome-dim shrink-0",
														children: item.name.charAt(0)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 min-w-0",
														children: [
															product ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
																to: `/products/${product.slug}`,
																className: "text-foreground font-medium text-sm hover:text-chrome-h transition-colors flex items-center gap-1",
																children: [
																	item.name,
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 shrink-0" })
																]
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-foreground font-medium text-sm",
																children: item.name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "font-mono text-[10px] text-chrome-dim",
																children: ["SKU: ", item.productId.slice(0, 8)]
															}),
															(item.size || item.color) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-mono text-[10px] text-chrome-dim mt-0.5",
																children: [item.size, item.color].filter(Boolean).join(" / ")
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-right shrink-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-foreground font-semibold",
															children: ["PKR ", (item.price * item.quantity).toFixed(2)]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-mono text-[10px] text-chrome-dim",
															children: [
																item.quantity,
																" x PKR ",
																item.price.toFixed(2)
															]
														})]
													})
												]
											})
										}, i);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-chrome/10 px-4 md:px-5 py-4 space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Subtotal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-foreground",
												children: ["PKR ", subtotal.toFixed(2)]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Shipping"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-foreground",
												children: ["PKR ", order.shipping.toFixed(2)]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Tax"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-foreground",
												children: ["PKR ", order.tax.toFixed(2)]
											})]
										}),
										order.discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-green-400",
												children: ["Discount ", order.couponCode ? `(${order.couponCode})` : ""]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-green-400",
												children: ["-PKR ", order.discount.toFixed(2)]
											})]
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-base font-semibold pt-1 border-t border-chrome/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: "Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-foreground",
												children: ["PKR ", (subtotal + order.shipping + order.tax - (order.discount || 0)).toFixed(2)]
											})]
										}),
										order.status === "Delivered" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm pt-1 border-t border-chrome/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-green-400 font-semibold",
												children: "Profit"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-green-400 font-semibold",
												children: ["PKR ", profit.toFixed(2)]
											})]
										}) : null
									]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 md:space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground font-medium",
											children: order.customerName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground",
											children: order.customerEmail
										}),
										order.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground",
												children: order.phone
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `tel:${order.phone}`,
												className: "btn-chrome btn-chrome-inner inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), " Call"]
											})]
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-chrome/10 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2",
										children: "Billing Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground text-xs leading-relaxed",
										children: [
											order.billingAddress.street,
											", ",
											order.billingAddress.city,
											",",
											" ",
											order.billingAddress.state,
											" ",
											order.billingAddress.zip,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											order.billingAddress.country
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-chrome/10 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2",
										children: "Shipping Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground text-xs leading-relaxed",
										children: [
											order.shippingAddress.street,
											", ",
											order.shippingAddress.city,
											",",
											" ",
											order.shippingAddress.state,
											" ",
											order.shippingAddress.zip,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											order.shippingAddress.country
										]
									})]
								}),
								order.paymentMethod ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-chrome/10 pt-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
											children: "Payment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground text-sm mt-1",
											children: order.paymentMethod
										}),
										order.screenshot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setLightboxImg(order.screenshot),
											className: "mt-2 w-full group relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: order.screenshot,
												alt: "Payment proof",
												className: "max-h-32 w-full rounded-xl object-contain border border-chrome/20 bg-background transition-opacity group-hover:opacity-80"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "btn-chrome btn-chrome-inner inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-3 w-3" }), " View Full"]
												})
											})]
										})
									]
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
										children: "Status"
									}), showSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-green-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), successMsg]
									})]
								}),
								actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2",
									children: actions.map((action) => {
										const Icon = action.icon;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleQuickAction(action.nextStatus),
											className: `btn-chrome btn-chrome-inner flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${action.color}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
												" ",
												action.label
											]
										}, action.nextStatus);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: status,
									onChange: (e) => setStatus(e.target.value),
									className: "w-full rounded-xl bg-background border border-chrome/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-chrome/40",
									children: [
										"Pending",
										"Processing",
										"Shipped",
										"Delivered",
										"Cancelled"
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleUpdate,
									className: "btn-chrome btn-chrome-inner w-full py-2.5 rounded-xl text-sm font-medium",
									children: "Update Status"
								}),
								order.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-chrome/10 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1",
										children: "Notes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: order.notes
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setDeleteTarget(true),
									className: "btn-chrome btn-chrome-inner w-full py-2.5 rounded-xl text-sm font-medium text-red-400 flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete Order"]
								})
							]
						})]
					})]
				})
			]
		}),
		lightboxImg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8",
			onClick: () => setLightboxImg(null),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setLightboxImg(null),
				className: "absolute top-4 right-4 text-white/80 hover:text-white transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-8 w-8" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: lightboxImg,
				alt: "Payment proof full view",
				className: "max-h-full max-w-full rounded-2xl object-contain",
				onClick: (e) => e.stopPropagation()
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: deleteTarget,
			onClose: () => setDeleteTarget(false),
			onConfirm: handleDelete,
			title: "Delete Order",
			message: `Are you sure you want to delete order ${order.orderNumber}?`,
			confirmLabel: "Delete",
			variant: "danger"
		})
	] });
}
//#endregion
export { OrderDetail as component };
