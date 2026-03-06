"use client";

import { useCartStore, Product } from "@/store/cartStore";
import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import ImageModal from "@/components/ui/image-modal";
import { Search, Plus, Minus, Filter, ChevronDown, Check } from "lucide-react";

export default function ProductList({ products }: { products: Product[] }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const cart = useCartStore((state) => state.cart);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

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
    'Café': '#3F2A24',
    'Gris claro': '#A5A4A9', 
    'Rosa': '#FED2D6',
    'Beige': '#B88A76',
    'Naranja': '#CC4C14',
    'Azul rey': '#1A4B9B',
    'Blanco': '#FFFFFF', 
    'Combinado': 'linear-gradient(to right, #94A3B8, #F8FAFC)',
    'Surtidos': 'linear-gradient(to right, #0F172A, #F8FAFC, #64748B)',
    'Diseño Cocina': 'linear-gradient(to right, #D4AF37, #0A192F)'
  };

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
              <div className="relative h-56 cursor-pointer overflow-hidden" onClick={() => { setSelectedImage(currentProduct.image); setModalOpen(true); }}>
                <Image src={currentProduct.image} alt={baseName} fill className="object-cover transition-transform group-hover:scale-105" />
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