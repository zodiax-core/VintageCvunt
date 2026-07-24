import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Plus, Search, Edit3, Trash2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

export const Route = createFileRoute("/product")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: Products,
  head: () => ({
    meta: [{ title: "Products — VintageCvunt Admin" }],
  }),
});

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
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const allProducts = useQuery(api.products.list) ?? [];
  const deleteProduct = useMutation(api.products.remove);
  const updateProduct = useMutation(api.products.update);

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      await updateProduct({ id: id as any, featured: !current });
    } catch (err) {
      console.error("Failed to toggle featured", err);
    }
  };

  const products = useMemo(() => {
    return allProducts.map((p) => ({
      _id: p._id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price,
      stockCount: p.stockCount,
      inStock: p.inStock,
      imageUrl: p.imageUrls?.[0] || null,
      featured: p.featured,
      status: p.inStock ? "Active" as const : "Draft" as const,
    }));
  }, [allProducts]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category, products]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await deleteProduct({ id: id as any });
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  if (pathname !== "/product") {
    return (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    );
  }

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
            <div key={product._id} className={`bg-graphite border rounded-2xl p-4 ${product.stockCount < 5 ? "border-orange-500/50" : "border-chrome/20"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-graphite-2 flex items-center justify-center font-mono text-sm text-chrome-dim">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt="" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                      product.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="font-mono text-[11px]">{product.name}</p>
                    <p className="font-mono text-[9px] text-chrome-dim">{product.slug}</p>
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
                  <p className={`font-mono text-[10px] mt-0.5 ${product.stockCount < 5 ? "text-orange-400" : ""}`}>{product.stockCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-chrome/10">
                <button
                  onClick={() => toggleFeatured(product._id, product.featured)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${product.featured ? "text-yellow-400" : "text-chrome-dim hover:text-foreground"}`}
                >
                  <Star size={12} fill={product.featured ? "currentColor" : "none"} /> {product.featured ? "Featured" : "Feature"}
                </button>
                <Link to="/product/$id/edit" params={{ id: product._id }} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim hover:text-foreground hover:bg-foreground/5 transition-colors">
                  <Edit3 size={12} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id, product.name)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
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
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Slug</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Category</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Price</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Stock</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Featured</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Status</span></TableHead>
                <TableHead className="text-right"><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((product) => (
                <TableRow key={product._id} className={product.stockCount < 5 ? "border-l-2 border-l-orange-500" : ""}>
                  <TableCell>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-graphite-2 flex items-center justify-center font-mono text-sm text-chrome-dim">
                        {product.name.charAt(0)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell><span className="font-mono text-[11px]">{product.name}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px] text-chrome-dim">{product.slug}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px]">{product.category}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px]">${product.price}</span></TableCell>
                  <TableCell>
                    <span className={`font-mono text-[11px] ${product.stockCount < 5 ? "text-orange-400" : ""}`}>{product.stockCount}</span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleFeatured(product._id, product.featured)}
                      className={`flex items-center justify-center h-8 w-8 rounded-lg transition-colors ${product.featured ? "text-yellow-400 hover:text-yellow-300" : "text-chrome-dim hover:text-foreground"}`}
                    >
                      <Star size={14} fill={product.featured ? "currentColor" : "none"} />
                    </button>
                  </TableCell>
                  <TableCell>{statusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to="/product/$id/edit" params={{ id: product._id }} className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/5 transition-colors text-chrome-dim hover:text-foreground">
                        <Edit3 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors text-chrome-dim hover:text-red-400"
                      >
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
