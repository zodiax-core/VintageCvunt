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

// ─── Color Palette ────────────────────────────────────────────────────────────
const C = {
  BLACK: [8, 8, 8] as [number, number, number],
  DARK: [14, 14, 14] as [number, number, number],
  PANEL: [18, 18, 18] as [number, number, number],
  BORDER: [30, 30, 30] as [number, number, number],
  DIM: [50, 50, 50] as [number, number, number],
  MUTED: [100, 100, 100] as [number, number, number],
  CHROME: [160, 160, 160] as [number, number, number],
  LIGHT: [200, 200, 200] as [number, number, number],
  WHITE: [232, 232, 227] as [number, number, number],
  STATUS: {
    Pending: [234, 179, 8] as [number, number, number],
    Processing: [99, 179, 237] as [number, number, number],
    Shipped: [167, 139, 250] as [number, number, number],
    Delivered: [74, 222, 128] as [number, number, number],
    Cancelled: [248, 113, 113] as [number, number, number],
  } as Record<string, [number, number, number]>,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  return "$" + n.toFixed(2);
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

function mono(doc: jsPDF, text: string, x: number, y: number, opts?: { align?: "left" | "center" | "right" }) {
  // simulate mono by using bold helvetica with wide letter-spacing
  setFont(doc, "bold", doc.getFontSize());
  doc.text(text, x, y, opts);
}

// Draw a filled rectangle with rounded corners utility
function filledRect(doc: jsPDF, x: number, y: number, w: number, h: number, color: [number, number, number]) {
  doc.setFillColor(...color);
  doc.rect(x, y, w, h, "F");
}

// Thin rule
function rule(doc: jsPDF, y: number, color: [number, number, number] = C.BORDER) {
  const pw = doc.internal.pageSize.width;
  doc.setDrawColor(...color);
  doc.setLineWidth(0.2);
  doc.line(14, y, pw - 14, y);
}

// Label above value (small caps style)
function labelValue(doc: jsPDF, label: string, value: string, x: number, y: number, color: [number, number, number] = C.WHITE) {
  setFont(doc, "normal", 7);
  doc.setTextColor(...C.MUTED);
  doc.text(label.toUpperCase(), x, y);
  setFont(doc, "bold", 9);
  doc.setTextColor(...color);
  doc.text(value, x, y + 6);
}

// Status badge (pill)
function statusBadge(doc: jsPDF, status: string, x: number, y: number) {
  const color = C.STATUS[status] || C.CHROME;
  const label = status.toUpperCase();
  setFont(doc, "bold", 6.5);
  doc.setTextColor(...color);
  const tw = doc.getTextWidth(label);
  const padX = 4;
  const padY = 2;
  doc.setDrawColor(...color);
  doc.setFillColor(color[0] * 0.08 + 8, color[1] * 0.08 + 8, color[2] * 0.08 + 8);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y - 5, tw + padX * 2, 7, 1.5, 1.5, "FD");
  doc.text(label, x + padX, y);
}

// Page header — full-width dark band
function pageHeader(doc: jsPDF, brand: BrandInfo, right?: { label: string; value: string }) {
  const pw = doc.internal.pageSize.width;
  filledRect(doc, 0, 0, pw, 36, C.BLACK);

  // Brand dot
  doc.setFillColor(...C.WHITE);
  doc.circle(14 + 3, 14, 2.5, "F");

  // Brand name
  setFont(doc, "bold", 10);
  doc.setTextColor(...C.WHITE);
  doc.text(brand.name.toUpperCase(), 14 + 9, 16);

  // Tagline
  setFont(doc, "normal", 7);
  doc.setTextColor(...C.MUTED);
  doc.text(brand.tagline, 14 + 9, 24);

  // Right side info
  if (right) {
    setFont(doc, "normal", 7);
    doc.setTextColor(...C.MUTED);
    doc.text(right.label.toUpperCase(), pw - 14, 14, { align: "right" });
    setFont(doc, "bold", 9);
    doc.setTextColor(...C.WHITE);
    doc.text(right.value, pw - 14, 22, { align: "right" });
  }

  // Bottom micro-line accent
  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(0.4);
  doc.line(0, 36, pw, 36);
}

// Page footer
function pageFooter(doc: jsPDF, brand: BrandInfo) {
  const pw = doc.internal.pageSize.width;
  const ph = doc.internal.pageSize.height;
  filledRect(doc, 0, ph - 16, pw, 16, C.BLACK);
  setFont(doc, "normal", 7);
  doc.setTextColor(...C.DIM);
  doc.text(
    `${brand.name.toUpperCase()} · ${brand.address} · ${brand.email}`,
    pw / 2,
    ph - 6,
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
      doc.setTextColor(...C.DIM);
      doc.text(`${p} / ${total}`, pw - 14, ph - 5, { align: "right" });
    }
  }
}

