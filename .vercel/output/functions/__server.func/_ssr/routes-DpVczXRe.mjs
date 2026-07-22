import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as motion, n as useTransform, r as useScroll, t as useSpring } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav, t as OptimizedImage } from "./SiteFooter-NcHbYeEN.mjs";
import { n as butterfly_img_default$1, t as butterfly_img_default } from "./butterfly-img-DGXirbV2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DpVczXRe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var editorial_1_default$1 = "/assets/editorial-1-D3rgpRoR.jpg";
var product_ring_default$1 = "/assets/product-ring-BA7MlDfG.jpg";
var product_jacket_default$1 = "/assets/product-jacket-DPDTWWFf.jpg";
var product_chain_default$1 = "/assets/product-chain-DGOeWrtB.jpg";
var product_boots_default$1 = "/assets/product-boots-DIlAebCu.jpg";
var sculpture_default$1 = "/assets/sculpture-5IDv_oDO.png";
var sculpture_default = "/assets/sculpture-Cu905QCK.webp";
var editorial_1_default = "/assets/editorial-1-BrSs0-Sl.webp";
var product_ring_default = "/assets/product-ring-DR2POQjK.webp";
var product_jacket_default = "/assets/product-jacket-DrU1o3KE.webp";
var product_chain_default = "/assets/product-chain-BfrTm7do.webp";
var product_boots_default = "/assets/product-boots-Tj6A_5Qm.webp";
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
		style: { transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }
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
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeCursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Featured, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SculptureSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BestSellers, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Categories, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Hero() {
	const { scrollYProgress } = useScroll();
	const heroY = useTransform(scrollYProgress, [0, .2], [0, -80]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-screen w-full overflow-hidden pt-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-[0.06]",
				style: {
					backgroundImage: "linear-gradient(to right, oklch(0.9 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0 0 / 0.4) 1px, transparent 1px)",
					backgroundSize: "88px 88px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerOrnament, { className: "absolute top-24 left-6 h-24 w-24 opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerOrnament, { className: "absolute top-24 right-6 h-24 w-24 opacity-40 -scale-x-100" }),
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
					webp: butterfly_img_default,
					fallback: butterfly_img_default$1,
					alt: "",
					width: 1400,
					height: 1050,
					fetchPriority: "high",
					className: "h-[55vh] sm:h-[52vh] md:h-[62vh] w-full object-contain max-w-none select-none",
					style: { filter: "drop-shadow(0 25px 55px oklch(0.7 0.008 240 / 0.25))" },
					draggable: false
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute left-6 top-40 bottom-16 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "[writing-mode:vertical-rl] rotate-180",
						children: "N 24°51′ · E 67°00′"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 w-px bg-brushed opacity-60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "[writing-mode:vertical-rl] rotate-180",
						children: "Est. MMXXVI"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute right-6 top-40 bottom-16 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "[writing-mode:vertical-rl]",
						children: "Chapter One"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 w-px bg-brushed opacity-60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "[writing-mode:vertical-rl]",
						children: "Objects / Chrome / Bone"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col md:flex-row min-h-[76vh] w-full items-end justify-between gap-10 px-8 md:px-16 lg:px-24 pb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl w-full md:w-auto text-center md:text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { clipPath: "inset(0 100% 0 0)" },
						animate: { clipPath: "inset(0 0% 0 0)" },
						transition: {
							duration: 1.4,
							ease: EASE,
							delay: .8
						},
						className: "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-chrome-dim mb-6",
						children: "— VintageCvunt · Autumn / Winter Campaign No. 01"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-[clamp(2rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
							delay: 1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome",
								children: "Vintage"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
							delay: 1.15,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cvunt" })
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 max-w-md md:pb-4 w-full md:w-auto flex flex-col items-center md:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-xs md:text-sm leading-relaxed text-chrome-dim text-center md:text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
								delay: 1.3,
								children: "A gothic house rendered in liquid metal."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
								delay: 1.4,
								children: "Sixty-two pieces cast in silver, leather"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskLine, {
								delay: 1.5,
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "btn-chrome btn-chrome-inner",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								children: "Enter the Collection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M1 7h12M8 2l5 5-5 5",
									stroke: "currentColor",
									strokeWidth: "1.2"
								})
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 border-y border-chrome bg-background/60 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "001 / 062 objects" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Cast in Karachi"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden md:inline",
							children: "Shipping across Pakistan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: ["Scroll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-3 w-px bg-chrome animate-pulse" })]
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: { y: "110%" },
			animate: { y: "0%" },
			transition: {
				duration: 1.1,
				ease: EASE,
				delay
			},
			className: "block",
			children
		})
	});
}
function CornerOrnament({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		className,
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "cornOrn",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "oklch(0.95 0 0)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0.5",
						stopColor: "oklch(0.5 0 0)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "oklch(0.85 0 0)"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2 2 L45 2 M2 2 L2 45 M2 2 C 25 12, 40 25, 50 50",
				stroke: "url(#cornOrn)",
				strokeWidth: "0.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 8 L38 8 M8 8 L8 38",
				stroke: "url(#cornOrn)",
				strokeWidth: "0.4",
				opacity: "0.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2 2 L18 2 L 14 6 L 18 10 L 2 10 Z",
				fill: "url(#cornOrn)",
				opacity: "0.35"
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
		"Karachi · Lahore · Islamabad",
		"Chapter I",
		"Objects of Weight"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden border-b border-chrome bg-graphite py-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex animate-marquee whitespace-nowrap",
			children: [
				...items,
				...items,
				...items,
				...items
			].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mx-10 inline-flex items-center gap-10 font-display text-4xl md:text-6xl italic text-chrome",
				children: [it, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-chrome-dim",
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16 grid grid-cols-12 items-end gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-12 md:col-span-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTag, { children: "§ Featured · Chapter I" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9] tracking-tight",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-chrome-h",
									children: "The First"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Seventeen Objects"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-12 md:col-span-4 md:col-start-9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-chrome-dim",
							children: "A ceremonial capsule. Each piece is numbered, cast in a house atelier, and sealed by hand — a slow inheritance of weight, silver and shadow."
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome mb-16" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-12 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products/$slug",
							params: { slug: "meridian-coat" },
							className: "col-span-12 md:col-span-7 md:row-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCase, {
								span: "",
								src: editorial_1_default$1,
								webp: editorial_1_default,
								number: "No. 001",
								name: "Meridian Coat",
								price: "PKR 1,284,000",
								tall: true,
								priority: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products/$slug",
							params: { slug: "thorn-signet-silver" },
							className: "col-span-12 md:col-span-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCase, {
								span: "",
								src: product_ring_default$1,
								webp: product_ring_default,
								number: "No. 007",
								name: "Thorn Signet, Silver",
								price: "PKR 267,000"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products/$slug",
							params: { slug: "papillon-chain" },
							className: "col-span-12 md:col-span-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCase, {
								span: "",
								src: product_chain_default$1,
								webp: product_chain_default,
								number: "No. 012",
								name: "Papillon Chain",
								price: "PKR 402,000"
							})
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative overflow-hidden ${tall ? "aspect-[3/4] md:aspect-auto md:h-[820px]" : "aspect-[3/4] md:aspect-[4/5]"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
					webp,
					fallback: src,
					alt: name,
					className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:rotate-[1deg]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome",
					children: number
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-5 top-5 h-6 w-6 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-[10px]",
					children: "✦"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 py-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm tracking-[0.14em] text-chrome",
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			style: { x: wordX },
			className: "pointer-events-none absolute inset-x-0 top-[55%] md:top-1/2 -translate-y-1/2 whitespace-nowrap text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display italic text-[22vw] leading-none text-chrome-h opacity-[0.14]",
				children: "Ars · Chroma · Corpus"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 font-mono text-[2.4vw] uppercase tracking-[0.4em] text-chrome-dim opacity-40",
				children: "Art · Color · Body — Cast in Silver"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 md:mb-16 flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTag, { children: "§ Editorial · The Silver Body" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl sm:text-5xl md:text-7xl italic tracking-tight",
						children: "A Body Cast in Chrome"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-xs sm:text-sm text-chrome-dim",
						children: "Filmed inside the Palazzo Argento — a study in flesh, drape and mirror. Scroll to move through the sculpture."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome mb-10 md:mb-16" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[60vh] md:h-[85vh] w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							style: {
								x,
								scale,
								rotate: rot
							},
							className: "pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-full md:h-[140%] md:w-auto -translate-x-1/2 -translate-y-1/2 select-none will-change-transform",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
								className: "flex h-full w-full items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									srcSet: sculpture_default,
									type: "image/webp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: sculpture_default$1,
									alt: "Chrome sculpture",
									fetchPriority: "high",
									className: "h-full w-full object-cover md:object-contain",
									draggable: false
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-6 left-0 max-w-xs font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Fig. 04 — Argenta",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"sculpture in motion"
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-6 right-0 max-w-xs text-right font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"MMXXVI · Karachi",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"24° / 120mm / Kodak Vision"
							] })
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-14 flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl sm:text-5xl md:text-7xl leading-none",
						children: "Most Coveted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "font-mono text-[11px] uppercase tracking-[0.28em] text-chrome-dim hover:text-foreground transition",
						children: "View all 62 objects ↗"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome mb-14" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
					children: [
						{
							src: product_jacket_default$1,
							webp: product_jacket_default,
							name: "Reliquary Rider",
							num: "No. 021",
							price: "PKR 1,107,000",
							slug: "reliquary-rider"
						},
						{
							src: product_boots_default$1,
							webp: product_boots_default,
							name: "Ossuary Boot",
							num: "No. 034",
							price: "PKR 462,000",
							slug: "ossuary-boot"
						},
						{
							src: product_ring_default$1,
							webp: product_ring_default,
							name: "Thorn Signet",
							num: "No. 007",
							price: "PKR 267,000",
							slug: "thorn-signet-silver"
						},
						{
							src: product_chain_default$1,
							webp: product_chain_default,
							name: "Papillon Chain",
							num: "No. 012",
							price: "PKR 402,000",
							slug: "papillon-chain"
						}
					].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/products/$slug",
						params: { slug: it.slug },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmallCase, { ...it })
					}, i))
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-2xl border border-chrome bg-graphite",
			style: { boxShadow: "var(--shadow-plate)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-[4/5] overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
					webp,
					fallback: src,
					alt: name,
					className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:rotate-[1deg]"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full border border-chrome bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]",
				children: num
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-[0.14em] text-chrome",
				children: price
			})
		})]
	});
}
function Categories() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "archive",
		className: "relative border-b border-chrome py-28 md:py-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-14 flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTag, { children: "§ Cabinets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 font-display text-3xl sm:text-5xl md:text-7xl leading-tight",
						children: ["Four Cabinets, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-chrome-h",
							children: "One House"
						})]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-sm text-chrome-dim",
						children: "Enter each atelier — outerwear, silverwork, footwear and adornment — assembled by dedicated master craftsmen."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome mb-14" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-4",
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
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[3/4] overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
									webp: c.webp,
									fallback: c.img,
									alt: c.name,
									className: "h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 bottom-0 p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim",
										children: c.count
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-display text-3xl",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-px w-0 bg-chrome transition-all duration-700 group-hover:w-full" })
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6 py-32 md:py-48",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
				webp: butterfly_img_default,
				fallback: butterfly_img_default$1,
				alt: "",
				"aria-hidden": true,
				className: "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-auto opacity-20"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid grid-cols-12 gap-6 items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 md:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTag, { children: "§ Correspondence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 font-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]",
							children: ["Receive ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "the Ledger."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-sm text-chrome-dim",
							children: "A hand-set letter, dispatched twice a year. Object releases, private previews, and the occasional dispatch from the atelier floor."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "col-span-12 md:col-span-5",
					onSubmit: (e) => e.preventDefault(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-full border border-chrome bg-graphite p-2",
						style: { boxShadow: "var(--shadow-plate)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							placeholder: "your address",
							className: "flex-1 bg-transparent px-5 py-3 font-mono text-sm placeholder:text-chrome-dim outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-chrome btn-chrome-inner !py-3 !px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "btn-label",
								children: "Enroll"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim",
						children: "Two dispatches per year. Never sold."
					})]
				})]
			})]
		})
	});
}
//#endregion
export { Home as component };
