import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ─── Brand Config ─────────────────────────────────────────────────────────────
interface BrandInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
}

const defaultBrand: BrandInfo = {
  name: "VintageCvunt",
  tagline: "Objects / Chrome / Bone",
  address: "42 Clifton Avenue, Karachi, Pakistan",
  phone: "+92 21 1123 4567",
  email: "studio@vintagecvunt.com",
};

// ─── Color Palette (Light Theme for PDF) ──────────────────────────────────────
const C = {
  BLACK: [0, 0, 0] as [number, number, number],
  DARK_GRAY: [50, 50, 50] as [number, number, number],
  GRAY: [120, 120, 120] as [number, number, number],
  LIGHT_GRAY: [230, 230, 230] as [number, number, number],
  WHITE: [255, 255, 255] as [number, number, number],
  STATUS: {
    Pending: [217, 119, 6] as [number, number, number], // Amber
    Processing: [37, 99, 235] as [number, number, number], // Blue
    Shipped: [124, 58, 237] as [number, number, number], // Purple
    Delivered: [22, 163, 74] as [number, number, number], // Green
    Cancelled: [220, 38, 38] as [number, number, number], // Red
  } as Record<string, [number, number, number]>,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  return "PKR " + n.toLocaleString("en-PK");
}

function fmtDate(ts?: number | string): string {
  if (!ts) return "—";
  const d = new Date(typeof ts === "number" ? ts : ts);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function setFont(doc: jsPDF, weight: "normal" | "bold" = "normal", size = 9) {
  doc.setFont("helvetica", weight);
  doc.setFontSize(size);
}

// Thin rule
function rule(doc: jsPDF, y: number, color: [number, number, number] = C.LIGHT_GRAY) {
  const pw = doc.internal.pageSize.width;
  doc.setDrawColor(...color);
  doc.setLineWidth(0.2);
  doc.line(14, y, pw - 14, y);
}

// Status badge (pill)
function statusBadge(doc: jsPDF, status: string, x: number, y: number) {
  const color = C.STATUS[status] || C.GRAY;
  const label = status.toUpperCase();
  setFont(doc, "bold", 7);
  doc.setTextColor(...color);
  const tw = doc.getTextWidth(label);
  const padX = 4;
  
  // Background
  doc.setDrawColor(...color);
  doc.setFillColor(color[0] + (255 - color[0]) * 0.9, color[1] + (255 - color[1]) * 0.9, color[2] + (255 - color[2]) * 0.9);
  doc.setLineWidth(0.2);
  doc.roundedRect(x, y - 5, tw + padX * 2, 7, 1.5, 1.5, "FD");
  doc.text(label, x + padX, y);
}

// Page footer
function pageFooter(doc: jsPDF, brand: BrandInfo) {
  const pw = doc.internal.pageSize.width;
  const ph = doc.internal.pageSize.height;
  
  rule(doc, ph - 16, C.LIGHT_GRAY);
  setFont(doc, "normal", 7);
  doc.setTextColor(...C.GRAY);
  doc.text(
    `${brand.name.toUpperCase()} · ${brand.address} · ${brand.email}`,
    pw / 2,
    ph - 8,
    { align: "center" }
  );
}

function addPageNumbers(doc: jsPDF, brand: BrandInfo) {
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

// ─── Receipt PDF ──────────────────────────────────────────────────────────────
export function generateReceiptPDF(
  order: {
    id: string;
    orderNumber?: string;
    customerName?: string;
    customerEmail?: string;
    phone?: string;
    _creationTime?: number;
    status: string;
    shippingAddress?: { street: string; city: string; zip: string; country: string };
    billingAddress?: { street: string; city: string; zip: string; country: string };
    shipping: number;
    tax: number;
    items: Array<{ name?: string; product?: string; price: number; quantity?: number; qty?: number; subtotal?: number; sku?: string; size?: string; color?: string }>;
    paymentMethod?: string;
    subtotal?: number;
    total?: number;
  },
  brand: BrandInfo = defaultBrand,
) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pw = doc.internal.pageSize.width;

  // Normalization for Order objects from DB vs passed manually
  const orderNumber = order.orderNumber || order.id;
  const customer = order.customerName || "Customer";
  const email = order.customerEmail || "";
  const phone = order.phone || "";
  const date = order._creationTime ? fmtDate(order._creationTime) : fmtDate(Date.now());
  const paymentMethod = order.paymentMethod || "Bank Transfer";
  
  const shipAddr = order.shippingAddress || { street: "", city: "", zip: "", country: "" };
  const billAddr = order.billingAddress || shipAddr;

  // ── Header ──
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

  // ── Meta strip ──
  const metaItems = [
    { label: "Date", value: date },
    { label: "Order", value: orderNumber },
    { label: "Status", value: order.status.charAt(0).toUpperCase() + order.status.slice(1), isStatus: true },
    { label: "Payment", value: paymentMethod },
  ];
  
  const colW = (pw - 28) / 4;
  metaItems.forEach((m, i) => {
    const mx = 14 + i * colW;
    setFont(doc, "bold", 7);
    doc.setTextColor(...C.GRAY);
    doc.text(m.label.toUpperCase(), mx, y);
    if ((m as any).isStatus) {
      statusBadge(doc, m.value, mx, y + 6);
    } else {
      setFont(doc, "bold", 9);
      doc.setTextColor(...C.BLACK);
      doc.text(m.value, mx, y + 6);
    }
  });

  y += 20;
  rule(doc, y, C.LIGHT_GRAY);
  y += 12;

  // ── Bill to / Ship to ──
  const halfW = (pw - 28) / 2 - 4;
  
  // Left: Bill To
  setFont(doc, "bold", 7);
  doc.setTextColor(...C.GRAY);
  doc.text("BILL TO", 14, y);
  
  setFont(doc, "bold", 9);
  doc.setTextColor(...C.BLACK);
  doc.text(customer, 14, y + 6);
  
  setFont(doc, "normal", 8.5);
  doc.setTextColor(...C.DARK_GRAY);
  let addrY = y + 11;
  if (email) {
    doc.text(email, 14, addrY);
    addrY += 4.5;
  }
  if (phone) {
    doc.text(`Phone: ${phone}`, 14, addrY);
    addrY += 4.5;
  }
  if (billAddr.street) {
    const addrLines = [billAddr.street, `${billAddr.city}, ${billAddr.zip}`, billAddr.country].filter(Boolean);
    addrLines.forEach(line => {
      doc.text(line, 14, addrY);
      addrY += 4.5;
    });
  }

  // Right: Ship To
  const rx = 14 + halfW + 8;
  setFont(doc, "bold", 7);
  doc.setTextColor(...C.GRAY);
  doc.text("SHIP TO", rx, y);
  
  setFont(doc, "bold", 9);
  doc.setTextColor(...C.BLACK);
  doc.text(customer, rx, y + 6);
  
  setFont(doc, "normal", 8.5);
  doc.setTextColor(...C.DARK_GRAY);
  let shipY = y + 11;
  if (email) {
    doc.text(email, rx, shipY);
    shipY += 4.5;
  }
  if (phone) {
    doc.text(`Phone: ${phone}`, rx, shipY);
    shipY += 4.5;
  }
  if (shipAddr.street) {
    const addrLines = [shipAddr.street, `${shipAddr.city}, ${shipAddr.zip}`, shipAddr.country].filter(Boolean);
    addrLines.forEach(line => {
      doc.text(line, rx, shipY);
      shipY += 4.5;
    });
  }

  y = Math.max(addrY, shipY) + 10;
  rule(doc, y, C.LIGHT_GRAY);
  y += 12;

  // ── Items table ──
  setFont(doc, "bold", 7);
  doc.setTextColor(...C.GRAY);
  doc.text("ITEMS ORDERED", 14, y);
  y += 4;

  const normalizedItems = order.items.map(item => ({
    name: item.name || item.product || "Item",
    sku: item.sku || "N/A",
    qty: item.quantity || item.qty || 1,
    price: item.price || 0,
    subtotal: item.subtotal || ((item.quantity || item.qty || 1) * (item.price || 0)),
    variant: [item.size, item.color].filter(Boolean).join(" / ") || ""
  }));

  const subtotal = order.subtotal || normalizedItems.reduce((s, i) => s + i.subtotal, 0);
  const total = order.total || (subtotal + order.shipping + order.tax);

  const hasVariant = normalizedItems.some(i => i.variant);
  const receiptHeaders = hasVariant ? ["#", "Product", "Variant", "Qty", "Unit Price", "Total"] : ["#", "Product", "Qty", "Unit Price", "Total"];

  autoTable(doc, {
    startY: y,
    head: [receiptHeaders],
    body: normalizedItems.map((item, idx) => {
      const row = [
        String(idx + 1),
        item.name,
        String(item.qty),
        fmt(item.price),
        fmt(item.subtotal),
      ];
      if (hasVariant) row.splice(2, 0, item.variant);
      return row;
    }),
    headStyles: {
      fillColor: [250, 250, 250],
      textColor: C.BLACK,
      fontSize: 8,
      fontStyle: "bold",
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      lineWidth: { top: 0.2, bottom: 0.2, left: 0, right: 0 },
      lineColor: C.LIGHT_GRAY,
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: C.DARK_GRAY,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      lineWidth: { top: 0, bottom: 0.2, left: 0, right: 0 },
      lineColor: [240, 240, 240],
    },
    theme: "plain",
    margin: { left: 14, right: 14 },
    columnStyles: hasVariant ? {
      0: { halign: "center", cellWidth: 10, textColor: C.GRAY },
      1: { cellWidth: "auto" },
      2: { cellWidth: 30, fontStyle: "bold", textColor: C.GRAY, fontSize: 7 },
      3: { halign: "center", cellWidth: 14 },
      4: { halign: "right", cellWidth: 28 },
      5: { halign: "right", cellWidth: 28, textColor: C.BLACK, fontStyle: "bold" },
    } : {
      0: { halign: "center", cellWidth: 10, textColor: C.GRAY },
      1: { cellWidth: "auto" },
      2: { halign: "center", cellWidth: 16 },
      3: { halign: "right", cellWidth: 32 },
      4: { halign: "right", cellWidth: 32, textColor: C.BLACK, fontStyle: "bold" },
    },
  });

  y = (doc as any).lastAutoTable.finalY + 8;

  // ── Summary panel ──
  const sumW = 80;
  const sumX = pw - 14 - sumW;

  const rows = [
    { label: "Subtotal", value: fmt(subtotal) },
    { label: "Shipping", value: order.shipping === 0 ? "Free" : fmt(order.shipping) },
    { label: "Tax", value: fmt(order.tax) },
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

  // Total separator
  ry += 2;
  doc.setDrawColor(...C.LIGHT_GRAY);
  doc.setLineWidth(0.3);
  doc.line(sumX, ry, pw - 14, ry);
  ry += 6;

  setFont(doc, "bold", 12);
  doc.setTextColor(...C.BLACK);
  doc.text("Total", sumX, ry);
  doc.text(fmt(total), pw - 14, ry, { align: "right" });

  // ── Thank you ──
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

// ─── Orders Report PDF ────────────────────────────────────────────────────────
export function generateOrdersPDF(
  orders: Array<{
    id: string;
    orderNumber?: string;
    customer: string;
    customerName?: string;
    email: string;
    customerEmail?: string;
    date: string;
    _creationTime?: number;
    items: number;
    total: number;
    status: string;
  }>,
  brand: BrandInfo = defaultBrand,
) {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  const pw = doc.internal.pageSize.width;
  const now = fmtDate(Date.now());

  // ── Header ──
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

  // ── Summary stats ──
  const totalRev = orders.reduce((s, o) => s + o.total, 0);
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter((o) => o.status.toLowerCase() === "pending" || o.status.toLowerCase() === "processing").length;

  const stats = [
    { label: "Total Orders", value: String(orders.length) },
    { label: "Total Revenue", value: fmt(totalRev) },
    { label: "Delivered", value: String(delivered) },
    { label: "Pending / Processing", value: String(pending) },
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

  // ── Table ──
  autoTable(doc, {
    startY: y,
    head: [["Order ID", "Customer", "Email", "Date", "Items", "Total", "Status"]],
    body: orders.map((o) => [
      o.orderNumber || o.id,
      o.customerName || o.customer,
      o.customerEmail || o.email,
      o._creationTime ? fmtDate(o._creationTime) : o.date,
      String(o.items),
      fmt(o.total),
      o.status.charAt(0).toUpperCase() + o.status.slice(1),
    ]),
    headStyles: {
      fillColor: [250, 250, 250],
      textColor: C.BLACK,
      fontSize: 8,
      fontStyle: "bold",
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      lineWidth: { top: 0.2, bottom: 0.2, left: 0, right: 0 },
      lineColor: C.LIGHT_GRAY,
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: C.DARK_GRAY,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      lineWidth: { top: 0, bottom: 0.2, left: 0, right: 0 },
      lineColor: [240, 240, 240],
    },
    theme: "plain",
    margin: { left: 14, right: 14 },
    columnStyles: {
      0: { textColor: C.BLACK, fontStyle: "bold", cellWidth: 32 },
      1: { cellWidth: 40 },
      2: { cellWidth: 50 },
      3: { cellWidth: 32 },
      4: { cellWidth: 16, halign: "center" },
      5: { halign: "right", cellWidth: 32, textColor: C.BLACK, fontStyle: "bold" },
      6: { halign: "center", cellWidth: 32 },
    },
    didParseCell(data) {
      if (data.column.index === 6 && data.section === "body") {
        const status = data.cell.raw as string;
        const color = C.STATUS[status] || C.GRAY;
        data.cell.styles.textColor = color;
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  addPageNumbers(doc, brand);
  doc.save("VC-Orders-Report.pdf");
}

// ─── Customer Profile PDF ─────────────────────────────────────────────────────
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
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pw = doc.internal.pageSize.width;

  // ── Header ──
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

  // ── Profile Info ──
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

  // ── Stats ──
  const stats = [
    { label: "Total Orders", value: String(customer.totalOrders) },
    { label: "Total Spent", value: fmt(customer.totalSpent) },
    { label: "Avg Order Value", value: fmt(customer.avgOrderValue) },
    { label: "Last Order", value: customer.lastOrderDate },
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

  // ── Order history table ──
  setFont(doc, "bold", 7);
  doc.setTextColor(...C.GRAY);
  doc.text("ORDER HISTORY", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Order ID", "Date", "Items", "Total", "Status"]],
    body: customer.orders.map((o) => [o.id, o.date, String(o.items), fmt(o.total), o.status.charAt(0).toUpperCase() + o.status.slice(1)]),
    headStyles: {
      fillColor: [250, 250, 250],
      textColor: C.BLACK,
      fontSize: 8,
      fontStyle: "bold",
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      lineWidth: { top: 0.2, bottom: 0.2, left: 0, right: 0 },
      lineColor: C.LIGHT_GRAY,
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: C.DARK_GRAY,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      lineWidth: { top: 0, bottom: 0.2, left: 0, right: 0 },
      lineColor: [240, 240, 240],
    },
    theme: "plain",
    margin: { left: 14, right: 14 },
    columnStyles: {
      0: { textColor: C.BLACK, fontStyle: "bold" },
      2: { halign: "center" },
      3: { halign: "right", textColor: C.BLACK, fontStyle: "bold" },
      4: { halign: "center" },
    },
    didParseCell(data) {
      if (data.column.index === 4 && data.section === "body") {
        const status = data.cell.raw as string;
        const color = C.STATUS[status] || C.GRAY;
        data.cell.styles.textColor = color;
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  addPageNumbers(doc, brand);
  doc.save(`VC-Customer-${customer.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}

// ─── Detailed Orders Report PDF ──────────────────────────────────────────────
export function generateDetailedOrdersPDF(
  orders: Array<{
    _id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    phone?: string;
    createdAt: number;
    status: string;
    items: Array<{ name: string; productId: string; price: number; quantity: number; size?: string; color?: string }>;
    total: number;
    shipping: number;
    tax: number;
    discount?: number;
    couponCode?: string;
    notes?: string;
    paymentMethod?: string;
    billingAddress: { street: string; city: string; state?: string; zip: string; country: string };
    shippingAddress: { street: string; city: string; state?: string; zip: string; country: string };
  }>,
  brand: BrandInfo = defaultBrand,
) {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  const pw = doc.internal.pageSize.width;
  const ph = doc.internal.pageSize.height;
  const now = fmtDate(Date.now());

  orders.forEach((order, idx) => {
    if (idx > 0) doc.addPage();

    const orderNumber = order.orderNumber || order._id;
    const customer = order.customerName || "Customer";
    const email = order.customerEmail || "";
    const phone = order.phone || "";
    const date = fmtDate(order.createdAt);
    const paymentMethod = order.paymentMethod || "Bank Transfer";

    const shipAddr = order.shippingAddress || { street: "", city: "", state: "", zip: "", country: "" };
    const billAddr = order.billingAddress || shipAddr;

    // ── Header ──
    setFont(doc, "bold", 22);
    doc.setTextColor(...C.BLACK);
    doc.text("VC DETAILED ORDERS REPORT", 14, 22);

    setFont(doc, "normal", 9);
    doc.setTextColor(...C.GRAY);
    doc.text(brand.name.toUpperCase(), 14, 28);
    doc.text(`Generated: ${now}`, pw - 14, 28, { align: "right" });

    let y = 36;
    rule(doc, y, C.LIGHT_GRAY);
    y += 12;

    // ── Order header ──
    setFont(doc, "bold", 16);
    doc.setTextColor(...C.BLACK);
    doc.text(orderNumber, 14, y);

    setFont(doc, "normal", 9);
    doc.setTextColor(...C.GRAY);
    doc.text(date, pw - 14, y, { align: "right" });
    y += 8;

    statusBadge(doc, order.status, 14, y);
    setFont(doc, "normal", 8.5);
    doc.setTextColor(...C.DARK_GRAY);
    doc.text(`Payment: ${paymentMethod}`, 50, y);

    y += 14;
    rule(doc, y, C.LIGHT_GRAY);
    y += 10;

    // ── Customer info ──
    setFont(doc, "bold", 7);
    doc.setTextColor(...C.GRAY);
    doc.text("CUSTOMER", 14, y);

    setFont(doc, "bold", 9);
    doc.setTextColor(...C.BLACK);
    doc.text(customer, 14, y + 6);

    setFont(doc, "normal", 8.5);
    doc.setTextColor(...C.DARK_GRAY);
    let cy = y + 11;
    if (email) { doc.text(email, 14, cy); cy += 4.5; }
    if (phone) { doc.text(`Phone: ${phone}`, 14, cy); cy += 4.5; }

    y = Math.max(y + 28, cy + 4);
    rule(doc, y, C.LIGHT_GRAY);
    y += 10;

    // ── Billing & Shipping addresses side by side ──
    const halfW = (pw - 28) / 2 - 4;

    setFont(doc, "bold", 7);
    doc.setTextColor(...C.GRAY);
    doc.text("BILLING ADDRESS", 14, y);

    setFont(doc, "bold", 7);
    doc.setTextColor(...C.GRAY);
    doc.text("SHIPPING ADDRESS", 14 + halfW + 8, y);

    setFont(doc, "normal", 8.5);
    doc.setTextColor(...C.DARK_GRAY);

    let addrY = y + 5;
    const billLines = [billAddr.street, `${billAddr.city}${billAddr.state ? ", " + billAddr.state : ""} ${billAddr.zip}`, billAddr.country].filter(Boolean);
    billLines.forEach(line => { doc.text(line, 14, addrY); addrY += 4.5; });

    let shipY = y + 5;
    const shipLines = [shipAddr.street, `${shipAddr.city}${shipAddr.state ? ", " + shipAddr.state : ""} ${shipAddr.zip}`, shipAddr.country].filter(Boolean);
    shipLines.forEach(line => { doc.text(line, 14 + halfW + 8, shipY); shipY += 4.5; });

    y = Math.max(addrY, shipY) + 8;
    rule(doc, y, C.LIGHT_GRAY);
    y += 10;

    // ── Items table ──
    setFont(doc, "bold", 7);
    doc.setTextColor(...C.GRAY);
    doc.text("ORDER ITEMS", 14, y);
    y += 4;

    const hasVariant = order.items.some(i => i.size || i.color);
    const detailHeaders = hasVariant
      ? ["#", "Product", "Variant", "SKU", "Price", "Qty", "Subtotal"]
      : ["#", "Product", "SKU / ProductID", "Price", "Qty", "Subtotal"];

    autoTable(doc, {
      startY: y,
      head: [detailHeaders],
      body: order.items.map((item, i) => {
        const variant = [item.size, item.color].filter(Boolean).join(" / ");
        const row = [
          String(i + 1),
          item.name,
          item.productId.slice(0, 8),
          fmt(item.price),
          String(item.quantity),
          fmt(item.price * item.quantity),
        ];
        if (hasVariant) row.splice(2, 0, variant || "—");
        return row;
      }),
      headStyles: {
        fillColor: [250, 250, 250],
        textColor: C.BLACK,
        fontSize: 8,
        fontStyle: "bold",
        cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
        lineWidth: { top: 0.2, bottom: 0.2, left: 0, right: 0 },
        lineColor: C.LIGHT_GRAY,
      },
      bodyStyles: {
        fontSize: 8.5,
        textColor: C.DARK_GRAY,
        cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
        lineWidth: { top: 0, bottom: 0.2, left: 0, right: 0 },
        lineColor: [240, 240, 240],
      },
      theme: "plain",
      margin: { left: 14, right: 14 },
      columnStyles: hasVariant ? {
        0: { halign: "center", cellWidth: 10, textColor: C.GRAY },
        1: { cellWidth: "auto" },
        2: { cellWidth: 28, fontStyle: "bold", textColor: C.GRAY, fontSize: 7 },
        3: { cellWidth: 24, fontStyle: "bold", textColor: C.GRAY, fontSize: 7 },
        4: { halign: "right", cellWidth: 26 },
        5: { halign: "center", cellWidth: 12 },
        6: { halign: "right", cellWidth: 28, textColor: C.BLACK, fontStyle: "bold" },
      } : {
        0: { halign: "center", cellWidth: 10, textColor: C.GRAY },
        1: { cellWidth: "auto" },
        2: { cellWidth: 36, fontStyle: "bold", textColor: C.GRAY, fontSize: 7 },
        3: { halign: "right", cellWidth: 30 },
        4: { halign: "center", cellWidth: 14 },
        5: { halign: "right", cellWidth: 32, textColor: C.BLACK, fontStyle: "bold" },
      },
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // ── Summary panel ──
    const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const sumW = 80;
    const sumX = pw - 14 - sumW;

    let ry = y;
    const summaryRows = [
      { label: "Subtotal", value: fmt(subtotal) },
      { label: "Shipping", value: order.shipping === 0 ? "Free" : fmt(order.shipping) },
      { label: "Tax", value: fmt(order.tax) },
    ];

    if (order.discount) {
      summaryRows.push({
        label: order.couponCode ? `Discount (${order.couponCode})` : "Discount",
        value: `-${fmt(order.discount)}`,
      });
    }

    summaryRows.forEach((row) => {
      setFont(doc, "normal", 8.5);
      doc.setTextColor(...C.GRAY);
      doc.text(row.label, sumX, ry);
      const isDiscount = row.label.toLowerCase().includes("discount");
      if (isDiscount) doc.setTextColor(22, 163, 74);
      else doc.setTextColor(...C.BLACK);
      doc.text(row.value, pw - 14, ry, { align: "right" });
      ry += 6;
    });

    ry += 2;
    doc.setDrawColor(...C.LIGHT_GRAY);
    doc.setLineWidth(0.3);
    doc.line(sumX, ry, pw - 14, ry);
    ry += 7;

    setFont(doc, "bold", 12);
    doc.setTextColor(...C.BLACK);
    doc.text("Total", sumX, ry);
    doc.text(fmt(order.total), pw - 14, ry, { align: "right" });

    // ── Notes ──
    if (order.notes) {
      y = ry + 14;
      if (y > ph - 30) { doc.addPage(); y = 20; }
      setFont(doc, "bold", 7);
      doc.setTextColor(...C.GRAY);
      doc.text("NOTES", 14, y);
      y += 5;
      setFont(doc, "normal", 8.5);
      doc.setTextColor(...C.DARK_GRAY);
      doc.text(order.notes, 14, y);
    }
  });

  addPageNumbers(doc, brand);
  doc.save("VC-Detailed-Orders-Report.pdf");
}
