import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery, r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { B as CreditCard, C as Pencil, P as Globe, _ as Save, c as Trash2, m as Ship, x as Plus, y as Receipt } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-BhQ-pVpk.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BCmSA03j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/setting-CdLE11wB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	{
		id: "general",
		label: "General",
		icon: Globe
	},
	{
		id: "shipping",
		label: "Shipping",
		icon: Ship
	},
	{
		id: "payment",
		label: "Payment",
		icon: CreditCard
	},
	{
		id: "tax",
		label: "Tax",
		icon: Receipt
	}
];
function Toggle({ enabled, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onChange,
		className: `relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-green-500" : "bg-chrome/20"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}` })
	});
}
function Settings() {
	const settingsData = useQuery(api.settings.get);
	const upsertSettings = useMutation(api.settings.upsert);
	const shippingRatesData = useQuery(api.shippingRates.list) ?? [];
	const createShippingRate = useMutation(api.shippingRates.create);
	const updateShippingRate = useMutation(api.shippingRates.update);
	const removeShippingRate = useMutation(api.shippingRates.remove);
	const [activeTab, setActiveTab] = (0, import_react.useState)("general");
	const [storeName, setStoreName] = (0, import_react.useState)("VintageCvunt");
	const [storeEmail, setStoreEmail] = (0, import_react.useState)("hello@vintagecvunt.com");
	const [currency, setCurrency] = (0, import_react.useState)("PKR");
	const [timezone, setTimezone] = (0, import_react.useState)("Asia/Karachi");
	const [taxRate, setTaxRate] = (0, import_react.useState)("0");
	const [taxInclusive, setTaxInclusive] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [shippingForm, setShippingForm] = (0, import_react.useState)({
		name: "",
		description: "",
		price: "",
		estimatedDays: ""
	});
	const [editingShippingId, setEditingShippingId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (settingsData) {
			setStoreName(settingsData.storeName);
			setStoreEmail(settingsData.storeEmail);
			setCurrency(settingsData.currency);
			setTimezone(settingsData.timezone);
			setTaxRate(String(settingsData.defaultTaxRate));
			setTaxInclusive(settingsData.taxInclusive);
		}
	}, [settingsData]);
	const handleSaveGeneral = async () => {
		setSaving(true);
		try {
			await upsertSettings({
				storeName,
				storeEmail,
				currency,
				timezone,
				defaultTaxRate: Number(taxRate) || 0,
				taxInclusive
			});
			setSaved(true);
			setTimeout(() => setSaved(false), 2e3);
		} finally {
			setSaving(false);
		}
	};
	const handleSaveShipping = async () => {
		if (!shippingForm.name || !shippingForm.price) return;
		const price = Number(shippingForm.price);
		if (editingShippingId) await updateShippingRate({
			id: editingShippingId,
			name: shippingForm.name,
			description: shippingForm.description,
			price,
			estimatedDays: shippingForm.estimatedDays,
			isActive: true
		});
		else await createShippingRate({
			name: shippingForm.name,
			description: shippingForm.description,
			price,
			estimatedDays: shippingForm.estimatedDays,
			isActive: true
		});
		setShippingForm({
			name: "",
			description: "",
			price: "",
			estimatedDays: ""
		});
		setEditingShippingId(null);
	};
	const editShipping = (rate) => {
		setEditingShippingId(rate._id);
		setShippingForm({
			name: rate.name,
			description: rate.description,
			price: String(rate.price),
			estimatedDays: rate.estimatedDays
		});
	};
	const handleSaveTax = async () => {
		setSaving(true);
		try {
			await upsertSettings({
				storeName,
				storeEmail,
				currency,
				timezone,
				defaultTaxRate: Number(taxRate) || 0,
				taxInclusive
			});
			setSaved(true);
			setTimeout(() => setSaved(false), 2e3);
		} finally {
			setSaving(false);
		}
	};
	const Icon = tabs.find((t) => t.id === activeTab).icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl md:text-2xl font-display",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
					children: "Manage store configuration"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 rounded-xl bg-graphite border border-chrome/20 p-1 w-fit",
				children: tabs.map((tab) => {
					const TabIcon = tab.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${activeTab === tab.id ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabIcon, { size: 14 }), tab.label]
					}, tab.id);
				})
			}),
			activeTab === "general" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							size: 18,
							className: "text-chrome-dim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em]",
							children: "General Settings"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Store Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: storeName,
									onChange: (e) => setStoreName(e.target.value),
									className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Store Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: storeEmail,
									onChange: (e) => setStoreEmail(e.target.value),
									className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Currency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: currency,
									onChange: (e) => setCurrency(e.target.value),
									className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "PKR",
											children: "PKR (Rs)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "USD",
											children: "USD ($)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "EUR",
											children: "EUR (€)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "GBP",
											children: "GBP (£)"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Timezone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: timezone,
									onChange: (e) => setTimezone(e.target.value),
									className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Asia/Karachi",
											children: "Asia/Karachi (PKT)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Asia/Dubai",
											children: "Asia/Dubai (GST)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "America/New_York",
											children: "America/New_York (EST)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Europe/London",
											children: "Europe/London (GMT)"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveGeneral,
						disabled: saving,
						className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"
						})]
					})
				]
			}),
			activeTab === "shipping" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship, {
								size: 18,
								className: "text-chrome-dim"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em]",
								children: "Shipping Rates"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-4 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: shippingForm.name,
								onChange: (e) => setShippingForm({
									...shippingForm,
									name: e.target.value
								}),
								placeholder: "Name (e.g. Standard)",
								className: "rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: shippingForm.description,
								onChange: (e) => setShippingForm({
									...shippingForm,
									description: e.target.value
								}),
								placeholder: "Description",
								className: "rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: shippingForm.price,
								onChange: (e) => setShippingForm({
									...shippingForm,
									price: e.target.value
								}),
								type: "number",
								step: "0.01",
								placeholder: "Price",
								className: "rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: shippingForm.estimatedDays,
								onChange: (e) => setShippingForm({
									...shippingForm,
									estimatedDays: e.target.value
								}),
								placeholder: "Est. days (e.g. 3-5)",
								className: "rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [editingShippingId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setEditingShippingId(null);
								setShippingForm({
									name: "",
									description: "",
									price: "",
									estimatedDays: ""
								});
							},
							className: "rounded-xl border border-chrome/20 px-4 py-2 font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSaveShipping,
							disabled: !shippingForm.name || !shippingForm.price,
							className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								children: editingShippingId ? "Update" : "Add Rate"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Est. Days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: shippingRatesData.map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-foreground",
								children: rate.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: rate.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-foreground font-mono",
								children: [
									currency,
									" ",
									rate.price.toFixed(2)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: rate.estimatedDays
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => editShipping(rate),
										className: "btn-chrome btn-chrome-inner p-2 rounded-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeShippingRate({ id: rate._id }),
										className: "btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						]
					}, rate._id)) })] })
				]
			}),
			activeTab === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
						size: 18,
						className: "text-chrome-dim"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em]",
						children: "Payment Methods"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [
						{
							name: "Bank Transfer",
							enabled: true,
							desc: "Accepted — upload proof at checkout"
						},
						{
							name: "Credit Card",
							enabled: false,
							desc: "Coming Soon"
						},
						{
							name: "PayPal",
							enabled: false,
							desc: "Coming Soon"
						},
						{
							name: "Cash on Delivery",
							enabled: false,
							desc: "Coming Soon"
						}
					].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center justify-between rounded-xl border ${method.enabled ? "border-green-500/30 bg-green-500/5" : "border-chrome/20 bg-background/50"} px-5 py-4 ${!method.enabled ? "opacity-50" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[12px] text-foreground",
							children: method.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] text-chrome-dim",
							children: method.desc
						})] }), method.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-green-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), "Active"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-chrome/20 bg-chrome/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
							children: "Coming Soon"
						})]
					}, method.name))
				})]
			}),
			activeTab === "tax" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
							size: 18,
							className: "text-chrome-dim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em]",
							children: "Tax Settings"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Default Tax Rate (%)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: taxRate,
								onChange: (e) => setTaxRate(e.target.value),
								step: "0.1",
								className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 flex flex-col justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
								children: "Tax Inclusive Pricing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-xl border border-chrome/20 bg-background px-4 py-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									enabled: taxInclusive,
									onChange: () => setTaxInclusive(!taxInclusive)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: taxInclusive ? "Prices include tax" : "Tax added at checkout"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSaveTax,
						disabled: saving,
						className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"
						})]
					})
				]
			})
		]
	}) });
}
//#endregion
export { Settings as component };
