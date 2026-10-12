import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Banknote,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import DeepLinking from "@/components/DeepLinking";

export const metadata: Metadata = {
  title: "Préstamos Personales al Instante",
  description:
    "Obtén tu préstamo personal rápido y sin complicaciones. Montos desde S/ 500 hasta S/ 20,000 con aprobación en menos de 24 horas. Fortius Capital (RUC: 20616561082).",
  alternates: { canonical: "/prestamos-personales" },
};

const BENEFITS = [
  {
    icon: Clock,
    title: "Aprobación Express",
    desc: "Recibe una respuesta en menos de 24 horas hábiles desde que presentas tu documentación completa. Sin esperas interminables ni trámites burocráticos.",
  },
  {
    icon: Banknote,
    title: "Montos Flexibles",
    desc: "Accede a montos desde S/ 500 hasta S/ 20,000 según tu perfil y capacidad de pago. Elige el monto que mejor se adapte a tus necesidades financieras.",
  },
  {
    icon: ShieldCheck,
    title: "Trámites Simplificados",
    desc: "Solo necesitas tu DNI vigente, un recibo de servicio y tus datos de ingresos. Proceso 100% digital y sin complicaciones innecesarias.",
  },
  {
    icon: Users,
    title: "Asesoría Personalizada",
    desc: "Un asesor dedicado te acompaña en todo el proceso, aclarando cada duda y garantizando que obtengas la mejor condición para tu préstamo.",
  },
];

const REQUIREMENTS = [
  "Documento Nacional de Identidad (DNI) vigente",
  "Recibo de servicio reciente (agua, luz o internet)",
  "Información sobre tus ingresos actuales",
  "Ser mayor de 18 años y menor de 65 años",
  "No tener registros negativos en centrales de riesgo impeditivos",
];

const STEPS = [
  {
    step: "01",
    title: "Envía tu Solicitud",
    desc: "Comunícate con nosotros por WhatsApp o completa el formulario en línea con tus datos básicos. El proceso toma solo 5 minutos.",
  },
  {
    step: "02",
    title: "Evaluación Rápida",
    desc: "Nuestro equipo analiza tu solicitud y tu capacidad de pago de forma integral. Te contactamos con la respuesta en menos de 24 horas.",
  },
  {
    step: "03",
    title: "Recepción de Fondos",
    desc: "Una vez aprobado, el dinero se deposita directamente en tu cuenta bancaria. Sin demoras ni intermediarios.",
  },
];

