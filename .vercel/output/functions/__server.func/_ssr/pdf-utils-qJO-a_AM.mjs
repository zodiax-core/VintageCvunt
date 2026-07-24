import { o as __toESM } from "../_runtime.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-utils-qJO-a_AM.js
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var defaultBrand = {
	name: "VintageCvunt",
	tagline: "Objects / Chrome / Bone",
	address: "42 Clifton Avenue, Karachi, Pakistan",
	phone: "+92 21 1123 4567",
	email: "studio@vintagecvunt.com"
};
var C = {
	BLACK: [
		0,
		0,
		0
	],
	DARK_GRAY: [
		50,
		50,
		50
	],
	GRAY: [
		120,
		120,
		120
	],
	LIGHT_GRAY: [
		230,
		230,
		230
	],
	WHITE: [
		255,
		255,
		255
	],
	STATUS: {
		Pending: [
			217,
			119,
			6
		],
		Processing: [
			37,
			99,
			235
		],
		Shipped: [
			124,
			58,
			237
		],
		Delivered: [
			22,
			163,
			74
		],
		Cancelled: [
			220,
			38,
			38
		]
	}
};
function fmt(n) {
	return "PKR " + n.toLocaleString("en-PK");
}
function fmtDate(ts) {
	if (!ts) return "—";
	return new Date(typeof ts === "number" ? ts : ts).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}
