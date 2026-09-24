import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      {
        "name": "Juego de Cama Unicolor - Sencilla",
        "category": "Juego de Cama",
        "description": "Juego de cama unicolor elaborado 100% en poliéster, de textura suave y ligera. Ideal para uso diario gracias a su fácil lavado, secado rápido y resistencia al desgaste. Su diseño sencillo y elegante combina con cualquier estilo de habitación, brindando comodidad y practicidad.",
        "price": 89900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272313/juego_de_cama_unicolor_k4wpfx",
        "stock": 10,
        "colors": "Blanco, Negro, Gris",
        "size": "100x190 cm (Sencilla)"
      },
      {
        "name": "Juego de Cama Unicolor - Doble",
        "category": "Juego de Cama",
        "description": "Juego de cama unicolor elaborado 100% en poliéster, de textura suave y ligera. Ideal para uso diario gracias a su fácil lavado, secado rápido y resistencia al desgaste. Su diseño sencillo y elegante combina con cualquier estilo de habitación, brindando comodidad y practicidad.",
        "price": 99900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272313/juego_de_cama_unicolor_k4wpfx",
        "stock": 10,
        "colors": "Blanco, Negro, Gris",
        "size": "140x190 cm (Doble)"
      },
      {
        "name": "Juego de Cama Unicolor - Extra Doble",
        "category": "Juego de Cama",
        "description": "Juego de cama unicolor elaborado 100% en poliéster, de textura suave y ligera. Ideal para uso diario gracias a su fácil lavado, secado rápido y resistencia al desgaste. Su diseño sencillo y elegante combina con cualquier estilo de habitación, brindando comodidad y practicidad.",
        "price": 109900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272313/juego_de_cama_unicolor_k4wpfx",
        "stock": 10,
        "colors": "Blanco, Negro, Gris",
        "size": "160x190 cm (Extra Doble)"
      },
      {
        "name": "Juego de Cama Combinado - Sencilla",
        "category": "Juego de Cama",
        "description": "Juego de cama elaborado 100% en poliéster, de textura suave y ligera. Ideal para uso diario gracias a su fácil lavado, secado rápido y resistencia al desgaste. Su diseño sencillo y elegante combina con cualquier estilo de habitación, brindando comodidad y practicidad.",
        "price": 89900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272329/juego_de_cama_1_s638ja",
        "stock": 10,
        "colors": "Combinado",
        "size": "100x190 cm (Sencilla)"
      },
      {
        "name": "Juego de Cama Combinado - Semidoble",
        "category": "Juego de Cama",
        "description": "Juego de cama elaborado 100% en poliéster, de textura suave y ligera. Ideal para uso diario gracias a su fácil lavado, secado rápido y resistencia al desgaste. Su diseño sencillo y elegante combina con cualquier estilo de habitación, brindando comodidad y practicidad.",
        "price": 95000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272332/juego_de_cama_5_d9squl",
        "stock": 10,
        "colors": "Combinado",
        "size": "120x190 cm (Semidoble)"
      },
      {
        "name": "Juego de Cama Combinado - Doble",
        "category": "Juego de Cama",
        "description": "Juego de cama elaborado 100% en poliéster, de textura suave y ligera. Ideal para uso diario gracias a su fácil lavado, secado rápido y resistencia al desgaste. Su diseño sencillo y elegante combina con cualquier estilo de habitación, brindando comodidad y practicidad.",
        "price": 99900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272335/juego_de_cama_6_lnw8fe",
        "stock": 10,
        "colors": "Combinado",
        "size": "140x190 cm (Doble)"
      },
      {
        "name": "Juego de Cama Combinado - Extra Doble",
        "category": "Juego de Cama",
        "description": "Juego de cama elaborado 100% en poliéster, de textura suave y ligera. Ideal para uso diario gracias a su fácil lavado, secado rápido y resistencia al desgaste. Su diseño sencillo y elegante combina con cualquier estilo de habitación, brindando comodidad y practicidad.",
        "price": 119900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272334/juego_de_cama_11_xppjkj",
        "stock": 10,
        "colors": "Combinado",
        "size": "160x190 cm (Extra Doble)"
      },
      {
        "name": "Juego de Cama 4 Fundas - Doble",
        "category": "Juego de Cama",
        "description": "Juego de cama elaborado 100% en poliéster, de textura suave y ligera. Ideal para uso diario gracias a su fácil lavado, secado rápido y resistencia al desgaste. Su diseño sencillo y elegante combina con cualquier estilo de habitación, brindando comodidad y practicidad. Incluye 4 fundas.",
        "price": 109900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272312/juego_de_cama_9_m8fdpu",
        "stock": 10,
        "colors": "Combinado",
        "size": "140x190 cm (Doble)"
      },
      {
        "name": "Cobija Polar Combinada - Sencilla",
        "category": "Cobijas",
        "description": "Las Cobijas Polar han sido diseñadas para ofrecer una experiencia superior de abrigo y confort. Confeccionadas en microfibra polar de alta densidad (210 g/m²), presentan una textura suave al tacto y un excelente poder térmico, garantizando calidez y comodidad en todo momento.",
        "price": 79900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272320/cobija_polar_combinada_k0adu8",
        "stock": 10,
        "colors": "Combinado",
        "size": "160x225 cm (Sencilla)"
      },
      {
        "name": "Cobija Polar Combinada - Doble",
        "category": "Cobijas",
        "description": "Las Cobijas Polar han sido diseñadas para ofrecer una experiencia superior de abrigo y confort. Confeccionadas en microfibra polar de alta densidad (210 g/m²), presentan una textura suave al tacto y un excelente poder térmico, garantizando calidez y comodidad en todo momento.",
        "price": 89900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272320/cobija_polar_combinada_k0adu8",
        "stock": 10,
        "colors": "Combinado",
        "size": "200x225 cm (Doble)"
      },
      {
        "name": "Cobija Viajera - Estándar",
        "category": "Cobijas",
        "description": "Cobija viajera de grosor 280 g/m², ligera y suave al tacto. Brinda abrigo y confort en todo momento, ideal para viajes, hogar u oficina. Su textura resistente garantiza durabilidad y fácil mantenimiento.",
        "price": 49900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272321/cobija_viajera_1_ygmtbs",
        "stock": 10,
        "colors": "Azul oscuro, Rojo, Gris oscuro",
        "size": "130x150 cm (Estándar)"
      },
      {
        "name": "Manta Polar - Estándar",
        "category": "Cobijas",
        "description": "Disfruta del máximo confort con la Manta Polar. Su tejido suave y cálido brinda una agradable sensación de bienestar, perfecta para acompañar tus momentos de descanso. Su diseño elegante y versátil complementa cualquier espacio del hogar, aportando estilo y calidez a salas, habitaciones y rincones de lectura.",
        "price": 29900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272302/cobija_polar_ynyrtx",
        "stock": 10,
        "colors": "Azul oscuro, Beige",
        "size": "130x150 cm (Estándar)"
      },
      {
        "name": "Cobija Elite - Sencilla",
        "category": "Cobijas",
        "description": "Nuestra cobija Elite combina suavidad, elegancia y abrigo excepcional. Confeccionada en tela polar de alta calidad, brinda una textura suave al tacto y una calidez ideal para todo tipo de clima. Su acabado fino y resistente garantiza durabilidad y confort noche tras noche.",
        "price": 199000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272300/cobija_elite_1_gtj9uw",
        "stock": 10,
        "colors": "Beige, Negro, Blanco",
        "size": "160x220 cm (Sencilla)"
      },
      {
        "name": "Cobija Elite - Doble",
        "category": "Cobijas",
        "description": "Nuestra cobija Elite combina suavidad, elegancia y abrigo excepcional. Confeccionada en tela polar de alta calidad, brinda una textura suave al tacto y una calidez ideal para todo tipo de clima. Su acabado fino y resistente garantiza durabilidad y confort noche tras noche.",
        "price": 229000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272319/cobija_elite_2_tkpmt6",
        "stock": 10,
        "colors": "Beige, Negro, Blanco",
        "size": "180x220 cm (Doble)"
      },
      {
        "name": "Cobija Flannel - Sencilla",
        "category": "Cobijas",
        "description": "Cobija elaborada con tela flannel de alta calidad, con una textura extra suave, ligera y agradable al tacto. Proporciona la calidez ideal para un descanso confortable y es perfecta para regalar, combinando confort, calidad y estilo en un solo detalle.",
        "price": 85000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272320/cobija_flanell_1_tkzhhj",
        "stock": 10,
        "colors": "Café, Gris, Beige, Lila",
        "size": "160x220 cm (Sencilla)"
      },
      {
        "name": "Cobija Flannel - Doble",
        "category": "Cobijas",
        "description": "Cobija elaborada con tela flannel de alta calidad, con una textura extra suave, ligera y agradable al tacto. Proporciona la calidez ideal para un descanso confortable y es perfecta para regalar, combinando confort, calidad y estilo en un solo detalle.",
        "price": 95000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272301/cobija_flanell_2_mflb4y",
        "stock": 10,
        "colors": "Negro, Gris, Blanco, Verde",
        "size": "Doble"
      },
      {
        "name": "Toallas - Manos",
        "category": "Toallas",
        "description": "Confeccionada en 100% algodón de alta calidad, esta toalla ofrece una textura densa y suave al tacto, garantizando máxima absorción y durabilidad. Su gramaje de 570 g/m² proporciona una sensación de confort superior y un secado eficiente.",
        "price": 34000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272348/toallas_getsp2",
        "stock": 10,
        "colors": "Blanco, Gris oscuro",
        "size": "50x90 cm (Manos)"
      },
      {
        "name": "Toallas - Cuerpo",
        "category": "Toallas",
        "description": "Confeccionada en 100% algodón de alta calidad, esta toalla ofrece una textura densa y suave al tacto, garantizando máxima absorción y durabilidad. Su gramaje de 570 g/m² proporciona una sensación de confort superior y un secado eficiente.",
        "price": 69900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272348/toallas_getsp2",
        "stock": 10,
        "colors": "Blanco, Gris oscuro",
        "size": "70x140 cm (Cuerpo)"
      },
      {
        "name": "Toallas - Kit",
        "category": "Toallas",
        "description": "Confeccionada en 100% algodón de alta calidad, esta toalla ofrece una textura densa y suave al tacto, garantizando máxima absorción y durabilidad. Su gramaje de 570 g/m² proporciona una sensación de confort superior y un secado eficiente.",
        "price": 99900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272348/toallas_getsp2",
        "stock": 10,
        "colors": "Blanco, Gris oscuro",
        "size": "Kit (Manos y Cuerpo)"
      },
      {
        "name": "Almohada Dúo con Embone - Estándar",
        "category": "Almohadas",
        "description": "La Almohada Dúo con Embone está diseñada para ofrecer un descanso cómodo y confortable. Su relleno de fibra de poliéster siliconada proporciona una sensación suave y esponjosa, mientras que su diseño con embone brinda un mejor acabado, mayor resistencia y una excelente conservación de la forma.",
        "price": 120000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790273325/almohada_duo_bvhzz6",
        "stock": 10,
        "colors": "Blanco",
        "size": "50x70 cm"
      },
      {
        "name": "Almohada Classic - Estándar",
        "category": "Almohadas",
        "description": "La Almohada Classic Doble Forro está diseñada para brindar una experiencia de descanso cómoda y placentera. Su relleno de fibra de poliéster siliconada proporciona una sensación suave y esponjosa, mientras que su doble forro aporta mayor resistencia y prolonga la vida útil del producto.",
        "price": 49900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790273325/almohada_clasic_wrpgxk",
        "stock": 10,
        "colors": "Blanco",
        "size": "50x70 cm"
      },
      {
        "name": "Almohada Plus - Estándar",
        "category": "Almohadas",
        "description": "La Almohada Plus Doble Forro con Embone está diseñada para brindar un descanso cómodo y reparador. Su relleno de fibra de poliéster siliconada ofrece una sensación suave y esponjosa, mientras que el doble forro con embone aporta mayor resistencia y durabilidad.",
        "price": 59900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272300/almohada_plus_n8vij2",
        "stock": 10,
        "colors": "Blanco",
        "size": "50x70 cm"
      },
      {
        "name": "Almohada Elite - Estándar",
        "category": "Almohadas",
        "description": "La Almohada Elite Line Doble Forro Premium está diseñada para quienes valoran el confort, la calidad y el bienestar en cada detalle. Su exclusivo diseño acolchado y su relleno de fibra siliconada de alta calidad ofrecen una sensación de suavidad envolvente durante toda la noche.",
        "price": 74900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272299/almohada_elite_dfvjnw",
        "stock": 10,
        "colors": "Blanco",
        "size": "50x70 cm"
      },
      {
        "name": "Quilt Doble Faz - Sencillo",
        "category": "Quilts",
        "description": "Confeccionado con materiales de alta calidad y un delicado acolchado que brinda suavidad y confort, este quilt doble faz combina elegancia, funcionalidad y durabilidad. Su diseño reversible permite disfrutar de dos estilos diferentes en una sola pieza.",
        "price": 115000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272345/quilt_sencillo_1_vu4dqx",
        "stock": 10,
        "colors": "Surtidos",
        "size": "170x230 cm (Sencillo)"
      },
      {
        "name": "Quilt Doble Faz - Doble",
        "category": "Quilts",
        "description": "Confeccionado con materiales de alta calidad y un delicado acolchado que brinda suavidad y confort, este quilt doble faz combina elegancia, funcionalidad y durabilidad. Su diseño reversible permite disfrutar de dos estilos diferentes en una sola pieza.",
        "price": 125000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272349/quilt_doble_1_loxmdq",
        "stock": 10,
        "colors": "Surtidos",
        "size": "220x230 cm (Doble)"
      },
      {
        "name": "Quilt Doble Faz - Extra Doble",
        "category": "Quilts",
        "description": "Confeccionado con materiales de alta calidad y un delicado acolchado que brinda suavidad y confort, este quilt doble faz combina elegancia, funcionalidad y durabilidad. Su diseño reversible permite disfrutar de dos estilos diferentes en una sola pieza.",
        "price": 135000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272337/quilt_extra_1_y82jzz",
        "stock": 10,
        "colors": "Surtidos",
        "size": "240x240 cm (Extra Doble)"
      },
      {
        "name": "Quilt Estampado - Estándar",
        "category": "Quilts",
        "description": "Confeccionado con materiales de alta calidad y un delicado acolchado que brinda suavidad y confort, este quilt doble faz combina elegancia, funcionalidad y durabilidad. Su diseño reversible permite disfrutar de dos estilos diferentes en una sola pieza.",
        "price": 99900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272347/quilt_sencillo_6_a3zwex",
        "stock": 10,
        "colors": "Surtidos",
        "size": "170x250 cm"
      },
      {
        "name": "Cojines Bordados - Estándar",
        "category": "Cojines",
        "description": "Elaborados con materiales de alta calidad, nuestros cojines 100% bordados a mano destacan por sus acabados artesanales, elegancia y exclusividad. Cada pieza aporta textura, sofisticación y un estilo único para realzar cualquier espacio.",
        "price": 95000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272304/cojines_bordados_bntpu7",
        "stock": 10,
        "colors": "Surtidos",
        "size": "45x45 cm"
      },
      {
        "name": "Cojín Peluche - Estándar",
        "category": "Cojines",
        "description": "Fabricados con materiales de alta calidad, nuestros cojines peludos ofrecen una textura extra suave y un acabado elegante que aporta calidez y confort a cualquier espacio. Ideales para salas, habitaciones y áreas de descanso.",
        "price": 35000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272303/cojin_peluche_1_zcgr1j",
        "stock": 10,
        "colors": "Surtidos",
        "size": "45x45 cm"
      },
      {
        "name": "Protector de Colchón Impermeable - Sencillo",
        "category": "Protectores",
        "description": "El Protector de Colchón Impermeable Fenissa Classic presenta un diseño limpio y sofisticado que se integra perfectamente en cualquier ambiente. Su acabado en color blanco transmite sensación de frescura, higiene y bienestar.",
        "price": 79900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272318/protector_de_colchon_yickwa",
        "stock": 10,
        "colors": "Blanco",
        "size": "100x190 cm (Sencillo)"
      },
      {
        "name": "Protector de Colchón Impermeable - Doble",
        "category": "Protectores",
        "description": "El Protector de Colchón Impermeable Fenissa Classic presenta un diseño limpio y sofisticado que se integra perfectamente en cualquier ambiente. Su acabado en color blanco transmite sensación de frescura, higiene y bienestar.",
        "price": 89900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272318/protector_de_colchon_yickwa",
        "stock": 10,
        "colors": "Blanco",
        "size": "140x190 cm (Doble)"
      },
      {
        "name": "Protector de Colchón Impermeable - Extra Doble",
        "category": "Protectores",
        "description": "El Protector de Colchón Impermeable Fenissa Classic presenta un diseño limpio y sofisticado que se integra perfectamente en cualquier ambiente. Su acabado en color blanco transmite sensación de frescura, higiene y bienestar.",
        "price": 99900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272318/protector_de_colchon_yickwa",
        "stock": 10,
        "colors": "Blanco",
        "size": "160x200 cm (Extra Doble)"
      },
      {
        "name": "Edredón - Sencillo",
        "category": "Edredones",
        "description": "Este edredón es una opción funcional y decorativa para complementar la habitación. Gracias a su diseño moderno, su textura suave y su fácil mantenimiento, es ideal para quienes buscan comodidad y practicidad sin dejar de lado la estética del hogar.",
        "price": 125000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272327/edredon_sencillo_1_seopv8",
        "stock": 10,
        "colors": "Surtidos",
        "size": "170x240 cm (Sencillo)"
      },
      {
        "name": "Edredón - Doble",
        "category": "Edredones",
        "description": "Este edredón es una opción funcional y decorativa para complementar la habitación. Gracias a su diseño moderno, su textura suave y su fácil mantenimiento, es ideal para quienes buscan comodidad y practicidad sin dejar de lado la estética del hogar.",
        "price": 135000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272305/edredon_doble_1_ov5lbo",
        "stock": 10,
        "colors": "Surtidos",
        "size": "220x240 cm (Doble)"
      },
      {
        "name": "Edredón - Extra Doble",
        "category": "Edredones",
        "description": "Este edredón es una opción funcional y decorativa para complementar la habitación. Gracias a su diseño moderno, su textura suave y su fácil mantenimiento, es ideal para quienes buscan comodidad y practicidad sin dejar de lado la estética del hogar.",
        "price": 145000,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272327/edredon_extra_doble_1_jodgmk",
        "stock": 10,
        "colors": "Surtidos",
        "size": "240x240 cm (Extra Doble)"
      },
      {
        "name": "Plumón - Doble",
        "category": "Plumones y Duvets",
        "description": "Disfruta del confort y la suavidad de este plumón para cama, diseñado para brindar una sensación acogedora, ligera y elegante. Su acabado acolchado aporta volumen, abrigo y una apariencia limpia que transforma la cama en un espacio más cómodo y armonioso.",
        "price": 149900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272314/plumon_1_hmzarm",
        "stock": 10,
        "colors": "Surtidos",
        "size": "210x240 cm (Doble)"
      },
      {
        "name": "Duvet Nevado - Doble",
        "category": "Plumones y Duvets",
        "description": "Dale un toque de elegancia y confort a tu habitación con nuestros duvets Fenissa. Diseños modernos, versátiles y decorativos, elaborados en tela suave al tacto, ideales para renovar tus espacios con estilo, abrigo y comodidad.",
        "price": 169900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272326/duvet_nevado_1_uh6rlx",
        "stock": 10,
        "colors": "Surtidos",
        "size": "210x240 cm (Doble)"
      },
      {
        "name": "Duvet Unicolor - Doble",
        "category": "Plumones y Duvets",
        "description": "Su diseño moderno y sofisticado permite combinarlo con diferentes estilos de decoración, aportando calidez, frescura y armonía a tu dormitorio. Además, cuenta con una presentación práctica.",
        "price": 129900,
        "image": "https://res.cloudinary.com/dvrz5uflr/image/upload/f_auto,q_auto,w_1200/v1790272305/duvet_unicolor_1_iefkyr",
        "stock": 10,
        "colors": "Surtidos",
        "size": "210x240 cm (Doble)"
      }
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