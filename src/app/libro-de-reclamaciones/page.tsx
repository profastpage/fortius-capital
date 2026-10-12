"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  MessageSquare,
  Building2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import { WHATSAPP_PHONE, getWhatsAppUrl } from "@/lib/whatsapp";
import DeepLinking from "@/components/DeepLinking";

/* ─────────────────────── Animation Variants ─────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

/* ─────────────────────── Form State Type ─────────────────────── */
interface FormData {
  tipo: "Queja" | "Reclamo";
  nombresCompletos: string;
  documento: "DNI" | "Carné de Extranjería" | "Pasaporte";
  numeroDocumento: string;
  telefono: string;
  email: string;
  direccion: string;
  producto: "Préstamo Personal" | "Garantía Vehicular" | "Otro";
  descripcion: string;
  pedido: string;
}

const INITIAL_FORM: FormData = {
  tipo: "Reclamo",
  nombresCompletos: "",
  documento: "DNI",
  numeroDocumento: "",
  telefono: "",
  email: "",
  direccion: "",
  producto: "Préstamo Personal",
  descripcion: "",
  pedido: "",
};

/* ───────────────────────── Page Component ─────────────────────── */
export default function LibroDeReclamacionesPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.nombresCompletos.trim()) {
      newErrors.nombresCompletos = "Este campo es requerido";
    }

    if (!form.numeroDocumento.trim()) {
      newErrors.numeroDocumento = "Este campo es requerido";
    } else if (form.documento === "DNI" && form.numeroDocumento.length !== 8) {
      newErrors.numeroDocumento = "El DNI debe tener 8 dígitos";
    }

    if (!form.telefono.trim()) {
      newErrors.telefono = "Este campo es requerido";
    }

    if (!form.email.trim()) {
      newErrors.email = "Este campo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!form.descripcion.trim()) {
      newErrors.descripcion = "Este campo es requerido";
    } else if (form.descripcion.trim().length < 10) {
      newErrors.descripcion = "Mínimo 10 caracteres";
    }

    if (!form.pedido.trim()) {
      newErrors.pedido = "Este campo es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      const message = [
        `*LIBRO DE RECLAMACIONES*`,
        ``,
        `*Tipo:* ${form.tipo}`,
        `*Nombres:* ${form.nombresCompletos}`,
        `*Documento:* ${form.documento} - ${form.numeroDocumento}`,
        `*Teléfono:* ${form.telefono}`,
        `*Email:* ${form.email}`,
        `*Dirección:* ${form.direccion || "No especificada"}`,
        `*Producto:* ${form.producto}`,
        ``,
        `*Descripción:*`,
        `${form.descripcion}`,
        ``,
        `*Pedido del Consumidor:*`,
        `${form.pedido}`,
      ].join("\n");

      const encoded = encodeURIComponent(message);
      const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;
      window.open(url, "_blank", "noopener,noreferrer");

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSubmitted(false), 6000);
    },
    [form, validate]
  );

  return (
    <>
      <Navbar />
      <main>
        <DeepLinking>
        {/* ──────── Hero — Full Bleed Immersive ──────── */}
        <section id="inicio" className="relative h-screen w-full flex items-center overflow-hidden bg-slate-950">
          {/* Background Image */}
          <Image
            src="/hero-reclamaciones.webp"
            alt="Libro de Reclamaciones"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover object-center opacity-45 pointer-events-none select-none"
          />
          {/* Asymmetric Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent mix-blend-multiply" />
          {/* Bottom fade — dark blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-white/80">
                    Derechos del Consumidor
                  </span>
                </motion.div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
                  Libro de{" "}
                  <span className="text-gold-metallic">
                    Reclamaciones
                  </span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
                  Ejerce tu derecho como consumidor. En Fortius Capital
                  garantizamos una atención justa y transparente conforme a la
                  Ley N° 29571 — Código de Protección y Defensa del Consumidor.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                  <Image
                    src="/images/claim-form.webp"
                    alt="Formulario de Libro de Reclamaciones - Fortius Capital"
                    width={560}
                    height={380}
                    className="w-full h-auto object-cover rounded-3xl"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Ver Más — scroll suave a Info */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("reclamaciones-info");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-300 hover:text-orange-400 transition-colors group cursor-pointer"
          >
            <span className="text-xs font-semibold tracking-wider uppercase">Ver más</span>
            <svg className="w-5 h-5 mt-1 animate-bounce text-orange-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </section>

        {/* ──────── Info Section ──────── */}
        <section id="reclamaciones-info" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                ¿Qué es el Libro de{" "}
                <span className="text-gold-metallic">
                  Reclamaciones
                </span>
                ?
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Es un registro obligatorio donde los consumidores pueden
                consignar sus quejas o reclamos sobre los productos o servicios
                recibidos. Regulado por el Código de Protección y Defensa del
                Consumidor (Ley N° 29571) y supervisado por INDECOPI.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: FileText,
                  title: "¿Qué puedes reclamar?",
                  desc: "Servicios deficientes, incumplimiento de contratos, cobros indebidos, mala atención o cualquier situación que afecte tus derechos como consumidor financiero.",
                },
                {
                  icon: Clock,
                  title: "Tiempo de Respuesta",
                  desc: "Tenemos un plazo máximo de 30 días hábiles para responder a tu reclamo o queja, conforme lo establece la legislación peruana vigente.",
                },
                {
                  icon: MessageSquare,
                  title: "¿Cómo presentar tu reclamo?",
                  desc: "Puedes hacerlo a través de este formulario digital (envío por WhatsApp) o de forma presencial en cualquiera de nuestras agencias en Lima, Perú.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i + 1}
                  className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#DCAA61]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────── Form Section ──────── */}
        <section id="formulario" className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Presenta tu{" "}
                <span className="text-gold-metallic">
                  Reclamo o Queja
                </span>
              </h2>
              <p className="mt-4 text-slate-400 max-w-xl mx-auto">
                Completa el formulario y tu reclamo será enviado por WhatsApp
                para un seguimiento inmediato.
              </p>
            </motion.div>

            <motion.form
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={1}
              onSubmit={handleSubmit}
              className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Tipo */}
                <div>
                  <label
                    htmlFor="tipo"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Tipo de Registro *
                  </label>
                  <select
                    id="tipo"
                    value={form.tipo}
                    onChange={(e) =>
                      updateField("tipo", e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200"
                  >
                    <option value="Reclamo">Reclamo</option>
                    <option value="Queja">Queja</option>
                  </select>
                  <p className="text-xs text-slate-400 mt-1">
                    {form.tipo === "Reclamo"
                      ? "Disconformidad relacionada con los productos o servicios"
                      : "Disconformidad relacionada a la atención del usuario"}
                  </p>
                </div>

                {/* Nombres */}
                <div>
                  <label
                    htmlFor="nombres"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Nombres Completos *
                  </label>
                  <input
                    id="nombres"
                    type="text"
                    value={form.nombresCompletos}
                    onChange={(e) =>
                      updateField("nombresCompletos", e.target.value)
                    }
                    placeholder="Ej. Juan Pérez García"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200 placeholder:text-slate-500 ${
                      errors.nombresCompletos
                        ? "border-red-400/60 bg-red-500/10"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                  />
                  {errors.nombresCompletos && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.nombresCompletos}
                    </p>
                  )}
                </div>

                {/* Documento */}
                <div>
                  <label
                    htmlFor="documento"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Tipo de Documento *
                  </label>
                  <select
                    id="documento"
                    value={form.documento}
                    onChange={(e) =>
                      updateField("documento", e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200"
                  >
                    <option value="DNI">DNI</option>
                    <option value="Carné de Extranjería">
                      Carné de Extranjería
                    </option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>

                {/* Numero Documento */}
                <div>
                  <label
                    htmlFor="numDoc"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Número de Documento *
                  </label>
                  <input
                    id="numDoc"
                    type="text"
                    value={form.numeroDocumento}
                    onChange={(e) =>
                      updateField("numeroDocumento", e.target.value)
                    }
                    maxLength={form.documento === "DNI" ? 8 : 12}
                    placeholder={
                      form.documento === "DNI"
                        ? "8 dígitos"
                        : "Número de documento"
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200 placeholder:text-slate-500 ${
                      errors.numeroDocumento
                        ? "border-red-400/60 bg-red-500/10"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                  />
                  {errors.numeroDocumento && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.numeroDocumento}
                    </p>
                  )}
                </div>

                {/* Telefono */}
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Teléfono *
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={(e) =>
                      updateField("telefono", e.target.value)
                    }
                    placeholder="Ej. 987654321"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200 placeholder:text-slate-500 ${
                      errors.telefono
                        ? "border-red-400/60 bg-red-500/10"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                  />
                  {errors.telefono && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.telefono}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    placeholder="correo@ejemplo.com"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200 placeholder:text-slate-500 ${
                      errors.email
                        ? "border-red-400/60 bg-red-500/10"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Dirección */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="direccion"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Dirección
                  </label>
                  <input
                    id="direccion"
                    type="text"
                    value={form.direccion}
                    onChange={(e) =>
                      updateField("direccion", e.target.value)
                    }
                    placeholder="Ej. Av. Arequipa 1234, Lima"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200 placeholder:text-slate-500"
                  />
                </div>

                {/* Producto */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="producto"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Producto / Servicio Relacionado
                  </label>
                  <select
                    id="producto"
                    value={form.producto}
                    onChange={(e) =>
                      updateField("producto", e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200"
                  >
                    <option value="Préstamo Personal">
                      Préstamo Personal
                    </option>
                    <option value="Garantía Vehicular">
                      Garantía Vehicular
                    </option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* Descripcion */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="descripcion"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Descripción del Reclamo / Queja *
                  </label>
                  <textarea
                    id="descripcion"
                    rows={4}
                    value={form.descripcion}
                    onChange={(e) =>
                      updateField("descripcion", e.target.value)
                    }
                    placeholder="Describe detalladamente la situación que motiva tu reclamo o queja..."
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200 placeholder:text-slate-500 resize-none ${
                      errors.descripcion
                        ? "border-red-400/60 bg-red-500/10"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                  />
                  {errors.descripcion && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.descripcion}
                    </p>
                  )}
                </div>

                {/* Pedido */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="pedido"
                    className="block text-sm font-semibold text-slate-200 mb-2"
                  >
                    Pedido del Consumidor *
                  </label>
                  <textarea
                    id="pedido"
                    rows={3}
                    value={form.pedido}
                    onChange={(e) =>
                      updateField("pedido", e.target.value)
                    }
                    placeholder="¿Qué solución esperas de nuestra parte?"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white focus:border-[#DCAA61] focus:ring-2 focus:ring-[#DCAA61]/20 outline-none transition-all duration-200 placeholder:text-slate-500 resize-none ${
                      errors.pedido
                        ? "border-red-400/60 bg-red-500/10"
                        : "border-white/10 bg-white/[0.06]"
                    }`}
                  />
                  {errors.pedido && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.pedido}
                    </p>
                  )}
                </div>
              </div>

              {/* Success Banner */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-300">Reclamo enviado correctamente</p>
                    <p className="text-xs text-green-400 mt-0.5">
                      Tu reclamo ha sido enviado por WhatsApp. Te responderemos en un plazo maximo de 30 dias habiles.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold-metallic text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-orange-900/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-900/30"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Enviar Reclamo por WhatsApp
                </button>
                <p className="text-xs text-slate-400 text-center sm:text-left">
                  Al enviar, se abrirá WhatsApp con tu reclamo pre-cargado.
                  Recibirás respuesta en un plazo máximo de 30 días hábiles.
                </p>
              </div>
            </motion.form>
          </div>
        </section>

        {/* ──────── Company Info Box ──────── */}
        <section id="empresa" className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-orange-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gold-luxury">
                  Información de la Empresa
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-slate-400">Razón Social</p>
                  <p className="text-sm font-semibold text-slate-100 mt-1">
                    {SITE_CONFIG.businessName}
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-slate-400">RUC</p>
                  <p className="text-sm font-semibold text-slate-100 mt-1">
                    {SITE_CONFIG.ruc}
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-slate-400">Dirección</p>
                  <p className="text-sm font-semibold text-slate-100 mt-1">Lima, Perú</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-slate-400">WhatsApp</p>
                  <p className="text-sm font-semibold text-slate-100 mt-1">
                    {SITE_CONFIG.phone}
                  </p>
                </div>
                <div className="glass rounded-xl p-4 sm:col-span-2">
                  <p className="text-xs text-slate-400">
                    Correo Electrónico
                  </p>
                  <p className="text-sm font-semibold text-slate-100 mt-1">
                    {SITE_CONFIG.email}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Conforme al Código de Protección y Defensa del Consumidor
                  (Ley N° 29571) y su Reglamento (D.S. N° 011-2011-PCM), el
                  proveedor tiene un plazo máximo de 30 días hábiles para
                  atender el reclamo o queja. El consumidor puede ejercer sus
                  derechos ante INDECOPI en caso de no recibir respuesta
                  satisfactoria.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        </DeepLinking>
      </main>
      <Footer />
    </>
  );
}
