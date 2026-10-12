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

export const metadata: Metadata = {
  title: {
    default: "Fortius Capital — Préstamos Personales y Garantía Vehicular en Perú",
    template: "%s | Fortius Capital",
  },
  description:
    "Tu solución financiera fácil, rápida y segura. Préstamos personales al instante y préstamos con garantía vehicular sin dejar de usar tu auto. Fortius Capital (RUC: 20616561082).",
  keywords: [
    "préstamos personales",
    "préstamo vehicular",
    "crédito rápido Perú",
    "garantía de auto",
    "Procustodia",
    "financiera Perú",
    "Fortius Capital",
    "FORTIUS CAPITAL",
    "FORTIUS CAPITAL S.A.C.",
    "crédito al instante",
    "dinero rápido",
    "RUC 20616561082",
  ],
  authors: [{ name: "FORTIUS CAPITAL S.A.C." }],
  metadataBase: new URL("https://fortiuscapital.pe"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fortius Capital — Tu Solución Financiera de Confianza",
    description:
      "Préstamos personales al instante y préstamos con garantía vehicular. Tu aliado financiero confiable en Perú.",
    url: "https://fortiuscapital.pe",
    siteName: "Fortius Capital",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/fortius-badge.jpg",
        width: 1200,
        height: 630,
        alt: "Fortius Capital — Préstamos Personales y Garantía Vehicular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortius Capital — Préstamos Rápidos y Seguros",
    description:
      "Consigue tu préstamo en minutos. Préstamos personales y con garantía vehicular.",
    images: ["/images/fortius-badge.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    maxSnippet: -1,
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
