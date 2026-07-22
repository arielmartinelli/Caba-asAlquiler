import type { Metadata } from 'next';
import './globals.css';
import { CurrencyProvider } from '@/components/CurrencyContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cabanascalamuchita.com.ar';

export const metadata: Metadata = {
 metadataBase: new URL(siteUrl),
 title: {
 default: 'Cabañas en Santa Rosa de Calamuchita | Alquiler de Cabañas en Córdoba',
 template: '%s | Cabañas Calamuchita',
 },
 description:
 'Alquiler de cabañas totalmente equipadas en Santa Rosa de Calamuchita para 5, 7 y 10 personas. Vistas panorámicas a las sierras, bajada al río, piscina, Wi-Fi y parrilla. Reserva directa sin comisiones.',
 keywords: [
 'Santa Rosa de Calamuchita',
 'Cabañas en Santa Rosa de Calamuchita',
 'Alquiler de cabañas Córdoba',
 'Cabañas en Calamuchita con piscina',
 'Cabañas frente al río Santa Rosa',
 'Alojamiento en las Sierras de Córdoba',
 'Villa General Belgrano cabañas',
 ],
 authors: [{ name: 'Cabañas Santa Rosa de Calamuchita' }],
 creator: 'Cabañas Santa Rosa de Calamuchita',
 icons: {
 icon: [
 { url: '/icon.png' },
 { url: '/logo.jpg' },
 ],
 shortcut: '/icon.png',
 apple: '/apple-icon.png',
 },
 openGraph: {
 title: 'Cabañas en Santa Rosa de Calamuchita | Alquiler Directo',
 description:
 'Complejo exclusivo de 3 cabañas para 5, 7 y 10 personas. Vistas a las sierras, piscina, parrilla y bajada al río. Consultá fechas y reservá online.',
 url: siteUrl,
 siteName: 'Cabañas Santa Rosa de Calamuchita',
 images: [
 {
 url: '/og-image.jpg',
 width: 1200,
 height: 630,
 alt: 'Cabañas en Santa Rosa de Calamuchita Córdoba',
 },
 ],
 locale: 'es_AR',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Cabañas en Santa Rosa de Calamuchita | Alquiler Directo',
 description:
 'Cabañas de alquiler equipadas para 5, 7 y 10 personas con piscina, vista al río y sierras en Calamuchita.',
 images: ['/og-image.jpg'],
 },
 robots: {
 index: true,
 follow: true,
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'LodgingBusiness',
 name: 'Cabañas Santa Rosa de Calamuchita',
 url: siteUrl,
 logo: `${siteUrl}/logo.jpg`,
 image: `${siteUrl}/og-image.jpg`,
 description:
 'Complejo de alquiler de cabañas en Santa Rosa de Calamuchita equipadas para 5, 7 y 10 personas con piscina, parrilla y vistas a las sierras.',
 address: {
 '@type': 'PostalAddress',
 streetAddress: 'Santa Rosa de Calamuchita',
 addressLocality: 'Santa Rosa de Calamuchita',
 addressRegion: 'Córdoba',
 postalCode: 'X5196',
 addressCountry: 'AR',
 },
 geo: {
 '@type': 'GeoCoordinates',
 latitude: -32.0682,
 longitude: -64.5361,
 },
 priceRange: '$$$',
 telephone: '+5493546000000',
 };

 return (
 <html lang="es" className="scroll-smooth">
 <head>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 </head>
 <body className="bg-white text-slate-950 min-h-screen flex flex-col antialiased">
 <CurrencyProvider>
 <Navbar />
 <main className="flex-1">{children}</main>
 <Footer />
 </CurrencyProvider>
 </body>
 </html>
 );
}
