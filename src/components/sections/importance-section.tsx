"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, FileCheck, Zap } from "lucide-react";

export default function ImportanceSection() {
  const features = [
    {
      icon: Shield,
      title: "Keselamatan Terjamin",
      desc: "Memastikan instalasi memenuhi standar keamanan"
    },
    {
      icon: CheckCircle,
      title: "Sertifikasi Resmi",
      desc: "SLO dari Lembaga Inspeksi Teknik terakreditasi"
    },
    {
      icon: FileCheck,
      title: "Kepatuhan Standar",
      desc: "Sesuai regulasi dan standar nasional"
    }
  ];

  return (
    <section id="importance" className="relative py-16 md:py-24 bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div
            className="order-2 lg:order-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Standar Keselamatan Kelistrikan</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Pentingnya Pemeriksaan & Pengujian Instalasi Tenaga Listrik
            </h2>

            {/* Description */}
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Pemeriksaan dan pengujian instalasi tenaga listrik baik itu instalasi pembangkit, instalasi transmisi, instalasi distribusi dan instalasi bangunan harus dilakukan untuk mengetahui apakah instalasi tersebut sudah memenuhi standar yang dipersyaratkan.
              </p>
              <p>
                <span className="font-semibold text-foreground">PT. Solusi Energi Kelistrikan Indonesia (SEIIKI)</span> adalah perusahaan jasa inspeksi teknik yang terverifikasi oleh Kementerian ESDM melalui Direktorat Jenderal Ketenagalistrikan. Kami berfokus pada pengujian dan pemeriksaan kelayakan operasi instalasi ketenagalistrikan, meliputi PLTD, PLTS, serta instalasi tegangan menengah.
              </p>
              <p>
                Berkantor pusat di Bandar Lampung, kami hadir sebagai mitra profesional dan independen dalam proses sertifikasi Sertifikat Laik Operasi (SLO). Dengan tenaga ahli bersertifikat, kami berkomitmen memberikan layanan inspeksi yang objektif, akurat, dan terpercaya untuk menjaga keselamatan serta keberlanjutan infrastruktur ketenagalistrikan Indonesia.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-4 bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Button asChild size="lg" className="group">
                <Link href="/slo/informasi" className="flex items-center gap-2">
                  Pelajari Proses SLO
                  <FileCheck className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group border-2">
                <Link href="https://siujang.esdm.go.id/" className="flex items-center gap-2">
                  Ajukan SLO Sekarang
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
            
            {/* Main Image Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-500 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border-4 border-background shadow-2xl">
                <img
                  src="/Perijinan.png"
                  alt="Pemeriksaan dan pengujian instalasi listrik"
                  className="w-full h-72 md:h-[32rem] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg font-semibold flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                <span>Terakreditasi</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}