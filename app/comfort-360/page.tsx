import { prisma } from "@/lib/prisma";
import ProductList from "./ProductList";
import GlassNavbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const revalidate = 60;

export default async function Comfort360Page() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        image: true,
        stock: true,
        colors: true,
        size: true
      }
    });

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
          <ProductList products={products} />
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <GlassNavbar />
        <div className="flex-grow flex flex-col items-center justify-center pt-40">
          <h2 className="text-2xl font-bold text-navy-900">Catálogo temporalmente no disponible</h2>
          <p className="text-gray-500 mt-2">Recarga tu página o inténtalo de nuevo en unos minutos.</p>
        </div>
        <Footer />
      </main>
    );
  }
}