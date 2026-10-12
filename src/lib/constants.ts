/**
 * Site-wide constants for Fortius Capital
 * Razón Social: FORTIUS CAPITAL S.A.C.
 * RUC: 20616561082
 */

export const SITE_CONFIG = {
  name: "Fortius Capital",
  businessName: "FORTIUS CAPITAL S.A.C.",
  ruc: "20616561082",
  phone: "+51966897008",
  phoneDisplay: "+51 966 897 008",
  email: "contacto@fortiuscapital.com",
  domain: "fortiuscapital.pe",
  url: "https://fortiuscapital.pe",
  description:
    "Tu solución financiera fácil, rápida y segura. Préstamos personales al instante y préstamos con garantía vehicular sin dejar de usar tu auto con Fortius Capital. RUC: 20616561082.",
  keywords: [
    "préstamos personales",
    "préstamo vehicular",
    "crédito rápido",
    "garantía de auto",
    "Procustodia",
    "financiera Perú",
    "Fortius Capital",
    "FORTIUS CAPITAL S.A.C.",
    "crédito al instante",
    "dinero rápido",
    "RUC 20616561082",
  ],
  ogImage: "/images/fortius-badge.jpg",
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Préstamos al Instante", href: "/prestamos-personales" },
  { label: "Garantía Vehicular", href: "/garantia-vehicular" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Libro de Reclamaciones", href: "/libro-de-reclamaciones" },
] as const;

export const LOAN_RANGES = {
  personal: { min: 500, max: 20000, default: 5000, step: 500 },
  vehicular: { min: 5000, max: 100000, default: 25000, step: 1000 },
} as const;

export const FAQ_ITEMS = [
  {
    question: "¿Es seguro solicitar un préstamo con ustedes?",
    answer:
      "Sí, trabajamos con total transparencia y condiciones claras para garantizar la seguridad de nuestros clientes. Cumplimos con todas las normativas de la Superintendencia de Banca, Seguros y AFP (SBS) y contamos con procesos de verificación rigurosos que protegen tanto tu información personal como tu patrimonio. Cada operación es registrada y auditada para asegurar la máxima confiabilidad en todo momento.",
  },
  {
    question: "¿Necesito historial crediticio para acceder a un préstamo?",
    answer:
      "No es indispensable. Evaluamos cada caso de manera individual, priorizando tu capacidad de pago actual. Entendemos que las circunstancias financieras varían, por lo que nuestro equipo de análisis realiza una evaluación integral que considera tus ingresos actuales, estabilidad laboral y otros factores relevantes para ofrecerte la mejor opción disponible según tu perfil.",
  },
  {
    question: "¿Cuánto tiempo tarda el proceso de préstamo?",
    answer:
      "Dependiendo del tipo de préstamo, la aprobación puede ser rápida, asegurando acceso inmediato al dinero. Para nuestros préstamos al instante, el proceso completo puede completarse en menos de 24 horas hábiles desde la presentación de la documentación completa. Los préstamos con garantía vehicular pueden tomar entre 48 y 72 horas hábiles incluyendo la tasación del vehículo.",
  },
  {
    question: "¿Cómo funciona el préstamo con garantía vehicular?",
    answer:
      "Usas tu auto como respaldo sin dejar de utilizarlo. El proceso es seguro y rápido gracias a nuestra alianza estratégica con Procustodia, una empresa líder en custodia vehicular. Tu vehículo permanece en tu poder y puedes seguir usándolo con total normalidad mientras disfrutas del financiamiento. Solo se realiza una inspección técnica y la firma del contrato de garantía para proteger ambas partes.",
  },
  {
    question: "¿Qué documentos necesito para solicitar un préstamo?",
    answer:
      "Solo necesitas tu Documento de Identidad vigente (DNI), la Tarjeta de propiedad del vehículo (para préstamos vehiculares), un Recibo de servicio reciente (agua o luz) como comprobante de domicilio, e información sobre tus ingresos actuales. Nuestro equipo te guiará paso a paso para que el proceso sea lo más ágil posible.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Documento de Identidad",
    description:
      "Es indispensable para validar tu identidad y continuar con el proceso de préstamo. Ten tu DNI vigente a la mano para agilizar la solicitud.",
  },
  {
    number: "02",
    title: "Presenta tu garantía y tasación",
    description:
      "¿No tienes tasación? No te preocupes. Puedes obtenerla fácilmente con nuestro aliado Procustodia, líder en custodia vehicular en Perú.",
  },
  {
    number: "03",
    title: "Aprobación y desembolso",
    description:
      "Una vez evaluada tu solicitud, recibirás la aprobación y el desembolso de manera rápida directamente a tu cuenta bancaria.",
  },
] as const;
