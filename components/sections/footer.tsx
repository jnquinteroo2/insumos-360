"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const TikTokIcon = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="block">
              <div className="relative h-16 w-48">
                <Image
                  src="/images/logo.png"
                  alt="Insumos 360 Pro"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Tu aliado estratégico en la cadena de suministro textil. Calidad
              premium y despacho inmediato para potenciar tu marca.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="https://www.facebook.com/share/1GF15oCGc4/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>

              <a
                href="https://www.instagram.com/insumos360pro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#FD1D1D] hover:via-[#E1306C] hover:to-[#C13584] hover:text-white transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>

              <a
                href="https://www.tiktok.com/@insumos360pro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-black hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] border border-transparent hover:border-white/20 transition-all duration-300 group"
                aria-label="TikTok"
              >
                <TikTokIcon
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold font-heading mb-6 text-white border-b border-gold-500/30 inline-block pb-1">
              Menú
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-gold-500 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative -left-3 group-hover:left-0 transition-all duration-300">
                    Inicio
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-400 hover:text-gold-500 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative -left-3 group-hover:left-0 transition-all duration-300">
                    Nosotros
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="text-gray-400 hover:text-gold-500 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative -left-3 group-hover:left-0 transition-all duration-300">
                    Categorías
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contactenos"
                  className="text-gray-400 hover:text-gold-500 transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative -left-3 group-hover:left-0 transition-all duration-300">
                    Contáctenos
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-heading mb-6 text-white border-b border-gold-500/30 inline-block pb-1">
              Legal
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-gold-500 transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-gold-500 transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-gold-500 transition-colors"
                >
                  Política de Envíos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-heading mb-6 text-white border-b border-gold-500/30 inline-block pb-1">
              Contacto
            </h3>
            <ul className="space-y-5 text-sm">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Cr+13+no+16-85+Bogotá+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin
                    className="mt-0.5 text-gold-500 shrink-0 group-hover:text-white transition-colors"
                    size={18}
                  />
                  <span className="text-gray-400 group-hover:text-gold-500 transition-colors">
                    CRA 13 # 16-85,
                    <br />
                    Bogotá D.C., Colombia
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+573122036189"
                  className="flex items-center gap-3 group"
                >
                  <Phone
                    className="text-gold-500 shrink-0 group-hover:text-white transition-colors"
                    size={18}
                  />
                  <span className="text-gray-400 group-hover:text-gold-500 transition-colors">
                    +57 313 371 9099
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ventas@insumos360pro.com"
                  className="flex items-center gap-3 group"
                >
                  <Mail
                    className="text-gold-500 shrink-0 group-hover:text-white transition-colors"
                    size={18}
                  />
                  <span className="text-gray-400 group-hover:text-gold-500 transition-colors">
                    ventas@insumos360pro.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Insumos 360 Pro SAS. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
