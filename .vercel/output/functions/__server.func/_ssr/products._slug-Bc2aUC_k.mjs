import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { m as useCartContext } from "./product-boots-yUznlmdZ.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav, t as OptimizedImage } from "./SiteFooter-WijJY6Fs.mjs";
import { n as allProducts, r as priceLabel, t as Route } from "./products._slug-D18qThuT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-Bc2aUC_k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EASE = [
	.16,
	1,
	.3,
	1
];
var faqs = [
	{
		q: "How is this object numbered?",
		a: "Every VintageCvunt object carries a unique number corresponding to its place in the collection sequence. This number is engraved or stamped directly onto the piece and recorded in our ledger."
	},
	{
		q: "Can I return or exchange?",
		a: "Returns are accepted within 14 days of receipt. The object must be returned in its original packaging with all documentation. Bespoke and commissioned pieces are final sale."
	},
	{
		q: "How long does shipping take?",
		a: "Domestic orders (Italy) arrive within 2–3 business days. International shipping takes 5–10 business days. All shipments are insured and require a signature."
	},
	{
		q: "How should I care for this piece?",
		a: "Each material requires specific care. A care card is included with every object. For silver, we recommend a dry cloth and storage in the provided pouch. Chrome can be wiped with a damp, lint-free cloth."
	},
	{
		q: "Is this piece available for bespoke modification?",
		a: "Select objects can be customized — contact the atelier via our contact page for enquiries about sizing, material variations, or commissioned pieces."
	}
];
var reviews = [
	{
		name: "C. Argento",
		rating: 5,
		text: "Exceptional quality. The weight of the piece in the hand tells you everything — this is not mass-produced. The finish is flawless.",
		date: "MMXXVI · Mar"
	},
	{
		name: "L. Mori",
		rating: 5,
		text: "I own three pieces from Chapter I. The consistency of the craftsmanship across different object types is remarkable. A house to watch.",
		date: "MMXXVI · Feb"
	},
	{
		name: "V. Kurov",
		rating: 4,
		text: "Beautiful object, true to the campaign imagery. The packaging alone is a work of art. My only note is the sizing runs slightly large.",
		date: "MMXXVI · Jan"
	},
	{
		name: "E. Thornton",
		rating: 5,
		text: "The leather has developed a beautiful patina over three months of wear. It feels like an inheritance, not a purchase.",
		date: "MMXXV · Dec"
	}
];
var relatedProducts = allProducts.slice(0, 4);
function ProductPage() {
	const { slug } = Route.useParams();
	const product = allProducts.find((p) => p.slug === slug);
	const [selectedImage, setSelectedImage] = (0, import_react.useState)(0);
	const [activeFaq, setActiveFaq] = (0, import_react.useState)(null);
	const [reviewForm, setReviewForm] = (0, import_react.useState)({
		name: "",
		email: "",
		rating: 5,
		text: ""
	});
	const [reviewErrors, setReviewErrors] = (0, import_react.useState)({});
	const [reviewSubmitted, setReviewSubmitted] = (0, import_react.useState)(false);
	const [addedToCart, setAddedToCart] = (0, import_react.useState)(false);
	const { addToCart } = useCartContext();
	if (!product) return null;
	const handleReviewSubmit = (e) => {
		e.preventDefault();
		const errs = {};
		if (!reviewForm.name.trim()) errs.name = "Name is required";
		if (!reviewForm.email.trim()) errs.email = "Email is required";
		if (!reviewForm.text.trim()) errs.text = "Review text is required";
		setReviewErrors(errs);
		if (Object.keys(errs).length === 0) {
			setReviewSubmitted(true);
			setReviewForm({
				name: "",
				email: "",
				rating: 5,
				text: ""
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		"data-tsd-source": "/src/routes/products.$slug.tsx:124:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { "data-tsd-source": "/src/routes/products.$slug.tsx:125:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "pt-24 md:pt-36 pb-3 md:pb-4",
				"data-tsd-source": "/src/routes/products.$slug.tsx:128:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/products.$slug.tsx:129:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.24em] text-chrome-dim overflow-x-auto whitespace-nowrap scrollbar-none",
						"data-tsd-source": "/src/routes/products.$slug.tsx:130:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-chrome transition-colors shrink-0",
								"data-tsd-source": "/src/routes/products.$slug.tsx:131:13",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0",
								"data-tsd-source": "/src/routes/products.$slug.tsx:132:13",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "hover:text-chrome transition-colors shrink-0",
								"data-tsd-source": "/src/routes/products.$slug.tsx:133:13",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0",
								"data-tsd-source": "/src/routes/products.$slug.tsx:134:13",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-chrome truncate",
								"data-tsd-source": "/src/routes/products.$slug.tsx:135:13",
								children: product.name
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "pb-12 md:pb-28",
				"data-tsd-source": "/src/routes/products.$slug.tsx:141:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/products.$slug.tsx:142:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-6 md:gap-12",
						"data-tsd-source": "/src/routes/products.$slug.tsx:143:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-7",
							"data-tsd-source": "/src/routes/products.$slug.tsx:145:13",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								transition: {
									duration: .8,
									ease: EASE
								},
								className: "relative overflow-hidden rounded-2xl md:rounded-3xl border border-chrome bg-graphite",
								style: { boxShadow: "var(--shadow-plate)" },
								"data-tsd-source": "/src/routes/products.$slug.tsx:146:15",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-[4/5]",
										"data-tsd-source": "/src/routes/products.$slug.tsx:153:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
											webp: product.webp,
											fallback: product.src,
											alt: product.name,
											className: "h-full w-full object-cover",
											"data-tsd-source": "/src/routes/products.$slug.tsx:154:19"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-3 md:left-4 top-3 md:top-4 rounded-full border border-chrome bg-background/70 px-2.5 py-1 md:px-3 md:py-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em]",
										"data-tsd-source": "/src/routes/products.$slug.tsx:156:17",
										children: product.num
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "absolute right-3 md:right-4 top-3 md:top-4 h-8 w-8 md:h-9 md:w-9 rounded-full border border-chrome bg-graphite/60 backdrop-blur grid place-items-center text-sm transition-colors hover:bg-chrome hover:text-background",
										"data-tsd-source": "/src/routes/products.$slug.tsx:157:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "1.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											"data-tsd-source": "/src/routes/products.$slug.tsx:158:19",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
												"data-tsd-source": "/src/routes/products.$slug.tsx:158:164"
											})
										})
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-5",
							"data-tsd-source": "/src/routes/products.$slug.tsx:164:13",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .8,
									ease: EASE,
									delay: .2
								},
								"data-tsd-source": "/src/routes/products.$slug.tsx:165:15",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
										"data-tsd-source": "/src/routes/products.$slug.tsx:170:17",
										children: product.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-3 font-display text-3xl md:text-6xl leading-[0.95] tracking-tight",
										"data-tsd-source": "/src/routes/products.$slug.tsx:171:17",
										children: product.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 md:mt-6 font-mono text-lg md:text-xl tracking-[0.08em] text-chrome",
										"data-tsd-source": "/src/routes/products.$slug.tsx:172:17",
										children: priceLabel(product.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "divider-chrome my-6 md:my-8",
										"data-tsd-source": "/src/routes/products.$slug.tsx:174:17"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-chrome-dim",
										"data-tsd-source": "/src/routes/products.$slug.tsx:176:17",
										children: product.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "divider-chrome my-6 md:my-8",
										"data-tsd-source": "/src/routes/products.$slug.tsx:178:17"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										"data-tsd-source": "/src/routes/products.$slug.tsx:181:17",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/products.$slug.tsx:182:19",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
													"data-tsd-source": "/src/routes/products.$slug.tsx:183:21",
													children: "Details"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "mt-3 space-y-2",
													"data-tsd-source": "/src/routes/products.$slug.tsx:184:21",
													children: product.details.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-start gap-3 font-mono text-xs text-chrome-dim",
														"data-tsd-source": "/src/routes/products.$slug.tsx:186:25",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "mt-[5px] h-1 w-1 shrink-0 rounded-full bg-chrome",
															"data-tsd-source": "/src/routes/products.$slug.tsx:187:27"
														}), d]
													}, i))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/products.$slug.tsx:193:19",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
													"data-tsd-source": "/src/routes/products.$slug.tsx:194:21",
													children: "Materials"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "mt-3 space-y-1",
													"data-tsd-source": "/src/routes/products.$slug.tsx:195:21",
													children: product.materials.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
														className: "font-mono text-xs text-chrome-dim",
														"data-tsd-source": "/src/routes/products.$slug.tsx:197:25",
														children: m
													}, i))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/products.$slug.tsx:201:19",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
													"data-tsd-source": "/src/routes/products.$slug.tsx:202:21",
													children: "Dimensions"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 font-mono text-xs text-chrome-dim",
													"data-tsd-source": "/src/routes/products.$slug.tsx:203:21",
													children: product.dimensions
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "divider-chrome my-6 md:my-8",
										"data-tsd-source": "/src/routes/products.$slug.tsx:207:17"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											addToCart({
												id: product.id,
												name: product.name,
												slug: product.slug,
												src: product.src,
												webp: product.webp,
												price: product.price
											});
											setAddedToCart(true);
											setTimeout(() => setAddedToCart(false), 2e3);
										},
										className: "btn-chrome btn-chrome-inner w-full justify-center text-sm !py-4",
										"data-tsd-source": "/src/routes/products.$slug.tsx:210:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "btn-label",
											"data-tsd-source": "/src/routes/products.$slug.tsx:225:19",
											children: addedToCart ? "Added ✓" : `Add to Cart — ${priceLabel(product.price)}`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-chrome-dim",
										"data-tsd-source": "/src/routes/products.$slug.tsx:227:17",
										children: "Free shipping on orders over PKR 500,000 · 14-day return policy"
									})
								]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-24",
				"data-tsd-source": "/src/routes/products.$slug.tsx:237:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-6",
					"data-tsd-source": "/src/routes/products.$slug.tsx:238:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-8 md:mb-12",
						"data-tsd-source": "/src/routes/products.$slug.tsx:239:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
							"data-tsd-source": "/src/routes/products.$slug.tsx:240:13",
							children: "§ Information"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-3xl md:text-5xl leading-[0.95] italic text-chrome-h",
							"data-tsd-source": "/src/routes/products.$slug.tsx:241:13",
							children: "Frequently Asked"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						"data-tsd-source": "/src/routes/products.$slug.tsx:243:11",
						children: faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								duration: .5,
								ease: EASE,
								delay: i * .05
							},
							className: "rounded-2xl border border-chrome bg-graphite overflow-hidden",
							style: { boxShadow: "var(--shadow-plate)" },
							"data-tsd-source": "/src/routes/products.$slug.tsx:245:15",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveFaq(activeFaq === i ? null : i),
								className: "flex items-center justify-between w-full px-6 py-5 text-left transition-colors hover:bg-graphite-2/50",
								"data-tsd-source": "/src/routes/products.$slug.tsx:254:17",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs md:text-sm tracking-[0.04em] pr-4",
									"data-tsd-source": "/src/routes/products.$slug.tsx:258:19",
									children: faq.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: `w-4 h-4 shrink-0 text-chrome-dim transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`,
									viewBox: "0 0 12 12",
									fill: "none",
									"data-tsd-source": "/src/routes/products.$slug.tsx:259:19",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M2 4l4 4 4-4",
										stroke: "currentColor",
										strokeWidth: "1.2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										"data-tsd-source": "/src/routes/products.$slug.tsx:263:21"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								"data-tsd-source": "/src/routes/products.$slug.tsx:266:17",
								children: activeFaq === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										height: 0,
										opacity: 0
									},
									animate: {
										height: "auto",
										opacity: 1
									},
									exit: {
										height: 0,
										opacity: 0
									},
									transition: {
										duration: .3,
										ease: EASE
									},
									className: "overflow-hidden",
									"data-tsd-source": "/src/routes/products.$slug.tsx:268:21",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-6 pb-5 pt-0",
										"data-tsd-source": "/src/routes/products.$slug.tsx:275:23",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-chrome-dim leading-relaxed",
											"data-tsd-source": "/src/routes/products.$slug.tsx:276:25",
											children: faq.a
										})
									})
								})
							})]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-chrome py-12 md:py-24",
				"data-tsd-source": "/src/routes/products.$slug.tsx:288:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/products.$slug.tsx:289:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-8 md:gap-12",
						"data-tsd-source": "/src/routes/products.$slug.tsx:290:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 md:col-span-7",
							"data-tsd-source": "/src/routes/products.$slug.tsx:291:13",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
									"data-tsd-source": "/src/routes/products.$slug.tsx:292:15",
									children: "§ Testimonials"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-4 font-display text-3xl md:text-5xl leading-[0.95]",
									"data-tsd-source": "/src/routes/products.$slug.tsx:293:15",
									children: ["Patron ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-chrome-h",
										"data-tsd-source": "/src/routes/products.$slug.tsx:294:24",
										children: "Voices"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-10 space-y-6",
									"data-tsd-source": "/src/routes/products.$slug.tsx:297:15",
									children: reviews.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 20
										},
										whileInView: {
											opacity: 1,
											y: 0
										},
										viewport: { once: true },
										transition: {
											duration: .6,
											ease: EASE,
											delay: i * .08
										},
										className: "rounded-2xl border border-chrome bg-graphite p-6",
										style: { boxShadow: "var(--shadow-plate)" },
										"data-tsd-source": "/src/routes/products.$slug.tsx:299:19",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-3",
											"data-tsd-source": "/src/routes/products.$slug.tsx:308:21",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												"data-tsd-source": "/src/routes/products.$slug.tsx:309:23",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-8 w-8 rounded-full border border-chrome bg-graphite-2 grid place-items-center font-mono text-[10px] text-chrome",
													"data-tsd-source": "/src/routes/products.$slug.tsx:310:25",
													children: r.name.charAt(0)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-tsd-source": "/src/routes/products.$slug.tsx:313:25",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-foreground",
														"data-tsd-source": "/src/routes/products.$slug.tsx:314:27",
														children: r.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-3 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim",
														"data-tsd-source": "/src/routes/products.$slug.tsx:315:27",
														children: r.date
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex gap-0.5",
												"data-tsd-source": "/src/routes/products.$slug.tsx:318:23",
												children: Array.from({ length: 5 }, (_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "12",
													height: "12",
													viewBox: "0 0 12 12",
													fill: j < r.rating ? "currentColor" : "none",
													stroke: "currentColor",
													strokeWidth: "1",
													className: j < r.rating ? "text-chrome" : "text-chrome-dim/30",
													"data-tsd-source": "/src/routes/products.$slug.tsx:320:27",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
														points: "6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 1,4.5 4.5,4.5",
														"data-tsd-source": "/src/routes/products.$slug.tsx:321:29"
													})
												}, j))
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-chrome-dim leading-relaxed",
											"data-tsd-source": "/src/routes/products.$slug.tsx:326:21",
											children: r.text
										})]
									}, i))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-4 md:col-start-9",
							"data-tsd-source": "/src/routes/products.$slug.tsx:333:13",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:sticky md:top-28",
								"data-tsd-source": "/src/routes/products.$slug.tsx:334:15",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
										"data-tsd-source": "/src/routes/products.$slug.tsx:335:17",
										children: "§ Write a Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-chrome-dim",
										"data-tsd-source": "/src/routes/products.$slug.tsx:336:17",
										children: "Share your experience with this object."
									}),
									reviewSubmitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 10
										},
										animate: {
											opacity: 1,
											y: 0
										},
										className: "mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center",
										"data-tsd-source": "/src/routes/products.$slug.tsx:339:19",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-3xl text-green-400 mb-2",
												"data-tsd-source": "/src/routes/products.$slug.tsx:344:21",
												children: "✓"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-[11px] text-green-400",
												"data-tsd-source": "/src/routes/products.$slug.tsx:345:21",
												children: "Review submitted"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setReviewSubmitted(false),
												className: "mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome hover:text-foreground transition-colors",
												"data-tsd-source": "/src/routes/products.$slug.tsx:346:21",
												children: "Write another"
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleReviewSubmit,
										className: "mt-6 space-y-4",
										"data-tsd-source": "/src/routes/products.$slug.tsx:351:19",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/products.$slug.tsx:352:21",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: reviewForm.name,
													onChange: (e) => setReviewForm({
														...reviewForm,
														name: e.target.value
													}),
													placeholder: "Your name *",
													className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${reviewErrors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
													"data-tsd-source": "/src/routes/products.$slug.tsx:353:23"
												}), reviewErrors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													"data-tsd-source": "/src/routes/products.$slug.tsx:359:45",
													children: reviewErrors.name
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/products.$slug.tsx:361:21",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: reviewForm.email,
													onChange: (e) => setReviewForm({
														...reviewForm,
														email: e.target.value
													}),
													placeholder: "Email *",
													className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${reviewErrors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
													"data-tsd-source": "/src/routes/products.$slug.tsx:362:23"
												}), reviewErrors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													"data-tsd-source": "/src/routes/products.$slug.tsx:368:46",
													children: reviewErrors.email
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-tsd-source": "/src/routes/products.$slug.tsx:370:21",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 mb-2",
													"data-tsd-source": "/src/routes/products.$slug.tsx:371:23",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim",
														"data-tsd-source": "/src/routes/products.$slug.tsx:372:25",
														children: "Rating"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex gap-1",
														"data-tsd-source": "/src/routes/products.$slug.tsx:373:25",
														children: [
															1,
															2,
															3,
															4,
															5
														].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setReviewForm({
																...reviewForm,
																rating: r
															}),
															"data-tsd-source": "/src/routes/products.$slug.tsx:375:29",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
																width: "16",
																height: "16",
																viewBox: "0 0 12 12",
																fill: r <= reviewForm.rating ? "currentColor" : "none",
																stroke: "currentColor",
																strokeWidth: "1",
																className: r <= reviewForm.rating ? "text-chrome" : "text-chrome-dim/30",
																"data-tsd-source": "/src/routes/products.$slug.tsx:376:31",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
																	points: "6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 1,4.5 4.5,4.5",
																	"data-tsd-source": "/src/routes/products.$slug.tsx:377:33"
																})
															})
														}, r))
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/products.$slug.tsx:384:21",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													value: reviewForm.text,
													onChange: (e) => setReviewForm({
														...reviewForm,
														text: e.target.value
													}),
													placeholder: "Your review *",
													rows: 4,
													className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors resize-none ${reviewErrors.text ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`,
													"data-tsd-source": "/src/routes/products.$slug.tsx:385:23"
												}), reviewErrors.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-mono text-[10px] text-red-400",
													"data-tsd-source": "/src/routes/products.$slug.tsx:392:45",
													children: reviewErrors.text
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "btn-chrome btn-chrome-inner w-full justify-center",
												"data-tsd-source": "/src/routes/products.$slug.tsx:394:21",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "btn-label",
													"data-tsd-source": "/src/routes/products.$slug.tsx:395:23",
													children: "Submit Review"
												})
											})
										]
									})
								]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-chrome py-12 md:py-24",
				"data-tsd-source": "/src/routes/products.$slug.tsx:406:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					"data-tsd-source": "/src/routes/products.$slug.tsx:407:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
							"data-tsd-source": "/src/routes/products.$slug.tsx:408:11",
							children: "§ The Collection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 mb-8 md:mb-12 font-display text-3xl md:text-5xl leading-[0.95]",
							"data-tsd-source": "/src/routes/products.$slug.tsx:409:11",
							children: ["Related ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								"data-tsd-source": "/src/routes/products.$slug.tsx:410:21",
								children: "Objects"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6",
							"data-tsd-source": "/src/routes/products.$slug.tsx:412:11",
							children: relatedProducts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/products/$slug",
								params: { slug: p.slug },
								className: "group",
								"data-tsd-source": "/src/routes/products.$slug.tsx:414:15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 20
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										duration: .6,
										ease: EASE,
										delay: i * .08
									},
									"data-tsd-source": "/src/routes/products.$slug.tsx:420:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative overflow-hidden rounded-2xl border border-chrome bg-graphite",
										style: { boxShadow: "var(--shadow-plate)" },
										"data-tsd-source": "/src/routes/products.$slug.tsx:426:19",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-[4/5] overflow-hidden",
											"data-tsd-source": "/src/routes/products.$slug.tsx:427:21",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizedImage, {
												webp: p.webp,
												fallback: p.src,
												alt: p.name,
												className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
												"data-tsd-source": "/src/routes/products.$slug.tsx:428:23"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute left-3 top-3 rounded-full border border-chrome bg-background/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]",
											"data-tsd-source": "/src/routes/products.$slug.tsx:430:21",
											children: p.num
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3",
										"data-tsd-source": "/src/routes/products.$slug.tsx:432:19",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] text-chrome-dim truncate",
											"data-tsd-source": "/src/routes/products.$slug.tsx:433:21",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-xs tracking-[0.14em] text-chrome mt-1",
											"data-tsd-source": "/src/routes/products.$slug.tsx:434:21",
											children: priceLabel(p.price)
										})]
									})]
								})
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 text-center",
							"data-tsd-source": "/src/routes/products.$slug.tsx:440:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "btn-chrome btn-chrome-inner",
								"data-tsd-source": "/src/routes/products.$slug.tsx:441:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									"data-tsd-source": "/src/routes/products.$slug.tsx:442:15",
									children: "View All Objects"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "14",
									height: "14",
									viewBox: "0 0 14 14",
									fill: "none",
									"data-tsd-source": "/src/routes/products.$slug.tsx:443:15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M1 7h12M8 2l5 5-5 5",
										stroke: "currentColor",
										strokeWidth: "1.2",
										"data-tsd-source": "/src/routes/products.$slug.tsx:443:75"
									})
								})]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { "data-tsd-source": "/src/routes/products.$slug.tsx:449:7" })
		]
	});
}
//#endregion
export { ProductPage as component };
