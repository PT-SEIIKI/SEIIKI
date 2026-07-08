"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, PhoneCall } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4]" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#facb01]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#facb01] animate-pulse" />
            Siap Membantu Anda
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-headline font-bold text-white leading-tight mb-6">
            Mulai Proses Sertifikasi{" "}
            <span className="text-[#facb01]">SLO Anda</span> Hari Ini
          </h2>

          <p className="text-blue-100/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Verifikasi status SLO Anda atau ajukan permohonan baru dengan mudah.
            Tim inspektur bersertifikat kami siap mendampingi setiap langkah.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="https://siujang.esdm.go.id/Cek-Validalitas-Sertifikat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#facb01] hover:bg-[#facb01]/90 text-[#0a2a4a] font-bold rounded-full shadow-lg hover:shadow-[#facb01]/30 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Verifikasi SLO Anda
              <ExternalLink className="h-4 w-4" />
            </Link>

            <span className="text-white/40 hidden sm:block">atau</span>

            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <PhoneCall className="h-4 w-4" />
              Hubungi Tim Ahli
            </Link>

            <Link
              href="/layanan"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 sm:hidden"
            >
              Konsultasi Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              "✓ Terakreditasi Kementerian ESDM",
              "✓ Proses Cepat & Transparan",
              "✓ Tenaga Ahli Bersertifikat",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
