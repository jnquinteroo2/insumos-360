import { prisma } from "@/lib/prisma";
import ProductList from "./ProductList";
import GlassNavbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { Product } from "@/store/cartStore";

export const revalidate = 3600;

export default async function Comfort360Page() {
  let products: Product[] = [];
  let hasError = false;

  try {
    products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        image: true,
        stock: true,
        colors: true,
        size: true,
      },
    });
  } catch {
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <GlassNavbar />
      <div className="pt-32 pb-16 bg-navy-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">
          Línea Hogar Comfort 360
        </h1>
        <p className="text-gold-500 mt-4 text-lg">Catálogo 2026</p>
      </div>
      <div className="container mx-auto px-6 py-12">
        {hasError || products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 text-center px-6">
            <div className="bg-gold-50 p-5 rounded-full mb-6">
              <svg
                className="h-12 w-12 text-gold-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              Catálogo temporalmente no disponible
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
              Estamos actualizando nuestro catálogo. Por favor intenta de nuevo
              en unos minutos o contáctanos por WhatsApp para asesoría
              personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/573133719099?text=Hola,%20el%20catálogo%20Comfort%20360%20no%20carga.%20¿Pueden%20ayudarme?"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-[#128C7E] transition-all text-sm flex items-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382C17.117 14.197 15.365 13.332 15.033 13.226C14.706 13.112 14.464 13.063 14.226 13.423C13.984 13.783 13.309 14.576 13.106 14.808C12.902 15.038 12.694 15.072 12.341 14.894C11.988 14.716 10.854 14.343 9.509 13.139C8.459 12.2 7.749 11.042 7.545 10.689C7.341 10.337 7.523 10.155 7.7 9.978C7.859 9.818 8.053 9.565 8.23 9.358C8.407 9.15 8.469 8.997 8.583 8.766C8.701 8.535 8.641 8.331 8.559 8.164C8.477 7.997 7.801 6.321 7.521 5.637C7.232 4.932 6.952 5.056 6.75 5.056C6.561 5.056 6.345 5.046 6.129 5.046C5.913 5.046 5.561 5.129 5.267 5.452C4.973 5.775 4.135 6.569 4.135 8.192C4.135 9.815 5.309 11.376 5.483 11.609C5.657 11.842 7.806 15.155 11.129 16.587C11.918 16.928 12.533 17.132 13.013 17.283C13.862 17.553 14.645 17.514 15.264 17.422C15.955 17.319 17.398 16.548 17.698 15.695C17.998 14.842 17.998 14.111 17.913 13.966C17.826 13.821 17.6 13.734 17.247 13.556H17.472V14.382Z" />
                </svg>
                Escribir por WhatsApp
              </a>
              <Link
                href="/"
                className="bg-navy-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-gold-500 hover:text-navy-900 transition-all text-sm"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
      <Footer />
    </main>
  );
}