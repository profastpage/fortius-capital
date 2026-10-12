"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 80% of the first viewport (past hero)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-6 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        /* En mobile (con BottomNav visible) se sitúa por encima del BottomNav (~96px).
           En desktop (sin BottomNav) usa 24px desde el borde inferior. */
        bottom: "calc(72px + env(safe-area-inset-bottom, 0px) + 16px)",
      }}
    >
      <style>{`
        @media (min-width: 1024px) {
          .fortius-floating-wa { bottom: 24px !important; }
        }
      `}</style>
      {/* Pulse ring */}
      <span className="absolute w-16 h-16 rounded-full bg-[#25D366]/30 whatsapp-pulse" />
      <motion.a
        href={getWhatsAppUrl("home")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fortius-floating-wa relative w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border border-white"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.528 1.975 14.061.951 11.45.951c-5.438 0-9.863 4.371-9.867 9.8a9.66 9.66 0 0 0 1.488 4.954l-.995 3.637 3.734-.971z" />
        </svg>
      </motion.a>
    </div>
  );
}
