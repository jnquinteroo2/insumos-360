"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";
import {
  Scissors,
  Layers,
  CircleDot,
  Sparkles,
  Gem,
  PenTool,
  Palette,
  Ruler,
  Anchor,
  Disc,
  LucideIcon,
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import ImageModal from "@/components/ui/image-modal";

const CategoryBackground = ({ src, alt }: { src: string; alt: string }) => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      priority={false}
    />
    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 pointer-events-none" />
  </div>
);

interface CategoryItem {
  Icon: LucideIcon | React.ElementType;
  name: string;
  description: string;
  href: string;
  cta: string;
  background: ReactNode;
  className: string;
  action?: string;
}

export default function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const categories: CategoryItem[] = [
    {
      Icon: Layers,
      name: "Herrajes",
      description: "Hebillas, argollas y mosquetones de alta resistencia.",
      href: "/catalogos/catalogo-herrajes.pdf",
      cta: "Ver Catálogo",
      background: (
        <CategoryBackground src="/images/herrajes.png" alt="Herrajes" />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: CircleDot,
      name: "Botones Tendencia",
      description: "Diseños vanguardistas que definen la temporada.",
      href: "/catalogos/catalogo-botones-tendencia.pdf",
      cta: "Ver Catálogo",
      background: (
        <CategoryBackground
          src="/images/botones-tendencia.png"
          alt="Botones Tendencia"
        />
      ),
      className: "md:col-span-2",
    },
    {
      Icon: Disc,
      name: "Botón de línea",
      description: "Colección clásica para toda ocasión.",
      href: "/catalogos/catalogo-botones-general.pdf",
      cta: "Ver Catálogo",
      background: (
        <CategoryBackground
          src="/images/botones-general.png"
          alt="Botones General"
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: Anchor,
      name: "Botones de Hilo",
      description: "Elegancia textil y texturas naturales.",
      href: "/catalogos/catalogo-botones-hilo.pdf",
      cta: "Ver Catálogo",
      background: (
        <CategoryBackground src="/images/botones-hilo.png" alt="Botones Hilo" />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: Sparkles,
      name: "Apliques",
      description: "Detalles bordados y pedrería exclusivos.",
      href: "/catalogos/catalogo-apliques.pdf",
      cta: "Ver Catálogo",
      background: (
        <CategoryBackground src="/images/apliques.png" alt="Apliques" />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: Scissors,
      name: "Encajes",
      description: "Suavidad y diseño en encajes delicados.",
      href: "#",
      cta: "Ver Catálogo",
      background: (
        <CategoryBackground src="/images/encajes.png" alt="Encajes" />
      ),
      className: "md:col-span-1",
      action: "alert",
    },
    {
      Icon: Palette,
      name: "Guipiur",
      description: "Tejidos estructurados de alta calidad.",
      href: "/catalogos/catalogo-guipiur.pdf",
      cta: "Ver Catálogo",
      background: (
        <CategoryBackground src="/images/guipiur.png" alt="Guipiur" />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: PenTool,
      name: "Hebillas",
      description: "Cierres metálicos funcionales.",
      href: "/catalogos/catalogo-hebillas.pdf",
      cta: "Ver Catálogo",
      background: (
        <CategoryBackground src="/images/hebillas.png" alt="Hebillas" />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: Gem,
      name: "Strass",
      description: "Cristales y brillo para acabados de lujo.",
      href: "/catalogos/catalogo-strass.pdf",
      cta: "Ver Catálogo",
      background: <CategoryBackground src="/images/strass.png" alt="Strass" />,
      className: "md:col-span-1",
    },
    {
      Icon: Ruler,
      name: "Guía de Medidas",
      description: "Referencia técnica de tamaños.",
      href: "/catalogos/medidas-botones.png",
      cta: "Ver Medidas",
      background: (
        <CategoryBackground src="/images/medidas.png" alt="Guía Medidas" />
      ),
      className: "md:col-span-1",
      action: "modal",
    },
  ];

  return (
    <section id="categorias" className="py-2 bg-navy-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-navy-900 font-bold text-4xl md:text-5xl font-heading">
            Nuestras Colecciones
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full" />
          <p className="text-navy-600 max-w-2xl mx-auto text-lg">
            Explora nuestros catálogos especializados. Insumos seleccionados
            para la alta confección.
          </p>
        </div>

        <BentoGrid className="auto-rows-[28rem] text-white drop-shadow-md [&_h3]:!text-white [&_p]:!text-gray-100 [&_p]:font-medium [&_svg]:!text-gold-400">
          {categories.map((item, idx) => {
            const isActionItem =
              item.action === "modal" || item.action === "alert";

            const handleAction = (e?: any) => {
              e?.stopPropagation();

              if (item.action === "alert") {
                alert(
                  "Estamos actualizando nuestro catálogo de encajes. ¡Pronto estará disponible!",
                );
              } else if (item.action === "modal") {
                setSelectedImage(item.href);
                setModalOpen(true);
              } else {
                window.open(item.href, "_blank");
              }
            };

            return (
              <div
                key={idx}
                onClick={handleAction}
                className={`${item.className} cursor-pointer h-full group relative overflow-hidden rounded-xl border border-navy-100/50 shadow-lg`}
              >
                {item.background}
                <BentoCard
                  Icon={item.Icon}
                  name={item.name}
                  description={item.description}
                  href={item.href}
                  cta={item.cta}
                  background={<div className="hidden" />}
                  className="h-full bg-transparent border-none shadow-none z-10 relative"
                  onClick={isActionItem ? handleAction : undefined}
                />
              </div>
            );
          })}
        </BentoGrid>

        <ImageModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          imageSrc={selectedImage}
          altText="Guía de Medidas"
        />
      </div>
    </section>
  );
}
