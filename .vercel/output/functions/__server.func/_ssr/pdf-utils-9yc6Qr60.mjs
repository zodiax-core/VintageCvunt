import { o as __toESM } from "../_runtime.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-utils-9yc6Qr60.js
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var defaultBrand = {
	name: "VintageCvunt",
	tagline: "Modern Gothic Luxury",
	address: "42 Clifton Avenue, Karachi, Pakistan",
	phone: "+92 21 1123 4567",
	email: "studio@vintagecvunt.com"
};
function addFooter(doc, page, total) {
	const pw = doc.internal.pageSize.width;
	const ph = doc.internal.pageSize.height;
	doc.setFontSize(8);
	doc.setTextColor(180, 180, 190);
	doc.text("VintageCvunt", pw / 2, ph - 14, { align: "center" });
	if (page && total) doc.text("Page " + page + " of " + total, pw / 2, ph - 8, { align: "center" });
}
function addPageNumbersFooter(doc) {
	const total = doc.getNumberOfPages();
	for (let p = 1; p <= total; p++) {
		doc.setPage(p);
		addFooter(doc, p, total);
	}
}
function addBrandBar(doc, yEnd) {
	const pw = doc.internal.pageSize.width;
	doc.setFillColor(20, 20, 30);
	doc.rect(0, 0, pw, yEnd, "F");
}
function drawHr(doc, y) {
	const pw = doc.internal.pageSize.width;
	doc.setDrawColor(220, 220, 225);
	doc.setLineWidth(.3);
	doc.line(14, y, pw - 14, y);
}
function generateOrdersPDF(orders, brand = defaultBrand) {
	const doc = new import_jspdf_node_min.default();
	const pw = doc.internal.pageSize.width;
	addBrandBar(doc, 80);
	doc.setTextColor(255, 255, 255);
	doc.setFontSize(26);
	doc.setFont("helvetica", "bold");
	doc.text(brand.name.toUpperCase(), pw / 2, 32, { align: "center" });
	doc.setFontSize(10);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(200, 200, 215);
	doc.text(brand.tagline, pw / 2, 45, { align: "center" });
	doc.setFontSize(8);
	doc.text(brand.address, pw / 2, 58, { align: "center" });
	doc.text(brand.phone + "  |  " + brand.email, pw / 2, 68, { align: "center" });
	doc.setTextColor(50, 50, 60);
	doc.setFontSize(18);
	doc.setFont("helvetica", "bold");
	doc.text("ORDERS REPORT", pw / 2, 112, { align: "center" });
	doc.setFontSize(9);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(120, 120, 130);
	const now = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	doc.text("Generated: " + now, pw / 2, 128, { align: "center" });
	doc.text("Total Orders: " + orders.length, pw / 2, 139, { align: "center" });
	drawHr(doc, 155);
	let pageNum = 1;
	for (let i = 0; i < orders.length; i += 3) {
		if (i > 0) {
			doc.addPage();
			pageNum++;
		}
		const pageOrders = orders.slice(i, i + 3);
		let startY = 20;
		for (const order of pageOrders) {
			const cardW = pw - 28;
			const cardH = 52;
			doc.setDrawColor(200, 200, 210);
			doc.setLineWidth(.3);
			doc.roundedRect(14, startY, cardW, cardH, 2, 2, "S");
			doc.setFontSize(10);
			doc.setFont("helvetica", "bold");
			doc.setTextColor(40, 40, 50);
			doc.text(order.id, 22, startY + 10);
			const sc = {
				Pending: [
					234,
					179,
					8
				],
				Processing: [
					59,
					130,
					246
				],
				Shipped: [
					147,
					51,
					234
				],
				Delivered: [
					34,
					197,
					94
				],
				Cancelled: [
					239,
					68,
					68
				]
			}[order.status] || [
				150,
				150,
				160
			];
			doc.setFillColor(sc[0], sc[1], sc[2]);
			doc.circle(pw - 14 - 14 - doc.getTextWidth(order.status) - 5, startY + 6, 1.5, "F");
			doc.setFontSize(7);
			doc.setFont("helvetica", "bold");
			doc.setTextColor(sc[0], sc[1], sc[2]);
			doc.text(order.status, pw - 14 - 14 - doc.getTextWidth(order.status), startY + 6);
			doc.setFont("helvetica", "normal");
			doc.setFontSize(9);
			doc.setTextColor(80, 80, 90);
			doc.text(order.customer, 22, startY + 22);
			doc.setFontSize(7);
			doc.setTextColor(140, 140, 150);
			doc.text(order.email, 22, startY + 30);
			doc.setFontSize(11);
			doc.setFont("helvetica", "bold");
			doc.setTextColor(40, 40, 50);
			const totalStr = "$" + order.total.toFixed(2);
			doc.text(totalStr, pw - 14 - 14 - doc.getTextWidth(totalStr), startY + 22);
			doc.setFontSize(7);
			doc.setFont("helvetica", "normal");
			doc.setTextColor(140, 140, 150);
			doc.text(order.date + "  ·  " + order.items + " items", 22, startY + 40);
			startY += 60;
		}
	}
	addPageNumbersFooter(doc);
	doc.save("orders-report.pdf");
}
function generateReceiptPDF(order, brand = defaultBrand) {
	const doc = new import_jspdf_node_min.default();
	const pw = doc.internal.pageSize.width;
	addBrandBar(doc, 42);
	doc.setTextColor(255, 255, 255);
	doc.setFontSize(18);
	doc.setFont("helvetica", "bold");
	doc.text(brand.name.toUpperCase(), 14, 17);
	doc.setFontSize(8);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(180, 180, 195);
	doc.text(brand.tagline, 14, 26);
	doc.text(brand.address + "  |  " + brand.phone, 14, 35);
	doc.setFontSize(14);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(255, 255, 255);
	doc.text("INVOICE", pw - 14, 17, { align: "right" });
	doc.setFontSize(8);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(200, 200, 215);
	doc.text(order.id, pw - 14, 27, { align: "right" });
	doc.text(order.date, pw - 14, 36, { align: "right" });
	drawHr(doc, 52);
	doc.setFontSize(9);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(40, 40, 50);
	doc.text("BILL TO", 14, 64);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9);
	doc.setTextColor(80, 80, 90);
	const addrLines = order.address.split(", ");
	let addrY = 73;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9);
	doc.setTextColor(60, 60, 70);
	doc.text(order.customer, 14, addrY);
	addrY += 7;
	doc.text(order.email, 14, addrY);
	addrY += 7;
	doc.text(order.phone, 14, addrY);
	addrY += 7;
	for (const line of addrLines) {
		doc.text(line, 14, addrY);
		addrY += 7;
	}
	const infoLeftX = 115;
	doc.setFontSize(9);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(40, 40, 50);
	doc.text("ORDER INFO", infoLeftX, 64);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(8);
	doc.setTextColor(80, 80, 90);
	let infoY = 73;
	doc.setFont("helvetica", "bold");
	doc.setTextColor(60, 60, 70);
	doc.text("Status:", infoLeftX, infoY);
	doc.setFont("helvetica", "normal");
	const sc = {
		Pending: [
			234,
			179,
			8
		],
		Processing: [
			59,
			130,
			246
		],
		Shipped: [
			147,
			51,
			234
		],
		Delivered: [
			34,
			197,
			94
		],
		Cancelled: [
			239,
			68,
			68
		]
	}[order.status] || [
		150,
		150,
		160
	];
	doc.setTextColor(sc[0], sc[1], sc[2]);
	doc.text(order.status, 155, infoY);
	infoY += 8;
	doc.setTextColor(80, 80, 90);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(60, 60, 70);
	doc.text("Items:", infoLeftX, infoY);
	doc.setFont("helvetica", "normal");
	doc.text(String(order.items.length), 155, infoY);
	infoY += 8;
	doc.setFont("helvetica", "bold");
	doc.setTextColor(60, 60, 70);
	doc.text("Payment:", infoLeftX, infoY);
	doc.setFont("helvetica", "normal");
	doc.text(order.paymentMethod || "Credit Card", 155, infoY);
	infoY += 8;
	doc.setFont("helvetica", "bold");
	doc.setTextColor(60, 60, 70);
	doc.text("Shipping:", infoLeftX, infoY);
	doc.setFont("helvetica", "normal");
	doc.text(order.shippingMethod || "Standard", 155, infoY);
	drawHr(doc, addrY + 10);
	const tableY = addrY + 16;
	doc.setFontSize(9);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(40, 40, 50);
	doc.text("ITEMS", 14, tableY);
	const subtotal = order.items.reduce((s, i) => s + i.subtotal, 0);
	const total = subtotal + order.shipping + order.tax;
	autoTable(doc, {
		startY: tableY + 5,
		head: [[
			"#",
			"Product",
			"SKU",
			"Qty",
			"Unit Price",
			"Subtotal"
		]],
		body: order.items.map((item, idx) => [
			String(idx + 1),
			item.product,
			item.sku,
			String(item.qty),
			"$" + item.price.toFixed(2),
			"$" + item.subtotal.toFixed(2)
		]),
		foot: [
			[
				"",
				"",
				"",
				"",
				"Subtotal",
				"$" + subtotal.toFixed(2)
			],
			[
				"",
				"",
				"",
				"",
				"Shipping",
				"$" + order.shipping.toFixed(2)
			],
			[
				"",
				"",
				"",
				"",
				"Tax",
				"$" + order.tax.toFixed(2)
			],
			[
				"",
				"",
				"",
				"",
				"Total",
				"$" + total.toFixed(2)
			]
		],
		headStyles: {
			fillColor: [
				20,
				20,
				30
			],
			textColor: [
				255,
				255,
				255
			],
			fontSize: 7,
			fontStyle: "bold"
		},
		bodyStyles: {
			fontSize: 7,
			textColor: [
				60,
				60,
				70
			]
		},
		footStyles: {
			fontSize: 7,
			fontStyle: "bold"
		},
		theme: "grid",
		margin: {
			left: 14,
			right: 14
		},
		styles: {
			cellPadding: {
				top: 2,
				bottom: 2,
				left: 3,
				right: 3
			},
			lineColor: [
				200,
				200,
				210
			],
			lineWidth: .1
		},
		columnStyles: {
			0: {
				halign: "center",
				cellWidth: 10
			},
			1: { cellWidth: 50 },
			2: { cellWidth: 24 },
			3: {
				halign: "center",
				cellWidth: 12
			},
			4: {
				halign: "right",
				cellWidth: 24
			},
			5: {
				halign: "right",
				cellWidth: 24
			}
		},
		footStyles: {
			fillColor: [
				248,
				248,
				252
			],
			textColor: [
				40,
				40,
				50
			],
			fontStyle: "bold",
			fontSize: 7
		},
		didParseCell: function(data) {
			if (data.section === "foot" && data.row.index === data.table.foot.length - 1) {
				data.cell.styles.fontSize = 9;
				data.cell.styles.textColor = [
					40,
					40,
					50
				];
			}
		}
	});
	const finalY = doc.lastAutoTable.finalY + 18;
	drawHr(doc, finalY - 8);
	doc.setFontSize(9);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(120, 120, 130);
	doc.text("Thank you for your purchase!", pw / 2, finalY, { align: "center" });
	addPageNumbersFooter(doc);
	doc.save("receipt-" + order.id + ".pdf");
}
function generateCustomerProfilePDF(customer, brand = defaultBrand) {
	const doc = new import_jspdf_node_min.default();
	const pw = doc.internal.pageSize.width;
	addBrandBar(doc, 38);
	doc.setTextColor(255, 255, 255);
	doc.setFontSize(16);
	doc.setFont("helvetica", "bold");
	doc.text(brand.name.toUpperCase(), 14, 16);
	doc.setFontSize(7);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(180, 180, 195);
	doc.text(brand.address, 14, 26);
	doc.text(brand.phone + "  |  " + brand.email, 14, 34);
	doc.setFontSize(14);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(255, 255, 255);
	doc.text("CUSTOMER PROFILE", pw - 14, 16, { align: "right" });
	doc.setFontSize(8);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(200, 200, 215);
	doc.text(customer.id, pw - 14, 26, { align: "right" });
	drawHr(doc, 48);
	const avatarR = 12;
	const avatarX = 24;
	const avatarY = 66;
	doc.setFillColor(20, 20, 30);
	doc.circle(avatarX, avatarY, avatarR, "F");
	const initials = customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
	doc.setFontSize(10);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(255, 255, 255);
	doc.text(initials, avatarX, 69.5, { align: "center" });
	const infoX = 44;
	doc.setFontSize(10);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(40, 40, 50);
	doc.text(customer.name, infoX, avatarY - 3);
	doc.setFontSize(7);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(120, 120, 130);
	doc.text(customer.email + "  ·  " + customer.phone, infoX, 71);
	doc.setFontSize(7);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(140, 140, 150);
	doc.text("Joined " + customer.joined, infoX, 78);
	const sc = {
		Active: [
			34,
			197,
			94
		],
		Inactive: [
			150,
			150,
			160
		]
	}[customer.status] || [
		150,
		150,
		160
	];
	doc.setFillColor(sc[0], sc[1], sc[2]);
	const statusW = doc.getTextWidth(customer.status);
	doc.circle(pw - 14 - statusW - 8, avatarY - 3, 1.5, "F");
	doc.setFontSize(7);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(sc[0], sc[1], sc[2]);
	doc.text(customer.status, pw - 14 - statusW, avatarY - 3);
	drawHr(doc, 88);
	const stats = [
		{
			label: "Total Orders",
			value: String(customer.totalOrders)
		},
		{
			label: "Total Spent",
			value: "$" + customer.totalSpent.toFixed(2)
		},
		{
			label: "Avg Order Value",
			value: "$" + customer.avgOrderValue.toFixed(2)
		},
		{
			label: "Last Order",
			value: customer.lastOrderDate
		}
	];
	const statsY = 98;
	stats.forEach((stat, idx) => {
		const col = idx % 2;
		const row = Math.floor(idx / 2);
		const sx = 14 + col * 90;
		const sy = statsY + row * 32;
		doc.setDrawColor(220, 220, 225);
		doc.setLineWidth(.2);
		doc.roundedRect(sx, sy, 82, 24, 2, 2, "S");
		doc.setFontSize(7);
		doc.setFont("helvetica", "normal");
		doc.setTextColor(120, 120, 130);
		doc.text(stat.label, sx + 10, sy + 9);
		doc.setFontSize(11);
		doc.setFont("helvetica", "bold");
		doc.setTextColor(40, 40, 50);
		doc.text(stat.value, sx + 10, sy + 21);
	});
	const tableY = 166;
	doc.setFontSize(9);
	doc.setFont("helvetica", "bold");
	doc.setTextColor(40, 40, 50);
	doc.text("ORDER HISTORY", 14, tableY);
	autoTable(doc, {
		startY: 171,
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
			"$" + o.total.toFixed(2),
			o.status
		]),
		headStyles: {
			fillColor: [
				20,
				20,
				30
			],
			textColor: [
				255,
				255,
				255
			],
			fontSize: 7,
			fontStyle: "bold"
		},
		bodyStyles: {
			fontSize: 7,
			textColor: [
				60,
				60,
				70
			]
		},
		theme: "grid",
		margin: {
			left: 14,
			right: 14
		},
		styles: {
			cellPadding: {
				top: 2,
				bottom: 2,
				left: 3,
				right: 3
			},
			lineColor: [
				200,
				200,
				210
			],
			lineWidth: .1
		},
		columnStyles: {
			2: { halign: "center" },
			3: { halign: "right" },
			4: { halign: "center" }
		}
	});
	addPageNumbersFooter(doc);
	doc.save("profile-" + customer.name.toLowerCase().replace(/\s+/g, "-") + ".pdf");
}
//#endregion
export { generateOrdersPDF as n, generateReceiptPDF as r, generateCustomerProfilePDF as t };
