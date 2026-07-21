-- ============================================================
-- SCRIPT DE INICIALIZACIÓN SQL PARA NEON POSTGRESQL
-- Copia todo este contenido y pegalo en el "SQL Editor" de Neon
-- y dale al botón "Run" (Ejecutar)
-- ============================================================

-- 1. Limpieza de tablas previas (por si acaso)
DROP TABLE IF EXISTS "Reservation" CASCADE;
DROP TABLE IF EXISTS "BlockedDate" CASCADE;
DROP TABLE IF EXISTS "Cabin" CASCADE;
DROP TABLE IF EXISTS "AdminUser" CASCADE;

-- 2. Crear Tabla Cabin
CREATE TABLE "Cabin" (
    "id" VARCHAR(255) PRIMARY KEY,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "priceARS" DOUBLE PRECISION NOT NULL,
    "priceUSD" DOUBLE PRECISION NOT NULL,
    "baseCurrency" VARCHAR(50) NOT NULL DEFAULT 'ARS',
    "amenities" TEXT NOT NULL,
    "nearPoints" TEXT NOT NULL,
    "farPoints" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear Tabla Reservation
CREATE TABLE "Reservation" (
    "id" VARCHAR(255) PRIMARY KEY,
    "cabinId" VARCHAR(255) NOT NULL REFERENCES "Cabin"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "clientName" VARCHAR(255) NOT NULL,
    "clientEmail" VARCHAR(255) NOT NULL,
    "clientPhone" VARCHAR(255) NOT NULL,
    "guestsCount" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalARS" DOUBLE PRECISION NOT NULL,
    "totalUSD" DOUBLE PRECISION NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "gcalEventId" VARCHAR(255),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear Tabla BlockedDate
CREATE TABLE "BlockedDate" (
    "id" VARCHAR(255) PRIMARY KEY,
    "cabinId" VARCHAR(255) NOT NULL REFERENCES "Cabin"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Crear Tabla AdminUser
CREATE TABLE "AdminUser" (
    "id" VARCHAR(255) PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL
);

-- 6. Insertar Usuario Admin (Usuario: admin / Contraseña: admin123)
INSERT INTO "AdminUser" ("id", "username", "password")
VALUES ('admin-01', 'admin', '$2a$10$5gpgYlEZUWGru4Dd/vcJi.wkv8nuf955lz87whH0DmrjT/Ds9hN1G');

-- 7. Insertar las 3 Cabañas de Santa Rosa de Calamuchita
INSERT INTO "Cabin" ("id", "slug", "name", "capacity", "description", "address", "latitude", "longitude", "priceARS", "priceUSD", "baseCurrency", "amenities", "nearPoints", "farPoints", "images", "createdAt", "updatedAt")
VALUES 
(
  'cabin-01-sendero',
  'sendero-de-montana',
  'Cabaña Sendero de Montaña',
  5,
  'Acogedora cabaña de madera y piedra rodeada de pinos autóctonos y vistas panorámicas a las sierras de Calamuchita. Ideal para familias o grupos pequeños que buscan tranquilidad, aire puro y descanso junto a la naturaleza.',
  'Av. Las Mangueras 450, Barrio El Nogal, Santa Rosa de Calamuchita',
  -32.0682,
  -64.5361,
  45000,
  45,
  'ARS',
  '["Wi-Fi de Alta Velocidad","Parrilla Individual con Chulengo","Piscina Compartida con Solárium","Aire Acondicionado Frío/Calor","Calefacción a Leña (Salamandra)","Cochera Cubierta","Cocina Completa Equipada","Smart TV con Netflix / Cable","Ropa de Blanco y Toallas"]',
  '[{"name":"Río Santa Rosa","distance":"200 metros"},{"name":"Paseo del Remanso","distance":"400 metros"},{"name":"Centro Gastronómico y Cafés","distance":"350 metros"},{"name":"Supermercado y Proveeduría","distance":"150 metros"}]',
  '[{"name":"Cerro Vía Crucis (Trekking)","distance":"2.5 km"},{"name":"Reserva Natural La Cascada","distance":"4.8 km"},{"name":"Villa General Belgrano (Oktoberfest)","distance":"11.0 km"},{"name":"La Cumbrecita (Pueblo Peatonal)","distance":"38.0 km"},{"name":"Lago Embalse de Río Tercero","distance":"22.0 km"}]',
  '["/images/cabin-sendero.jpg"]',
  NOW(),
  NOW()
),
(
  'cabin-02-rio',
  'orilla-del-rio',
  'Cabaña Orilla del Río',
  7,
  'Elegante cabaña de categoría ubicada sobre la costanera con bajada directa al río Santa Rosa. Cuenta con deck de madera privado, piscina exclusiva y amplios ventanales para contemplar la vista al río y las sierras.',
  'Costanera San Martín 1250, Santa Rosa de Calamuchita',
  -32.0725,
  -64.5398,
  65000,
  65,
  'ARS',
  '["Bajada Privada al Río","Piscina Exclusiva con Deck","Deck Panorámico con Vista al Río","Wi-Fi Fibra Óptica 300MB","Asador Criollo y Horno de Barro","Aire Acondicionado en todos los ambientes","Cochera Doble Cubierta","Lavavajillas y Cocina Gourmet","Smart TV 55\" 4K","Servicio de Lavandería incluido"]',
  '[{"name":"Bajada Directa al Río Santa Rosa","distance":"30 metros"},{"name":"Balneario El Puchuqui","distance":"300 metros"},{"name":"Puente Colgante Tradicional","distance":"500 metros"},{"name":"Centro Comercial Principal","distance":"600 metros"}]',
  '[{"name":"Cerro Vía Crucis","distance":"3.1 km"},{"name":"Reserva Natural La Cascada","distance":"5.2 km"},{"name":"Villa General Belgrano","distance":"10.5 km"},{"name":"Los Reartes (Pueblo Histórico)","distance":"18.0 km"},{"name":"Aeropuerto de Córdoba (COR)","distance":"110.0 km"}]',
  '["/images/cabin-rio.jpg"]',
  NOW(),
  NOW()
),
(
  'cabin-03-cumbres',
  'gran-cumbres',
  'Cabaña Gran Cumbres',
  10,
  'Magnífica residencia de montaña diseñada para grandes grupos y familias numerosas. Ofrece amplias suites con baño privado, gran hogar a leña, quincho con parrilla y fogón exterior para noches bajo las estrellas.',
  'Camino a Calamuchita Km 3.5, Santa Rosa de Calamuchita',
  -32.0610,
  -64.5290,
  95000,
  95,
  'ARS',
  '["Capacidad Amplia hasta 10 Huéspedes","Hogar a Leña de Piedra Natural","Quincho Cubierto con Gran Asador","Fogón Exterior y Zona de Chill-out","Piscina con Climatización Solar","Cochera para 3 Vehículos","Wi-Fi Fibra Óptica","Mesa de Ping-Pong y Juegos de Mesa","Cocina Industrial y Freezer","Cajas de Seguridad en Suites"]',
  '[{"name":"Mirador de las Cumbres","distance":"150 metros"},{"name":"Sendero de Trekking Sierras Chicas","distance":"100 metros"},{"name":"Club de Campo y Tenis","distance":"800 metros"}]',
  '[{"name":"Centro de Santa Rosa de Calamuchita","distance":"3.5 km"},{"name":"Cerro Vía Crucis","distance":"4.0 km"},{"name":"Villa General Belgrano","distance":"9.0 km"},{"name":"Dique Los Molinos","distance":"28.0 km"},{"name":"La Cumbrecita","distance":"36.0 km"}]',
  '["/images/cabin-cumbres.jpg"]',
  NOW(),
  NOW()
);
