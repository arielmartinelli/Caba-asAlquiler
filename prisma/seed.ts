import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database for Santa Rosa de Calamuchita Cabins...');

  // Clean existing data
  await prisma.reservation.deleteMany({});
  await prisma.blockedDate.deleteMany({});
  await prisma.cabin.deleteMany({});
  await prisma.adminUser.deleteMany({});

  // Hash admin password
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('Created admin user (username: admin, password: admin123)');

  // Seed 3 Cabins
  const cabin1 = await prisma.cabin.create({
    data: {
      slug: 'sendero-de-montana',
      name: 'Cabaña Sendero de Montaña',
      capacity: 5,
      description: 'Acogedora cabaña de madera y piedra rodeada de pinos autóctonos y vistas panorámicas a las sierras de Calamuchita. Ideal para familias o grupos pequeños que buscan tranquilidad, aire puro y descanso junto a la naturaleza.',
      address: 'Av. Las Mangueras 450, Barrio El Nogal, Santa Rosa de Calamuchita',
      latitude: -32.0682,
      longitude: -64.5361,
      priceARS: 45000,
      priceUSD: 45,
      amenities: JSON.stringify([
        'Wi-Fi de Alta Velocidad',
        'Parrilla Individual con Chulengo',
        'Piscina Compartida con Solárium',
        'Aire Acondicionado Frío/Calor',
        'Calefacción a Leña (Salamandra)',
        'Cochera Cubierta',
        'Cocina Completa Equipada',
        'Smart TV con Netflix / Cable',
        'Ropa de Blanco y Toallas'
      ]),
      nearPoints: JSON.stringify([
        { name: 'Río Santa Rosa', distance: '200 metros' },
        { name: 'Paseo del Remanso', distance: '400 metros' },
        { name: 'Centro Gastronómico y Cafés', distance: '350 metros' },
        { name: 'Supermercado y Proveeduría', distance: '150 metros' }
      ]),
      farPoints: JSON.stringify([
        { name: 'Cerro Vía Crucis (Trekking)', distance: '2.5 km' },
        { name: 'Reserva Natural La Cascada', distance: '4.8 km' },
        { name: 'Villa General Belgrano (Oktoberfest)', distance: '11.0 km' },
        { name: 'La Cumbrecita (Pueblo Peatonal)', distance: '38.0 km' },
        { name: 'Lago Embalse de Río Tercero', distance: '22.0 km' }
      ]),
      images: JSON.stringify(['/images/cabin-sendero.jpg']),
    },
  });

  const cabin2 = await prisma.cabin.create({
    data: {
      slug: 'orilla-del-rio',
      name: 'Cabaña Orilla del Río',
      capacity: 7,
      description: 'Elegante cabaña de categoría ubicada sobre la costanera con bajada directa al río Santa Rosa. Cuenta con deck de madera privado, piscina exclusiva y amplios ventanales para contemplar la vista al río y las sierras.',
      address: 'Costanera San Martín 1250, Santa Rosa de Calamuchita',
      latitude: -32.0725,
      longitude: -64.5398,
      priceARS: 65000,
      priceUSD: 65,
      amenities: JSON.stringify([
        'Bajada Privada al Río',
        'Piscina Exclusiva con Deck',
        'Deck Panorámico con Vista al Río',
        'Wi-Fi Fibra Óptica 300MB',
        'Asador Criollo y Horno de Barro',
        'Aire Acondicionado en todos los ambientes',
        'Cochera Doble Cubierta',
        'Lavavajillas y Cocina Gourmet',
        'Smart TV 55" 4K',
        'Servicio de Lavandería incluido'
      ]),
      nearPoints: JSON.stringify([
        { name: 'Bajada Directa al Río Santa Rosa', distance: '30 metros' },
        { name: 'Balneario El Puchuqui', distance: '300 metros' },
        { name: 'Puente Colgante Tradicional', distance: '500 metros' },
        { name: 'Centro Comercial Principal', distance: '600 metros' }
      ]),
      farPoints: JSON.stringify([
        { name: 'Cerro Vía Crucis', distance: '3.1 km' },
        { name: 'Reserva Natural La Cascada', distance: '5.2 km' },
        { name: 'Villa General Belgrano', distance: '10.5 km' },
        { name: 'Los Reartes (Pueblo Histórico)', distance: '18.0 km' },
        { name: 'Aeropuerto de Córdoba (COR)', distance: '110.0 km' }
      ]),
      images: JSON.stringify(['/images/cabin-rio.jpg']),
    },
  });

  const cabin3 = await prisma.cabin.create({
    data: {
      slug: 'gran-cumbres',
      name: 'Cabaña Gran Cumbres',
      capacity: 10,
      description: 'Magnífica residencia de montaña diseñada para grandes grupos y familias numerosas. Ofrece amplias suites con baño privado, gran hogar a leña, quincho con parrilla y fogón exterior para noches bajo las estrellas.',
      address: 'Camino a Calamuchita Km 3.5, Santa Rosa de Calamuchita',
      latitude: -32.0610,
      longitude: -64.5290,
      priceARS: 95000,
      priceUSD: 95,
      amenities: JSON.stringify([
        'Capacidad Amplia hasta 10 Huéspedes',
        'Hogar a Leña de Piedra Natural',
        'Quincho Cubierto con Gran Asador',
        'Fogón Exterior y Zona de Chill-out',
        'Piscina con Climatización Solar',
        'Cochera para 3 Vehículos',
        'Wi-Fi Fibra Óptica',
        'Mesa de Ping-Pong y Juegos de Mesa',
        'Cocina Industrial y Freezer',
        'Cajas de Seguridad en Suites'
      ]),
      nearPoints: JSON.stringify([
        { name: 'Mirador de las Cumbres', distance: '150 metros' },
        { name: 'Sendero de Trekking Sierras Chicas', distance: '100 metros' },
        { name: 'Club de Campo y Tenis', distance: '800 metros' }
      ]),
      farPoints: JSON.stringify([
        { name: 'Centro de Santa Rosa de Calamuchita', distance: '3.5 km' },
        { name: 'Cerro Vía Crucis', distance: '4.0 km' },
        { name: 'Villa General Belgrano', distance: '9.0 km' },
        { name: 'Dique Los Molinos', distance: '28.0 km' },
        { name: 'La Cumbrecita', distance: '36.0 km' }
      ]),
      images: JSON.stringify(['/images/cabin-cumbres.jpg']),
    },
  });

  console.log(`Seeded 3 cabins: ${cabin1.name}, ${cabin2.name}, ${cabin3.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
