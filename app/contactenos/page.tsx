import GlassNavbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { Phone, MapPin, Clock } from "lucide-react";

export default function ContactenosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <GlassNavbar />

      <div className="py-24 bg-navy-900 text-center">
        <h1 className="text-4xl font-bold text-white font-heading">
          Contáctenos
        </h1>
        <p className="text-gray-300 mt-4 max-w-xl mx-auto px-4">
          Estamos listos para atender tus solicitudes. Visítanos en nuestros
          puntos de venta o escríbenos.
        </p>
      </div>

      <div className="container mx-auto px-6 -mt-16 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-gold-500">
            <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mb-6 text-navy-900">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold font-heading text-navy-800 mb-4 h-16 flex items-end">
              Puntos de Venta
            </h3>
            <div className="space-y-4 text-gray-600 text-sm">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Carrera+13+%23+16-85+Bogotá"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors group"
              >
                <strong className="block text-navy-700 group-hover:text-gold-600 transition-colors">
                  Sede Principal ↗
                </strong>
                CRA 13 # 16-85
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Carrera+10a+%23+10-73+Bogotá"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors group"
              >
                <strong className="block text-navy-700 group-hover:text-gold-600 transition-colors">
                  Sucursal ↗
                </strong>
                CRA 10a # 10-73
              </a>

              <p className="text-xs text-gray-400 mt-2 px-2">
                Bogotá, Colombia
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-navy-500">
            <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mb-6 text-navy-900">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-bold font-heading text-navy-800 mb-4 h-16 flex items-end">
              Líneas de Atención
            </h3>
            <div className="space-y-4 text-gray-600 text-sm flex flex-col">
              <a
                href="tel:+573122036189"
                className="hover:text-gold-600 transition-colors font-medium p-1"
              >
                (+57) 313 371 9099
              </a>
              <a
                href="tel:+573133719099"
                className="hover:text-gold-600 transition-colors font-medium p-1"
              >
                (+57) 312 203 6189
              </a>
              <p className="text-xs text-gold-600 mt-2 font-semibold">
                ¡Atención vía WhatsApp disponible!
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-gold-500">
            <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mb-6 text-navy-900">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold font-heading text-navy-800 mb-4 h-16 flex items-end">
              Contacto Digital
            </h3>
            <div className="space-y-4 text-gray-600 text-sm">
              <p>
                <strong className="block text-navy-700">
                  Email Administrativo:
                </strong>
                <a
                  href="mailto:administracion@insumos360pro.com"
                  className="hover:text-gold-600 break-words transition-colors"
                >
                  administracion@insumos360pro.com
                </a>
              </p>
              <div className="pt-2 border-t border-gray-100">
                <strong className="block text-navy-700 mb-1">
                  Horario de Atención:
                </strong>
                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p>Sábados: 8:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
