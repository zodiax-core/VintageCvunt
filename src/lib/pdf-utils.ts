import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface BrandInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
}

const defaultBrand: BrandInfo = {
  name: "VintageCvunt",
  tagline: "Modern Gothic Luxury",
  address: "42 Clifton Avenue, Karachi, Pakistan",
  phone: "+92 21 1123 4567",
  email: "studio@vintagecvunt.com",
};

function addFooter(doc: jsPDF, page?: number, total?: number) {
  const pw = doc.internal.pageSize.width;
  const ph = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 190);
  doc.text("VintageCvunt", pw / 2, ph - 14, { align: "center" });
  if (page && total) {
    doc.text("Page " + page + " of " + total, pw / 2, ph - 8, { align: "center" });
  }
}

function addPageNumbersFooter(doc: jsPDF) {
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    addFooter(doc, p, total);
  }
}

function addBrandBar(doc: jsPDF, yEnd: number) {
  const pw = doc.internal.pageSize.width;
  doc.setFillColor(20, 20, 30);
  doc.rect(0, 0, pw, yEnd, "F");
}

function drawHr(doc: jsPDF, y: number) {
  const pw = doc.internal.pageSize.width;
  doc.setDrawColor(220, 220, 225);
  doc.setLineWidth(0.3);
  doc.line(14, y, pw - 14, y);
}

function drawStatusBadge(doc: jsPDF, status: string, x: number, y: number, align: "left" | "right" = "left") {
  const colors: Record<string, number[]> = {
    Pending: [234, 179, 8],
    Processing: [59, 130, 246],
    Shipped: [147, 51, 234],
    Delivered: [34, 197, 94],
    Cancelled: [239, 68, 68],
  };
  const c = colors[status] || [150, 150, 160];
  doc.setFillColor(c[0], c[1], c[2]);
  const dotR = 1.5;
  const textX = align === "right" ? x : x;
  const dotX = align === "right" ? x - doc.getTextWidth(status) - 5 : x;
  doc.setDrawColor(c[0], c[1], c[2]);
  doc.circle(dotX + dotR, y - dotR, dotR, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(c[0], c[1], c[2]);
  doc.text(status, dotX + 5, y);
}

export function generateOrdersPDF(
  orders: Array<{ id: string; customer: string; email: string; date: string; items: number; total: number; status: string }>,
  brand: BrandInfo = defaultBrand,
) {
  const doc = new jsPDF();
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
  const now = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
      doc.setLineWidth(0.3);
      doc.roundedRect(14, startY, cardW, cardH, 2, 2, "S");

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 50);
      doc.text(order.id, 22, startY + 10);

      const statusColors: Record<string, number[]> = {
        Pending: [234, 179, 8],
        Processing: [59, 130, 246],
        Shipped: [147, 51, 234],
        Delivered: [34, 197, 94],
        Cancelled: [239, 68, 68],
      };
      const sc = statusColors[order.status] || [150, 150, 160];
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

      startY += cardH + 8;
    }
  }

  addPageNumbersFooter(doc);
  doc.save("orders-report.pdf");
}

