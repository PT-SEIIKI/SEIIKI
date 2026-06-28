"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Award, Users, Zap, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: Award, label: "Sertifikasi", value: "ISO 9001" },
    { icon: Users, label: "Klien", value: "500+" },
    { icon: Zap, label: "Proyek", value: "1000+" },
  ];

  const highlights = [
    "Terverifikasi oleh Kementerian ESDM",
    "Direktorat Jenderal Ketenagalistrikan",
    "Berkantor Pusat di Bandar Lampung",
    "Tenaga Ahli Bersertifikat",
    "Layanan Objektif & Terpercaya",
    "Mitra Profesional & Independen"
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
            >
              <Zap className="w-4 h-4" />
              Solusi Energi Kelistrikan Terpercaya
            </motion.div>

            {/* Heading */}
            <div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Tentang SEIIKI
              </h2>
              <div className="mt-3 h-1.5 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-gray-900 dark:text-white">PT. Solusi Energi Kelistrikan Indonesia (SEIIKI)</span> adalah perusahaan jasa inspeksi teknik yang terverifikasi oleh Kementerian ESDM melalui Direktorat Jenderal Ketenagalistrikan. Kami berfokus pada pengujian dan pemeriksaan kelayakan operasi instalasi ketenagalistrikan, meliputi PLTD, PLTS, serta instalasi tegangan menengah.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Berkantor pusat di Bandar Lampung, kami hadir sebagai mitra profesional dan independen dalam proses sertifikasi Sertifikat Laik Operasi (SLO). Dengan tenaga ahli bersertifikat, kami berkomitmen memberikan layanan inspeksi yang objektif, akurat, dan terpercaya untuk menjaga keselamatan serta keberlanjutan infrastruktur ketenagalistrikan Indonesia.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                >
                  <stat.icon className="w-6 h-6 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/profil/tentang-kami">
                  Pelajari Lebih Lanjut
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />
              <img
                src="/Perijinan.png"
                alt="Dokumen Perijinan SEIIKI"
                className="relative w-full h-[450px] md:h-[550px] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                loading="lazy"
              />
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Tersertifikasi</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Lembaga Inspeksi Resmi</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -left-4 w-24 h-24 grid grid-cols-4 gap-2 opacity-50">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}