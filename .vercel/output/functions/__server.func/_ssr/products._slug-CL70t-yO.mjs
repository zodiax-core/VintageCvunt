import { o as __toESM } from "../_runtime.mjs";
import { a as useQuery, i as useMutation } from "../_libs/convex.mjs";
import { t as api } from "./api-xr_VpTVu.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useCartContext } from "./cart-context-CAiE_2vy.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, r as SiteNav } from "./SiteFooter-CoPgpr_w.mjs";
import { t as Route } from "./products._slug-dhiVU-Bu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-CL70t-yO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FloatingVideo({ videoUrl }) {
	const [isHovered, setIsHovered] = (0, import_react.useState)(false);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(true);
	const [videoRatio, setVideoRatio] = (0, import_react.useState)(16 / 9);
	const [touchHover, setTouchHover] = (0, import_react.useState)(false);
	const videoRef = (0, import_react.useRef)(null);
	const constraintsRef = (0, import_react.useRef)(null);
	const touchTimer = (0, import_react.useRef)();
	const hoverLock = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		return () => {
			if (touchTimer.current) clearTimeout(touchTimer.current);
		};
	}, []);
	const showControlsTemporarily = (0, import_react.useCallback)(() => {
		setTouchHover(true);
		if (touchTimer.current) clearTimeout(touchTimer.current);
		touchTimer.current = setTimeout(() => setTouchHover(false), 3e3);
	}, []);
	const showHover = isHovered || touchHover;
	const handleHoverStart = (0, import_react.useCallback)(() => {
		setIsHovered(true);
		hoverLock.current = false;
	}, []);
	const handleHoverEnd = (0, import_react.useCallback)(() => {
		if (!hoverLock.current) {
			setIsHovered(false);
			setTouchHover(false);
		}
	}, []);
	const togglePlay = (0, import_react.useCallback)(() => {
		const v = videoRef.current;
		if (!v) return;
		if (v.paused) {
			v.play();
			setIsPlaying(true);
		} else {
			v.pause();
			setIsPlaying(false);
		}
		showControlsTemporarily();
	}, [showControlsTemporarily]);
	const expandedW = Math.min(360, Math.round(320 * videoRatio), window.innerWidth - 32);
	const expandedH = Math.round(expandedW / videoRatio);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: constraintsRef,
		className: "fixed inset-0 z-40 pointer-events-none"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		layout: true,
		drag: true,
		dragMomentum: true,
		dragElastic: .2,
		dragConstraints: constraintsRef,
		onHoverStart: handleHoverStart,
		onHoverEnd: handleHoverEnd,
		onDragEnd: () => {
			if (touchTimer.current) clearTimeout(touchTimer.current);
		},
		onTap: () => showControlsTemporarily(),
		initial: {
			opacity: 0,
			scale: 0,
			bottom: 16,
			right: 16
		},
		animate: showHover ? {
			bottom: 16,
			right: 16,
			width: expandedW,
			height: expandedH,
			borderRadius: 16,
			opacity: 1,
			scale: 1
		} : {
			bottom: 16,
			right: 16,
			width: 160,
			height: 160 / videoRatio,
			borderRadius: 16,
			opacity: 1,
			scale: 1
		},
		transition: {
			type: "spring",
			stiffness: 350,
			damping: 30,
			mass: 1.2
		},
		className: "fixed z-50 overflow-hidden bg-black shadow-2xl border border-white/20 cursor-grab active:cursor-grabbing",
		style: { boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: videoUrl,
				autoPlay: true,
				loop: true,
				muted: true,
				playsInline: true,
				onClick: (e) => {
					e.stopPropagation();
					togglePlay();
				},
				onMouseEnter: () => {
					hoverLock.current = true;
				},
				onMouseLeave: () => {
					hoverLock.current = false;
				},
				onLoadedMetadata: () => {
					if (videoRef.current) setVideoRatio(videoRef.current.videoWidth / videoRef.current.videoHeight);
				},
				className: "h-full w-full object-contain"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showHover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: .15 },
				className: "absolute inset-0 flex items-center justify-center p-2 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
					})
				})
			}) }),
			!showHover && !isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-9 w-9 rounded-full bg-black/60 text-white grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 24 24",
						fill: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "5 3 19 12 5 21 5 3" })
					})
				})
			})
		]
	})] });
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
	const [selectedSize, setSelectedSize] = (0, import_react.useState)("");
	const [selectedColor, setSelectedColor] = (0, import_react.useState)("");
	const [defaultsSet, setDefaultsSet] = (0, import_react.useState)(false);
	const productFaqs = useQuery(api.faq.getByCategory, { category: slug }) ?? [];
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
	if (!defaultsSet) {
		if (product.sizes?.length > 0) setSelectedSize(product.sizes[0]);
		if (product.colors?.length > 0) setSelectedColor(product.colors[0]);
		setDefaultsSet(true);
	}
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
			product.videoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingVideo, { videoUrl: product.videoUrl }),
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
											children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setSelectedSize(s),
												className: `rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-colors ${selectedSize === s ? "border-chrome bg-chrome text-background" : "border-chrome/30 bg-graphite text-chrome hover:border-chrome/60"}`,
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
											children: product.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setSelectedColor(c),
												className: `rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-colors ${selectedColor === c ? "border-chrome bg-chrome text-background" : "border-chrome/30 bg-graphite text-chrome hover:border-chrome/60"}`,
												children: c
											}, c))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider-chrome my-6 md:my-8" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											addToCart({
												id: `${product._id}_${selectedSize || ""}_${selectedColor || ""}`,
												productId: product._id,
												name: product.name,
												slug: product.slug,
												src: product.imageUrls?.[0] || "/placeholder.svg",
												webp: product.imageUrls?.[0] || "/placeholder.svg",
												price: product.price,
												selectedSize: selectedSize || void 0,
												selectedColor: selectedColor || void 0
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
			productFaqs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-chrome py-12 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
							children: "§ Inquiries"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 mb-8 font-display text-3xl md:text-5xl leading-[0.95]",
							children: ["Frequently Asked ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-chrome-h",
								children: "Questions"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-3xl space-y-3",
							children: productFaqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-chrome bg-graphite overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveFaq(activeFaq === i ? null : i),
									className: "w-full flex items-center justify-between px-5 py-4 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-sm tracking-tight pr-4",
										children: faq.question
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: `shrink-0 transition-transform duration-300 ${activeFaq === i ? "rotate-45" : ""}`,
										width: "14",
										height: "14",
										viewBox: "0 0 14 14",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "1.2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 1v12M1 7h12" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										height: 0,
										opacity: 0
									},
									animate: activeFaq === i ? {
										height: "auto",
										opacity: 1
									} : {
										height: 0,
										opacity: 0
									},
									transition: {
										duration: .3,
										ease: EASE
									},
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-5 pb-4 font-mono text-sm text-chrome-dim leading-relaxed",
										children: faq.answer
									})
								})]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-chrome py-12 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.32em] text-chrome-dim",
								children: "§ Object Log"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-4 mb-8 font-display text-3xl md:text-5xl leading-[0.95]",
								children: ["Patron ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-chrome-h",
									children: "Reviews"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 space-y-10",
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
									className: "rounded-2xl border border-chrome bg-graphite p-8 md:p-10",
									style: { boxShadow: "var(--shadow-plate)" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-10 w-10 rounded-full border border-chrome bg-graphite-2 grid place-items-center font-mono text-sm text-chrome shrink-0",
													children: r.customerName.charAt(0)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-sm md:text-base text-foreground",
													children: r.customerName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim/50 mt-0.5",
													children: new Date(r.createdAt).toLocaleDateString("en-PK", {
														year: "numeric",
														month: "short"
													})
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex gap-1 shrink-0",
												children: Array.from({ length: 5 }, (_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "16",
													height: "16",
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
											className: "font-mono text-sm md:text-base text-foreground font-semibold mb-3",
											children: r.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm md:text-base text-chrome-dim leading-relaxed md:leading-loose",
											children: r.comment
										})
									]
								}, r._id))
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						}) })]
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
