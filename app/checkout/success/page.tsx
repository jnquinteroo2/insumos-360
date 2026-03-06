"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import GlassNavbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    clearCart();
    setMounted(true);
  }, [clearCart]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col">
      <GlassNavbar />
      
      <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center transform transition-all animate-in fade-in slide-in-from-bottom-5 duration-500">
          
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle className="h-10 w-10 text-green-500" strokeWidth={2.5} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-navy-900 font-heading tracking-tight mb-2">
            ¡Pago Exitoso!
          </h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base leading-relaxed">
            Tu orden ha sido procesada correctamente. En breve recibirás un correo electrónico con los detalles de tu compra.
          </p>

          <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100 text-left">
            <p className="text-sm font-bold text-navy-900 mb-1">¿Qué sigue ahora?</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Nuestro equipo de logística está preparando tu pedido. Te notificaremos tan pronto como vaya en camino a tu dirección de entrega.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/comfort-360"
              className="w-full bg-gold-500 text-navy-900 font-bold text-base py-3.5 rounded-xl shadow-md hover:bg-gold-600 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="w-full bg-white text-navy-900 border border-gray-200 font-bold text-base py-3.5 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}