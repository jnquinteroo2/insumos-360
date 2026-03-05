"use client";

import Image from "next/image";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
              <Image
                src="/images/about.png"
                alt="Bodega de Insumos Textiles Insumos 360 Pro"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <BorderBeam
                size={300}
                duration={10}
                delay={5}
                colorFrom="#D4AF37"
                colorTo="#0A192F"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-gold-500 font-bold tracking-widest uppercase text-sm">
              Sobre Nosotros
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-navy-800 leading-tight">
              Impulsando la{" "}
              <span className="text-navy-500">Moda en Colombia</span>
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed font-body">
              <strong>Insumos 360 Pro SAS</strong> es una empresa importadora y
              distribuidora de insumos para la confección, orientada a
              distribuidores, talleres, modistas, fábricas textiles y
              emprendedores del sector moda en Colombia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-navy-700">
                <h4 className="font-bold text-navy-800 mb-2 font-heading">
                  Misión
                </h4>
                <p className="text-sm text-gray-600">
                  Importar y distribuir insumos de confección de alta calidad,
                  brindando soluciones confiables, oportunas e integrales a
                  distribuidores y actores del sector textil, contribuyendo al
                  fortalecimiento de la cadena productiva de la moda en Colombia
                  y la región.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-gold-500">
                <h4 className="font-bold text-navy-800 mb-2 font-heading">
                  Visión
                </h4>
                <p className="text-sm text-gray-600">
                  Para el año 2030, ser reconocidos como una de las principales
                  empresas importadoras y distribuidoras de insumos para
                  confección en Colombia, con presencia sólida a nivel nacional
                  y con expansión hacia países vecinos, destacándonos por la
                  calidad de nuestros productos, la eficiencia logística, el
                  cumplimiento en las entregas y relaciones comerciales
                  duraderas.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
