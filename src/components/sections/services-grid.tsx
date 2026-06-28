"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Zap, FileText, Award, Users, TrendingUp, Star, ArrowRight, Sparkles } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

function getIconComponent(iconName?: string) {
  const iconProps = { className: "h-10 w-10" };
  switch (iconName) {
    case "Zap":
      return <Zap {...iconProps} />;
    case "ShieldCheck":
      return <ShieldCheck {...iconProps} />;
    case "FileText":
      return <FileText {...iconProps} />;
    case "Award":
      return <Award {...iconProps} />;
    case "Users":
      return <Users {...iconProps} />;
    case "TrendingUp":
      return <TrendingUp {...iconProps} />;
    default:
      return <ShieldCheck {...iconProps} />;
  }
}

export default function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Layanan Profesional</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-headline font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
            Solusi Terpercaya untuk Kebutuhan SLO Anda
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Memberikan pelayanan terbaik dalam penerbitan SLO dengan proses yang cepat, akurat, dan sesuai standar nasional (SNI).
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services
            .sort((a, b) => a.order - b.order)
            .map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredId(service.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Card className="relative h-full flex flex-col overflow-hidden border-0 bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Featured Badge */}
                  {service.featured && (
                    <motion.div
                      className="absolute top-4 right-4 z-10"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    >
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-lg">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Unggulan
                      </Badge>
                    </motion.div>
                  )}

                  {/* Image Header */}
                  {service.imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <motion.img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>
                  )}

                  <CardHeader className="relative items-center text-center pt-6 pb-4">
                    {/* Title */}
                    <CardTitle className="relative text-xl font-headline font-bold group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative flex-grow px-6 pb-8">
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover Arrow Indicator */}
                    <AnimatePresence>
                      {hoveredId === service.id && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex items-center gap-2 mt-4 text-sm font-semibold text-primary"
                        >
                          <span>Pelajari lebih lanjut</span>
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>

                  {/* Bottom Accent Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: hoveredId === service.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Butuh konsultasi lebih lanjut?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            Hubungi Kami
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}