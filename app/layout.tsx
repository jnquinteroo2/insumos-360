import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Insumos 360 Pro | Insumos Textiles y Confección en Colombia",
  description:
    "Importadores directos de insumos para confección: botones, encajes, hilos y herrajes. Distribución nacional en Colombia para talleres y fábricas.",
  keywords: [
    "insumos textiles",
    "confección colombia",
    "botones",
    "encajes",
    "herrajes",
    "fábricas de ropa",
    "proveedores textiles",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.insumos360pro.com",
    title: "Insumos 360 Pro | Insumos Textiles y Confección en Colombia",
    description: "Importadores directos de insumos para confección.",
    siteName: "Insumos 360 Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insumos 360 Pro | Proveedores Textiles",
    description: "Insumos de alta calidad para la moda en Colombia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Insumos 360 Pro SAS",
    image: "https://www.insumos360pro.com/images/hero-bg.png",
    "@id": "https://www.insumos360pro.com",
    url: "https://www.insumos360pro.com",
    telephone: "+573122036189",
    address: {
      "@type": "PostalAddress",
      streetAddress: "CRA 13 # 16-85",
      addressLocality: "Bogotá",
      postalCode: "11001",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.6097,
      longitude: -74.0817,
    },
    sameAs: ["https://www.instagram.com/insumos360pro/"],
    description:
      "Importadores y distribuidores de insumos para confección en Colombia.",
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          playfair.variable,
          montserrat.variable,
          "antialiased font-body bg-background text-foreground overflow-x-hidden",
        )}
      >
        {children}
      </body>
    </html>
  );
}
