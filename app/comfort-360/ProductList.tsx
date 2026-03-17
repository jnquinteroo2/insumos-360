"use client";

import { useCartStore, Product } from "@/store/cartStore";
import { useState, useMemo, useRef, useEffect } from "react";
import ImageModal from "@/components/ui/image-modal";
import { Search, Plus, Minus, Filter, ChevronDown, Check, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProductList() {
  const addToCart = useCartStore((state) => state.addToCart);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const cart = useCartStore((state) => state.cart);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();

    const onFocus = () => fetchProducts();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    products.forEach(p => {
      const baseName = p.name.split(' - ')[0]; 
      if (!groups[baseName]) groups[baseName] = [];
      groups[baseName].push(p);
    });
    return groups;
  }, [products]);

  const filteredGroupNames = useMemo(() => {
    return Object.keys(groupedProducts).filter(name => {
      const group = groupedProducts[name];
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           group[0].description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Todas" || group[0].category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [groupedProducts, searchQuery, selectedCategory]);

  const colorMap: Record<string, string> = {
    'Azul oscuro': '#5B7282',
    'Rojo': '#A31D27', 
    'Gris oscuro': '#434B54',
    'Gris': '#4B5563', 
    'Negro': '#111827',
    'Café': '#3F2A24',
    'Cafe': '#3F2A24',
    'Blanco': '#FFFFFF', 
    'Gris claro': '#E4E4E7', 
    'Rosa': '#FED2D6',
    'Beige': '#B88A76',
    'Naranja': '#CC4C14',
    'Azul rey': '#1A4B9B',
    'Combinado': 'linear-gradient(to right, #94A3B8, #F8FAFC)',
    'Surtidos': 'linear-gradient(to right, #0F172A, #F8FAFC, #64748B)',
    'Diseño Cocina': 'linear-gradient(to right, #D4AF37, #0A192F)'
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 text-gold-500 animate-spin" />
        <p className="text-gray-500 mt-4 text-sm">Cargando catálogo...</p>
      </div>
    );
  }

  if (hasError || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 text-center px-6">
        <div className="bg-gold-50 p-5 rounded-full mb-6">
          <svg className="h-12 w-12 text-gold-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Catálogo temporalmente no disponible</h2>
        <p className="text-gray-500 max-w-md mb-8">
          Estamos actualizando nuestro catálogo. Por favor intenta de nuevo en unos minutos o contáctanos por WhatsApp para asesoría personalizada.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/573133719099?text=Hola,%20el%20catálogo%20Comfort%20360%20no%20carga.%20¿Pueden%20ayudarme?"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-[#128C7E] transition-all text-sm flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382C17.117 14.197 15.365 13.332 15.033 13.226C14.706 13.112 14.464 13.063 14.226 13.423C13.984 13.783 13.309 14.576 13.106 14.808C12.902 15.038 12.694 15.072 12.341 14.894C11.988 14.716 10.854 14.343 9.509 13.139C8.459 12.2 7.749 11.042 7.545 10.689C7.341 10.337 7.523 10.155 7.7 9.978C7.859 9.818 8.053 9.565 8.23 9.358C8.407 9.15 8.469 8.997 8.583 8.766C8.701 8.535 8.641 8.331 8.559 8.164C8.477 7.997 7.801 6.321 7.521 5.637C7.232 4.932 6.952 5.056 6.75 5.056C6.561 5.056 6.345 5.046 6.129 5.046C5.913 5.046 5.561 5.129 5.267 5.452C4.973 5.775 4.135 6.569 4.135 8.192C4.135 9.815 5.309 11.376 5.483 11.609C5.657 11.842 7.806 15.155 11.129 16.587C11.918 16.928 12.533 17.132 13.013 17.283C13.862 17.553 14.645 17.514 15.264 17.422C15.955 17.319 17.398 16.548 17.698 15.695C17.998 14.842 17.998 14.111 17.913 13.966C17.826 13.821 17.6 13.734 17.247 13.556H17.472V14.382Z" />
            </svg>
            Escribir por WhatsApp
          </a>
          <button
            onClick={() => window.location.reload()}
            className="bg-navy-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-gold-500 hover:text-navy-900 transition-all text-sm"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="space-y-6 md:space-y-10 scroll-mt-32">
      <div className="bg-white/90 backdrop-blur-xl p-3 md:p-5 rounded-2xl shadow-lg shadow-navy-900/5 border border-white sticky top-[68px] md:top-24 z-40 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
          <input
            type="text"
            placeholder="Buscar en el catálogo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 md:py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
          />
        </div>
        <div className="relative w-full sm:w-48" ref={filterRef}>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full flex items-center justify-between bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-navy-900">
            <div className="flex items-center gap-2 truncate">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="truncate">{selectedCategory}</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>
          {isFilterOpen && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
              {["Todas", ...Array.from(new Set(products.map(p => p.category)))].map(cat => (
                <button key={cat} onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }} className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 flex justify-between">
                  {cat} {selectedCategory === cat && <Check className="h-4 w-4 text-gold-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGroupNames.map(baseName => {
          const variants = groupedProducts[baseName];
          const uniqueVariants = Array.from(new Map(variants.map(v => [v.size || 'Estándar', v])).values());
          
          const selectedVariantId = selectedVariants[baseName] || uniqueVariants[0].id;
          const currentProduct = uniqueVariants.find(v => v.id === selectedVariantId) || uniqueVariants[0];
          
          const colorOptions = currentProduct.colors ? currentProduct.colors.split(',').map(c => c.trim()) : [];
          const activeColor = selectedColors[baseName] || (colorOptions.length > 0 ? colorOptions[0] : 'Único');
          
          const cartItemId = `${currentProduct.id}-${activeColor}`;
          const cartItem = cart.find(item => item.cartItemId === cartItemId);
          const qty = cartItem?.quantity || 0;
          const isAgotado = currentProduct.stock <= 0;

          return (
            <div key={baseName} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
              <div className="relative h-56 cursor-pointer overflow-hidden bg-gray-100" onClick={() => { setSelectedImage(currentProduct.image); setModalOpen(true); }}>
                <img 
                  src={currentProduct.image} 
                  alt={baseName} 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {isAgotado && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                    <span className="bg-red-600 text-white font-black px-4 py-1 rounded-lg transform -rotate-12">AGOTADO</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-black text-navy-900 text-lg leading-tight mb-2">{baseName}</h3>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Tamaño / Medida:</p>
                    {uniqueVariants.length > 1 ? (
                      <select 
                        value={selectedVariantId}
                        onChange={(e) => setSelectedVariants({...selectedVariants, [baseName]: Number(e.target.value)})}
                        className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-gold-500 outline-none cursor-pointer"
                      >
                        {uniqueVariants.map(v => (
                          <option key={v.id} value={v.id}>{v.size || 'Estándar'}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full h-11 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm font-bold text-navy-900 cursor-default">
                        {uniqueVariants[0].size || 'Estándar'}
                      </div>
                    )}
                  </div>

                  {colorOptions.length > 0 && colorOptions[0] !== 'Único' && colorOptions[0] !== 'Unicolor' && !isAgotado && (
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Color:</p>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColors({...selectedColors, [baseName]: color})}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${activeColor === color ? 'border-navy-900 scale-110 shadow-md' : 'border-gray-200'}`}
                            style={{ background: colorMap[color] || color }}
                          >
                            {activeColor === color && <Check size={12} className={`mx-auto drop-shadow-md ${color === 'Blanco' || color === 'Rosa' || color === 'Gris claro' ? 'text-navy-900' : 'text-white'}`} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">{currentProduct.description}</p>

                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Precio Detal:</p>
                    <p className="text-navy-900 font-black text-xl">${currentProduct.price.toLocaleString("es-CO")}</p>
                  </div>

                  {isAgotado ? (
                    <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-xl font-bold text-xs">Agotado</button>
                  ) : qty > 0 ? (
                    <div className="flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-1 py-1">
                      <button onClick={() => decrementQuantity(cartItemId)} className="w-8 h-8 flex items-center justify-center text-navy-900 hover:bg-gold-200 rounded-full"><Minus size={14} /></button>
                      <span className="font-bold text-navy-900 text-sm">{qty}</span>
                      <button onClick={() => addToCart(currentProduct, activeColor)} disabled={qty >= currentProduct.stock} className="w-8 h-8 flex items-center justify-center text-navy-900 hover:bg-gold-200 rounded-full"><Plus size={14} /></button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(currentProduct, activeColor)} className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-gold-600 transition-colors">
                      <Plus size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} imageSrc={selectedImage} altText="Catálogo Comfort 360" />
    </div>
  );
}