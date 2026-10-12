"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, Shield } from "lucide-react";
import { LOAN_RANGES } from "@/lib/constants";
import { getWhatsAppUrl, redirectToWhatsApp } from "@/lib/whatsapp";

type LoanType = "personal" | "vehicular";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Calculadora() {
  const [loanType, setLoanType] = useState<LoanType>("personal");
  const [amount, setAmount] = useState(LOAN_RANGES.personal.default);
  const [months, setMonths] = useState(12);

  const range = LOAN_RANGES[loanType];

  const monthlyRate = loanType === "personal" ? 0.045 : 0.028;

  const calculation = useMemo(() => {
    const r = monthlyRate;
    const n = months;
    const numerator = amount * r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    const cuota = numerator / denominator;
    const totalPayable = cuota * n;
    const totalInterest = totalPayable - amount;
    return { cuota, totalPayable, totalInterest };
  }, [amount, months, monthlyRate]);

  const handleLoanTypeChange = useCallback(
    (type: LoanType) => {
      setLoanType(type);
      setAmount(LOAN_RANGES[type].default);
      setMonths(type === "personal" ? 12 : 24);
    },
    []
  );

  const handleWhatsApp = useCallback(() => {
    const ctx =
      loanType === "personal"
        ? "prestamos-personales"
        : "garantia-vehicular";
    const extraMsg = `Monto: ${formatCurrency(amount)} | Plazo: ${months} meses | Cuota estimada: ${formatCurrency(calculation.cuota)}`;
    const url = `${getWhatsAppUrl(ctx)} ${encodeURIComponent(extraMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [loanType, amount, months, calculation.cuota]);

  return (
    <section className="relative py-16 sm:py-24" id="calculadora">
      {/* Background removed — inherits bg-slate-950 from body */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.06] text-[#DCAA61] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Simulador Financiero
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Calcula tu{" "}
            <span className="text-gold-metallic">
              cuota mensual
            </span>
          </h2>
          <p className="mt-4 text-sm text-slate-400 max-w-2xl mx-auto">
            Simula tu préstamo de forma rápida y obtén una estimación
            personalizada. Tu cotización no genera ningún compromiso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* Calculator Card */}
          <div className="lg:col-span-3 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300">
            {/* Loan Type Toggle */}
            <div className="flex rounded-2xl bg-white/[0.06] p-1.5 mb-8">
              {[
                { type: "personal" as LoanType, label: "Préstamo Personal" },
                { type: "vehicular" as LoanType, label: "Garantía Vehicular" },
              ].map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => handleLoanTypeChange(opt.type)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    loanType === opt.type
                      ? "bg-white/[0.1] text-white shadow-md shadow-black/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Amount Slider */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-sm font-extrabold text-white">
                  Monto del Préstamo
                </label>
                <motion.span
                  key={amount}
                  initial={{ scale: 1.1, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl sm:text-3xl font-extrabold text-[#DCAA61]"
                >
                  {formatCurrency(amount)}
                </motion.span>
              </div>
              <input
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full cursor-pointer"
                aria-label="Monto del préstamo"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>{formatCurrency(range.min)}</span>
                <span>{formatCurrency(range.max)}</span>
              </div>
            </div>

            {/* Term Slider */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-sm font-extrabold text-white">
                  Plazo (meses)
                </label>
                <motion.span
                  key={months}
                  initial={{ scale: 1.1, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl sm:text-3xl font-extrabold text-white"
                >
                  {months}{" "}
                  <span className="text-base font-medium text-slate-400">
                    meses
                  </span>
                </motion.span>
              </div>
              <input
                type="range"
                min={loanType === "personal" ? 3 : 6}
                max={loanType === "personal" ? 36 : 60}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full cursor-pointer"
                aria-label="Plazo en meses"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>{loanType === "personal" ? 3 : 6} meses</span>
                <span>{loanType === "personal" ? 36 : 60} meses</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/[0.04] rounded-2xl p-4 text-center">
                <p className="text-xs sm:text-sm text-[#DCAA61] font-medium mb-1">
                  Cuota Mensual
                </p>
                <motion.p
                  key={calculation.cuota.toFixed(2)}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className="text-lg sm:text-2xl font-extrabold text-[#DCAA61]"
                >
                  {formatCurrency(calculation.cuota)}
                </motion.p>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-4 text-center">
                <p className="text-xs sm:text-sm text-slate-400 font-medium mb-1">
                  Total a Pagar
                </p>
                <motion.p
                  key={calculation.totalPayable.toFixed(2)}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className="text-lg sm:text-2xl font-extrabold text-white"
                >
                  {formatCurrency(calculation.totalPayable)}
                </motion.p>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-4 text-center">
                <p className="text-xs sm:text-sm text-amber-400 font-medium mb-1">
                  Interés Total
                </p>
                <motion.p
                  key={calculation.totalInterest.toFixed(2)}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className="text-lg sm:text-2xl font-extrabold text-amber-300"
                >
                  {formatCurrency(calculation.totalInterest)}
                </motion.p>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsApp}
              className="w-full mt-8 bg-gold-metallic text-white py-4 rounded-2xl text-base font-bold shadow-lg shadow-orange-900/20 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Solicitar este Préstamo
            </motion.button>
          </div>

          {/* Benefits Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              {
                icon: Clock,
                title: "Aprobación Rápida",
                desc: "Recibe una respuesta en menos de 24 horas hábiles. Sin trámites innecesarios ni burocracia.",
                color: "orange",
              },
              {
                icon: Shield,
                title: "100% Seguro",
                desc: "Transparencia total en condiciones. Cumplimos con las normativas de la SBS para tu tranquilidad.",
                color: "green",
              },
              {
                icon: TrendingUp,
                title: "Tasas Competitivas",
                desc: "Ofrecemos las mejores tasas del mercado adaptadas a tu perfil y capacidad de pago actual.",
                color: "amber",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 flex items-start gap-4"
              >
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.color === "orange"
                      ? "bg-white/[0.06] text-[#DCAA61]"
                      : item.color === "green"
                      ? "bg-white/[0.06] text-green-400"
                      : "bg-white/[0.06] text-amber-400"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-6 text-white mt-auto shadow-2xl relative overflow-hidden"
            >
              {/* Glow orbs */}
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#DCAA61]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#A97631]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="glass rounded-xl p-4 relative">
                <p className="text-sm font-semibold text-[#DCAA61] mb-2">
                  FORTIUS CAPITAL S.A.C.
                </p>
                <p className="text-xs text-white/70">
                  RUC: 20616561082. Empresa registrada y autorizada para
                  operaciones financieras en el territorio nacional.
                  Respaldados por solidez, experiencia y compromiso con
                  nuestros clientes.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
