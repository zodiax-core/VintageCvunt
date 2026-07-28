import { o as __toESM } from "../_runtime.mjs";
import { i as useQuery, r as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useCartContext } from "./cart-context-CAiE_2vy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-DXdzIAJ-.mjs";
import { t as Route } from "./products._slug-4P1GzU5R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-DF8KxRTJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FloatingVideo({ videoUrl }) {
	const [isMinimized, setIsMinimized] = (0, import_react.useState)(true);
	const [isScaling, setIsScaling] = (0, import_react.useState)(false);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(true);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const videoRef = (0, import_react.useRef)(null);
	const togglePlay = (0, import_react.useCallback)(() => {
		if (!videoRef.current) return;
		if (videoRef.current.paused) {
			videoRef.current.play();
			setIsPlaying(true);
		} else {
			videoRef.current.pause();
			setIsPlaying(false);
		}
	}, []);
	const toggleMute = (0, import_react.useCallback)(() => {
		if (!videoRef.current) return;
		videoRef.current.muted = !videoRef.current.muted;
		setIsMuted(!isMuted);
	}, [isMuted]);
	const toggleScale = (0, import_react.useCallback)(() => {
		setIsScaling((prev) => !prev);
	}, []);
	const handleClick = (0, import_react.useCallback)(() => {
		if (isMinimized) setIsMinimized(false);
	}, [isMinimized]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		drag: isMinimized && !isScaling,
		dragMomentum: false,
		dragElastic: .1,
		initial: {
			opacity: 0,
			scale: .8
		},
		animate: isScaling ? {
			width: "80vw",
			height: "80vh",
			borderRadius: 0,
			opacity: 1,
			scale: 1,
			x: 0,
			y: 0
		} : isMinimized ? {
			width: 160,
			height: 120,
			borderRadius: 16,
			opacity: .9,
			scale: 1
		} : {
			width: 280,
			height: 200,
			borderRadius: 16,
			opacity: 1,
			scale: 1
		},
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 25
		},
		className: `fixed z-50 overflow-hidden bg-black shadow-2xl border border-white/20 cursor-pointer group ${isScaling ? "inset-0 m-auto" : isMinimized ? "bottom-4 right-4" : "bottom-20 right-6"}`,
		style: { boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
		onClick: isMinimized ? handleClick : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: videoUrl,
				autoPlay: true,
				loop: true,
				muted: isMuted,
				playsInline: true,
				className: "h-full w-full object-contain bg-black pointer-events-none"
			}),
			!isMinimized && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col justify-between p-2 pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end pointer-events-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							toggleScale();
						},
						className: "h-7 w-7 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center text-xs hover:bg-black/80 transition-colors",
						children: isScaling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" })
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-center gap-3 pointer-events-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							togglePlay();
						},
						className: "h-9 w-9 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center hover:bg-black/80 transition-colors",
						children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "6",
								y: "4",
								width: "4",
								height: "16"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "14",
								y: "4",
								width: "4",
								height: "16"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "5 3 19 12 5 21 5 3" })
						})
					}), isScaling && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							toggleMute();
						},
						className: "h-9 w-9 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center hover:bg-black/80 transition-colors",
						children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "23",
									y1: "9",
									x2: "17",
									y2: "15"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "17",
									y1: "9",
									x2: "23",
									y2: "15"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" })]
						})
					})]
				})]
			}),
			isMinimized && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 24 24",
					fill: "white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "5 3 19 12 5 21 5 3" })
				})
			})
		]
	});
}
var EASE = [
	.16,
	1,
	.3,
	1
];
var priceLabel = (p) => "PKR " + p.toLocaleString("en-PK");
function ProductPage() {
	const { slug } = Route.useParams();
	const product = useQuery(api.products.getBySlug, { slug }) ?? null;
	const reviews = useQuery(api.reviews.getByProductId, { productId: product?._id ?? "" }) ?? [];
	const relatedProducts = (useQuery(api.products.list) ?? []).filter((p) => p.slug !== slug).slice(0, 4);
	const createReview = useMutation(api.reviews.create);
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
	const detailsList = (0, import_react.useMemo)(() => {
		if (!product?.details) return [];
		return product.details.split("\n").map((l) => l.trim()).filter(Boolean);
	}, [product?.details]);
	const materialsList = (0, import_react.useMemo)(() => {
		if (!product?.material) return [];
		return product.material.split("\n").map((l) => l.trim()).filter(Boolean);
	}, [product?.material]);
	if (!product) return null;
	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		const errs = {};
		if (!reviewForm.name.trim()) errs.name = "Name is required";
		if (!reviewForm.email.trim()) errs.email = "Email is required";
		if (!reviewForm.text.trim()) errs.text = "Review text is required";
		setReviewErrors(errs);
		if (Object.keys(errs).length === 0) try {
			await createReview({
				productId: product._id,
				customerName: reviewForm.name.trim(),
				customerEmail: reviewForm.email.trim(),
				rating: reviewForm.rating,
				comment: reviewForm.text.trim(),
				status: "pending"
			});
			setReviewSubmitted(true);
			setReviewForm({
				name: "",
				email: "",
				rating: 5,
				text: ""
			});
		} catch (err) {
			console.error("Failed to submit review", err);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			product.videoUrl && product.imageUrls?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingVideo, { videoUrl: product.videoUrl }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "pt-24 md:pt-36 pb-3 md:pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.24em] text-chrome-dim overflow-x-auto whitespace-nowrap scrollbar-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-chrome transition-colors shrink-0",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "hover:text-chrome transition-colors shrink-0",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-chrome truncate",
								children: product.name
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "pb-12 md:pb-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-6 md:gap-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-7",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								transition: {
									duration: .8,
									ease: EASE
								},
								className: "relative overflow-hidden rounded-2xl md:rounded-3xl border border-chrome bg-graphite",
								style: { boxShadow: "var(--shadow-plate)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[4/5]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: product.imageUrls?.[0] || "/placeholder.svg",
										alt: product.name,
										className: "h-full w-full object-cover"
									})
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-5",
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
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim",
										children: product.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-3 font-display text-3xl md:text-6xl leading-[0.95] tracking-tight",
										children: product.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 md:mt-6 font-mono text-lg md:text-xl tracking-[0.08em] text-chrome",
										children: priceLabel(product.price)
									}),
									product.compareAtPrice && product.compareAtPrice > product.price && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-sm text-chrome-dim line-through",
										children: priceLabel(product.compareAtPrice)
									}),
									product.tags && product.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5 mt-4",
										children: product.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border border-chrome/20 bg-graphite px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim",
											children: t
										}, t))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-6 md:my-8" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-chrome-dim",
										children: product.description
									}),
									detailsList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mb-3",
											children: "Details"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-1.5",
											children: detailsList.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2 text-sm text-chrome-dim",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-chrome-dim/40" }), d]
											}, i))
										})]
									}),
									materialsList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mb-3",
											children: "Materials"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-1.5",
											children: materialsList.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2 text-sm text-chrome-dim",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-chrome-dim/40" }), m]
											}, i))
										})]
									}),
									product.dimensions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mb-2",
											children: "Dimensions"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-chrome-dim",
											children: product.dimensions
										})]
									}),
									product.sizes && product.sizes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mb-2",
											children: "Sizes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-lg border border-chrome/30 bg-graphite px-3 py-1.5 font-mono text-[11px] text-chrome",
												children: s
											}, s))
										})]
									}),
									product.colors && product.colors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dim mb-2",
											children: "Colors"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: product.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-lg border border-chrome/30 bg-graphite px-3 py-1.5 font-mono text-[11px] text-chrome",
												children: c
											}, c))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-6 md:my-8" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											addToCart({
												id: product._id,
												name: product.name,
												slug: product.slug,
												src: product.imageUrls?.[0] || "/placeholder.svg",
												webp: product.imageUrls?.[0] || "/placeholder.svg",
												price: product.price
											});
											setAddedToCart(true);
											setTimeout(() => setAddedToCart(false), 2e3);
										},
										className: "btn-chrome btn-chrome-inner w-full justify-center text-sm !py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "btn-label",
											children: addedToCart ? "Added ✓" : `Add to Cart — ${priceLabel(product.price)}`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-chrome-dim",
										children: "Free shipping on orders over PKR 500,000 · 14-day return policy · Serving all Pakistan"
									})
								]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-chrome py-12 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-8 md:gap-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 md:col-span-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
									children: "§ Testimonials"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-4 font-display text-3xl md:text-5xl leading-[0.95]",
									children: ["Patron ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-chrome-h",
										children: "Voices"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-10 space-y-6",
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
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-8 w-8 rounded-full border border-chrome bg-graphite-2 grid place-items-center font-mono text-[10px] text-chrome",
														children: r.customerName.charAt(0)
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-foreground",
														children: r.customerName
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-3 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim",
														children: new Date(r.createdAt).toLocaleDateString("en-PK", {
															year: "numeric",
															month: "short"
														})
													})] })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-0.5",
													children: Array.from({ length: 5 }, (_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
														width: "12",
														height: "12",
														viewBox: "0 0 12 12",
														fill: j < r.rating ? "currentColor" : "none",
														stroke: "currentColor",
														strokeWidth: "1",
														className: j < r.rating ? "text-chrome" : "text-chrome-dim/30",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 1,4.5 4.5,4.5" })
													}, j))
												})]
											}),
											r.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-xs text-foreground font-semibold mb-1",
												children: r.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-chrome-dim leading-relaxed",
												children: r.comment
											})
										]
									}, r._id))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-12 md:col-span-4 md:col-start-9",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:sticky md:top-28",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
										children: "§ Write a Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-chrome-dim",
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
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-3xl text-green-400 mb-2",
												children: "✓"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-[11px] text-green-400",
												children: "Review submitted"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setReviewSubmitted(false),
												className: "mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome hover:text-foreground transition-colors",
												children: "Write another"
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleReviewSubmit,
										className: "mt-6 space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: reviewForm.name,
												onChange: (e) => setReviewForm({
													...reviewForm,
													name: e.target.value
												}),
												placeholder: "Your name *",
												className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${reviewErrors.name ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
											}), reviewErrors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-mono text-[10px] text-red-400",
												children: reviewErrors.name
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: reviewForm.email,
												onChange: (e) => setReviewForm({
													...reviewForm,
													email: e.target.value
												}),
												placeholder: "Email *",
												className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors ${reviewErrors.email ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
											}), reviewErrors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-mono text-[10px] text-red-400",
												children: reviewErrors.email
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[10px] uppercase tracking-[0.24em] text-chrome-dim",
													children: "Rating"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-1",
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
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
															width: "16",
															height: "16",
															viewBox: "0 0 12 12",
															fill: r <= reviewForm.rating ? "currentColor" : "none",
															stroke: "currentColor",
															strokeWidth: "1",
															className: r <= reviewForm.rating ? "text-chrome" : "text-chrome-dim/30",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 1,4.5 4.5,4.5" })
														})
													}, r))
												})]
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												value: reviewForm.text,
												onChange: (e) => setReviewForm({
													...reviewForm,
													text: e.target.value
												}),
												placeholder: "Your review *",
												rows: 4,
												className: `w-full rounded-xl border bg-graphite px-4 py-3 font-mono text-sm placeholder:text-chrome-dim/30 outline-none transition-colors resize-none ${reviewErrors.text ? "border-red-500/50" : "border-chrome focus:border-chrome/80"}`
											}), reviewErrors.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-mono text-[10px] text-red-400",
												children: reviewErrors.text
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "btn-chrome btn-chrome-inner w-full justify-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "btn-label",
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
							children: "§ The Collection"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 mb-8 md:mb-12 font-display text-3xl md:text-5xl leading-[0.95]",
							children: ["Related ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "Objects"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6",
							children: relatedProducts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedProductCard, {
								product: p,
								index: i
							}, p._id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "btn-chrome btn-chrome-inner",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "btn-label",
									children: "View All Objects"
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
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function RelatedProductCard({ product, index }) {
	const imgUrl = product.imageUrls?.[0] || "/placeholder.svg";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/products/$slug",
		params: { slug: product.slug },
		className: "group",
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
				delay: index * .08
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative overflow-hidden rounded-2xl border border-chrome bg-graphite",
				style: { boxShadow: "var(--shadow-plate)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[4/5] overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imgUrl,
						alt: product.name,
						className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-chrome-dim truncate",
					children: product.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.14em] text-chrome mt-1",
					children: priceLabel(product.price)
				})]
			})]
		})
	});
}
//#endregion
export { ProductPage as component };
