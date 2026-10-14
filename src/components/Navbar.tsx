"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { getDynamicWhatsAppUrl } from "@/lib/whatsapp";
import FortiusLogo from "@/components/FortiusLogo";

/* ═══════════════════════════════════════════════════════════════
    LUXURY DARK & GOLD PALETTE — FORTIUS CAPITAL
   ═══════════════════════════════════════════════════════════════ */
const BRAND = {
  // Scrolled navbar & drawer background
  bgScrolled: "rgba(10, 8, 6, 0.94)",
  bgDrawer: "#0B0907",
  bgDrawerAlt: "#050403",

  // Text
  text: "#FAF8F5",       // Perlado suave de alta legibilidad
  textMuted: "#8C867A",  // Gris cálido secundario

  // Gold metallic accents
  gold: "#DCAA61",
  goldLight: "#F5E6C8",
  goldDark: "#9A7129",
  goldGlow: "rgba(220, 170, 97, 0.35)",
  border: "rgba(220, 170, 97, 0.18)",

  // Actions
  whatsapp: "#25D366",
  whatsappBg: "rgba(37, 211, 102, 0.12)",
  whatsappBorder: "rgba(37, 211, 102, 0.32)",
};

/* ═══════════════════════════════════════════════════════════════
    WhatsApp SVG Icon
   ═══════════════════════════════════════════════════════════════ */
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Listener para el evento 'fortius:open-drawer' y 'mandi:open-drawer' ──
  useEffect(() => {
    const handleOpenDrawer = () => setIsOpen(true);
    if (typeof window !== "undefined") {
      window.addEventListener("fortius:open-drawer", handleOpenDrawer);
      window.addEventListener("mandi:open-drawer", handleOpenDrawer);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("fortius:open-drawer", handleOpenDrawer);
        window.removeEventListener("mandi:open-drawer", handleOpenDrawer);
      }
    };
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Dynamic WhatsApp URL based on current pathname
  const dynamicWhatsAppUrl = getDynamicWhatsAppUrl(pathname);
  const phoneHref = `tel:${SITE_CONFIG.phone}`;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HEADER — LUXURY OBSIDIAN & GOLD
          ─────────────────────────────────────────────────────────────
          · !isScrolled: Fondo transparente, textos perlados, logo dorado.
          · isScrolled: Fondo negro obsidiana translúcido con backdrop-blur,
                        borde inferior dorado sutil, máxima legibilidad y lujo.
      ═══════════════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 sm:h-[72px] transition-all duration-500"
        style={
          isScrolled
            ? {
                background: BRAND.bgScrolled,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: `1px solid ${BRAND.border}`,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.5)",
              }
            : {
                background: "transparent",
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
                borderBottom: "1px solid transparent",
                boxShadow: "none",
              }
        }
      >
        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          {/* ── LOGO — Fortius Capital ── */}
          <Link
            href="/"
            className="relative shrink-0 flex items-center h-10 sm:h-12 focus:outline-none transition-transform hover:scale-[1.02]"
            aria-label="Fortius Capital - Inicio"
          >
            <FortiusLogo variant="dark" size="md" />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-lg transition-all duration-300 group"
                >
                  <span
                    className="relative z-10 transition-colors duration-300"
                    style={{
                      color: isActive ? BRAND.gold : BRAND.text,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Active indicator — gold underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${BRAND.goldDark}, ${BRAND.gold}, ${BRAND.goldLight})`,
                        boxShadow: `0 0 10px ${BRAND.goldGlow}`,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "rgba(220, 170, 97, 0.1)" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── DESKTOP BUTTONS ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href={dynamicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-lg overflow-hidden"
              style={{
                background: BRAND.whatsappBg,
                color: BRAND.text,
                border: `1px solid ${BRAND.whatsappBorder}`,
              }}
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Call Button — Gold Metallic */}
            <a
              href={phoneHref}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-lg overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${BRAND.goldDark} 0%, ${BRAND.gold} 50%, ${BRAND.goldLight} 100%)`,
                color: "#080705",
                boxShadow: "0 4px 16px rgba(220, 170, 97, 0.25)",
              }}
              aria-label="Llamar por teléfono"
            >
              <Phone className="w-4 h-4 text-[#080705]" />
              <span>Llamar</span>
            </a>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden relative p-2 rounded-xl transition-all duration-300 active:scale-95 text-[#FAF8F5] hover:text-[#DCAA61]"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE DRAWER — OBSIDIAN & GOLD LUXURY
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 backdrop-blur-md"
              style={{
                background: "rgba(0, 0, 0, 0.7)",
              }}
              onClick={closeMenu}
            />

            {/* Panel — Obsidian Luxury slide-in */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 300,
                mass: 0.8,
              }}
              className="absolute right-0 top-0 bottom-0 w-[82%] max-w-[380px] flex flex-col overflow-hidden"
              style={{
                background: `linear-gradient(180deg, ${BRAND.bgDrawer} 0%, ${BRAND.bgDrawerAlt} 100%)`,
                borderLeft: `1px solid ${BRAND.border}`,
                boxShadow: "-12px 0 50px rgba(0, 0, 0, 0.85)",
              }}
            >
              {/* Panel Header — Logo + Close */}
              <div
                className="flex items-center justify-between px-5 pt-5 pb-4"
                style={{
                  borderBottom: `1px solid ${BRAND.border}`,
                }}
              >
                <div className="shrink-0 flex items-center h-10">
                  <FortiusLogo variant="dark" size="sm" />
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2.5 rounded-xl transition-all duration-200 active:scale-90 text-[#FAF8F5] hover:text-[#DCAA61]"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: `1px solid ${BRAND.border}`,
                  }}
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <nav className="flex flex-col gap-1.5">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.08 + i * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="relative flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-300 active:scale-[0.98] overflow-hidden"
                          style={
                            isActive
                              ? {
                                  background: "rgba(220, 170, 97, 0.14)",
                                  borderLeft: `3px solid ${BRAND.gold}`,
                                  color: BRAND.goldLight,
                                  fontWeight: 700,
                                }
                              : {
                                  color: BRAND.text,
                                  borderLeft: "3px solid transparent",
                                }
                          }
                        >
                          <span className="ml-1.5">
                            {link.label}
                          </span>
                          {!isActive && (
                            <div
                              className="absolute inset-0 rounded-xl opacity-0 active:opacity-100 transition-opacity duration-200 pointer-events-none"
                              style={{
                                background: "rgba(255, 255, 255, 0.04)",
                              }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* ── DUAL CONTACT BUTTONS ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="px-4 pb-5 pt-4"
                style={{
                  borderTop: `1px solid ${BRAND.border}`,
                }}
              >
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] rounded-xl text-[15px] font-bold transition-all duration-300 active:scale-[0.98]"
                  style={{
                    background: BRAND.whatsappBg,
                    border: `1px solid ${BRAND.whatsappBorder}`,
                    color: BRAND.text,
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  Asesoría por WhatsApp
                </a>

                <a
                  href={phoneHref}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] rounded-xl text-[15px] font-bold transition-all duration-300 active:scale-[0.98] mt-3"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.goldDark} 0%, ${BRAND.gold} 50%, ${BRAND.goldLight} 100%)`,
                    color: "#080705",
                    boxShadow: "0 4px 16px rgba(220, 170, 97, 0.25)",
                  }}
                >
                  <Phone className="w-5 h-5 text-[#080705]" />
                  Llamar Ahora
                </a>

                <p
                  className="text-center text-[11px] mt-5 leading-relaxed"
                  style={{ color: BRAND.textMuted }}
                >
                  FORTIUS CAPITAL S.A.C.
                  <br />
                  RUC: 20616561082
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}