export default function PrestamosPersonalesPage() {
  return (
    <>
      <Navbar />
      <main>
        <DeepLinking>
        {/* Hero — Full Bleed Immersive */}
        <section id="inicio" className="relative h-screen w-full flex items-center overflow-hidden bg-slate-950">
          {/* Background Image */}
          <Image
            src="/hero-prestamos.webp"
            alt="Préstamos personales al instante"
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
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white/80">
                  Préstamo Personal
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
                Préstamos al{" "}
                <span className="text-gold-metallic">
                  Instante
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Dinero rápido cuando más lo necesitas. Montos desde S/ 500
                hasta S/ 20,000 con aprobación en menos de 24 horas. Sin
                trámites complicados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href={getWhatsAppUrl("prestamos-personales")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gold-metallic text-white px-8 py-4 rounded-2xl text-base font-bold shadow-2xl shadow-black/40 transition-all duration-300 hover:scale-[1.03]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Solicitar Mi Préstamo
                </a>
                <Link href="#calculadora" className="inline-flex items-center justify-center gap-2 glass text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/20 transition-all duration-300">
                  Calcular Cuota
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-white/5">
                  <Image
                    src="/images/prestamos-fortius.png"
                    alt="Préstamos al instante - Fortius Capital"
                    width={1024}
                    height={637}
                    className="w-full h-auto object-cover rounded-3xl"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Ver Más — scroll suave a Beneficios */}
          <a
            href="#beneficios"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-300 hover:text-gold-light transition-colors group"
          >
            <span className="text-xs font-semibold tracking-wider uppercase">Ver más</span>
            <svg className="w-5 h-5 mt-1 animate-bounce text-gold-light group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </section>

        {/* Benefits — Frameless on dark */}
        <section id="beneficios" className="py-16 px-4 bg-slate-950">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-12 text-center">
              ¿Por qué elegir nuestro{" "}
              <span className="text-gold-metallic">
                préstamo personal
              </span>
              ?
            </h2>
            <div className="space-y-0">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.title}
                  className={`${
                    i < BENEFITS.length - 1
                      ? "border-b border-slate-800/60 pb-6"
                      : "pb-0"
                  } ${i > 0 ? "pt-6" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                      <b.icon className="w-5 h-5 text-[#DCAA61]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{b.title}</h3>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section id="requisitos" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-luxury tracking-tight mb-6">
                  Requisitos <span className="text-[#DCAA61]">Simples</span>
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Hemos simplificado nuestros requisitos al mínimo para que puedas acceder a tu préstamo de forma ágil. No necesitas avales ni garantías adicionales.
                </p>
                <ul className="space-y-4">
                  {REQUIREMENTS.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-300">{req}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={getWhatsAppUrl("prestamos-personales")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold-metallic text-white px-6 py-3 rounded-xl text-sm font-bold mt-8 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h$.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Verificar Mis Requisitos
                </a>
              </div>
              <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl shadow-xl relative overflow-hidden p-8 sm:p-10">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/images/document-form.jpg"
                    alt="Documentos necesarios para préstamo personal"
                    fill
                    className="object-cover"
                  />
                </div>
                <FileText className="w-12 h-12 text-[#DCAA61] mb-4" />
                <h3 className="text-xl font-bold text-gold-luxury-subtle mb-4">Documentos Necesarios</h3>
                <div className="space-y-3">
                  <div className="bg-white/[0.04] rounded-xl p-4 border border-white/5">
                    <p className="text-sm font-semibold text-slate-200">DNI Vigente</p>
                    <p className="text-xs text-slate-400 mt-1">Documento Nacional de Identidad actualizado</p>
                  </div>
                  <div className="bg-white/[0.04] rounded-xl p-4 border border-white/5">
                    <p className="text-sm font-semibold text-slate-200">Recibo de Servicio</p>
                    <p className="text-xs text-slate-400 mt-1">Agua, luz o internet (no mayor a 2 meses)</p>
                  </div>
                  <div className="bg-white/[0.04] rounded-xl p-4 border border-white/5">
                    <p className="text-sm font-semibold text-slate-200">Información de Ingresos</p>
                    <p className="text-xs text-slate-400 mt-1">Boletas, recibos por honorarios o declaraciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section id="proceso" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-luxury tracking-tight text-center mb-4">
              Proceso en <span className="text-[#DCAA61]">3 Pasos</span>
            </h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
              Solicitar tu préstamo personal nunca fue tan sencillo. Sigue estos tres pasos y obtén tu dinero.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <div key={s.step} className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                  <span className="text-5xl font-black text-white/10">{s.step}</span>
                  <h3 className="text-xl font-bold text-gold-luxury-subtle mt-3 mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contacto" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl relative overflow-hidden p-10 sm:p-16 text-center">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#DCAA61]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#A97631]/10 rounded-full blur-[80px] pointer-events-none" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-luxury tracking-tight">
                ¿Listo para obtener tu préstamo?
              </h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                Habla con un asesor ahora y recibe tu aprobación hoy mismo.
              </p>
              <a
                href={getWhatsAppUrl("prestamos-personales")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-metallic text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-black/40 mt-8 transition-all duration-300 hover:scale-[1.03]"
              >
                Solicitar Préstamo Personal
              </a>
            </div>
          </div>
        </section>
        </DeepLinking>
      </main>
      <Footer />
    </>
  );
}