// ─── Receipt PDF ──────────────────────────────────────────────────────────────
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
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pw = doc.internal.pageSize.width;

  // ── Header ──
  pageHeader(doc, brand, { label: "Invoice", value: order.id });

  // ── Document title ──
  let y = 46;
  setFont(doc, "normal", 7);
  doc.setTextColor(...C.MUTED);
  doc.text("— TAX INVOICE / RECEIPT", 14, y);

  y += 6;
  setFont(doc, "bold", 22);
  doc.setTextColor(...C.WHITE);
  doc.text("Order Receipt", 14, y);

  y += 4;
  rule(doc, y + 4, C.DIM);
  y += 12;

  // ── Meta strip ──
  const metaItems = [
    { label: "Date", value: order.date },
    { label: "Order", value: order.id },
    { label: "Status", value: order.status, isStatus: true },
    { label: "Payment", value: order.paymentMethod || "Credit Card" },
  ];
  const colW = (pw - 28) / metaItems.length;
  metaItems.forEach((m, i) => {
    const mx = 14 + i * colW;
    setFont(doc, "normal", 6.5);
    doc.setTextColor(...C.MUTED);
    doc.text(m.label.toUpperCase(), mx, y);
    if ((m as any).isStatus) {
      statusBadge(doc, m.value, mx, y + 8);
    } else {
      setFont(doc, "bold", 8.5);
      doc.setTextColor(...C.LIGHT);
      doc.text(m.value, mx, y + 7);
    }
  });

  y += 18;
  rule(doc, y, C.BORDER);
  y += 10;

  // ── Bill to / Ship to ──
  const halfW = (pw - 28) / 2 - 4;
  // Left: Bill To
  filledRect(doc, 14, y, halfW, 38, C.PANEL);
  doc.setDrawColor(...C.BORDER);
  doc.setLineWidth(0.2);
  doc.rect(14, y, halfW, 38, "S");

  setFont(doc, "bold", 6.5);
  doc.setTextColor(...C.MUTED);
  doc.text("BILL TO", 20, y + 8);
  setFont(doc, "bold", 9);
  doc.setTextColor(...C.WHITE);
  doc.text(order.customer, 20, y + 16);
  setFont(doc, "normal", 7.5);
  doc.setTextColor(...C.CHROME);
  doc.text(order.email, 20, y + 23);
  doc.text(order.phone, 20, y + 30);

  // Right: Ship To
  const rx = 14 + halfW + 8;
  filledRect(doc, rx, y, halfW, 38, C.PANEL);
  doc.setDrawColor(...C.BORDER);
  doc.rect(rx, y, halfW, 38, "S");

  setFont(doc, "bold", 6.5);
  doc.setTextColor(...C.MUTED);
  doc.text("SHIP TO", rx + 6, y + 8);
  setFont(doc, "normal", 7.5);
  doc.setTextColor(...C.CHROME);
  const addrLines = order.address.split(", ").join("\n");
  const splitAddr = doc.splitTextToSize(addrLines, halfW - 14);
  let lineY = y + 16;
  splitAddr.forEach((line: string) => {
    doc.text(line, rx + 6, lineY);
    lineY += 6;
  });

  y += 46;

  // ── Items table ──
  setFont(doc, "bold", 7);
  doc.setTextColor(...C.MUTED);
  doc.text("ITEMS ORDERED", 14, y);
  y += 4;

  const subtotal = order.items.reduce((s, i) => s + i.subtotal, 0);
  const total = subtotal + order.shipping + order.tax;

  autoTable(doc, {
    startY: y,
    head: [["#", "Product", "SKU / Reference", "Qty", "Unit Price", "Total"]],
    body: order.items.map((item, idx) => [
      String(idx + 1),
      item.product,
      item.sku,
      String(item.qty),
      fmt(item.price),
      fmt(item.subtotal),
    ]),
    headStyles: {
      fillColor: C.BLACK,
      textColor: C.WHITE,
      fontSize: 7,
      fontStyle: "bold",
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
    },
    bodyStyles: {
      fontSize: 8,
      textColor: C.CHROME,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      fillColor: C.DARK,
    },
    alternateRowStyles: { fillColor: C.PANEL },
    theme: "plain",
    margin: { left: 14, right: 14 },
    styles: {
      lineColor: C.BORDER,
      lineWidth: 0.15,
      overflow: "linebreak",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10, textColor: C.MUTED },
      1: { cellWidth: "auto" },
      2: { cellWidth: 36, textColor: C.MUTED },
      3: { halign: "center", cellWidth: 12 },
      4: { halign: "right", cellWidth: 24 },
      5: { halign: "right", cellWidth: 26, textColor: C.WHITE, fontStyle: "bold" },
    },
  });

  y = (doc as any).lastAutoTable.finalY + 8;

  // ── Summary panel ──
  const sumW = 80;
  const sumX = pw - 14 - sumW;

  filledRect(doc, sumX, y, sumW, 52, C.PANEL);
  doc.setDrawColor(...C.BORDER);
  doc.setLineWidth(0.2);
  doc.rect(sumX, y, sumW, 52, "S");

  const rows = [
    { label: "Subtotal", value: fmt(subtotal) },
    { label: "Shipping", value: order.shipping === 0 ? "Free" : fmt(order.shipping) },
    { label: "Tax", value: fmt(order.tax) },
  ];

  let ry = y + 8;
  rows.forEach((row) => {
    setFont(doc, "normal", 7.5);
    doc.setTextColor(...C.MUTED);
    doc.text(row.label, sumX + 6, ry);
    doc.setTextColor(...C.CHROME);
    doc.text(row.value, pw - 14 - 6, ry, { align: "right" });
    ry += 8;
  });

  // Total separator
  doc.setDrawColor(...C.DIM);
  doc.setLineWidth(0.3);
  doc.line(sumX + 4, ry, pw - 14 - 4, ry);
  ry += 7;

  setFont(doc, "bold", 10);
  doc.setTextColor(...C.WHITE);
  doc.text("Total", sumX + 6, ry);
  doc.text(fmt(total), pw - 14 - 6, ry, { align: "right" });

  // ── Thank you ──
  y = (doc as any).lastAutoTable.finalY + 70;
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  rule(doc, y - 8, C.DIM);
  setFont(doc, "normal", 9);
  doc.setTextColor(...C.MUTED);
  doc.text("Thank you for shopping with VintageCvunt.", 14, y);
  setFont(doc, "normal", 7.5);
  doc.setTextColor(...C.DIM);
  doc.text(`For support or returns: ${brand.email}`, 14, y + 7);

  addPageNumbers(doc, brand);
  doc.save(`VC-Receipt-${order.id}.pdf`);
}

