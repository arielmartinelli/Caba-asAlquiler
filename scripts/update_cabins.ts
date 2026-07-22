import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating cabins with new information...');

  const cabins = await prisma.cabin.findMany({
    orderBy: { createdAt: 'asc' },
  });

  if (cabins.length < 3) {
    console.error('Not enough cabins found in database.');
    return;
  }

  // Update first cabin (was Sendero de Montaña) -> Aromito
  await prisma.cabin.update({
    where: { id: cabins[0].id },
    data: {
      slug: 'aromito',
      name: 'Cabaña Aromito',
      capacity: 6,
      description: 'Especial para familia o amigos, ya que tiene 2 dormitorios. Cuenta con amplia galería con tender plegable y asador. Además tiene una piscina compartida con las otras cabañas. En todas nuestras cabañas encontrarás juegos de mesa, libros para leer y lápices de colores.',
      amenities: JSON.stringify([
        'Cocina súper equipada completa',
        'Cocina c/ horno, microondas, pava eléctrica',
        'Heladera con freezer',
        'Calefón a gas',
        'TV 50" con WiFi y Netflix',
        'Estufa Tromen',
        'Sommier matrimonial',
        '2 sommiers de 1 plaza',
        'Cama marinera',
        'Ventiladores (pie y techo)',
        'Amplia galería con asador',
        'Piscina compartida',
        'Juegos de mesa y libros',
      ]),
    },
  });

  // Update second cabin (was Orilla del Río) -> Chañar
  await prisma.cabin.update({
    where: { id: cabins[1].id },
    data: {
      slug: 'chanar',
      name: 'Cabaña Chañar',
      capacity: 4,
      description: 'Hermosa cabaña que cuenta con amplia galería con asador y tender plegable para ropa. Su baño es súper cómodo con mampara de vidrio. Un espacio ideal para relajarse y disfrutar del entorno natural.',
      amenities: JSON.stringify([
        'Cocina equipada completa',
        'Cocina c/ horno, microondas, pava',
        'Heladera con freezer',
        'Calefón eléctrico',
        'TV 32" con WiFi y Netflix',
        'Baño con mampara de vidrio',
        'Sommier matrimonial',
        '2 sommiers de 1 plaza',
        'Aire acondicionado Frío/Calor',
        'Amplia galería con asador',
      ]),
    },
  });

  // Update third cabin (was Gran Cumbres) -> Moradillo
  await prisma.cabin.update({
    where: { id: cabins[2].id },
    data: {
      slug: 'moradillo',
      name: 'Cabaña Moradillo',
      capacity: 4,
      description: 'Hermosa cabaña que cuenta con amplia galería con asador y tender plegable para ropa. Su baño es súper cómodo con mampara de vidrio. Un espacio ideal para relajarse y disfrutar del entorno natural.',
      amenities: JSON.stringify([
        'Cocina equipada completa',
        'Cocina c/ horno, microondas, pava',
        'Heladera con freezer',
        'Calefón eléctrico',
        'TV 32" con WiFi y Netflix',
        'Baño con mampara de vidrio',
        'Sommier matrimonial',
        '2 sommiers de 1 plaza',
        'Aire acondicionado Frío/Calor',
        'Amplia galería con asador',
      ]),
    },
  });

  console.log('Cabins updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
