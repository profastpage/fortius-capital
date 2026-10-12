"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Gold spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#DCAA61] animate-spin" />
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center">
          <span className="text-xl font-extrabold text-[#FAF8F5] tracking-widest">
            FORTIUS
          </span>
          <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#DCAA61] -mt-0.5">
            CAPITAL
          </span>
        </div>
      </div>
    </motion.div>
  );
}
