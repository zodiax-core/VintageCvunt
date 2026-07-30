import { a as useQuery } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-CoPgpr_w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BVJdZnxp.js
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
function About() {
	const milestones = useQuery(api.aboutMilestones.list) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pt-28 pb-14 md:pt-44 md:pb-28 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
						backgroundSize: "88px 88px"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { clipPath: "inset(0 100% 0 0)" },
						animate: { clipPath: "inset(0 0% 0 0)" },
						transition: {
							duration: 1.4,
							ease: EASE
						},
						className: "font-mono text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
						children: "— The House · Chapter I"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1.2,
							ease: EASE
						},
						className: "font-display text-[clamp(2.8rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "About"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "VintageCvunt" })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-6 md:gap-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 md:col-span-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
								children: "§ Manifesto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-4 font-display text-3xl md:text-6xl leading-[0.95]",
								children: ["Cast in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-chrome-h",
									children: "Chrome"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 md:col-span-6 md:col-start-7 space-y-4 md:space-y-6 text-sm md:text-base leading-relaxed text-chrome-dim",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "VintageCvunt is not a brand. It is a house — a place where the gothic meets the metallic, where cathedral shadows fall across chrome surfaces. Every piece is conceived in the Casa d'Argento atelier and finished by hand, a process measured in weeks, not hours." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We work in four materials: silver, leather, chrome, and bone. Each object carries a number and a weight — not merely physical, but the weight of the hands that shaped it, the hours of polish, the silence of the atelier after the last craftsman has left." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Our collection spans sixty-two objects, each one a chapter in a larger story. There will be no seasonal drops, no endless rotations. When a piece is gone, it is gone — cast once, numbered, and released into the world." })
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-chrome py-16 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
							children: "§ Chronology"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 mb-10 md:mb-16 font-display text-4xl md:text-6xl leading-[0.95]",
							children: ["The ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "Path"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-10 md:space-y-20",
							children: milestones.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 40
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: {
									once: true,
									margin: "-80px"
								},
								transition: {
									duration: .8,
									ease: EASE,
									delay: i * .1
								},
								className: "flex items-start gap-4 md:grid md:grid-cols-12 md:gap-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "shrink-0 md:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs tracking-[0.3em] text-chrome",
											children: m.year
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hidden md:flex md:col-span-1 justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-px bg-chrome/30" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 md:col-span-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl md:text-4xl mb-2 md:mb-3",
											children: m.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm md:text-base text-chrome-dim max-w-xl",
											children: m.description
										})]
									})
								]
							}, m._id))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-chrome py-12 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-6 md:gap-16 items-start md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 md:col-span-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
									children: "§ Craft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-4 font-display text-3xl md:text-6xl leading-[0.95]",
									children: ["Hand-", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-chrome-h",
										children: "Finished"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 space-y-4 text-sm text-chrome-dim leading-relaxed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Each object passes through twelve hands before it reaches its final form. Our atelier in Karachi is a place of slow work — of burnishing, stitching, and patient assembly." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We source our leathers from a single tannery in Tuscany that has operated since 1872. Our silver is recycled from vintage ecclesiastical objects. Every chain is assembled link by link." })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-5 md:col-start-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-3xl border border-chrome bg-graphite overflow-hidden",
								style: { boxShadow: "var(--shadow-plate)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[4/5] bg-gradient-to-br from-graphite-2 via-graphite to-background flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center p-8",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-7xl italic text-chrome-h opacity-30",
												children: "✧"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
												children: "Casa d'Argento · Karachi"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-chrome-dim/60",
												children: "Est. MMXXII"
											})
										]
									})
								})
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-chrome py-16 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
							children: "§ Principles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 mb-10 md:mb-16 font-display text-4xl md:text-6xl leading-[0.95]",
							children: ["The ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "Code"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6",
							children: [
								{
									title: "Slowness",
									desc: "No seasonal calendar. Objects are released when they are ready — measured in months, not weeks. Each piece is an event, not an item."
								},
								{
									title: "Materiality",
									desc: "We work only with natural and noble materials: silver, chrome, full-grain leather, bone. No synthetics, no compromises on the handfeel."
								},
								{
									title: "Permanence",
									desc: "Every object is numbered and documented. Once a run is complete, the mould is retired. These are heirloom pieces, designed to outlast their owners."
								}
							].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 30
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									duration: .8,
									ease: EASE,
									delay: i * .1
								},
								className: "rounded-2xl md:rounded-3xl border border-chrome bg-graphite p-6 md:p-8",
								style: { boxShadow: "var(--shadow-plate)" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome",
										children: `0${i + 1}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-2xl md:text-4xl",
										children: v.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-4 md:my-6" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-chrome-dim leading-relaxed",
										children: v.desc
									})
								]
							}, v.title))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { About as component };
