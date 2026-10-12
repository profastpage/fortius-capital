"use client";

import { useEffect, useState } from "react";

/**
 * Fortius Capital — Barra de Progreso Dorada
 * Barra fija superior que avanza 0→100% con el scroll.
 * Gradiente dorado premium con glow metálico.
 */
export default function GoldProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(pct);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px]"
      style={{ background: "transparent" }}
    >
      <div
        className="h-full transition-[width] duration-75 ease-linear will-change-[width]"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #8B6508 0%, #C5A059 20%, #D4AF37 40%, #F9D976 55%, #D4AF37 70%, #C5A059 85%, #8B6508 100%)",
          boxShadow:
            "0 0 6px rgba(212, 175, 55, 0.5), 0 0 12px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
}