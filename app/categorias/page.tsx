import GlassNavbar from "@/components/sections/navbar";
import Categories from "@/components/sections/categories";
import Footer from "@/components/sections/footer";

export default function CategoriasPage() {
  return (
    <main className="min-h-screen bg-white">
      <GlassNavbar />
      <div className="pt-24 pb-12 bg-navy-50"></div>
      <Categories />
      <Footer />
    </main>
  );
}
