import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as product_chain_default, d as product_jacket_default$1, f as product_ring_default, l as product_chain_default$1, n as editorial_1_default, o as product_boots_default, p as product_ring_default$1, r as editorial_1_default$1, s as product_boots_default$1, u as product_jacket_default } from "./product-boots-yUznlmdZ.mjs";
import { i as motion, n as useTransform, r as useScroll, t as useSpring } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav, t as OptimizedImage } from "./SiteFooter-WijJY6Fs.mjs";
import { n as butterfly_img_default$1, t as butterfly_img_default } from "./butterfly-img-DGXirbV2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DVwnOoaS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sculpture_default$1 = "/assets/sculpture-5IDv_oDO.png";
var sculpture_default = "/assets/sculpture-Cu905QCK.webp";
function ChromeCursor() {
	const [pos, setPos] = (0, import_react.useState)({
		x: -100,
		y: -100
	});
	const [hover, setHover] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const move = (e) => setPos({
			x: e.clientX,
			y: e.clientY
		});
		const over = (e) => {
			const t = e.target;
			setHover(!!t.closest("a,button,[data-cursor='hover']"));
		};
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseover", over);
		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseover", over);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `chrome-cursor${hover ? " hovering" : ""}`,
		style: { transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` },
		"data-tsd-source": "/src/components/ChromeCursor.tsx:19:10"
	});
}
var EASE = [
	.16,
	1,
	.3,
	1
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		"data-tsd-source": "/src/routes/index.tsx:43:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeCursor, { "data-tsd-source": "/src/routes/index.tsx:44:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { "data-tsd-source": "/src/routes/index.tsx:45:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { "data-tsd-source": "/src/routes/index.tsx:46:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, { "data-tsd-source": "/src/routes/index.tsx:47:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Featured, { "data-tsd-source": "/src/routes/index.tsx:48:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SculptureSection, { "data-tsd-source": "/src/routes/index.tsx:49:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BestSellers, { "data-tsd-source": "/src/routes/index.tsx:50:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Categories, { "data-tsd-source": "/src/routes/index.tsx:51:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, { "data-tsd-source": "/src/routes/index.tsx:52:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { "data-tsd-source": "/src/routes/index.tsx:53:7" })
		]
	});
}
function Hero() {
	const { scrollYProgress } = useScroll();
	const heroY = useTransform(scrollYProgress, [0, .2], [0, -80]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-screen w-full overflow-hidden pt-32",
		"data-tsd-source": "/src/routes/index.tsx:63:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-[0.06]",
				style: {
					backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
					backgroundSize: "88px 88px"
				},
				"data-tsd-source": "/src/routes/index.tsx:65:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerOrnament, {
				className: "absolute top-24 left-6 h-24 w-24 opacity-40",
				"data-tsd-source": "/src/routes/index.tsx:70:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerOrnament, {
				className: "absolute top-24 right-6 h-24 w-24 opacity-40 -scale-x-100",
				"data-tsd-source": "/src/routes/index.tsx:71:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: { y: heroY },
				initial: {
					scale: .6,
					clipPath: "inset(50% 0 50% 0)"
				},
				animate: {
					scale: 1,
					clipPath: "inset(0% 0 0% 0)"
				},
				transition: {
					duration: 1.8,
					ease: EASE,
					delay: .2
				},
				className: "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0",
				"data-tsd-source": "/src/routes/index.tsx:74:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
					webp: butterfly_img_default,
					fallback: butterfly_img_default$1,
					alt: "",
					width: 1400,
					height: 1050,
					fetchPriority: "high",
					className: "h-[55vh] sm:h-[52vh] md:h-[62vh] w-full object-contain max-w-none select-none",
					style: { filter: "drop-shadow(0 25px 55px oklch(0.7 0.008 240 / 0.25))" },
					draggable: false,
					"data-tsd-source": "/src/routes/index.tsx:81:9"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute left-6 top-40 bottom-16 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
				"data-tsd-source": "/src/routes/index.tsx:96:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "[writing-mode:vertical-rl] rotate-180",
						"data-tsd-source": "/src/routes/index.tsx:97:9",
						children: "N 41°24′ · E 2°10′"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-40 w-px bg-brushed opacity-60",
						"data-tsd-source": "/src/routes/index.tsx:98:9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "[writing-mode:vertical-rl] rotate-180",
						"data-tsd-source": "/src/routes/index.tsx:99:9",
						children: "Est. MMXXVI"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute right-6 top-40 bottom-16 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
				"data-tsd-source": "/src/routes/index.tsx:101:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "[writing-mode:vertical-rl]",
						"data-tsd-source": "/src/routes/index.tsx:102:9",
						children: "Chapter One"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-40 w-px bg-brushed opacity-60",
						"data-tsd-source": "/src/routes/index.tsx:103:9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "[writing-mode:vertical-rl]",
						"data-tsd-source": "/src/routes/index.tsx:104:9",
						children: "Objects / Chrome / Bone"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col md:flex-row min-h-[76vh] w-full items-end justify-between gap-10 px-8 md:px-16 lg:px-24 pb-16",
				"data-tsd-source": "/src/routes/index.tsx:108:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl w-full md:w-auto text-center md:text-left",
					"data-tsd-source": "/src/routes/index.tsx:109:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { clipPath: "inset(0 100% 0 0)" },
						animate: { clipPath: "inset(0 0% 0 0)" },
						transition: {
							duration: 1.4,
							ease: EASE,
							delay: .8
						},
						className: "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
						"data-tsd-source": "/src/routes/index.tsx:110:11",
						children: "— VintageCvunt · Autumn / Winter Campaign No. 01"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-[clamp(2rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em]",
						"data-tsd-source": "/src/routes/index.tsx:118:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
							delay: 1,
							"data-tsd-source": "/src/routes/index.tsx:119:13",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome",
								"data-tsd-source": "/src/routes/index.tsx:119:35",
								children: "Vintage"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
							delay: 1.15,
							"data-tsd-source": "/src/routes/index.tsx:120:13",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-tsd-source": "/src/routes/index.tsx:120:36",
								children: "Cvunt"
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 max-w-md md:pb-4 w-full md:w-auto flex flex-col items-center md:items-start",
					"data-tsd-source": "/src/routes/index.tsx:123:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-xs md:text-sm leading-relaxed text-chrome-dim text-center md:text-left",
						"data-tsd-source": "/src/routes/index.tsx:124:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
								delay: 1.3,
								"data-tsd-source": "/src/routes/index.tsx:125:13",
								children: "A gothic house rendered in liquid metal."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
								delay: 1.4,
								"data-tsd-source": "/src/routes/index.tsx:126:13",
								children: "Sixty-two pieces cast in silver, leather"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
								delay: 1.5,
								"data-tsd-source": "/src/routes/index.tsx:127:13",
								children: "and the cold breath of cathedral air."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1,
							ease: EASE,
							delay: 1.7
						},
						"data-tsd-source": "/src/routes/index.tsx:129:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-chrome btn-chrome-inner",
							"data-tsd-source": "/src/routes/index.tsx:130:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								"data-tsd-source": "/src/routes/index.tsx:131:15",
								children: "Enter the Collection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "none",
								"data-tsd-source": "/src/routes/index.tsx:132:15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M1 7h12M8 2l5 5-5 5",
									stroke: "currentColor",
									strokeWidth: "1.2",
									"data-tsd-source": "/src/routes/index.tsx:132:75"
								})
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 border-y border-chrome bg-background/60 backdrop-blur",
				"data-tsd-source": "/src/routes/index.tsx:139:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
					"data-tsd-source": "/src/routes/index.tsx:140:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-tsd-source": "/src/routes/index.tsx:141:11",
							children: "001 / 062 objects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							"data-tsd-source": "/src/routes/index.tsx:142:11",
							children: "Cast in Milano"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden md:inline",
							"data-tsd-source": "/src/routes/index.tsx:143:11",
							children: "Shipping worldwide"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							"data-tsd-source": "/src/routes/index.tsx:144:11",
							children: ["Scroll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block h-3 w-px bg-chrome animate-pulse",
								"data-tsd-source": "/src/routes/index.tsx:146:13"
							})]
						})
					]
				})
			})
		]
	});
}
function MaskLine({ children, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block overflow-hidden",
		"data-tsd-source": "/src/routes/index.tsx:156:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: { y: "110%" },
			animate: { y: "0%" },
			transition: {
				duration: 1.1,
				ease: EASE,
				delay
			},
			className: "block",
			"data-tsd-source": "/src/routes/index.tsx:157:7",
			children
		})
	});
}
function CornerOrnament({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		className,
		fill: "none",
		"data-tsd-source": "/src/routes/index.tsx:171:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", {
				"data-tsd-source": "/src/routes/index.tsx:172:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "cornOrn",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					"data-tsd-source": "/src/routes/index.tsx:173:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "oklch(0.95 0 0)",
							"data-tsd-source": "/src/routes/index.tsx:174:11"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0.5",
							stopColor: "oklch(0.5 0 0)",
							"data-tsd-source": "/src/routes/index.tsx:175:11"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "oklch(0.85 0 0)",
							"data-tsd-source": "/src/routes/index.tsx:176:11"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2 2 L45 2 M2 2 L2 45 M2 2 C 25 12, 40 25, 50 50",
				stroke: "url(#cornOrn)",
				strokeWidth: "0.6",
				"data-tsd-source": "/src/routes/index.tsx:179:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 8 L38 8 M8 8 L8 38",
				stroke: "url(#cornOrn)",
				strokeWidth: "0.4",
				opacity: "0.6",
				"data-tsd-source": "/src/routes/index.tsx:180:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2 2 L18 2 L 14 6 L 18 10 L 2 10 Z",
				fill: "url(#cornOrn)",
				opacity: "0.35",
				"data-tsd-source": "/src/routes/index.tsx:181:7"
			})
		]
	});
}
function Marquee() {
	const items = [
		"Modern Gothic",
		"Cast in Chrome",
		"Cathedral Tailoring",
		"Hand-Finished",
		"Milano · Paris · Tokyo",
		"Chapter I",
		"Objects of Weight"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden border-b border-chrome bg-graphite py-6",
		"data-tsd-source": "/src/routes/index.tsx:190:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex animate-marquee whitespace-nowrap",
			"data-tsd-source": "/src/routes/index.tsx:191:7",
			children: [
				...items,
				...items,
				...items,
				...items
			].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mx-10 inline-flex items-center gap-10 font-display text-4xl md:text-6xl italic text-chrome",
				"data-tsd-source": "/src/routes/index.tsx:193:11",
				children: [it, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-chrome-dim",
					"data-tsd-source": "/src/routes/index.tsx:195:13",
					children: "✦"
				})]
			}, i))
		})
	});
}
function Featured() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "collection",
		className: "relative border-b border-chrome py-28 md:py-40",
		"data-tsd-source": "/src/routes/index.tsx:206:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:207:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16 grid grid-cols-12 items-end gap-6",
					"data-tsd-source": "/src/routes/index.tsx:208:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-12 md:col-span-6",
						"data-tsd-source": "/src/routes/index.tsx:209:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTag, {
							"data-tsd-source": "/src/routes/index.tsx:210:13",
							children: "§ Featured · Chapter I"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9] tracking-tight",
							"data-tsd-source": "/src/routes/index.tsx:211:13",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-chrome-h",
									"data-tsd-source": "/src/routes/index.tsx:212:15",
									children: "The First"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { "data-tsd-source": "/src/routes/index.tsx:212:70" }),
								"Seventeen Objects"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-12 md:col-span-4 md:col-start-9",
						"data-tsd-source": "/src/routes/index.tsx:216:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-chrome-dim",
							"data-tsd-source": "/src/routes/index.tsx:217:13",
							children: "A ceremonial capsule. Each piece is numbered, cast in a house atelier, and sealed by hand — a slow inheritance of weight, silver and shadow."
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divider-chrome mb-16",
					"data-tsd-source": "/src/routes/index.tsx:222:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-12 gap-6",
					"data-tsd-source": "/src/routes/index.tsx:223:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCase, {
							span: "col-span-12 md:col-span-7 md:row-span-2",
							src: editorial_1_default$1,
							webp: editorial_1_default,
							number: "No. 001",
							name: "Meridian Coat",
							price: "PKR 1,284,000",
							tall: true,
							priority: true,
							"data-tsd-source": "/src/routes/index.tsx:224:11"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCase, {
							span: "col-span-12 md:col-span-5",
							src: product_ring_default$1,
							webp: product_ring_default,
							number: "No. 007",
							name: "Thorn Signet, Silver",
							price: "PKR 267,000",
							"data-tsd-source": "/src/routes/index.tsx:225:11"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCase, {
							span: "col-span-12 md:col-span-5",
							src: product_chain_default$1,
							webp: product_chain_default,
							number: "No. 012",
							name: "Papillon Chain",
							price: "PKR 402,000",
							"data-tsd-source": "/src/routes/index.tsx:226:11"
						})
					]
				})
			]
		})
	});
}
function SectionTag({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
		"data-tsd-source": "/src/routes/index.tsx:234:10",
		children
	});
}
function ProductCase({ span, src, webp, number, name, price, tall, priority }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		"data-cursor": "hover",
		initial: { clipPath: "inset(100% 0 0 0)" },
		whileInView: { clipPath: "inset(0% 0 0 0)" },
		viewport: {
			once: true,
			margin: "0px"
		},
		transition: {
			duration: 1.3,
			ease: EASE
		},
		className: `${span} group relative overflow-hidden rounded-3xl border border-chrome bg-graphite`,
		style: { boxShadow: "var(--shadow-plate)" },
		"data-tsd-source": "/src/routes/index.tsx:239:5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative overflow-hidden ${tall ? "aspect-[3/4] md:aspect-auto md:h-[820px]" : "aspect-[3/4] md:aspect-[4/5]"}`,
			"data-tsd-source": "/src/routes/index.tsx:248:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
					webp,
					fallback: src,
					alt: name,
					className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:rotate-[1deg]",
					"data-tsd-source": "/src/routes/index.tsx:249:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30",
					"data-tsd-source": "/src/routes/index.tsx:250:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome",
					"data-tsd-source": "/src/routes/index.tsx:251:9",
					children: number
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-5 top-5 h-6 w-6 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-[10px]",
					"data-tsd-source": "/src/routes/index.tsx:252:9",
					children: "✦"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 py-5",
			"data-tsd-source": "/src/routes/index.tsx:254:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm tracking-[0.14em] text-chrome",
				"data-tsd-source": "/src/routes/index.tsx:255:9",
				children: price
			})
		})]
	});
}
function SculptureSection() {
	const ref = (0, import_react.useRef)(null);
	const [isDesktop, setIsDesktop] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsDesktop(window.innerWidth >= 768);
	}, []);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const x = useSpring(useTransform(scrollYProgress, [0, 1], ["-30%", "40%"]), {
		stiffness: 60,
		damping: 20
	});
	const scale = useSpring(useTransform(scrollYProgress, [
		0,
		.5,
		1
	], isDesktop ? [
		1.4,
		2.4,
		3.2
	] : [
		1.1,
		1.55,
		1.9
	]), {
		stiffness: 60,
		damping: 22
	});
	const rot = useTransform(scrollYProgress, [0, 1], [-6, 4]);
	const wordX = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative overflow-hidden border-b border-chrome bg-background py-20 md:py-56 mt-20 md:mt-0",
		"data-tsd-source": "/src/routes/index.tsx:277:5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			style: { x: wordX },
			className: "pointer-events-none absolute inset-x-0 top-[55%] md:top-1/2 -translate-y-1/2 whitespace-nowrap text-center",
			"data-tsd-source": "/src/routes/index.tsx:279:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display italic text-[22vw] leading-none text-chrome-h opacity-[0.14]",
				"data-tsd-source": "/src/routes/index.tsx:280:9",
				children: "Ars · Chroma · Corpus"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 font-mono text-[2.4vw] uppercase tracking-[0.4em] text-chrome-dim opacity-40",
				"data-tsd-source": "/src/routes/index.tsx:283:9",
				children: "Art · Color · Body — Cast in Silver"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:288:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 md:mb-16 flex flex-wrap items-end justify-between gap-6",
					"data-tsd-source": "/src/routes/index.tsx:289:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-tsd-source": "/src/routes/index.tsx:290:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTag, {
							"data-tsd-source": "/src/routes/index.tsx:291:13",
							children: "§ Editorial · The Silver Body"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-4xl sm:text-5xl md:text-7xl italic tracking-tight",
							"data-tsd-source": "/src/routes/index.tsx:292:13",
							children: "A Body Cast in Chrome"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-xs sm:text-sm text-chrome-dim",
						"data-tsd-source": "/src/routes/index.tsx:294:11",
						children: "Filmed inside the Palazzo Argento — a study in flesh, drape and mirror. Scroll to move through the sculpture."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divider-chrome mb-10 md:mb-16",
					"data-tsd-source": "/src/routes/index.tsx:298:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[60vh] md:h-[85vh] w-full",
					"data-tsd-source": "/src/routes/index.tsx:300:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							style: {
								x,
								scale,
								rotate: rot
							},
							className: "pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-full md:h-[140%] md:w-auto -translate-x-1/2 -translate-y-1/2 select-none will-change-transform",
							"data-tsd-source": "/src/routes/index.tsx:301:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
								className: "flex h-full w-full items-center justify-center",
								"data-tsd-source": "/src/routes/index.tsx:302:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									srcSet: sculpture_default,
									type: "image/webp",
									"data-tsd-source": "/src/routes/index.tsx:303:15"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: sculpture_default$1,
									alt: "Chrome sculpture",
									fetchPriority: "high",
									className: "h-full w-full object-cover md:object-contain",
									draggable: false,
									"data-tsd-source": "/src/routes/index.tsx:304:15"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-6 left-0 max-w-xs font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
							"data-tsd-source": "/src/routes/index.tsx:308:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-tsd-source": "/src/routes/index.tsx:309:13",
								children: [
									"Fig. 04 — Argenta",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { "data-tsd-source": "/src/routes/index.tsx:309:33" }),
									"sculpture in motion"
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-6 right-0 max-w-xs text-right font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
							"data-tsd-source": "/src/routes/index.tsx:311:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-tsd-source": "/src/routes/index.tsx:312:13",
								children: [
									"MMXXVI · Milano",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { "data-tsd-source": "/src/routes/index.tsx:312:31" }),
									"24° / 120mm / Kodak Vision"
								]
							})
						})
					]
				})
			]
		})]
	});
}
function BestSellers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative border-b border-chrome py-28 md:py-40",
		"data-tsd-source": "/src/routes/index.tsx:329:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:330:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-14 flex flex-wrap items-end justify-between gap-6",
					"data-tsd-source": "/src/routes/index.tsx:331:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl sm:text-5xl md:text-7xl leading-none",
						"data-tsd-source": "/src/routes/index.tsx:332:11",
						children: "Most Coveted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "font-mono text-[11px] uppercase tracking-[0.28em] text-chrome-dim hover:text-foreground transition",
						"data-tsd-source": "/src/routes/index.tsx:333:11",
						children: "View all 62 objects ↗"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divider-chrome mb-14",
					"data-tsd-source": "/src/routes/index.tsx:335:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
					"data-tsd-source": "/src/routes/index.tsx:336:9",
					children: [
						{
							src: product_jacket_default$1,
							webp: product_jacket_default,
							name: "Reliquary Rider",
							num: "No. 021",
							price: "PKR 1,107,000"
						},
						{
							src: product_boots_default$1,
							webp: product_boots_default,
							name: "Ossuary Boot",
							num: "No. 034",
							price: "PKR 462,000"
						},
						{
							src: product_ring_default$1,
							webp: product_ring_default,
							name: "Thorn Signet",
							num: "No. 007",
							price: "PKR 267,000"
						},
						{
							src: product_chain_default$1,
							webp: product_chain_default,
							name: "Papillon Chain",
							num: "No. 012",
							price: "PKR 402,000"
						}
					].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmallCase, { ...it }, i))
				})
			]
		})
	});
}
function SmallCase({ src, webp, name, num, price }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		"data-cursor": "hover",
		initial: { clipPath: "inset(100% 0 0 0)" },
		whileInView: { clipPath: "inset(0 0 0 0)" },
		viewport: {
			once: true,
			margin: "0px"
		},
		transition: {
			duration: 1.1,
			ease: EASE
		},
		className: "group cursor-pointer",
		"data-tsd-source": "/src/routes/index.tsx:348:5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-2xl border border-chrome bg-graphite",
			style: { boxShadow: "var(--shadow-plate)" },
			"data-tsd-source": "/src/routes/index.tsx:356:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-[4/5] overflow-hidden",
				"data-tsd-source": "/src/routes/index.tsx:357:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
					webp,
					fallback: src,
					alt: name,
					className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:rotate-[1deg]",
					"data-tsd-source": "/src/routes/index.tsx:358:11"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full border border-chrome bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]",
				"data-tsd-source": "/src/routes/index.tsx:360:9",
				children: num
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			"data-tsd-source": "/src/routes/index.tsx:362:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-[0.14em] text-chrome",
				"data-tsd-source": "/src/routes/index.tsx:363:9",
				children: price
			})
		})]
	});
}
function Categories() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "archive",
		className: "relative border-b border-chrome py-28 md:py-40",
		"data-tsd-source": "/src/routes/index.tsx:378:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:379:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-14 flex flex-wrap items-end justify-between gap-6",
					"data-tsd-source": "/src/routes/index.tsx:380:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-tsd-source": "/src/routes/index.tsx:381:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTag, {
							"data-tsd-source": "/src/routes/index.tsx:382:13",
							children: "§ Cabinets"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 font-display text-3xl sm:text-5xl md:text-7xl leading-tight",
							"data-tsd-source": "/src/routes/index.tsx:383:13",
							children: ["Four Cabinets, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								"data-tsd-source": "/src/routes/index.tsx:383:109",
								children: "One House"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-sm text-chrome-dim",
						"data-tsd-source": "/src/routes/index.tsx:385:11",
						children: "Enter each atelier — outerwear, silverwork, footwear and adornment — assembled by dedicated master craftsmen."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divider-chrome mb-14",
					"data-tsd-source": "/src/routes/index.tsx:387:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-4",
					"data-tsd-source": "/src/routes/index.tsx:388:9",
					children: [
						{
							name: "Outerwear",
							count: "18 pieces",
							img: editorial_1_default$1,
							webp: editorial_1_default
						},
						{
							name: "Silverwork",
							count: "22 pieces",
							img: product_ring_default$1,
							webp: product_ring_default
						},
						{
							name: "Footwear",
							count: "9 pieces",
							img: product_boots_default$1,
							webp: product_boots_default
						},
						{
							name: "Adornment",
							count: "13 pieces",
							img: product_chain_default$1,
							webp: product_chain_default
						}
					].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#",
						"data-cursor": "hover",
						className: "group relative block overflow-hidden rounded-3xl border border-chrome",
						"data-tsd-source": "/src/routes/index.tsx:390:13",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[3/4] overflow-hidden",
								"data-tsd-source": "/src/routes/index.tsx:391:15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
									webp: c.webp,
									fallback: c.img,
									alt: c.name,
									className: "h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110",
									"data-tsd-source": "/src/routes/index.tsx:392:17"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent",
								"data-tsd-source": "/src/routes/index.tsx:394:15"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 bottom-0 p-6",
								"data-tsd-source": "/src/routes/index.tsx:395:15",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
										"data-tsd-source": "/src/routes/index.tsx:396:17",
										children: c.count
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-display text-3xl",
										"data-tsd-source": "/src/routes/index.tsx:397:17",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 h-px w-0 bg-chrome transition-all duration-700 group-hover:w-full",
										"data-tsd-source": "/src/routes/index.tsx:398:17"
									})
								]
							})
						]
					}, i))
				})
			]
		})
	});
}
function Newsletter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative border-b border-chrome overflow-hidden",
		"data-tsd-source": "/src/routes/index.tsx:473:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6 py-32 md:py-48",
			"data-tsd-source": "/src/routes/index.tsx:474:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
				webp: butterfly_img_default,
				fallback: butterfly_img_default$1,
				alt: "",
				"aria-hidden": true,
				className: "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-auto opacity-20",
				"data-tsd-source": "/src/routes/index.tsx:475:9"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid grid-cols-12 gap-6 items-end",
				"data-tsd-source": "/src/routes/index.tsx:476:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 md:col-span-7",
					"data-tsd-source": "/src/routes/index.tsx:477:11",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTag, {
							"data-tsd-source": "/src/routes/index.tsx:478:13",
							children: "§ Correspondence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]",
							"data-tsd-source": "/src/routes/index.tsx:479:13",
							children: ["Receive ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								"data-tsd-source": "/src/routes/index.tsx:480:23",
								children: "the Ledger."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-sm text-chrome-dim",
							"data-tsd-source": "/src/routes/index.tsx:482:13",
							children: "A hand-set letter, dispatched twice a year. Object releases, private previews, and the occasional dispatch from the atelier floor."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "col-span-12 md:col-span-5",
					onSubmit: (e) => e.preventDefault(),
					"data-tsd-source": "/src/routes/index.tsx:486:11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-full border border-chrome bg-graphite p-2",
						style: { boxShadow: "var(--shadow-plate)" },
						"data-tsd-source": "/src/routes/index.tsx:487:13",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							placeholder: "your address",
							className: "flex-1 bg-transparent px-5 py-3 font-mono text-sm placeholder:text-chrome-dim outline-none",
							"data-tsd-source": "/src/routes/index.tsx:488:15"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-chrome btn-chrome-inner !py-3 !px-6",
							"data-tsd-source": "/src/routes/index.tsx:489:15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								"data-tsd-source": "/src/routes/index.tsx:489:75",
								children: "Enroll"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim",
						"data-tsd-source": "/src/routes/index.tsx:491:13",
						children: "Two dispatches per year. Never sold."
					})]
				})]
			})]
		})
	});
}
//#endregion
export { Home as component };
