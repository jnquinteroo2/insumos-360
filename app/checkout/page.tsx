"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import GlassNavbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import {
  ArrowLeft,
  Trash2,
  ShieldCheck,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

declare global {
  interface Window {
    BoldCheckout: any;
  }
}

export default function CheckoutPage() {
  const { cart, getTotal, removeFromCart } = useCartStore();

  const [formData, setFormData] = useState({
    name: "",
    document: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart, customerInfo: formData }),
      });
      const data = await res.json();

      if (data.orderId && data.integritySignature) {
        const checkout = new window.BoldCheckout({
          orderId: data.orderId,
          currency: "COP",
          amount: data.totalAmount.toString(),
          apiKey: process.env.NEXT_PUBLIC_BOLD_IDENTITY_KEY,
          integritySignature: data.integritySignature,
          description: "Compra Premium Comfort 360",
          tax: "0",
          payerEmail: formData.email,
          payerPhone: formData.phone,
          payerDocumentType: "CC",
          payerDocument: formData.document,
        });

        checkout.open();
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al conectar con Bold. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50">
      <Script
        src="https://checkout.bold.co/v2/scripts/bold.js"
        strategy="lazyOnload"
      />
      <GlassNavbar />

      <div className="pt-24 md:pt-36 pb-12 container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <Link
            href="/comfort-360"
            className="p-2 rounded-full bg-white text-navy-800 hover:bg-gold-100 hover:text-gold-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl md:text-4xl font-extrabold text-navy-900 font-heading tracking-tighter">
            Finalizar Compra
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 text-center px-4">
            <div className="bg-gray-100 p-5 rounded-full mb-5">
              <ShoppingCart
                className="h-12 w-12 text-gray-300"
                strokeWidth={1}
              />
            </div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">
              Tu carrito está vacío
            </h2>
            <Link
              href="/comfort-360"
              className="mt-4 bg-navy-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-gold-500 hover:text-navy-900 transition-all text-sm"
            >
              Volver a la Tienda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,minmax(350px,400px)] gap-8 lg:gap-12">
            {}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy-800 mb-4 pb-2 border-b border-gray-100">
                Resumen del pedido ({cart.reduce((a, c) => a + c.quantity, 0)}{" "}
                items)
              </h2>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 hide-scrollbar">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-lg bg-gradient-to-br from-navy-800 to-navy-950 flex-shrink-0 overflow-hidden flex items-center justify-center p-1 text-center">
                      <span className="text-gold-500/70 text-[8px] md:text-[10px] font-bold leading-tight font-heading">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex-grow space-y-0.5">
                      <p className="font-bold text-navy-900 text-sm leading-tight line-clamp-2">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                          Cant: {item.quantity}
                        </span>
                        <p className="font-bold text-gold-600 text-sm md:text-base">
                          $
                          {(item.price * item.quantity).toLocaleString("es-CO")}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-navy-900 text-white p-4 md:p-6 rounded-2xl flex justify-between items-center mt-6 shadow-xl shadow-navy-900/10">
                <span className="text-sm md:text-base text-gray-300 font-medium">
                  Total a pagar
                </span>
                <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                  ${getTotal().toLocaleString("es-CO")}
                </span>
              </div>
            </div>

            {}
            <form
              onSubmit={handlePayment}
              className="bg-white p-5 md:p-8 rounded-3xl shadow-lg border border-gray-100 h-fit space-y-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-100 p-2.5 rounded-xl text-gold-600">
                  <CreditCard size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-navy-900">
                    Datos de Envío y Facturación
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                <InputGroup
                  label="Nombre completo"
                  type="text"
                  placeholder="Como aparece en la cédula"
                  required
                  onChange={(v: string) =>
                    setFormData({ ...formData, name: v })
                  }
                />
                <InputGroup
                  label="Cédula"
                  type="text"
                  placeholder="Ej: 10203040"
                  required
                  onChange={(v: string) =>
                    setFormData({ ...formData, document: v })
                  }
                />
                <InputGroup
                  label="Correo electrónico"
                  type="email"
                  placeholder="Ej: cliente@correo.com"
                  required
                  onChange={(v: string) =>
                    setFormData({ ...formData, email: v })
                  }
                />
                <InputGroup
                  label="Teléfono / WhatsApp"
                  type="tel"
                  placeholder="Ej: 3123456789"
                  required
                  onChange={(v: string) =>
                    setFormData({ ...formData, phone: v })
                  }
                />
                {}
                <InputGroup
                  label="Dirección de entrega"
                  type="text"
                  placeholder="Ej: Calle 123 # 45-67, Apto 201, Ciudad"
                  required
                  onChange={(v: string) =>
                    setFormData({ ...formData, address: v })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-500 text-navy-900 font-black text-base md:text-lg py-3.5 rounded-xl shadow-lg hover:bg-gold-600 transition-all flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  "Cargando..."
                ) : (
                  <>
                    <ShieldCheck size={20} /> Pagar con Bold
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}

function InputGroup({ label, onChange, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-navy-800 ml-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 text-navy-900 bg-gray-50 placeholder-gray-400 text-sm"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
