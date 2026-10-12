"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Fortius Capital — Glowing Particles Mouse Trail
 * Estela de partículas doradas brillantes que siguen el cursor.
 * Usa canvas 2D para máximo rendimiento.
 */
export default function GlowingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const createParticle = useCallback((x: number, y: number) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.5,
      life: 1,
      decay: 0.015 + Math.random() * 0.02,
      size: 1.5 + Math.random() * 2.5,
      hue: 38 + Math.random() * 15, // gold range
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Emitir 2-3 partículas por movimiento
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    // Touch support
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      mouseRef.current = { x: touch.clientX, y: touch.clientY };
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(createParticle(touch.clientX, touch.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.98;

        if (p.life <= 0) return false;

        // Glow
        const alpha = p.life * 0.6;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${alpha})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 85%, 55%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 90%, 45%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core brillante
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 90%, ${alpha * 0.9})`;
        ctx.fill();

        return true;
      });

      // Limitar partículas para rendimiento
      if (particlesRef.current.length > 80) {
        particlesRef.current = particlesRef.current.slice(-80);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden="true"
    />
  );
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  hue: number;
};