"use client";

import Image from "next/image";
import { User, Briefcase, TrendingUp, Settings, Palette } from "lucide-react";

export default function Organigrama() {
  const departments = [
    {
      title: "Administrativo y Financiero",
      icon: <Briefcase className="h-6 w-6 text-gold-500" />,
      members: [
        {
          name: "Norma Linares",
          role: "Directora",
          img: "/images/team/norma.jpg",
        },
        {
          name: "Angie Torres",
          role: "Coordinadora",
          img: "/images/team/angie.jpg",
        },
      ],
    },
    {
      title: "Comercial y Ventas",
      icon: <TrendingUp className="h-6 w-6 text-gold-500" />,
      members: [
        {
          name: "Mauricio Lozada",
          role: "Director Comercial",
          img: "/images/team/mauricio.jpg",
        },
      ],
    },
    {
      title: "Operativo y Logística",
      icon: <Settings className="h-6 w-6 text-gold-500" />,
      members: [
        {
          name: "Dayanna Linares",
          role: "Directora de Operaciones",
          img: "/images/team/dayanna.jpg",
        },
        {
          name: "Cristina Poblador",
          role: "Coordinadora",
          img: "/images/team/cristina.jpg",
        },
      ],
    },
    {
      title: "Marketing",
      icon: <Palette className="h-6 w-6 text-gold-500" />,
      members: [
        {
          name: "Agencia DOS 20",
          role: "Aliado Estratégico",
          img: "/images/team/dos20.jpg",
        },
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy-900 font-heading tracking-tight mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            El talento humano detrás del éxito de Insumos 360. Profesionales
            comprometidos con la calidad y el servicio.
          </p>
        </div>

        <div className="flex flex-col items-center mb-16 relative">
          <div className="bg-navy-900 text-white px-10 py-5 rounded-2xl shadow-xl border border-gold-500/20 z-10 text-center transform hover:-translate-y-1 transition-transform">
            <h3 className="text-xl font-black tracking-widest uppercase text-gold-500 mb-1">
              Junta Directiva
            </h3>
            <p className="text-sm font-medium text-gray-300">
              Socios Fundadores
            </p>
          </div>

          <div className="w-1 h-12 bg-gradient-to-b from-navy-900 to-gold-500 -my-1 z-0"></div>

          <div className="bg-white px-12 py-6 rounded-2xl shadow-lg border border-gray-100 z-10 text-center transform hover:-translate-y-1 transition-transform">
            <h3 className="text-2xl font-bold text-navy-900 mb-1">
              Gerencia General
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Liderazgo Estratégico
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-navy-900/5 border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl hover:border-gold-200 transition-all duration-300"
            >
              <div className="bg-gold-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform -rotate-3 hover:rotate-0 transition-transform">
                {dept.icon}
              </div>
              <h4 className="text-lg font-bold text-navy-900 mb-6 h-12 flex items-center justify-center">
                {dept.title}
              </h4>

              <div className="w-full space-y-4">
                {dept.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl border border-gray-100/50"
                  >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-white shadow-md bg-gray-200 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-bold text-navy-900 text-[15px]">
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
