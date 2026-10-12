import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionPreloader from "@/components/SessionPreloader";
import BottomNav from "@/components/BottomNav";
import GoldProgressBar from "@/components/GoldProgressBar";
import GlowingParticles from "@/components/GlowingParticles";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060503",
};

// Resuelve la URL de producción o Vercel dinámicamente para que las tarjetas de OpenGraph funcionen en cualquier dominio
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://fortius-capital.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fortius Capital | Préstamos Personales y Garantía Vehicular en Perú",
    template: "%s | Fortius Capital",
  },
  description:
    "Soluciones financieras ágiles, seguras y transparentes en Perú. Préstamos personales al instante y créditos con garantía vehicular sin dejar de conducir tu auto. RUC: 20616561082.",
  keywords: [
    "Fortius Capital",
    "FORTIUS CAPITAL S.A.C.",
    "préstamos personales Perú",
    "crédito vehicular",
    "garantía vehicular",
    "préstamo con auto sin dejarlo",
    "crédito al instante Lima",
    "dinero rápido seguro",
    "Procustodia",
    "RUC 20616561082",
    "financiera confiable Perú",
  ],
  authors: [{ name: "FORTIUS CAPITAL S.A.C.", url: SITE_URL }],
  creator: "FORTIUS CAPITAL S.A.C.",
  publisher: "FORTIUS CAPITAL S.A.C.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    siteName: "Fortius Capital",
    title: "Fortius Capital | Préstamos Personales y Garantía Vehicular",
    description:
      "Soluciones financieras al instante en Perú. Préstamos personales y créditos con garantía vehicular sin dejar tu auto. Aprobación inmediata y total respaldo legal. RUC: 20616561082.",
    images: [
      {
        url: "/og-image.jpg",
        secureUrl: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Fortius Capital — Préstamos Personales y Garantía Vehicular en Perú",
      },
      {
        url: "/og-image.png",
        secureUrl: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Fortius Capital — Soluciones Financieras de Confianza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortius Capital | Préstamos Personales y Garantía Vehicular",
    description:
      "Préstamos personales rápidos y créditos con garantía vehicular sin dejar tu auto en Perú. Aprobación inmediata y total respaldo legal. RUC: 20616561082.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionPreloader>
          <div className="relative flex min-h-screen flex-col">{children}</div>
          {/* Bottom Navigation Mobile — aparece en todas las páginas, solo <1024px */}
          <GoldProgressBar />
          <GlowingParticles />
          <BottomNav />
        </SessionPreloader>
      </body>
    </html>
  );
}
