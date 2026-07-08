"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Partner {
  title: string;
  abbr: string;
  color: string;
  bg: string;
  category: string;
}

export default function PartnersSection() {
  const [isPaused, setIsPaused] = useState(false);

  const partners: Partner[] = [
    { title: "PLN", abbr: "PLN", color: "#0ea5e9", bg: "#e0f2fe", category: "Utilitas" },
    { title: "Kementerian ESDM", abbr: "ESDM", color: "#64748b", bg: "#f1f5f9", category: "Pemerintah" },
    { title: "Kontraktor Listrik", abbr: "KONL", color: "#0f172a", bg: "#f8fafc", category: "Kontraktor" },
    { title: "Asosiasi Industri", abbr: "ASIN", color: "#334155", bg: "#f1f5f9", category: "Organisasi" },
    { title: "Pabrikan Panel", abbr: "PAN", color: "#0369a1", bg: "#e0f2fe", category: "Manufaktur" },
    { title: "Penyedia Peralatan", abbr: "PEER", color: "#0891b2", bg: "#cffafe", category: "Supplier" },
  ];

  const doubled = [...partners, ...partners];

  return (
    <section
      id="partners"
      className="py-20 md:py-32 bg-gradient-to-b from-background via-slate-50/30 to-background relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-sky-500/10 border border-blue-200/50 text-sm font-medium text-blue-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Mitra Terpercaya
          </span>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
            Kerjasama Strategis
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            Berkolaborasi dengan mitra terbaik untuk menghadirkan solusi kelistrikan berkualitas tinggi
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative marquee-wrapper"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-sm border border-slate-200/60 shadow-xl shadow-slate-200/50 py-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="marquee-track marquee-track-left items-center gap-8"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {doubled.map((partner, idx) => (
                <motion.div
                  key={idx}
                  className="shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative h-24 w-auto min-w-[140px] px-6 py-4 rounded-xl bg-white border-2 border-slate-100 flex flex-col items-center justify-center gap-2 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-300 transition-all duration-300 group-hover:-translate-y-1">
                    {/* Text-based logo */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: partner.bg, color: partner.color }}
                    >
                      {partner.abbr.slice(0, 3)}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">{partner.title}</span>
                    <span className="text-[10px] font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                      {partner.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gradient fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/40 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/40 to-transparent z-10" />
          </div>

          {isPaused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500 flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
              </svg>
              Dijeda
            </motion.div>
          )}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "50+", label: "Mitra Aktif" },
            { value: "15+", label: "Tahun Pengalaman" },
            { value: "1.000+", label: "Proyek Selesai" },
            { value: "99%", label: "Kepuasan Klien" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-slate-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
