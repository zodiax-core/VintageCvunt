import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { L as CreditCard, M as Globe, b as Plus, g as Save, p as Ship, v as Receipt } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/setting-CWXSi6yq.js
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
var shippingRates = [
	{
		zone: "Domestic",
		method: "Standard",
		rate: "$8.00",
		freeAbove: "$100"
	},
	{
		zone: "Domestic",
		method: "Express",
		rate: "$22.00",
		freeAbove: "$200"
	},
	{
		zone: "International",
		method: "Standard",
		rate: "$25.00",
		freeAbove: "$500"
	},
	{
		zone: "International",
		method: "Express",
		rate: "$55.00",
		freeAbove: "$500"
	}
];
var paymentMethods = [
	{
		name: "Credit Card",
		enabled: true
	},
	{
		name: "PayPal",
		enabled: true
	},
	{
		name: "Bank Transfer",
		enabled: false
	}
];
var taxRules = [{
	country: "United States",
	rate: "8.5%",
	appliesTo: "All products"
}, {
	country: "European Union",
	rate: "20.0%",
	appliesTo: "Digital goods"
}];
function Toggle({ enabled, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: onChange,
		className: `relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-green-500" : "bg-chrome/20"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}` })
	});
}
function Settings() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("general");
	const [storeName, setStoreName] = (0, import_react.useState)("VintageCvunt");
	const [storeEmail, setStoreEmail] = (0, import_react.useState)("hello@vintagecvunt.com");
	const [currency, setCurrency] = (0, import_react.useState)("USD");
	const [language, setLanguage] = (0, import_react.useState)("English");
	const [timezone, setTimezone] = (0, import_react.useState)("America/New_York");
	const [taxRate, setTaxRate] = (0, import_react.useState)("8.5");
	const [taxInclusive, setTaxInclusive] = (0, import_react.useState)(false);
	const [payments, setPayments] = (0, import_react.useState)(paymentMethods);
	function togglePayment(name) {
		setPayments((prev) => prev.map((p) => p.name === name ? {
			...p,
			enabled: !p.enabled
		} : p));
	}
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
									children: "Language"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: language,
									onChange: (e) => setLanguage(e.target.value),
									className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "English",
											children: "English"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Italian",
											children: "Italian"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "French",
											children: "French"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Timezone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: timezone,
									onChange: (e) => setTimezone(e.target.value),
									className: "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "America/New_York",
											children: "America/New_York (EST)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "America/Chicago",
											children: "America/Chicago (CST)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "America/Denver",
											children: "America/Denver (MST)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "America/Los_Angeles",
											children: "America/Los_Angeles (PST)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Europe/London",
											children: "Europe/London (GMT)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Europe/Paris",
											children: "Europe/Paris (CET)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Europe/Rome",
											children: "Europe/Rome (CET)"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: "Save Changes"
						})]
					})
				]
			}),
			activeTab === "shipping" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship, {
							size: 18,
							className: "text-chrome-dim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-mono text-[10px] uppercase tracking-[0.2em]",
							children: "Shipping Rates"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "btn-label",
							children: "Add Rate"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "border-chrome/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Zone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Method"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Rate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Free Above"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: shippingRates.map((rate, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "border-chrome/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-foreground",
							children: rate.zone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: rate.method
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-foreground font-mono",
							children: rate.rate
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "text-muted-foreground",
							children: ["$", rate.freeAbove]
						})
					]
				}, i)) })] })]
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
					children: payments.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl border border-chrome/20 bg-background px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[12px] text-foreground",
							children: method.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] text-chrome-dim",
							children: method.enabled ? "Active" : "Disabled"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							enabled: method.enabled,
							onChange: () => togglePayment(method.name)
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
						className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-3",
						children: "Country-Specific Rules"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Country"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Applies To"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: taxRules.map((rule, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "border-chrome/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-foreground",
								children: rule.country
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-foreground font-mono",
								children: rule.rate
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: rule.appliesTo
							})
						]
					}, i)) })] })] })
				]
			})
		]
	}) });
}
//#endregion
export { Settings as component };
