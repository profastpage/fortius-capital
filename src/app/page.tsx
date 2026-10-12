"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Car,
  CheckCircle2,
  ChevronDown,
  Users,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Calculadora from "@/components/Calculadora";
import Footer from "@/components/Footer";
import { FAQ_ITEMS, PROCESS_STEPS } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import DeepLinking from "@/components/DeepLinking";

/* ───────────────────────── Animation Variants ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ───────────────────────── Sub-components (RSC-compatible content) ─────────── */

function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 pt-16">
      {/* ── Contenedor de fondo — imagen brillante sin oscurecer la modelo ── */}
      <div className="absolute inset-0 z-0">
        {/* Imagen de fondo — opacidad 65 para impacto visual */}
        <Image
          src="/images/hero-emprendedora.png"
          alt="Emprendedora Progreso Financiero"
          fill
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAIAAADtbgqsAAAA2ElEQVR4nKXLyXEAMQgEQAdgSdywV/5peiAFV/W3f86vAcEyhm0y9DSj5sAWIJajtP38MzsQLGfYLkNPM2oO7AHiOUobcgDBCoYdMvQ0o+bAESCRo7QhJxCsZNgpQ08zag6cAZI5ShtyAcEqhl0y9DSj5sAVIJWjtCFfQLAuhn3J0NOMmgNfAXLlKG3/zTcQrJth3zL0NKPmwHeA3DlKG/IDBOth2I8MPc2oOfATIE+O0ob8AsF6GfYrQ08zag78Bsibo7Qhf0CwPob9ydDTjJoDfwHy5Shtf58QN2E8TZECAAAAAElFTkSuQmCC"
          className="object-cover object-center pointer-events-none opacity-65 select-none transition-opacity duration-500"
        />

        {/* Overlay lateral: oscurece solo la izquierda para proteger el texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

        {/* Cierre inferior: funde con el fondo del sitio */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Contenido principal ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white/80">
                Tu aliado financiero de confianza
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight"
            >
              El momento es{" "}
              <span className="text-gold-metallic">
                ahora
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-white/70 max-w-lg leading-relaxed"
            >
              Consigue tu préstamo en minutos. Préstamos personales al instante
              y con garantía vehicular, sin dejar de usar tu auto.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <a
                href={getWhatsAppUrl("home")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold-metallic text-white px-8 py-4 rounded-2xl text-base font-bold shadow-2xl shadow-orange-900/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-900/40"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Solicitar Mi Préstamo
              </a>
              <Link
                href="#calculadora"
                className="inline-flex items-center justify-center gap-2 glass text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Simular Cuota
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10"
            >
              {[
                { num: "5K+", label: "Clientes Felices" },
                { num: "98%", label: "Satisfacción" },
                { num: "24h", label: "Aprobación" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {stat.num}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual — Tarjeta flotante de confianza (sin imagen, cristal neobanco) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl max-w-[280px] hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-[#DCAA61]/20 p-2.5 rounded-xl text-[#DCAA61]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#DCAA61] tracking-tight">+5,000</div>
                  <div className="text-sm font-medium text-slate-200 mt-1">Clientes Felices</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 border-t border-white/10 pt-3">
                Confían en nuestro respaldo financiero en todo el Perú.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Tarjetas flotantes — PC only, extremo derecho, fuera de la imagen ── */}
      <div className="hidden lg:flex lg:absolute lg:right-8 xl:right-12 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-4 lg:z-20 pointer-events-none">
        {/* Card: Aprobado */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 0.8 }, x: { duration: 0.6, delay: 0.8 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 } }}
          className="lg:scale-90 bg-white/10 backdrop-blur-lg rounded-2xl p-3.5 border border-white/15 shadow-xl pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4.5 h-4.5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Aprobado</p>
              <p className="text-xs text-white/50">En 24 horas</p>
            </div>
          </div>
        </motion.div>

        {/* Card: Rápido */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 1 }, x: { duration: 0.6, delay: 1 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
          className="lg:scale-90 bg-white/10 backdrop-blur-lg rounded-2xl p-3.5 border border-white/15 shadow-xl pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-4.5 h-4.5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Rápido</p>
              <p className="text-xs text-white/50">Sin trámites</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Botón "Ver más" animado — scroll a Características ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <button
          onClick={() => {
            const nextSection = document.getElementById("caracteristicas");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="flex flex-col items-center text-slate-300 hover:text-[#DCAA61] transition-colors focus:outline-none group text-xs font-semibold tracking-wider uppercase cursor-pointer"
        >
          <span>Ver más</span>
          <svg
            className="w-5 h-5 mt-1 animate-bounce text-[#DCAA61] group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

    </section>
  );
}

function ProductsSection() {
  const products = [
    {
      icon: Zap,
      title: "CON GARANTÍA",
      subtitle: "AL INSTANTE",
      href: "/prestamos-personales",
      whatsapp: "prestamos-personales" as const,
      gradient: "from-orange-600 to-red-700",
      image: "/images/personal-loan.jpg",
      imageAlt: "Préstamo personal al instante - Fortius Capital",
      description:
        "Préstamos personales rápidos sin complicaciones. Montos desde S/ 500 hasta S/ 20,000 con aprobación en menos de 24 horas.",
    },
    {
      icon: Car,
      title: "CON GARANTÍA",
      subtitle: "VEHICULAR",
      href: "/garantia-vehicular",
      whatsapp: "garantia-vehicular" as const,
      gradient: "from-orange-700 to-red-800",
      image: "/images/car-drive.jpg",
      imageAlt: "Préstamo con garantía vehicular - Fortius Capital",
      description:
        "Usa tu auto como garantía sin dejar de usarlo. Alianza estratégica con Procustodia para mayor seguridad.",
    },
  ];

  return (
    <section id="productos" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tenemos la{" "}
            <span className="text-gold-metallic">
              Solución Financiera
            </span>{" "}
            que necesitas
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Elige el producto que mejor se adapte a tus necesidades. Ambos
            opciones con tasas competitivas y un proceso simplificado.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.subtitle}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i + 1}
            >
              <Link href={product.href} className="block group">
                <div
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${product.gradient} p-8 sm:p-10 lg:p-12 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]`}
                >
                  {/* Background image */}
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />

                  {/* Glass decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                      <product.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gold-luxury-subtle leading-tight">
                      {product.title}
                      <br />
                      <span className="text-orange-300">{product.subtitle}</span>
                    </h3>
                  </div>

                  <div className="relative z-10 mt-6">
                    <p className="text-sm text-white/70 leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-white/50 text-sm font-medium group-hover:text-white transition-colors duration-300">
                        Más información
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <a
                        href={getWhatsAppUrl(product.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm transition-all duration-300"
                      >
                        Cotizar
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Préstamos Rápidos",
      desc: "Accede a tu dinero sin trámites complicados. Proceso ágil y digital para que obtengas tu préstamo en el menor tiempo posible.",
    },
    {
      icon: Car,
      title: "Tu Auto, Tu Garantía",
      desc: "Usa tu vehículo como respaldo financiero sin dejar de conducirlo. Programa seguro y transparente con Procustodia.",
    },
    {
      icon: ShieldCheck,
      title: "100% Transparente",
      desc: "Sin letras pequeñas ni costos ocultos. Condiciones claras desde el primer momento para tu total tranquilidad.",
    },
    {
      icon: Users,
      title: "Atención Personalizada",
      desc: "Asesores dedicados que te acompañan en cada paso del proceso, respondiendo todas tus dudas en tiempo real.",
    },
  ];

  return (
    <section id="caracteristicas" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tu préstamo en minutos,{" "}
            <span className="text-gold-metallic">
              sin complicaciones
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  custom={i}
                  className="group bg-white/[0.04] hover:bg-white/[0.06] rounded-2xl p-6 border border-white/5 hover:border-white/10 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] group-hover:bg-white/[0.08] flex items-center justify-center mb-4 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-[#DCAA61]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={2}
            className="hidden lg:block lg:col-span-2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src="/images/customer-service.jpg"
                alt="Equipo de atención al cliente de Fortius Capital"
                width={400}
                height={520}
                className="w-full h-auto object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent rounded-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="proceso" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Realiza tu solicitud{" "}
            <span className="text-gold-metallic">
              100% en línea
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Un proceso simple y transparente diseñado para que obtengas tu
            préstamo sin salir de casa.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              custom={i}
              className="relative"
            >
              <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <span className="text-5xl font-black text-white/10">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-gold-luxury-subtle mt-3 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector line (hidden on last item and mobile) */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-white/10 z-0" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 sm:py-24" id="faq">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold-luxury tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Resolvemos tus dudas más comunes para que tomes la mejor decisión
            con confianza.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {FAQ_ITEMS.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
              className="border-b border-slate-800/40 last:border-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="text-base sm:text-lg font-semibold text-white group-hover:text-[#DCAA61] transition-colors pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-white/[0.08] flex items-center justify-center transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#DCAA61] transition-colors" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-sm text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contacto" className="relative bg-gradient-to-t from-slate-900/50 to-transparent py-16 sm:py-20 overflow-hidden">
      <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl mx-4 sm:mx-6 lg:mx-8 relative overflow-hidden p-10 sm:p-16 text-center shadow-2xl">
        {/* Glow orbs */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#DCAA61]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#A97631]/10 rounded-full blur-[80px] pointer-events-none" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="relative"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold-luxury tracking-tight">
            ¡El momento es ahora!
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Consigue tu préstamo en minutos. Habla con un asesor
            especializado y comienza hoy mismo.
          </p>
          <a
            href={getWhatsAppUrl("home")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-metallic text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-orange-900/30 mt-8 transition-all duration-300 hover:scale-[1.03]"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar Mi Préstamo
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Main Page Component ───────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <DeepLinking>
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <ProcessSection />
        <Calculadora />
        <FAQSection />
        <CTASection />
        </DeepLinking>
      </main>
      <Footer />
    </>
  );
}
