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
    { title: "PT Central Avian Pertiwi",          abbr: "CAP",   color: "#0369a1", bg: "#e0f2fe", category: "Manufaktur" },
    { title: "PT Gunung Madu Plantations",         abbr: "GMP",   color: "#15803d", bg: "#dcfce7", category: "Perkebunan" },
    { title: "PT GS Battery",                      abbr: "GSB",   color: "#1d4ed8", bg: "#dbeafe", category: "Manufaktur" },
    { title: "PT Gold Coin Specialities",          abbr: "GCS",   color: "#0891b2", bg: "#cffafe", category: "Manufaktur" },
    { title: "PT Kariangau Gapura Terminal Energi",abbr: "KGTE",  color: "#c2410c", bg: "#ffedd5", category: "Energi" },
    { title: "PT Medisafe Technologies",           abbr: "MDT",   color: "#b91c1c", bg: "#fee2e2", category: "Kesehatan" },
    { title: "PT Princeton Digital Group",         abbr: "PDG",   color: "#7c3aed", bg: "#ede9fe", category: "Teknologi" },
    { title: "PT Puradelta Lestari Tbk",           abbr: "PDL",   color: "#0f766e", bg: "#ccfbf1", category: "Properti" },
    { title: "PT Xinyi Glass Indonesia",           abbr: "XGI",   color: "#374151", bg: "#f3f4f6", category: "Manufaktur" },
    { title: "PT Idemitsu Lube Techno Indonesia",  abbr: "ILTI",  color: "#b45309", bg: "#fef3c7", category: "Industri" },
    { title: "PT Indo Porcelain",                  abbr: "IDP",   color: "#6d28d9", bg: "#ede9fe", category: "Manufaktur" },
    { title: "PT Sumber Indah Perkasa",            abbr: "SIP",   color: "#0369a1", bg: "#e0f2fe", category: "Industri" },
    { title: "PT Multi Jayantara Abadi",           abbr: "MJA",   color: "#15803d", bg: "#dcfce7", category: "Perkebunan" },
    { title: "PT Cahaya Anugerah Plantation",      abbr: "CAP",   color: "#166534", bg: "#bbf7d0", category: "Perkebunan" },
    { title: "PT. Bando Indonesia",                abbr: "BANDO", color: "#1e40af", bg: "#dbeafe", category: "Manufaktur" },
    { title: "PT. Cikarang Listrindo Tbk",         abbr: "CLBK",  color: "#c2410c", bg: "#ffedd5", category: "Energi" },
    { title: "PT. Garudafood Putra Putri Jaya Tbk",abbr: "GFD",   color: "#ca8a04", bg: "#fef9c3", category: "Makanan & Minuman" },
    { title: "PT. Jayamas Medica Industri Tbk",    abbr: "JMI",   color: "#b91c1c", bg: "#fee2e2", category: "Kesehatan" },
    { title: "PT. Surya Toto Indonesia Tbk",       abbr: "STOI",  color: "#0f766e", bg: "#ccfbf1", category: "Manufaktur" },
    { title: "PT. Surya Intan Tapioka",            abbr: "SIT",   color: "#92400e", bg: "#fef3c7", category: "Manufaktur" },
    { title: "PT. Ecco Tannery Indonesia",         abbr: "ECCO",  color: "#374151", bg: "#f3f4f6", category: "Manufaktur" },
    { title: "PT. Ethica Industri Farmasi",        abbr: "ETH",   color: "#9d174d", bg: "#fce7f3", category: "Farmasi" },
    { title: "PT. Iron Wire Works Indonesia",      abbr: "IWWI",  color: "#1e293b", bg: "#f1f5f9", category: "Manufaktur" },
    { title: "PT. Inno-Wangsa Oils & Fats",        abbr: "IWOF",  color: "#713f12", bg: "#fef9c3", category: "Manufaktur" },
    { title: "PT. LDC Trading Indonesia",          abbr: "LDC",   color: "#0369a1", bg: "#e0f2fe", category: "Perdagangan" },
    { title: "PT. NPR Manufacturing Indonesia",    abbr: "NPR",   color: "#1d4ed8", bg: "#dbeafe", category: "Manufaktur" },
    { title: "PT. Sawit Sukses Sejahtera",         abbr: "SSS",   color: "#15803d", bg: "#dcfce7", category: "Perkebunan" },
    { title: "PT. Sterling Products Indonesia",    abbr: "SPI",   color: "#7c3aed", bg: "#ede9fe", category: "Manufaktur" },
    { title: "PT. Telen Prima Sawit",              abbr: "TPS",   color: "#166534", bg: "#bbf7d0", category: "Perkebunan" },
    { title: "PT. Trigunung Padutama",             abbr: "TGP",   color: "#c2410c", bg: "#ffedd5", category: "Industri" },
    { title: "PT. Lampung Estat Utama",            abbr: "LEU",   color: "#0f766e", bg: "#ccfbf1", category: "Properti" },
    { title: "PT. Mentari Primajayaabadi",         abbr: "MPJ",   color: "#0891b2", bg: "#cffafe", category: "Industri" },
    { title: "PT Multi Utama Consultindo",         abbr: "MUC",   color: "#4338ca", bg: "#e0e7ff", category: "Konsultan" },
    { title: "PT. Ares Kusuma Raya",               abbr: "AKR",   color: "#b45309", bg: "#fef3c7", category: "Perkebunan" },
    { title: "TVS Motor Company Indonesia",        abbr: "TVS",   color: "#374151", bg: "#f3f4f6", category: "Otomotif" },
    { title: "PT. TMNC Manufacturing Intl",        abbr: "TMNC",  color: "#1e293b", bg: "#f1f5f9", category: "Manufaktur" },
    { title: "PT Tirtakreasi Amrita",              abbr: "TKA",   color: "#0369a1", bg: "#e0f2fe", category: "Industri" },
    { title: "PT Cherry Mas Kertas",               abbr: "CMK",   color: "#6d28d9", bg: "#ede9fe", category: "Manufaktur" },
    { title: "RSUD Kota Bandar Lampung",           abbr: "RSUD",  color: "#b91c1c", bg: "#fee2e2", category: "Kesehatan" },
    { title: "Yayasan Bakrie Amanah",              abbr: "YBA",   color: "#ca8a04", bg: "#fef9c3", category: "Sosial" },
  ];

  // Split into two rows for a richer marquee effect
  const mid = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, mid);
  const row2 = partners.slice(mid);
  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];

  const PartnerCard = ({ partner, idx }: { partner: Partner; idx: number }) => (
    <motion.div
      key={idx}
      className="shrink-0 group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-24 w-auto min-w-[160px] max-w-[200px] px-4 py-3 rounded-xl bg-white border-2 border-slate-100 flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-300 transition-all duration-300 group-hover:-translate-y-1">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0"
          style={{ backgroundColor: partner.bg, color: partner.color }}
        >
          {partner.abbr.slice(0, 4)}
        </div>
        <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight line-clamp-2">{partner.title}</span>
        <span className="text-[9px] font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
          {partner.category}
        </span>
      </div>
    </motion.div>
  );

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
            Berkolaborasi dengan perusahaan-perusahaan terkemuka di berbagai sektor industri untuk menghadirkan solusi kelistrikan berkualitas tinggi
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative marquee-wrapper space-y-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-sm border border-slate-200/60 shadow-xl shadow-slate-200/50 py-4">
            <div
              className="marquee-track marquee-track-left items-center gap-4"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {doubled1.map((partner, idx) => (
                <PartnerCard key={idx} partner={partner} idx={idx} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/40 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/40 to-transparent z-10" />
          </div>

          {/* Row 2 — scrolls right */}
          <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-sm border border-slate-200/60 shadow-xl shadow-slate-200/50 py-4">
            <div
              className="marquee-track marquee-track-right items-center gap-4"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {doubled2.map((partner, idx) => (
                <PartnerCard key={idx} partner={partner} idx={idx} />
              ))}
            </div>
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
            { value: "40+", label: "Mitra Aktif" },
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
