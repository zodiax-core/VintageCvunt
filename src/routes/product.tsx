import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Plus, Search, Edit3, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

export const Route = createFileRoute("/product")({
  component: Products,
  head: () => ({
    meta: [{ title: "Products — VintageCvunt Admin" }],
  }),
});

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft" | "Archived";
}

const products: Product[] = [
  { id: "1", name: "Obsidian Tailcoat", sku: "VNT-001", category: "Outerwear", price: 890, stock: 12, status: "Active" },
  { id: "2", name: "Argentine Cuff", sku: "VNT-002", category: "Silverwork", price: 245, stock: 3, status: "Active" },
  { id: "3", name: "Noir Leather Boots", sku: "VNT-003", category: "Footwear", price: 670, stock: 28, status: "Active" },
  { id: "4", name: "Silver Mesh Gloves", sku: "VNT-004", category: "Adornment", price: 320, stock: 45, status: "Draft" },
  { id: "5", name: "Onyx Pendant", sku: "VNT-005", category: "Adornment", price: 180, stock: 2, status: "Active" },
  { id: "6", name: "Crimson Velvet Jacket", sku: "VNT-006", category: "Outerwear", price: 1200, stock: 8, status: "Active" },
  { id: "7", name: "Bronze Buckle Belt", sku: "VNT-007", category: "Adornment", price: 160, stock: 35, status: "Active" },
  { id: "8", name: "Smoke Glass Ring", sku: "VNT-008", category: "Silverwork", price: 95, stock: 4, status: "Draft" },
  { id: "9", name: "Raven Wool Scarf", sku: "VNT-009", category: "Outerwear", price: 210, stock: 18, status: "Archived" },
  { id: "10", name: "Antique Locket", sku: "VNT-010", category: "Silverwork", price: 340, stock: 1, status: "Active" },
  { id: "11", name: "Patina Cargo Pants", sku: "VNT-011", category: "Bottoms", price: 450, stock: 22, status: "Active" },
  { id: "12", name: "Slate Derby Shoes", sku: "VNT-012", category: "Footwear", price: 520, stock: 7, status: "Draft" },
];

const categories = ["All", "Outerwear", "Footwear", "Silverwork", "Adornment", "Tops", "Bottoms"];

function statusBadge(status: string) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] border";
  const styles: Record<string, string> = {
    Active: "bg-green-500/10 text-green-400 border-green-500/20",
    Draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Archived: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };
  return <span className={`${base} ${styles[status] || styles.Active}`}>{status}</span>;
}

function Products() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-display">Products</h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Manage your product catalog</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-chrome-dim" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search products..."
            className="w-full rounded-xl border border-chrome/20 bg-graphite py-2 pl-9 pr-4 font-mono text-[12px] text-foreground placeholder:text-chrome-dim/40 outline-none focus:border-chrome/50 transition-colors"
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="rounded-xl border border-chrome/20 bg-graphite px-4 py-2 font-mono text-[12px] text-foreground outline-none focus:border-chrome/50 transition-colors"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <Link to="/product/new" className="btn-chrome btn-chrome-inner ml-auto shrink-0">
          <Plus size={14} />
          <span className="btn-label">Add Product</span>
        </Link>
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {paginated.map((product) => (
            <div key={product.id} className={`bg-graphite border rounded-2xl p-4 ${product.stock < 5 ? "border-orange-500/50" : "border-chrome/20"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-graphite-2 flex items-center justify-center font-mono text-sm text-chrome-dim">
                    {product.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-mono text-[11px]">{product.name}</p>
                    <p className="font-mono text-[9px] text-chrome-dim">{product.sku}</p>
                  </div>
                </div>
                {statusBadge(product.status)}
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim">Category</p>
                  <p className="font-mono text-[10px] mt-0.5">{product.category}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim">Price</p>
                  <p className="font-mono text-[10px] mt-0.5">${product.price}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim">Stock</p>
                  <p className={`font-mono text-[10px] mt-0.5 ${product.stock < 5 ? "text-orange-400" : ""}`}>{product.stock}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-chrome/10">
                <Link to="/product/$id/edit" params={{ id: product.id }} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim hover:text-foreground hover:bg-foreground/5 transition-colors">
                  <Edit3 size={12} /> Edit
                </Link>
                <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Image</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Name</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">SKU</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Category</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Price</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Stock</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Status</span></TableHead>
                <TableHead className="text-right"><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((product) => (
                <TableRow key={product.id} className={product.stock < 5 ? "border-l-2 border-l-orange-500" : ""}>
                  <TableCell>
                    <div className="h-10 w-10 rounded-lg bg-graphite-2 flex items-center justify-center font-mono text-sm text-chrome-dim">
                      {product.name.charAt(0)}
                    </div>
                  </TableCell>
                  <TableCell><span className="font-mono text-[11px]">{product.name}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px] text-chrome-dim">{product.sku}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px]">{product.category}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px]">${product.price}</span></TableCell>
                  <TableCell>
                    <span className={`font-mono text-[11px] ${product.stock < 5 ? "text-orange-400" : ""}`}>{product.stock}</span>
                  </TableCell>
                  <TableCell>{statusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to="/product/$id/edit" params={{ id: product.id }} className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/5 transition-colors text-chrome-dim hover:text-foreground">
                        <Edit3 size={14} />
                      </Link>
                      <button className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors text-chrome-dim hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="font-mono text-[10px] text-chrome-dim">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex items-center justify-center h-8 w-8 rounded-lg border border-chrome/20 bg-graphite text-chrome-dim hover:text-foreground hover:border-chrome/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex items-center justify-center h-8 w-8 rounded-lg border border-chrome/20 bg-graphite text-chrome-dim hover:text-foreground hover:border-chrome/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
