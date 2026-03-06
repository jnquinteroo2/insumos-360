"use client";

import Link from "next/link";
import ShimmerButton from "@/components/magicui/shimmer-button";
import WordRotate from "@/components/magicui/word-rotate";

const DOMAIN = "https://insumos360.com";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-navy-900 text-white"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={`${DOMAIN}/images/hero-bg.png`}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={`${DOMAIN}/videos/hero-video.mp4`} type="video/mp4" />
          <img
            src={`${DOMAIN}/images/hero-bg.png`}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-navy-900/30 mix-blend-multiply" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-3/4 space-y-6">
          <div className="flex flex-col md:flex-row items-baseline gap-2 justify-center md:justify-start">
            <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight leading-tight drop-shadow-xl">
              Insumos de Confección
            </h1>
          </div>
          <div className="flex items-center justify-center md:justify-start text-3xl md:text-5xl font-bold text-gold-500 font-heading drop-shadow-md">
            <span className="mr-3 text-white">para</span>
            <WordRotate
              words={[
                "Moda en Colombia",
                "Fábricas Textiles",
                "Distribuidores",
                "Grandes Marcas",
              ]}
              className="text-gold-500"
            />
          </div>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto md:mx-0 font-body drop-shadow-md leading-relaxed">
            Aliados estratégicos, somos importadores directos de botones,
            encajes y herrajes. Calidad, precio y cumplimiento garantizado.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 w-full justify-center md:justify-start">
            <Link href="/categorias" className="w-full sm:w-52">
              <ShimmerButton
                shimmerColor="#FFFFFF"
                background="#0A192F"
                className="shadow-2xl shadow-navy-900/20 w-full h-full flex justify-center border border-white/20"
              >
                <span className="text-white font-bold tracking-wide">
                  Insumos
                </span>
              </ShimmerButton>
            </Link>

            <Link href="/comfort-360" className="w-full sm:w-52">
              <ShimmerButton
                shimmerColor="#FFFFFF"
                background="#D4AF37"
                className="shadow-2xl shadow-gold-500/20 w-full h-full flex justify-center"
              >
                <span className="text-navy-900 font-bold tracking-wide">
                  Comfort 360
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}