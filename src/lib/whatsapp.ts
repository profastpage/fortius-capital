/**
 * WhatsApp Conversion Utility
 * Centralized redirect logic for all WhatsApp CTAs across the site.
 * Phone: +51 966 897 008 (Fortius Capital)
 */

export const WHATSAPP_PHONE = "51966897008";

type WhatsAppContext =
  | "home"
  | "prestamos-personales"
  | "garantia-vehicular"
  | "nosotros"
  | "contacto"
  | "vehicular-cotizacion"
  | "asesoria"
  | "reclamo"
  | "libro-de-reclamaciones";

const WHATSAPP_MESSAGES: Record<WhatsAppContext, string> = {
  home:
    "Hola, vengo desde la página web de Fortius Capital y estoy interesado en un préstamo",
  "prestamos-personales":
    "Hola Fortius Capital, me interesa conocer los requisitos para el préstamo personal al instante...",
  "garantia-vehicular":
    "Hola Fortius Capital, deseo cotizar un préstamo usando mi auto como garantía sin dejar de usarlo...",
  nosotros:
    "Hola Fortius Capital, vengo desde la sección Nosotros y deseo más información sobre sus servicios...",
  contacto:
    "Hola Fortius Capital, vengo desde la página web y deseo comunicarme con un asesor...",
  "vehicular-cotizacion":
    "Hola Fortius Capital, vengo desde la página web y estoy interesado en un préstamo vehicular",
  asesoria:
    "Hola Fortius Capital, vengo desde la página web y necesito asesoría financiera.",
  reclamo:
    "Hola Fortius Capital, deseo presentar un reclamo/queja. Mis datos son:",
  "libro-de-reclamaciones":
    "Hola Fortius Capital, me encuentro en la sección de Libro de Reclamaciones y deseo presentar una consulta...",
};

/** Display names for each section (used in dynamic WhatsApp messages) */
const PAGE_DISPLAY_NAMES: Record<string, string> = {
  "/": "Inicio",
  "/prestamos-personales": "Préstamos al Instante",
  "/garantia-vehicular": "Garantía Vehicular",
  "/nosotros": "Nosotros",
  "/libro-de-reclamaciones": "Libro de Reclamaciones",
};

/** Maps pathname to WhatsAppContext */
const PATHNAME_CONTEXT_MAP: Record<string, WhatsAppContext> = {
  "/": "home",
  "/prestamos-personales": "prestamos-personales",
  "/garantia-vehicular": "garantia-vehicular",
  "/nosotros": "nosotros",
  "/libro-de-reclamaciones": "libro-de-reclamaciones",
};

/**
 * Generates a WhatsApp URL with a dynamic message based on the current pathname.
 * Format: "Hola Fortius Capital, me encuentro en la sección de [Nombre] y deseo solicitar asesoría..."
 */
export function getDynamicWhatsAppUrl(pathname: string): string {
  const pageName = PAGE_DISPLAY_NAMES[pathname] || "la página web";
  const message = `Hola Fortius Capital, me encuentro en la sección de ${pageName} y deseo solicitar asesoría...`;
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;
}

/**
 * Returns the appropriate WhatsAppContext for a given pathname.
 */
export function getContextFromPathname(pathname: string): WhatsAppContext {
  return PATHNAME_CONTEXT_MAP[pathname] || "contacto";
}

/**
 * Generates a WhatsApp API URL with pre-filled message.
 * Uses api.whatsapp.com for desktop and wa.me for mobile compatibility.
 */
export function getWhatsAppUrl(context: WhatsAppContext): string {
  const message = WHATSAPP_MESSAGES[context];
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;
}

/**
 * Hook-compatible helper for imperative navigation.
 * Call this inside event handlers (onClick) for client components.
 */
export function redirectToWhatsApp(context: WhatsAppContext): void {
  const url = getWhatsAppUrl(context);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Hook-compatible helper that uses dynamic pathname-based messaging.
 */
export function redirectToWhatsAppDynamic(pathname: string): void {
  const url = getDynamicWhatsAppUrl(pathname);
  window.open(url, "_blank", "noopener,noreferrer");
}
