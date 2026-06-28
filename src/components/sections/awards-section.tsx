"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle2, Sparkles } from "lucide-react";

export default function AwardsSection() {
  const items = [
    {
      title: "Pembangkit Listrik Tenaga Diesel",
      issuer: "Kementerian ESDM",
      img: "/Pembangkit Listrik Tenaga Diesel.png",
      year: "2024"
    },
    {
      title: "Pembangkit Listrik Tenaga Surya",
      issuer: "Kementerian ESDM",
      img: "/Pembangkit Listrik Tenaga Surya.png",
      year: "2024"
    },
    {
      title: "Instalasi Pemanfaatan Tenaga Listrik Tegangan Menengah",
      issuer: "Kementerian ESDM",
      img: "/Instalasi Pemamfaatan Tenaga Listrik Tegangan Menengah.png",
      year: "2024"
    },
  ];

  return (
    <section id="awards" className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Terpercaya & Tersertifikasi</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-headline font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Sertifikat
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Beberapa bukti pengakuan, izin, dan penghargaan yang mendukung kredibilitas SEIIKI dalam memberikan layanan terbaik.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 bg-card/50 backdrop-blur-sm h-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary/5 to-blue-500/5">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {item.year}
                  </div>

                  {/* Icon overlay */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                  </motion.div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 pb-6">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Penerbit:</span> {item.issuer}
                    </p>
                  </div>
                </CardContent>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
    </section>
  );
}