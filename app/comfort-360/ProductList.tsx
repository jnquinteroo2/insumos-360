"use client";

import { useCartStore, Product } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  Check,
  ShoppingCart,
} from "lucide-react";

export default function ProductList({ products }: { products: Product[] }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setIsFilterOpen(false);

    if (topRef.current) {
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["Todas", ...Array.from(new Set(cats))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todas" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div ref={topRef} className="space-y-6 md:space-y-10 scroll-mt-32">
      {}
      <div className="bg-white/90 backdrop-blur-xl p-3 md:p-5 rounded-2xl shadow-lg shadow-navy-900/5 border border-white sticky top-[68px] md:top-24 z-40 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {}
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5"
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Buscar sábanas, cobijas..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);

              if (window.scrollY > 300 && topRef.current) {
                topRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            className="w-full pl-9 pr-4 py-2.5 md:py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:bg-white transition-all text-navy-900 placeholder-gray-400 text-sm"
          />
        </div>

        {}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {}
          <div className="relative w-full sm:w-48" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-navy-900 shadow-sm hover:border-gold-400 transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="truncate">{selectedCategory}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {}
            {isFilterOpen && (
              <div className="absolute top-full right-0 left-0 sm:left-auto sm:w-56 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in duration-200">
                <div className="max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors hover:bg-gray-50 ${
                        selectedCategory === cat
                          ? "bg-gold-50/50 text-navy-900 font-bold"
                          : "text-gray-600 font-medium"
                      }`}
                    >
                      {cat}
                      {selectedCategory === cat && (
                        <Check className="h-4 w-4 text-gold-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {}
          <button
            onClick={() => router.push("/checkout")}
            className="hidden md:flex bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/30 transition-all items-center justify-center gap-2 flex-shrink-0 text-sm"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" strokeWidth={2.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-gold-400">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
            Mi Carrito
          </button>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 md:h-64 w-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center p-4">
                <span className="relative z-10 text-gold-500/80 font-heading text-lg font-bold text-center leading-snug tracking-wide px-2">
                  {product.name}
                </span>
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-full border border-white/20 uppercase">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow bg-white">
                <h3 className="font-extrabold text-navy-900 text-sm md:text-lg leading-tight mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium mb-0.5 uppercase tracking-wider">
                      Precio Detal
                    </p>
                    <p className="text-navy-900 font-black text-lg md:text-2xl tracking-tight leading-none">
                      ${product.price.toLocaleString("es-CO")}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-50 text-navy-900 border border-gray-100 flex items-center justify-center hover:bg-navy-900 hover:text-white transition-all active:scale-95 flex-shrink-0"
                  >
                    <Plus className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center px-4">
            <Search className="mb-4 h-12 w-12 text-gray-200" strokeWidth={1} />
            <p className="text-lg font-bold text-navy-900 mb-1">
              Sin resultados
            </p>
            <button
              onClick={() => handleCategorySelect("Todas")}
              className="mt-4 text-gold-600 font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
