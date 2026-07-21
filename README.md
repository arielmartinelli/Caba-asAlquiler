# Cabañas Santa Rosa de Calamuchita 🌲🏡

Plataforma Web Full-Stack para el alquiler y gestión de reservas de 3 cabañas ubicadas en **Santa Rosa de Calamuchita, Córdoba, Argentina**.

## 🚀 Características Principales

### Vista Cliente
- **Catálogo de 3 Cabañas**:
  - 🌲 **Cabaña Sendero de Montaña** (Hasta 5 personas).
  - 🌊 **Cabaña Orilla del Río** (Hasta 7 personas).
  - ⛰️ **Cabaña Gran Cumbres** (Hasta 10 personas).
- **Carrusel de Fotos Interactivo**: Galería con miniaturas y vista a pantalla completa (Lightbox).
- **Detalle Completo**: Equipamiento, comodidades y distancias exactas a los puntos de interés cercanos (Río Santa Rosa, Balneario El Puchuqui, Paseo del Remanso, Villa General Belgrano, La Cumbrecita).
- **Calendario Interactivo de Disponibilidad**: Selección de fechas con cálculo automático de noches y tarifa fija según la moneda configurada por el administrador.
- **Solicitud vía WhatsApp**: Formulario con redirección directa a WhatsApp (`wa.me`) enviando la solicitud desglosada al propietario.

### Panel de Administración (`/admin/dashboard`)
- **Acceso Restringido**: Login seguro para el propietario.
- **Gestión de Solicitudes Pendientes**: Botones para aprobar o rechazar reservas.
- **Sincronización con Google Calendar API**: Al aprobar una reserva desde el panel, las fechas se bloquean automáticamente en la web y se crea el evento en Google Calendar.
- **Gestión de Precios y Moneda Base**: Configuración de tarifa por noche e indicación de moneda principal ($ ARS o US$ USD) por cabaña.
- **Subida de Fotos**: Carga de imágenes directamente a la galería de cada cabaña.
- **Bloqueo por Mantenimiento**: Forzar estado "No disponible" por reparaciones o uso propio.

---

## 🛠️ Stack Tecnológico

- **Frontend & Backend**: Next.js 14+ (App Router, TypeScript, React)
- **Base de Datos & ORM**: SQLite + Prisma ORM
- **Estilos & UI/UX**: Tailwind CSS + Custom Glassmorphism (Warm Alpine Luxury Theme)
- **Integraciones**: Google Calendar API (`googleapis`) & WhatsApp Web Scheme (`wa.me`)

---

## 💻 Instalación y Uso Local

1. Clonar el repositorio:
   ```bash
   git clone git@github.com:arielmartinelli/Caba-asAlquiler.git
   cd Caba-asAlquiler
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Inicializar base de datos SQLite y datos de prueba:
   ```bash
   npx prisma db push
   npm run prisma:seed
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

5. Credenciales de prueba para el Panel Admin (`/admin/login`):
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
