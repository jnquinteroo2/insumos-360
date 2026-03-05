"use client";

import Link from "next/link";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Scissors } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/images/hero-bg.png')] bg-cover bg-center mix-blend-overlay" />

      <div className="relative z-10 space-y-8 max-w-2xl mx-auto animate-in fade-in zoom-in duration-700">
        <div className="flex justify-center mb-4">
          <Scissors className="w-16 h-16 text-gold-500 animate-pulse" />
        </div>

        <h1 className="text-9xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 tracking-tighter drop-shadow-2xl">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">
            ¡Vaya! Perdimos el hilo...
          </h2>
          <p className="text-lg text-navy-200 font-body leading-relaxed max-w-lg mx-auto">
            La página que buscas no existe. Parece que este patrón no encaja en
            nuestro diseño.
          </p>
        </div>

        <div className="pt-8 flex justify-center">
          <Link href="/">
            <ShimmerButton
              background="#D4AF37"
              shimmerColor="#FFFFFF"
              className="shadow-2xl shadow-gold-500/20"
            >
              <span className="text-white font-bold tracking-wide px-8">
                Volver al Inicio
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