// ─── Orders Report PDF ────────────────────────────────────────────────────────
export function generateOrdersPDF(
  orders: Array<{
    id: string;
    customer: string;
    email: string;
    date: string;
    items: number;
    total: number;
    status: string;
  }>,
  brand: BrandInfo = defaultBrand,
) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pw = doc.internal.pageSize.width;
  const now = fmtDate(Date.now());

  // ── Header ──
  pageHeader(doc, brand, { label: "Generated", value: now });

  let y = 46;
  setFont(doc, "normal", 7);
  doc.setTextColor(...C.MUTED);
  doc.text("— MANAGEMENT REPORT", 14, y);
  y += 6;
  setFont(doc, "bold", 22);
  doc.setTextColor(...C.WHITE);
  doc.text("Orders Summary", 14, y);
  y += 4;
  rule(doc, y + 4, C.DIM);
  y += 14;

  // ── Summary stats ──
  const totalRev = orders.reduce((s, o) => s + o.total, 0);
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;

  const stats = [
    { label: "Total Orders", value: String(orders.length) },
    { label: "Total Revenue", value: fmt(totalRev) },
    { label: "Delivered", value: String(delivered) },
    { label: "Pending / Processing", value: String(pending) },
  ];

  const cardW = (pw - 28 - 9) / 4;
  stats.forEach((s, i) => {
    const cx = 14 + i * (cardW + 3);
    filledRect(doc, cx, y, cardW, 22, C.PANEL);
    doc.setDrawColor(...C.BORDER);
    doc.setLineWidth(0.2);
    doc.rect(cx, y, cardW, 22, "S");
    setFont(doc, "normal", 6.5);
    doc.setTextColor(...C.MUTED);
    doc.text(s.label.toUpperCase(), cx + 5, y + 7);
    setFont(doc, "bold", 11);
    doc.setTextColor(...C.WHITE);
    doc.text(s.value, cx + 5, y + 17);
  });

  y += 30;
  rule(doc, y, C.BORDER);
  y += 6;

  // ── Table ──
  autoTable(doc, {
    startY: y,
    head: [["Order ID", "Customer", "Email", "Date", "Items", "Total", "Status"]],
    body: orders.map((o) => [
      o.id,
      o.customer,
      o.email,
      o.date,
      String(o.items),
      fmt(o.total),
      o.status,
    ]),
    headStyles: {
      fillColor: C.BLACK,
      textColor: C.WHITE,
      fontSize: 7,
      fontStyle: "bold",
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: C.CHROME,
      fillColor: C.DARK,
      cellPadding: { top: 3.5, bottom: 3.5, left: 4, right: 4 },
    },
    alternateRowStyles: { fillColor: C.PANEL },
    theme: "plain",
    margin: { left: 14, right: 14 },
    styles: { lineColor: C.BORDER, lineWidth: 0.15 },
    columnStyles: {
      0: { textColor: C.WHITE, fontStyle: "bold", cellWidth: 28 },
      1: { cellWidth: 28 },
      2: { cellWidth: 38, textColor: C.MUTED },
      3: { cellWidth: 24, halign: "center" },
      4: { cellWidth: 12, halign: "center" },
      5: { halign: "right", cellWidth: 20, textColor: C.WHITE, fontStyle: "bold" },
      6: { halign: "center", cellWidth: 22 },
    },
    // Color the status column text
    didParseCell(data) {
      if (data.column.index === 6 && data.section === "body") {
        const status = data.cell.raw as string;
        const color = C.STATUS[status] || C.CHROME;
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
  pageHeader(doc, brand, { label: "Customer ID", value: customer.id });

  let y = 46;
  setFont(doc, "normal", 7);
  doc.setTextColor(...C.MUTED);
  doc.text("— CUSTOMER PROFILE", 14, y);
  y += 6;
  setFont(doc, "bold", 22);
  doc.setTextColor(...C.WHITE);
  doc.text(customer.name, 14, y);
  y += 4;
  rule(doc, y + 4, C.DIM);
  y += 12;

  // ── Contact info ──
  filledRect(doc, 14, y, pw - 28, 28, C.PANEL);
  doc.setDrawColor(...C.BORDER);
  doc.setLineWidth(0.2);
  doc.rect(14, y, pw - 28, 28, "S");

  const contactItems = [
    { label: "Email", value: customer.email },
    { label: "Phone", value: customer.phone },
    { label: "Joined", value: customer.joined },
    { label: "Status", value: customer.status, isStatus: true },
  ];

  const cw = (pw - 28) / contactItems.length;
  contactItems.forEach((c, i) => {
    const cx = 14 + i * cw;
    setFont(doc, "normal", 6.5);
    doc.setTextColor(...C.MUTED);
    doc.text(c.label.toUpperCase(), cx + 6, y + 8);
    if ((c as any).isStatus) {
      statusBadge(doc, c.value, cx + 6, y + 20);
    } else {
      setFont(doc, "bold", 8.5);
      doc.setTextColor(...C.LIGHT);
      doc.text(c.value, cx + 6, y + 19);
    }
  });

  y += 36;

  // ── Stats ──
  const stats = [
    { label: "Total Orders", value: String(customer.totalOrders) },
    { label: "Total Spent", value: fmt(customer.totalSpent) },
    { label: "Avg Order Value", value: fmt(customer.avgOrderValue) },
    { label: "Last Order", value: customer.lastOrderDate },
  ];

  const cardW = (pw - 28 - 6) / 4;
  stats.forEach((s, i) => {
    const cx = 14 + i * (cardW + 2);
    filledRect(doc, cx, y, cardW, 24, C.PANEL);
    doc.setDrawColor(...C.BORDER);
    doc.setLineWidth(0.2);
    doc.rect(cx, y, cardW, 24, "S");
    // Top accent line per stat
    doc.setDrawColor(...C.CHROME);
    doc.setLineWidth(0.8);
    doc.line(cx, y, cx + cardW * 0.35, y);
    setFont(doc, "normal", 6.5);
    doc.setTextColor(...C.MUTED);
    doc.text(s.label.toUpperCase(), cx + 5, y + 9);
    setFont(doc, "bold", 11);
    doc.setTextColor(...C.WHITE);
    doc.text(s.value, cx + 5, y + 19);
  });

  y += 32;
  rule(doc, y, C.BORDER);
  y += 8;

  // ── Order history table ──
  setFont(doc, "bold", 7);
  doc.setTextColor(...C.MUTED);
  doc.text("ORDER HISTORY", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Order ID", "Date", "Items", "Total", "Status"]],
    body: customer.orders.map((o) => [o.id, o.date, String(o.items), fmt(o.total), o.status]),
    headStyles: {
      fillColor: C.BLACK,
      textColor: C.WHITE,
      fontSize: 7,
      fontStyle: "bold",
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
    },
    bodyStyles: {
      fontSize: 8,
      textColor: C.CHROME,
      fillColor: C.DARK,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
    },
    alternateRowStyles: { fillColor: C.PANEL },
    theme: "plain",
    margin: { left: 14, right: 14 },
    styles: { lineColor: C.BORDER, lineWidth: 0.15 },
    columnStyles: {
      0: { textColor: C.WHITE, fontStyle: "bold" },
      2: { halign: "center" },
      3: { halign: "right", textColor: C.WHITE, fontStyle: "bold" },
      4: { halign: "center" },
    },
    didParseCell(data) {
      if (data.column.index === 4 && data.section === "body") {
        const status = data.cell.raw as string;
        const color = C.STATUS[status] || C.CHROME;
        data.cell.styles.textColor = color;
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  addPageNumbers(doc, brand);
  doc.save(`VC-Customer-${customer.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