function setFont(doc, weight = "normal", size = 9) {
	doc.setFont("helvetica", weight);
	doc.setFontSize(size);
}
function rule(doc, y, color = C.LIGHT_GRAY) {
	const pw = doc.internal.pageSize.width;
	doc.setDrawColor(...color);
	doc.setLineWidth(.2);
	doc.line(14, y, pw - 14, y);
}
function statusBadge(doc, status, x, y) {
	const color = C.STATUS[status] || C.GRAY;
	const label = status.toUpperCase();
	setFont(doc, "bold", 7);
	doc.setTextColor(...color);
	const tw = doc.getTextWidth(label);
	const padX = 4;
	doc.setDrawColor(...color);
	doc.setFillColor(color[0] + (255 - color[0]) * .9, color[1] + (255 - color[1]) * .9, color[2] + (255 - color[2]) * .9);
	doc.setLineWidth(.2);
	doc.roundedRect(x, y - 5, tw + padX * 2, 7, 1.5, 1.5, "FD");
	doc.text(label, x + padX, y);
}
function pageFooter(doc, brand) {
	const pw = doc.internal.pageSize.width;
	const ph = doc.internal.pageSize.height;
	rule(doc, ph - 16, C.LIGHT_GRAY);
	setFont(doc, "normal", 7);
	doc.setTextColor(...C.GRAY);
	doc.text(`${brand.name.toUpperCase()} · ${brand.address} · ${brand.email}`, pw / 2, ph - 8, { align: "center" });
}
function addPageNumbers(doc, brand) {
	const total = doc.getNumberOfPages();
	for (let p = 1; p <= total; p++) {
		doc.setPage(p);
		pageFooter(doc, brand);
		if (total > 1) {
			const pw = doc.internal.pageSize.width;
			const ph = doc.internal.pageSize.height;
			setFont(doc, "normal", 6.5);
			doc.setTextColor(...C.GRAY);
			doc.text(`${p} / ${total}`, pw - 14, ph - 8, { align: "right" });
		}
	}
}
function generateReceiptPDF(order, brand = defaultBrand) {
	const doc = new import_jspdf_node_min.default({
		unit: "mm",
		format: "a4"
	});
	const pw = doc.internal.pageSize.width;
	const orderNumber = order.orderNumber || order.id;
	const customer = order.customerName || "Customer";
	const email = order.customerEmail || "";
	const date = order._creationTime ? fmtDate(order._creationTime) : fmtDate(Date.now());
	const paymentMethod = order.paymentMethod || "Bank Transfer";
	const shipAddr = order.shippingAddress || {
		street: "",
		city: "",
		zip: "",
		country: ""
	};
	const billAddr = order.billingAddress || shipAddr;
	setFont(doc, "bold", 24);
	doc.setTextColor(...C.BLACK);
	doc.text(brand.name.toUpperCase(), 14, 24);
	setFont(doc, "normal", 9);
	doc.setTextColor(...C.GRAY);
	doc.text(brand.tagline, 14, 30);
	setFont(doc, "bold", 18);
	doc.setTextColor(...C.BLACK);
	doc.text("RECEIPT", pw - 14, 24, { align: "right" });
	setFont(doc, "normal", 9);
	doc.setTextColor(...C.GRAY);
	doc.text(orderNumber, pw - 14, 30, { align: "right" });
	let y = 42;
	rule(doc, y, C.LIGHT_GRAY);
	y += 12;
	const metaItems = [
		{
			label: "Date",
			value: date
		},
		{
			label: "Order",
			value: orderNumber
		},
		{
			label: "Status",
			value: order.status.charAt(0).toUpperCase() + order.status.slice(1),
			isStatus: true
		},
		{
			label: "Payment",
			value: paymentMethod
		}
	];
	const colW = (pw - 28) / 4;
	metaItems.forEach((m, i) => {
		const mx = 14 + i * colW;
		setFont(doc, "bold", 7);
		doc.setTextColor(...C.GRAY);
		doc.text(m.label.toUpperCase(), mx, y);
		if (m.isStatus) statusBadge(doc, m.value, mx, y + 6);
		else {
			setFont(doc, "bold", 9);
			doc.setTextColor(...C.BLACK);
			doc.text(m.value, mx, y + 6);
		}
	});
	y += 20;
	rule(doc, y, C.LIGHT_GRAY);
	y += 12;
	const halfW = (pw - 28) / 2 - 4;
	setFont(doc, "bold", 7);
	doc.setTextColor(...C.GRAY);
	doc.text("BILL TO", 14, y);
	setFont(doc, "bold", 9);
	doc.setTextColor(...C.BLACK);
	doc.text(customer, 14, y + 6);
	setFont(doc, "normal", 8.5);
	doc.setTextColor(...C.DARK_GRAY);
	let addrY = y + 12;
	doc.text(email, 14, addrY);
	addrY += 5;
	if (billAddr.street) [
		billAddr.street,
		`${billAddr.city}, ${billAddr.zip}`,
		billAddr.country
	].filter(Boolean).forEach((line) => {
		doc.text(line, 14, addrY);
		addrY += 5;
	});
	const rx = 14 + halfW + 8;
	setFont(doc, "bold", 7);
	doc.setTextColor(...C.GRAY);
	doc.text("SHIP TO", rx, y);
	setFont(doc, "bold", 9);
	doc.setTextColor(...C.BLACK);
	doc.text(customer, rx, y + 6);
	setFont(doc, "normal", 8.5);
	doc.setTextColor(...C.DARK_GRAY);
	let shipY = y + 12;
	if (shipAddr.street) [
		shipAddr.street,
		`${shipAddr.city}, ${shipAddr.zip}`,
		shipAddr.country
	].filter(Boolean).forEach((line) => {
		doc.text(line, rx, shipY);
		shipY += 5;
	});
	y = Math.max(addrY, shipY) + 10;
	rule(doc, y, C.LIGHT_GRAY);
	y += 12;
	setFont(doc, "bold", 7);
	doc.setTextColor(...C.GRAY);
	doc.text("ITEMS ORDERED", 14, y);
	y += 4;
	const normalizedItems = order.items.map((item) => ({
		name: item.name || item.product || "Item",
		sku: item.sku || "N/A",
		qty: item.quantity || item.qty || 1,
		price: item.price || 0,
		subtotal: item.subtotal || (item.quantity || item.qty || 1) * (item.price || 0)
	}));
	const subtotal = order.subtotal || normalizedItems.reduce((s, i) => s + i.subtotal, 0);
	const total = order.total || subtotal + order.shipping + order.tax;
	autoTable(doc, {
		startY: y,
		head: [[
			"#",
			"Product",
			"Qty",
			"Unit Price",
			"Total"
		]],
		body: normalizedItems.map((item, idx) => [
			String(idx + 1),
			item.name,
			String(item.qty),
			fmt(item.price),
			fmt(item.subtotal)
		]),
		headStyles: {
			fillColor: [
				250,
				250,
				250
			],
			textColor: C.BLACK,
			fontSize: 8,
			fontStyle: "bold",
			cellPadding: {
				top: 4,
				bottom: 4,
				left: 4,
				right: 4
			},
			lineWidth: {
				top: .2,
				bottom: .2,
				left: 0,
				right: 0
			},
			lineColor: C.LIGHT_GRAY
		},
		bodyStyles: {
			fontSize: 8.5,
			textColor: C.DARK_GRAY,
			cellPadding: {
				top: 4,
				bottom: 4,
				left: 4,
				right: 4
			},
			lineWidth: {
				top: 0,
				bottom: .2,
				left: 0,
				right: 0
			},
			lineColor: [
				240,
				240,
				240
			]
		},
		theme: "plain",
		margin: {
			left: 14,
			right: 14
		},
		columnStyles: {
			0: {
				halign: "center",
				cellWidth: 10,
				textColor: C.GRAY
			},
			1: { cellWidth: "auto" },
			2: {
				halign: "center",
				cellWidth: 16
			},
			3: {
				halign: "right",
				cellWidth: 32
			},
			4: {
				halign: "right",
				cellWidth: 32,
				textColor: C.BLACK,
				fontStyle: "bold"
			}
		}
	});
	y = doc.lastAutoTable.finalY + 8;
	const sumX = pw - 14 - 80;
	const rows = [
		{
			label: "Subtotal",
			value: fmt(subtotal)
		},
		{
			label: "Shipping",
			value: order.shipping === 0 ? "Free" : fmt(order.shipping)
		},
		{
			label: "Tax",
			value: fmt(order.tax)
		}
	];
	let ry = y;
	rows.forEach((row) => {
		setFont(doc, "normal", 8.5);
		doc.setTextColor(...C.GRAY);
		doc.text(row.label, sumX, ry);
		doc.setTextColor(...C.BLACK);
		doc.text(row.value, pw - 14, ry, { align: "right" });
		ry += 6;
	});
	ry += 2;
	doc.setDrawColor(...C.LIGHT_GRAY);
	doc.setLineWidth(.3);
	doc.line(sumX, ry, pw - 14, ry);
	ry += 6;
	setFont(doc, "bold", 12);
	doc.setTextColor(...C.BLACK);
	doc.text("Total", sumX, ry);
	doc.text(fmt(total), pw - 14, ry, { align: "right" });
	y = ry + 40;
	if (y > 260) {
		doc.addPage();
		y = 20;
	}
	setFont(doc, "bold", 12);
	doc.setTextColor(...C.BLACK);
	doc.text("Thank you for your patronage.", 14, y);
	setFont(doc, "normal", 8.5);
	doc.setTextColor(...C.GRAY);
	doc.text(`For support or returns, please contact ${brand.email}`, 14, y + 6);
	addPageNumbers(doc, brand);
	doc.save(`VC-Receipt-${orderNumber}.pdf`);
}
function generateOrdersPDF(orders, brand = defaultBrand) {
	const doc = new import_jspdf_node_min.default({
		unit: "mm",
		format: "a4",
		orientation: "landscape"
	});
	const pw = doc.internal.pageSize.width;
	const now = fmtDate(Date.now());
	setFont(doc, "bold", 24);
	doc.setTextColor(...C.BLACK);
	doc.text(brand.name.toUpperCase(), 14, 24);
	setFont(doc, "bold", 18);
	doc.setTextColor(...C.BLACK);
	doc.text("ORDERS REPORT", pw - 14, 24, { align: "right" });
	setFont(doc, "normal", 9);
	doc.setTextColor(...C.GRAY);
	doc.text(`Generated: ${now}`, pw - 14, 30, { align: "right" });
	let y = 42;
	rule(doc, y, C.LIGHT_GRAY);
	y += 12;
	const totalRev = orders.reduce((s, o) => s + o.total, 0);
	const delivered = orders.filter((o) => o.status === "Delivered").length;
	const pending = orders.filter((o) => o.status.toLowerCase() === "pending" || o.status.toLowerCase() === "processing").length;
	const stats = [
		{
			label: "Total Orders",
			value: String(orders.length)
		},
		{
			label: "Total Revenue",
			value: fmt(totalRev)
		},
		{
			label: "Delivered",
			value: String(delivered)
		},
		{
			label: "Pending / Processing",
			value: String(pending)
		}
	];
	const cardW = (pw - 28) / 4;
	stats.forEach((s, i) => {
		const cx = 14 + i * cardW;
		setFont(doc, "bold", 7);
		doc.setTextColor(...C.GRAY);
		doc.text(s.label.toUpperCase(), cx, y);
		setFont(doc, "bold", 14);
		doc.setTextColor(...C.BLACK);
		doc.text(s.value, cx, y + 8);
	});
	y += 20;
	rule(doc, y, C.LIGHT_GRAY);
	y += 8;
	autoTable(doc, {
		startY: y,
		head: [[
			"Order ID",
			"Customer",
			"Email",
			"Date",
			"Items",
			"Total",
			"Status"
		]],
		body: orders.map((o) => [
			o.orderNumber || o.id,
			o.customerName || o.customer,
			o.customerEmail || o.email,
			o._creationTime ? fmtDate(o._creationTime) : o.date,
			String(o.items),
			fmt(o.total),
			o.status.charAt(0).toUpperCase() + o.status.slice(1)
		]),
		headStyles: {
			fillColor: [
				250,
				250,
				250
			],
			textColor: C.BLACK,
			fontSize: 8,
			fontStyle: "bold",
			cellPadding: {
				top: 4,
				bottom: 4,
				left: 4,
				right: 4
			},
			lineWidth: {
				top: .2,
				bottom: .2,
				left: 0,
				right: 0
			},
			lineColor: C.LIGHT_GRAY
		},
		bodyStyles: {
			fontSize: 8.5,
			textColor: C.DARK_GRAY,
			cellPadding: {
				top: 4,
				bottom: 4,
				left: 4,
				right: 4
			},
			lineWidth: {
				top: 0,
				bottom: .2,
				left: 0,
				right: 0
			},
			lineColor: [
				240,
				240,
				240
			]
		},
		theme: "plain",
		margin: {
			left: 14,
			right: 14
		},
		columnStyles: {
			0: {
				textColor: C.BLACK,
				fontStyle: "bold",
				cellWidth: 32
			},
			1: { cellWidth: 40 },
			2: { cellWidth: 50 },
			3: { cellWidth: 32 },
			4: {
				cellWidth: 16,
				halign: "center"
			},
			5: {
				halign: "right",
				cellWidth: 32,
				textColor: C.BLACK,
				fontStyle: "bold"
			},
			6: {
				halign: "center",
				cellWidth: 32
			}
		},
		didParseCell(data) {
			if (data.column.index === 6 && data.section === "body") {
				const status = data.cell.raw;
				const color = C.STATUS[status] || C.GRAY;
				data.cell.styles.textColor = color;
				data.cell.styles.fontStyle = "bold";
			}
		}
	});
	addPageNumbers(doc, brand);
	doc.save("VC-Orders-Report.pdf");
}
function generateCustomerProfilePDF(customer, brand = defaultBrand) {
	const doc = new import_jspdf_node_min.default({
		unit: "mm",
		format: "a4"
	});
	const pw = doc.internal.pageSize.width;
	setFont(doc, "bold", 24);
	doc.setTextColor(...C.BLACK);
	doc.text(brand.name.toUpperCase(), 14, 24);
	setFont(doc, "bold", 18);
	doc.setTextColor(...C.BLACK);
	doc.text("CUSTOMER PROFILE", pw - 14, 24, { align: "right" });
	setFont(doc, "normal", 9);
	doc.setTextColor(...C.GRAY);
	doc.text(customer.id, pw - 14, 30, { align: "right" });
	let y = 42;
	rule(doc, y, C.LIGHT_GRAY);
	y += 12;
	setFont(doc, "bold", 20);
	doc.setTextColor(...C.BLACK);
	doc.text(customer.name, 14, y);
	setFont(doc, "normal", 9);
	doc.setTextColor(...C.DARK_GRAY);
	doc.text(customer.email, 14, y + 6);
	doc.text(customer.phone, 14, y + 12);
	statusBadge(doc, customer.status, pw - 40, y);
	y += 24;
	rule(doc, y, C.LIGHT_GRAY);
	y += 12;
	const stats = [
		{
			label: "Total Orders",
			value: String(customer.totalOrders)
		},
		{
			label: "Total Spent",
			value: fmt(customer.totalSpent)
		},
		{
			label: "Avg Order Value",
			value: fmt(customer.avgOrderValue)
		},
		{
			label: "Last Order",
			value: customer.lastOrderDate
		}
	];
	const cardW = (pw - 28) / 4;
	stats.forEach((s, i) => {
		const cx = 14 + i * cardW;
		setFont(doc, "bold", 7);
		doc.setTextColor(...C.GRAY);
		doc.text(s.label.toUpperCase(), cx, y);
		setFont(doc, "bold", 11);
		doc.setTextColor(...C.BLACK);
		doc.text(s.value, cx, y + 8);
	});
	y += 20;
	rule(doc, y, C.LIGHT_GRAY);
	y += 12;
	setFont(doc, "bold", 7);
	doc.setTextColor(...C.GRAY);
	doc.text("ORDER HISTORY", 14, y);
	y += 4;
	autoTable(doc, {
		startY: y,
		head: [[
			"Order ID",
			"Date",
			"Items",
			"Total",
			"Status"
		]],
		body: customer.orders.map((o) => [
			o.id,
			o.date,
			String(o.items),
			fmt(o.total),
			o.status.charAt(0).toUpperCase() + o.status.slice(1)
		]),
		headStyles: {
			fillColor: [
				250,
				250,
				250
			],
			textColor: C.BLACK,
			fontSize: 8,
			fontStyle: "bold",
			cellPadding: {
				top: 4,
				bottom: 4,
				left: 4,
				right: 4
			},
			lineWidth: {
				top: .2,
				bottom: .2,
				left: 0,
				right: 0
			},
			lineColor: C.LIGHT_GRAY
		},
		bodyStyles: {
			fontSize: 8.5,
			textColor: C.DARK_GRAY,
			cellPadding: {
				top: 4,
				bottom: 4,
				left: 4,
				right: 4
			},
			lineWidth: {
				top: 0,
				bottom: .2,
				left: 0,
				right: 0
			},
			lineColor: [
				240,
				240,
				240
			]
		},
		theme: "plain",
		margin: {
			left: 14,
			right: 14
		},
		columnStyles: {
			0: {
				textColor: C.BLACK,
				fontStyle: "bold"
			},
			2: { halign: "center" },
			3: {
				halign: "right",
				textColor: C.BLACK,
				fontStyle: "bold"
			},
			4: { halign: "center" }
		},
		didParseCell(data) {
			if (data.column.index === 4 && data.section === "body") {
				const status = data.cell.raw;
				const color = C.STATUS[status] || C.GRAY;
				data.cell.styles.textColor = color;
				data.cell.styles.fontStyle = "bold";
			}
		}
	});
	addPageNumbers(doc, brand);
	doc.save(`VC-Customer-${customer.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
//#endregion
export { generateOrdersPDF as n, generateReceiptPDF as r, generateCustomerProfilePDF as t };
