"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

export default function GlassNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const cart = useCartStore((state) => state.cart);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Categorías", href: "/categorias" },
    { name: "Tienda Hogar", href: "/comfort-360", special: true },
    { name: "Contáctenos", href: "/contactenos" },
  ];

  const isTransparent = isHome && !isScrolled;

  const navLinkClasses = (isSpecial = false) =>
    cn(
      "text-sm font-semibold transition-all duration-300",
      isTransparent
        ? isSpecial
          ? "text-gold-400 hover:text-white"
          : "text-white hover:text-gold-500"
        : isSpecial
          ? "text-gold-600 hover:text-navy-900"
          : "text-navy-800 hover:text-gold-500",
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
          isTransparent
            ? "bg-transparent border-transparent py-4 md:py-6"
            : "bg-white/95 backdrop-blur-md border-white/10 shadow-lg py-3 md:py-4",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link
            href="/"
            className="relative h-9 md:h-12 w-fit flex items-center shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt="Insumos 360 Logo"
              width={160}
              height={40}
              className="object-contain h-full w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={navLinkClasses(link.special)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {mounted && (
              <Link
                href="/checkout"
                className={cn(
                  "relative p-2 rounded-full transition-all hover:bg-gold-500/10 hover:scale-110",
                  isTransparent && !mobileMenuOpen
                    ? "text-white"
                    : "text-navy-900",
                )}
                aria-label="Ver carrito"
              >
                <ShoppingCart
                  className="h-6 w-6 md:h-7 md:w-7"
                  strokeWidth={2}
                />
                <AnimatePresence>
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-black text-navy-900 shadow-lg border-2 border-white/10"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )}

            <button
              className={cn(
                "lg:hidden p-1.5 rounded-lg transition-colors z-50 relative",
                isTransparent && !mobileMenuOpen
                  ? "text-white hover:bg-white/10"
                  : "text-navy-900 hover:bg-navy-100",
              )}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm z-[60] lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-navy-900 z-[70] lg:hidden shadow-2xl flex flex-col border-l border-white/10"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={120}
                  height={30}
                  className="object-contain brightness-0 invert"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/70 hover:text-gold-500 p-1"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col items-center flex-grow justify-center space-y-7 p-8 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-3xl font-heading font-bold text-white hover:text-gold-500 transition-colors tracking-tight",
                      link.special && "text-gold-400",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
