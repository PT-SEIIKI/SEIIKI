"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const [isPaused, setIsPaused] = useState(false);

  const partners = [
    { title: "PLN", img: "https://dummyimage.com/200x80/0ea5e9/ffffff&text=PLN", category: "Utilitas" },
    { title: "Kementerian ESDM", img: "https://dummyimage.com/200x80/64748b/ffffff&text=ESDM", category: "Pemerintah" },
    { title: "Kontraktor Listrik", img: "https://dummyimage.com/200x80/0f172a/ffffff&text=Kontraktor", category: "Kontraktor" },
    { title: "Asosiasi Industri", img: "https://dummyimage.com/200x80/334155/ffffff&text=Asosiasi", category: "Organisasi" },
    { title: "Pabrikan Panel", img: "https://dummyimage.com/200x80/0369a1/ffffff&text=Panel", category: "Manufaktur" },
    { title: "Penyedia Peralatan", img: "https://dummyimage.com/200x80/0891b2/ffffff&text=Peralatan", category: "Supplier" },
  ];
  
  const doubled = partners.flatMap((p) => [p, p]);

  return (
    <section id="partners" className="py-20 md:py-32 bg-gradient-to-b from-background via-slate-50/30 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-0 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-sky-500/10 border border-blue-200/50 text-sm font-medium text-blue-700 mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Mitra Terpercaya
            </span>
          </motion.div>
          
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
          className="relative"
        >
          {/* Marquee container with pause on hover */}
          <div 
            className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-sm border border-slate-200/60 shadow-xl shadow-slate-200/50 py-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex items-center gap-8 will-change-transform"
              style={{ 
                animation: `seiiki-marquee 35s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
              {doubled.map((partner, idx) => (
                <motion.div 
                  key={idx} 
                  className="shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative h-20 sm:h-24 md:h-28 w-auto px-8 py-4 rounded-xl bg-white border-2 border-slate-100 flex flex-col items-center justify-center gap-2 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-300 transition-all duration-300 group-hover:-translate-y-1">
                    <img
                      src={partner.img}
                      alt={`Logo ${partner.title}`}
                      className="h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <span className="text-xs font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                      {partner.category}
                    </span>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 to-sky-500/0 group-hover:from-blue-500/5 group-hover:to-sky-500/5 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced gradient overlays */}
          </div>

          {/* Pause indicator */}
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
            { value: "1000+", label: "Proyek Selesai" },
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
              <div className="mt-2 text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes seiiki-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        section#partners .will-change-transform { width: 200%; }
      `}</style>
    </section>
  );
}