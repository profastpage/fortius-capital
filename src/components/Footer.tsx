import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import FortiusLogo from "@/components/FortiusLogo";

export default function Footer() {
  return (
    <footer className="bg-[#080705] text-white border-t border-stone-800" role="contentinfo">
      {/* Top CTA Bar — Dorado elegante y negro */}
      <div className="bg-gradient-to-r from-[#8A6318] via-[#DCAA61] to-[#8A6318]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm font-bold text-black tracking-wide">
            ¿Listo para obtener tu préstamo? Habla con un asesor de Fortius Capital ahora.
          </p>
          <a
            href={getWhatsAppUrl("home")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#090806] text-[#FAF8F5] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-colors duration-200 border border-[#DCAA61]/40 shadow-lg"
          >
            <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Asesor
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 focus:outline-none" aria-label="Fortius Capital - Inicio">
              <FortiusLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Tu aliado financiero de confianza. Soluciones crediticias
              adaptadas a tus necesidades con solidez, transparencia, seguridad y
              velocidad.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#DCAA61]" />
              <span>RUC: {SITE_CONFIG.ruc}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explora
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={getWhatsAppUrl("contacto")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Servicios
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/prestamos-personales"
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  Préstamos Personales
                </Link>
              </li>
              <li>
                <Link
                  href="/garantia-vehicular"
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  Garantía Vehicular
                </Link>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl("asesoria")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  Asesoría Financiera
                </a>
              </li>
              <li>
                <Link
                  href="/libro-de-reclamaciones"
                  className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  Libro de Reclamaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Canales de Atención
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#DCAA61] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-300 font-medium">
                    WhatsApp
                  </p>
                  <a
                    href={getWhatsAppUrl("contacto")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#DCAA61] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-300 font-medium">
                    Central Telefónica
                  </p>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm text-slate-400 hover:text-[#DCAA61] transition-colors duration-200">
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#DCAA61] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-300 font-medium">
                    Correo Electrónico
                  </p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-slate-400 hover:text-[#DCAA61] transition-colors duration-200">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-300 font-medium">
                    Agencias
                  </p>
                  <p className="text-sm text-slate-400">
                    Lima, Perú
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} {SITE_CONFIG.businessName}. Todos
              los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/nosotros"
                className="hover:text-slate-300 transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/nosotros"
                className="hover:text-slate-300 transition-colors"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
