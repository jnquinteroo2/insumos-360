import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Juego de Cama Unicolor (Sencilla)",
        category: "Juego de Cama",
        description: "100% Poliéster. Estilo clásico y versátil.",
        price: 82000,
        image: "/images/cama-unicolor.jpg",
        stock: 100,
      },
      {
        name: "Juego de Cama Combinada (Doble)",
        category: "Juego de Cama",
        description: "Colores que aportan elegancia y estilo a la habitación.",
        price: 94050,
        image: "/images/cama-combinada.jpg",
        stock: 100,
      },
      {
        name: "Cobija Viajera",
        category: "Cobijas",
        description: "Ligera, cálida y confortable. 130x150cm.",
        price: 44900,
        image: "/images/cobija-viajera.jpg",
        stock: 100,
      },
      {
        name: "Toalla Cuerpo",
        category: "Toallas",
        description:
          "Algodón 100%. Suave, absorbente y resistente al lavado. 70x140cm.",
        price: 79500,
        image: "/images/toallas.jpg",
        stock: 100,
      },
      {
        name: "Tapete Rectangular",
        category: "Tapetes",
        description: "Antiaderente y moderno. 38x68cm.",
        price: 35700,
        image: "/images/tapetes.jpg",
        stock: 100,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