export function generateReceiptPDF(
  order: {
    id: string;
    customer: string;
    email: string;
    date: string;
    status: string;
    phone: string;
    address: string;
    shipping: number;
    tax: number;
    items: Array<{ product: string; sku: string; price: number; qty: number; subtotal: number }>;
    paymentMethod?: string;
    shippingMethod?: string;
  },
  brand: BrandInfo = defaultBrand,
) {
  const doc = new jsPDF();
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
  const statusColors: Record<string, number[]> = {
    Pending: [234, 179, 8],
    Processing: [59, 130, 246],
    Shipped: [147, 51, 234],
    Delivered: [34, 197, 94],
    Cancelled: [239, 68, 68],
  };
  const sc = statusColors[order.status] || [150, 150, 160];
  doc.setTextColor(sc[0], sc[1], sc[2]);
  doc.text(order.status, infoLeftX + 40, infoY);

  infoY += 8;
  doc.setTextColor(80, 80, 90);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 70);
  doc.text("Items:", infoLeftX, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(String(order.items.length), infoLeftX + 40, infoY);

  infoY += 8;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 70);
  doc.text("Payment:", infoLeftX, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(order.paymentMethod || "Credit Card", infoLeftX + 40, infoY);

  infoY += 8;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 70);
  doc.text("Shipping:", infoLeftX, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(order.shippingMethod || "Standard", infoLeftX + 40, infoY);

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
    head: [["#", "Product", "SKU", "Qty", "Unit Price", "Subtotal"]],
    body: order.items.map((item, idx) => [
      String(idx + 1),
      item.product,
      item.sku,
      String(item.qty),
      "$" + item.price.toFixed(2),
      "$" + item.subtotal.toFixed(2),
    ]),
    foot: [
      ["", "", "", "", "Subtotal", "$" + subtotal.toFixed(2)],
      ["", "", "", "", "Shipping", "$" + order.shipping.toFixed(2)],
      ["", "", "", "", "Tax", "$" + order.tax.toFixed(2)],
      ["", "", "", "", "Total", "$" + total.toFixed(2)],
    ],
    headStyles: { fillColor: [20, 20, 30], textColor: [255, 255, 255], fontSize: 7, fontStyle: "bold" },
    bodyStyles: { fontSize: 7, textColor: [60, 60, 70] },
    footStyles: { fontSize: 7, fontStyle: "bold" },
    theme: "grid",
    margin: { left: 14, right: 14 },
    styles: {
      cellPadding: { top: 2, bottom: 2, left: 3, right: 3 },
      lineColor: [200, 200, 210],
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      1: { cellWidth: 50 },
      2: { cellWidth: 24 },
      3: { halign: "center", cellWidth: 12 },
      4: { halign: "right", cellWidth: 24 },
      5: { halign: "right", cellWidth: 24 },
    },
    footStyles: {
      fillColor: [248, 248, 252],
      textColor: [40, 40, 50],
      fontStyle: "bold",
      fontSize: 7,
    },
    didParseCell: function (data) {
      if (data.section === "foot" && data.row.index === data.table.foot.length - 1) {
        data.cell.styles.fontSize = 9;
        data.cell.styles.textColor = [40, 40, 50];
      }
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 18;

  drawHr(doc, finalY - 8);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 130);
  doc.text("Thank you for your purchase!", pw / 2, finalY, { align: "center" });

  addPageNumbersFooter(doc);
  doc.save("receipt-" + order.id + ".pdf");
}

export function generateCustomerProfilePDF(
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    joined: string;
    status: string;
    totalOrders: number;
    totalSpent: number;
    avgOrderValue: number;
    lastOrderDate: string;
    orders: Array<{ id: string; date: string; items: number; total: number; status: string }>;
  },
  brand: BrandInfo = defaultBrand,
) {
  const doc = new jsPDF();
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
  doc.text(initials, avatarX, avatarY + 3.5, { align: "center" });

  const infoX = 44;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 50);
  doc.text(customer.name, infoX, avatarY - 3);

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 130);
  doc.text(customer.email + "  ·  " + customer.phone, infoX, avatarY + 5);

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(140, 140, 150);
  doc.text("Joined " + customer.joined, infoX, avatarY + 12);

  const statusColors: Record<string, number[]> = {
    Active: [34, 197, 94],
    Inactive: [150, 150, 160],
  };
  const sc = statusColors[customer.status] || [150, 150, 160];
  doc.setFillColor(sc[0], sc[1], sc[2]);
  const statusW = doc.getTextWidth(customer.status);
  doc.circle(pw - 14 - statusW - 8, avatarY - 3, 1.5, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(sc[0], sc[1], sc[2]);
  doc.text(customer.status, pw - 14 - statusW, avatarY - 3);

  drawHr(doc, avatarY + 22);

  const stats = [
    { label: "Total Orders", value: String(customer.totalOrders) },
    { label: "Total Spent", value: "$" + customer.totalSpent.toFixed(2) },
    { label: "Avg Order Value", value: "$" + customer.avgOrderValue.toFixed(2) },
    { label: "Last Order", value: customer.lastOrderDate },
  ];

  const statsY = avatarY + 32;
  stats.forEach((stat, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const sx = 14 + col * 90;
    const sy = statsY + row * 32;

    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.2);
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

  const tableY = statsY + 68;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 50);
  doc.text("ORDER HISTORY", 14, tableY);

  autoTable(doc, {
    startY: tableY + 5,
    head: [["Order ID", "Date", "Items", "Total", "Status"]],
    body: customer.orders.map((o) => [o.id, o.date, String(o.items), "$" + o.total.toFixed(2), o.status]),
    headStyles: { fillColor: [20, 20, 30], textColor: [255, 255, 255], fontSize: 7, fontStyle: "bold" },
    bodyStyles: { fontSize: 7, textColor: [60, 60, 70] },
    theme: "grid",
    margin: { left: 14, right: 14 },
    styles: {
      cellPadding: { top: 2, bottom: 2, left: 3, right: 3 },
      lineColor: [200, 200, 210],
      lineWidth: 0.1,
    },
    columnStyles: {
      2: { halign: "center" },
      3: { halign: "right" },
      4: { halign: "center" },
    },
  });

  addPageNumbersFooter(doc);
  doc.save("profile-" + customer.name.toLowerCase().replace(/\s+/g, "-") + ".pdf");
}
