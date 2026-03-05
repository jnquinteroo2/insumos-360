"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import GlassNavbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Footer from "@/components/sections/footer";
import { Truck, Award, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import NumberTicker from "../components/magicui/number-ticker";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import colombiaAnimation from "../public/animations/Colombia.json";

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-gold-500 selection:text-navy-900 overflow-x-hidden">
      <GlassNavbar />

      <Hero />

      <section className="py-20 bg-navy-900 relative overflow-hidden border-b border-gold-500/20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
            <div className="space-y-4">
              <p className="text-6xl font-bold text-gold-500 font-heading flex justify-center items-baseline drop-shadow-2xl">
                +<NumberTicker value={10} className="text-gold-500" />
              </p>
              <p className="text-gold-100/60 font-medium uppercase tracking-[0.2em] text-xs">
                Años de Experiencia
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-6xl font-bold text-gold-500 font-heading flex justify-center items-baseline drop-shadow-2xl">
                +<NumberTicker value={5000} className="text-gold-500" />
              </p>
              <p className="text-gold-100/60 font-medium uppercase tracking-[0.2em] text-xs">
                Referencias postivas
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-6xl font-bold text-gold-500 font-heading flex justify-center items-baseline drop-shadow-2xl">
                <NumberTicker value={100} className="text-gold-500" />%
              </p>
              <p className="text-gold-100/60 font-medium uppercase tracking-[0.2em] text-xs">
                Cobertura Nacional
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/noise.png')] mix-blend-overlay"></div>
      </section>

      <FadeInSection>
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <span className="text-gold-500 font-bold tracking-[0.3em] uppercase text-xs">
                Distinción 360
              </span>
              <h2 className="text-navy-900 font-bold text-4xl md:text-5xl font-heading mt-2">
                ¿Por qué somos el aliado preferido?
              </h2>
              <div className="w-20 h-1 bg-gold-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: DollarSign,
                  title: "Valor Directo",
                  desc: "Costos de importación optimizados para maximizar la competitividad de cada marca.",
                },
                {
                  icon: Truck,
                  title: "Logística de Precisión",
                  desc: "Cadena de suministro ágil diseñada para los ritmos de la alta moda.",
                },
                {
                  icon: Award,
                  title: "Calidad Superior",
                  desc: "Selección curada de insumos que cumplen con las exigencias internacionales.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group p-10 rounded-2xl bg-navy-50 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(10,25,47,0.08)]"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-8 text-gold-500 shadow-sm group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-navy-600 font-body leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 space-y-8">
                <div className="space-y-2">
                  <span className="text-gold-500 font-bold tracking-[0.3em] uppercase text-xs block">
                    Presencia Nacional
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight italic">
                    Logística sin{" "}
                    <span className="text-gold-500 not-italic">Fronteras</span>
                  </h2>
                </div>
                <p className="text-gold-100/70 text-lg leading-relaxed font-body font-light">
                  Nuestra red de distribución está diseñada para conectar su
                  centro de producción con la vanguardia textil mundial,
                  asegurando tiempos de entrega óptimos en cada capital y región
                  estratégica de Colombia.
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-gold-50/80 font-medium pt-4">
                  {[
                    "Bogotá D.C.",
                    "Medellín",
                    "Cali",
                    "Barranquilla",
                    "Bucaramanga",
                    "Eje Cafetero",
                  ].map((city) => (
                    <div
                      key={city}
                      className="flex items-center gap-3 border-l border-gold-500/30 pl-4 py-1"
                    >
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full shadow-[0_0_8px_#D4AF37]" />
                      {city}
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 relative">
                <div className="relative z-10 filter drop-shadow-[0_0_50px_rgba(212,175,55,0.15)] transform hover:scale-105 transition-transform duration-700">
                  <Lottie
                    animationData={colombiaAnimation}
                    loop={true}
                    className="w-full max-w-lg mx-auto"
                  />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-500/5 to-transparent pointer-events-none" />
        </section>
      </FadeInSection>

      <section className="py-32 bg-navy-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black font-heading text-navy-900 mb-8 leading-tight">
            ¿Tienes tu producción{" "}
            <span className="text-gold-500 italic">Lista</span>?
          </h2>
          <p className="text-navy-600 max-w-xl mx-auto mb-12 text-lg font-body">
            Haz que tu marca tenga la calidad que se merece. Explora nuestros
            catálogos exclusivos.
          </p>
          <div className="flex justify-center">
            <Link
              href="/categorias"
              className="group relative inline-flex items-center gap-4 bg-navy-900 text-white px-12 py-6 rounded-none font-bold uppercase tracking-widest shadow-2xl hover:bg-gold-500 hover:text-navy-900 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 w-0 group-hover:w-full bg-gold-500 transition-all duration-500 ease-out -z-10" />
              Ver Colecciones{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform"
              />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
      </section>

      <Footer />

      <a
        href="https://wa.me/573133719099?text=Hola,%20quisiera%20asesoría%20profesional%20sobre%20sus%20insumos."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] group"
        aria-label="Contactar por WhatsApp"
      >
        <div className="relative w-16 h-16 bg-[#075E54] group-hover:bg-[#25D366] rounded-full shadow-[0_10px_30px_rgba(7,94,84,0.3)] flex items-center justify-center transition-all duration-500 hover:scale-110">
          <div className="absolute inset-0 rounded-full bg-[#25D366] scale-100 animate-ping opacity-20 pointer-events-none"></div>

          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M17.472 14.382C17.117 14.197 15.365 13.332 15.033 13.226C14.706 13.112 14.464 13.063 14.226 13.423C13.984 13.783 13.309 14.576 13.106 14.808C12.902 15.038 12.694 15.072 12.341 14.894C11.988 14.716 10.854 14.343 9.509 13.139C8.459 12.2 7.749 11.042 7.545 10.689C7.341 10.337 7.523 10.155 7.7 9.978C7.859 9.818 8.053 9.565 8.23 9.358C8.407 9.15 8.469 8.997 8.583 8.766C8.701 8.535 8.641 8.331 8.559 8.164C8.477 7.997 7.801 6.321 7.521 5.637C7.232 4.932 6.952 5.056 6.75 5.056C6.561 5.056 6.345 5.046 6.129 5.046C5.913 5.046 5.561 5.129 5.267 5.452C4.973 5.775 4.135 6.569 4.135 8.192C4.135 9.815 5.309 11.376 5.483 11.609C5.657 11.842 7.806 15.155 11.129 16.587C11.918 16.928 12.533 17.132 13.013 17.283C13.862 17.553 14.645 17.514 15.264 17.422C15.955 17.319 17.398 16.548 17.698 15.695C17.998 14.842 17.998 14.111 17.913 13.966C17.826 13.821 17.6 13.734 17.247 13.556H17.472V14.382Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </a>
    </main>
  );
}
