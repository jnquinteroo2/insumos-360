import GlassNavbar from "@/components/sections/navbar";
import About from "@/components/sections/about";
import Footer from "@/components/sections/footer";
import Organigrama from "@/components/sections/organigrama";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-white">
      <GlassNavbar />
      <div className="pt-24 pb-12 bg-navy-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white font-heading">
            Nuestra Empresa
          </h1>
          <p className="text-gold-500 mt-2">
            Conoce la historia detrás de Insumos 360 Pro
          </p>
        </div>
      </div>
      <About />
      <Organigrama />
      <Footer />
    </main>
  );
}
