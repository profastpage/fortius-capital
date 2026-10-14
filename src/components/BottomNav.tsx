"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Wallet, Car, Menu } from "lucide-react";
import { getDynamicWhatsAppUrl } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════════
    FORTIUS CAPITAL — Bottom Navigation Mobile (Ultra Premium)
    ─────────────────────────────────────────────────────────────
    · 5 tabs: Inicio, Préstamos, WhatsApp CTA, Garantía, Más
    · WhatsApp: botón circular protruding, verde oficial, ícono real
    · Solo visible < 1024px (lg:hidden)
    · Fondo negro profundo #060503 con perlado y dorado
    · Borde superior dorado #DCAA61
    · Esquinas superiores redondeadas + blur + sombra
    · "Más" dispara evento 'fortius:open-drawer' que escucha el Navbar
   ═══════════════════════════════════════════════════════════════ */

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS_LEFT: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Préstamos", href: "/prestamos-personales", icon: Wallet },
];

const NAV_ITEMS_RIGHT: NavItem[] = [
  { label: "Garantía", href: "/garantia-vehicular", icon: Car },
  { label: "Más", href: "#more", icon: Menu },
];

/**
 * Determina si una ruta está "activa" dado el pathname actual.
 * "/" solo activa en match exacto, las demás con startsWith.
 */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/** SVG del ícono oficial de WhatsApp (trazado real) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const [routeKey, setRouteKey] = useState(pathname);
  const [waUrl, setWaUrl] = useState("https://wa.me/51998352653");

  useEffect(() => {
    setRouteKey(pathname);
    setWaUrl(getDynamicWhatsAppUrl(pathname));
  }, [pathname]);

  const openDrawer = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("fortius:open-drawer"));
      window.dispatchEvent(new CustomEvent("mandi:open-drawer"));
    }
  };

  return (
    <AnimatePresence>
      <motion.nav
        key="bottom-nav"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Navegación inferior móvil"
      >
        <div
          className="relative mx-auto"
          style={{
            background: "linear-gradient(180deg, #060503 0%, #000000 100%)",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            boxShadow:
              "0 -8px 32px rgba(0, 0, 0, 0.6), 0 -1px 0 rgba(220, 170, 97, 0.4) inset",
            overflow: "visible",
          }}
        >
          {/* Borde superior dorado metálico (gradiente) */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #6D4B21 15%, #A97631 30%, #DCAA61 50%, #F5E6C8 55%, #DCAA61 70%, #A97631 85%, transparent 100%)",
            }}
          />

          {/* Glow dorado sutil debajo del borde superior */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(220, 170, 97, 0.18) 0%, transparent 70%)",
            }}
          />

          {/* Contenedor de items — flex con espacio para el botón WhatsApp central */}
          <ul className="flex items-end justify-around px-1 pt-2.5 pb-2">
            {/* ── ITEMS IZQUIERDA ── */}
            {NAV_ITEMS_LEFT.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href} className="flex-1">
                  <Link
                    href={item.href}
                    className="group w-full flex flex-col items-center justify-center gap-0.5 min-h-[48px] py-1 px-1 active:scale-95 transition-transform duration-200"
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="relative flex items-center justify-center">
                      <Icon
                        className={`w-5 h-5 transition-colors duration-200 ${
                          active
                            ? "text-[#DCAA61]"
                            : "text-slate-400 group-active:text-[#DCAA61]"
                        }`}
                      />
                      {/* Glow cuando activo */}
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            key={`glow-${routeKey}-${item.href}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.4 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 -m-2 rounded-full bg-[#DCAA61]/15 pointer-events-none"
                          />
                        )}
                      </AnimatePresence>
                      {/* Indicador superior dorado */}
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            key={`ind-${routeKey}-${item.href}`}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "20px", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-2 left-1/2 -translate-x-1/2 h-[3px] rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, #A97631 0%, #DCAA61 50%, #F5E6C8 100%)",
                              boxShadow: "0 0 8px rgba(220, 170, 97, 0.6)",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                        active
                          ? "text-[#DCAA61]"
                          : "text-slate-400 group-active:text-[#DCAA61]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}

            {/* ── WHATSAPP CTA (CENTRAL PROTRUDING) ── */}
            <li className="flex-1 flex items-start justify-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="relative flex flex-col items-center -mt-5 active:scale-95 transition-transform duration-200"
              >
                {/* Glow sutil verde debajo del botón */}
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(37, 211, 102, 0.25) 0%, transparent 70%)",
                    filter: "blur(4px)",
                  }}
                />
                {/* Botón circular */}
                <motion.span
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                  className="relative w-[62px] h-[62px] rounded-full flex items-center justify-center shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(145deg, #2BE07A 0%, #25D366 40%, #1EBE5C 100%)",
                    boxShadow:
                      "0 4px 20px rgba(37, 211, 102, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <WhatsAppIcon className="w-8 h-8 text-white drop-shadow-sm" />
                </motion.span>
                <span className="text-[10px] font-medium tracking-wide text-[#25D366] mt-0.5">
                  WhatsApp
                </span>
              </a>
            </li>

            {/* ── ITEMS DERECHA ── */}
            {NAV_ITEMS_RIGHT.map((item) => {
              const isDrawer = item.href === "#more";
              const active = !isDrawer && isActive(pathname, item.href);
              const Icon = item.icon;

              if (isDrawer) {
                return (
                  <li key={item.label} className="flex-1">
                    <button
                      onClick={openDrawer}
                      className="group w-full flex flex-col items-center justify-center gap-0.5 min-h-[48px] py-1 px-1 active:scale-95 transition-transform duration-200"
                      aria-label="Abrir menú completo"
                    >
                      <span className="relative flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-400 group-active:text-[#DCAA61] transition-colors duration-200" />
                        <span className="absolute inset-0 -m-2 rounded-full bg-[#DCAA61]/0 group-active:bg-[#DCAA61]/15 transition-colors duration-200" />
                      </span>
                      <span className="text-[10px] font-medium tracking-wide text-slate-400 group-active:text-[#DCAA61] transition-colors duration-200">
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.href} className="flex-1">
                  <Link
                    href={item.href}
                    className="group w-full flex flex-col items-center justify-center gap-0.5 min-h-[48px] py-1 px-1 active:scale-95 transition-transform duration-200"
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="relative flex items-center justify-center">
                      <Icon
                        className={`w-5 h-5 transition-colors duration-200 ${
                          active
                            ? "text-[#DCAA61]"
                            : "text-slate-400 group-active:text-[#DCAA61]"
                        }`}
                      />
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            key={`glow-${routeKey}-${item.href}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.4 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 -m-2 rounded-full bg-[#DCAA61]/15 pointer-events-none"
                          />
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            key={`ind-${routeKey}-${item.href}`}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "20px", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-2 left-1/2 -translate-x-1/2 h-[3px] rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, #A97631 0%, #DCAA61 50%, #F5E6C8 100%)",
                              boxShadow: "0 0 8px rgba(220, 170, 97, 0.6)",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                        active
                          ? "text-[#DCAA61]"
                          : "text-slate-400 group-active:text-[#DCAA61]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}