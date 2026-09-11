import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMAGE_REPLACEMENTS: { old: string; new: string }[] = [
  {
    old: "https://insumos360.com/productos/cama-unicolor.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256644/cama-unicolor_hvwyqw.jpg",
  },
  {
    old: "https://insumos360.com/productos/cama-combinada.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256645/cama-combinada_uhqncs.jpg",
  },
  {
    old: "https://insumos360.com/productos/cobija-polar.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256647/cobija-polar_bt9bn8.jpg",
  },
  {
    old: "https://insumos360.com/productos/cobija-viajera.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256649/cobija-viajera_rbgegu.jpg",
  },
  {
    old: "https://insumos360.com/productos/cobija-elite.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256643/cobija-elite_qtwt9g.jpg",
  },
  {
    old: "https://insumos360.com/productos/toallas.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256650/toallas_kedfk2.jpg",
  },
  {
    old: "https://insumos360.com/productos/tapete-rectangular.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256648/tapete-rectangular_jhbxdw.jpg",
  },
  {
    old: "https://insumos360.com/productos/tapete-ovalado.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256652/tapete-ovalado_qksnq6.jpg",
  },
  {
    old: "https://insumos360.com/productos/tapete-cocina.jpg",
    new: "https://res.cloudinary.com/dvrz5uflr/image/upload/v1785256651/tapete-cocina_kqka0v.jpg",
  },
];

async function main() {
  let totalUpdated = 0;

  for (const { old, new: newUrl } of IMAGE_REPLACEMENTS) {
    const result = await prisma.product.updateMany({
      where: { image: old },
      data: { image: newUrl },
    });
    console.log(`${old} -> ${newUrl}: ${result.count} row(s) updated`);
    totalUpdated += result.count;
  }

  console.log(`Total rows updated: ${totalUpdated}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
