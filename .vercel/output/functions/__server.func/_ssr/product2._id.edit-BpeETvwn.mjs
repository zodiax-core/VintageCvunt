import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Save } from "../_libs/lucide-react.mjs";
import { t as AdminLayout } from "./AdminLayout-Cb1iJTer.mjs";
import { t as Route } from "./product._id.edit-UWWrUJjH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product2._id.edit-BpeETvwn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var allProducts = [
	{
		id: "1",
		name: "Obsidian Tailcoat",
		sku: "VNT-001",
		category: "Outerwear",
		price: 890,
		stock: 12,
		status: "Active"
	},
	{
		id: "2",
		name: "Argentine Cuff",
		sku: "VNT-002",
		category: "Silverwork",
		price: 245,
		stock: 3,
		status: "Active"
	},
	{
		id: "3",
		name: "Noir Leather Boots",
		sku: "VNT-003",
		category: "Footwear",
		price: 670,
		stock: 28,
		status: "Active"
	},
	{
		id: "4",
		name: "Silver Mesh Gloves",
		sku: "VNT-004",
		category: "Adornment",
		price: 320,
		stock: 45,
		status: "Draft"
	},
	{
		id: "5",
		name: "Onyx Pendant",
		sku: "VNT-005",
		category: "Adornment",
		price: 180,
		stock: 2,
		status: "Active"
	},
	{
		id: "6",
		name: "Crimson Velvet Jacket",
		sku: "VNT-006",
		category: "Outerwear",
		price: 1200,
		stock: 8,
		status: "Active"
	},
	{
		id: "7",
		name: "Bronze Buckle Belt",
		sku: "VNT-007",
		category: "Adornment",
		price: 160,
		stock: 35,
		status: "Active"
	},
	{
		id: "8",
		name: "Smoke Glass Ring",
		sku: "VNT-008",
		category: "Silverwork",
		price: 95,
		stock: 4,
		status: "Draft"
	},
	{
		id: "9",
		name: "Raven Wool Scarf",
		sku: "VNT-009",
		category: "Outerwear",
		price: 210,
		stock: 18,
		status: "Archived"
	},
	{
		id: "10",
		name: "Antique Locket",
		sku: "VNT-010",
		category: "Silverwork",
		price: 340,
		stock: 1,
		status: "Active"
	},
	{
		id: "11",
		name: "Patina Cargo Pants",
		sku: "VNT-011",
		category: "Bottoms",
		price: 450,
		stock: 22,
		status: "Active"
	},
	{
		id: "12",
		name: "Slate Derby Shoes",
		sku: "VNT-012",
		category: "Footwear",
		price: 520,
		stock: 7,
		status: "Draft"
	}
];
var detailsBySlug = {
	"obsidian-tailcoat": {
		description: "A floor-length coat cut from a single panel of bonded chrome leather. The Meridian traces the spine — a seam runs from the nape to the hem, dividing the body into two equal fields of silver.",
		details: "Single-panel bonded leather construction\nFull-length centre-back seam\nFour concealed snap pockets\nHorn-button closure\nSilk-blend lined interior\nMade in Milano",
		materials: "Bonded chrome leather (Italy), Horn buttons (France), Silk-blend lining (Como)",
		dimensions: "Length: 142cm · Chest: 112cm · Shoulder: 48cm"
	},
	"argentine-cuff": {
		description: "A wide cuff bracelet in brushed silver, with a subtle architectural bevel along each edge. The interior is stamped with the house coordinates.",
		details: "Brushed silver 925 construction\nArchitectural bevel detailing\nConcealed hinge mechanism\nInterior house-coordinate stamp\nHand-polished edges",
		materials: "Silver 925, brushed finish, Steel hinge pin",
		dimensions: "Width: 55mm · Inner circumference: 19cm · Weight: 34g"
	},
	"noir-leather-boots": {
		description: "A high-top boot constructed from a single piece of shell-cordovan leather. The silhouette is architectural with a sculpted sole.",
		details: "Single-piece shell-cordovan construction\nGoodyear welted sole\nChrome-plated steel toe cap\nLeather-lined interior\nVibram outsole",
		materials: "Shell cordovan (Chicago), Chrome-plated steel (Germany), Vibram outsole",
		dimensions: "Shaft height: 18cm · Heel: 3cm · Available in EU 39–46"
	},
	"silver-mesh-gloves": {
		description: "Hand-assembled silver mesh gloves with articulated fingers. Each panel is riveted by hand for maximum dexterity.",
		details: "Hand-assembled silver mesh\nArticulated finger panels\nHand-riveted construction\nLeather palm reinforcement\nElasticated wrist closure",
		materials: "Silver mesh (Italy), Calf leather palm, Brass rivets",
		dimensions: "Available in S–XL · Palm width: 8–11cm"
	},
	"onyx-pendant": {
		description: "A pendant in the form of a minimalist cross, forged from oxidized silver with a hand-stippled finish.",
		details: "Oxidized silver 925\nHand-stippled surface texture\n56cm rolo chain included\nSpring-ring clasp\nFelt-lined box",
		materials: "Oxidized silver 925, Stainless steel spring ring",
		dimensions: "Cross: 42mm × 26mm · Chain: 56cm · Weight: 12g"
	},
	"crimson-velvet-jacket": {
		description: "A cropped rider jacket in heavyweight crimson velvet with chrome-embossed calf leather trim.",
		details: "Heavyweight crimson velvet\nChrome-embossed calf leather trim\nAsymmetric zip closure\nSculpted fold-over lapel collar\nQuilted satin lining",
		materials: "Crimson velvet (France), Calf leather (Tuscany), Satin lining (France)",
		dimensions: "Length: 58cm · Chest: 104cm · Sleeve: 64cm"
	},
	"bronze-buckle-belt": {
		description: "A wide belt in bridle leather with a cast bronze buckle featuring the house motif.",
		details: "Bridle leather construction\nCast bronze buckle\nHouse motif engraving\nBrass roller bar\nKeeper loop included",
		materials: "Bridle leather (England), Cast bronze (Italy), Brass hardware",
		dimensions: "Width: 38mm · Lengths: 85–110cm · Buckle: 45mm × 35mm"
	},
	"smoke-glass-ring": {
		description: "A signet ring set with a faceted smoky quartz in a brushed silver rub-over mount.",
		details: "Faceted smoky quartz gem\nBrushed silver 925 rub-over mount\nTapered band\nHand-polished finish",
		materials: "Smoky quartz (Brazil), Silver 925",
		dimensions: "Band width: 4–8mm · Bezel: 14mm × 10mm · Weight: 16g"
	},
	"raven-wool-scarf": {
		description: "An oversized scarf woven from a blend of merino wool and chrome filament creating a subtle architectural grid.",
		details: "Oversized 200cm length\nMerino wool and chrome filament\nArchitectural grid weave\nHand-knotted fringe\nUnisex design\nDry clean only",
		materials: "Merino wool (Australia), Chrome filament (Italy)",
		dimensions: "200cm × 40cm · Fringe: 6cm"
	},
	"antique-locket": {
		description: "A Victorian-inspired locket in oxidized silver with a concealed compartment. The surface is hand-engraved with filigree motifs.",
		details: "Oxidized silver 925\nHand-engraved filigree\nConcealed compartment\nSnap closure\n18in belcher chain included\nFelt-lined presentation box",
		materials: "Silver 925 oxidized, Belcher chain (silver-plated brass)",
		dimensions: "Locket: 32mm diameter · Chain: 45cm · Weight: 24g"
	},
	"patina-cargo-pants": {
		description: "Wide-leg cargo pants in heavyweight Japanese denim with a reactive patina dye that evolves with wear.",
		details: "Heavyweight Japanese denim\nReactive patina dye\nWide-leg silhouette\nFour cargo pockets\nAdjustable waist tabs\nButton-fly closure",
		materials: "Japanese selvedge denim (Okayama), Brass hardware, Patina reactive dye",
		dimensions: "Inseam: 82cm · Rise: 32cm · Leg opening: 24cm"
	},
	"slate-derby-shoes": {
		description: "A derby shoe in slate-gray museum calf leather with a chrome-patent heel counter and storm welt.",
		details: "Slate-gray museum calf\nChrome-patent heel counter\nStorm welt construction\nLeather sole with rubber studs\nCushioned leather insole\nWaxed cotton laces",
		materials: "Museum calf (France), Chrome-patent leather, Leather sole with rubber inserts",
		dimensions: "Available in EU 39–46 · Fitting: Standard (F) · Last: 203"
	}
};
var slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");
function EditProduct() {
	const { id } = Route.useParams();
	const product = allProducts.find((p) => p.id === id);
	const slug = product ? slugify(product.name) : "";
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: product?.name || "",
		slug,
		category: product?.category || "",
		price: product?.price?.toString() || "",
		comparePrice: "",
		description: product ? detailsBySlug[slug]?.description || "" : "",
		details: product ? detailsBySlug[slug]?.details || "" : "",
		materials: product ? detailsBySlug[slug]?.materials || "" : "",
		dimensions: product ? detailsBySlug[slug]?.dimensions || "" : "",
		stock: product?.stock?.toString() || "",
		status: product?.status || "Draft"
	});
	const handleChange = (field, value) => {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const handleSave = () => {
		setSaved(true);
		setTimeout(() => setSaved(false), 2e3);
	};
	const inputClass = "rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors w-full";
	const labelClass = "block font-mono text-[10px] uppercase tracking-[0.28em] text-chrome-dim mb-1.5";
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-chrome-dim",
				children: "Product not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mt-2",
				children: "The product you are looking for does not exist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/product",
				className: "btn-chrome btn-chrome-inner mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn-label",
					children: "Back to Products"
				})
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl md:text-2xl font-display",
				children: "Edit Product"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
				children: product.name
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2 space-y-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Product Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.name,
							onChange: (e) => handleChange("name", e.target.value),
							className: inputClass
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Slug"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.slug,
							onChange: (e) => handleChange("slug", e.target.value),
							className: inputClass
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.category,
							onChange: (e) => handleChange("category", e.target.value),
							className: inputClass,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Outerwear",
									children: "Outerwear"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Footwear",
									children: "Footwear"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Silverwork",
									children: "Silverwork"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Adornment",
									children: "Adornment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Tops",
									children: "Tops"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Bottoms",
									children: "Bottoms"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								children: "Price ($)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.price,
								onChange: (e) => handleChange("price", e.target.value),
								type: "number",
								className: inputClass
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								children: "Compare At Price ($)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.comparePrice,
								onChange: (e) => handleChange("comparePrice", e.target.value),
								type: "number",
								placeholder: "0.00",
								className: inputClass
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.description,
							onChange: (e) => handleChange("description", e.target.value),
							className: `${inputClass} min-h-[120px] resize-none`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: form.details,
							onChange: (e) => handleChange("details", e.target.value),
							className: `${inputClass} min-h-[120px] resize-none`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Materials"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.materials,
							onChange: (e) => handleChange("materials", e.target.value),
							className: inputClass
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Dimensions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.dimensions,
							onChange: (e) => handleChange("dimensions", e.target.value),
							className: inputClass
						})] })
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Image"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-chrome/20 bg-graphite-2/50 px-6 py-10 text-center cursor-pointer hover:border-chrome/50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl bg-graphite-2 flex items-center justify-center font-mono text-lg text-chrome-dim mb-3",
									children: product.name.charAt(0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim",
									children: "Click to replace"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[9px] text-chrome-dim/50 mt-1",
									children: "PNG, JPG up to 10MB"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Stock"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.stock,
							onChange: (e) => handleChange("stock", e.target.value),
							type: "number",
							className: inputClass
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.status,
							onChange: (e) => handleChange("status", e.target.value),
							className: inputClass,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Active",
									children: "Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Draft",
									children: "Draft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Archived",
									children: "Archived"
								})
							]
						})] })
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleSave,
				className: "btn-chrome btn-chrome-inner flex-1 justify-center !py-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn-label",
					children: saved ? "Saved ✓" : "Save Changes"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/product",
				className: "btn-chrome btn-chrome-inner justify-center !py-3.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn-label",
					children: "Cancel"
				})
			})]
		})
	] });
}
//#endregion
export { EditProduct as component };
