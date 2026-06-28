"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const items = [
    "/kegiatan-2.png",
    "/kegiatan-3.png",
    "/kegiatan-4.png",
    "/kegiatan-5.png",
    "/kegiatan-6.png",
    "/kegiatan-7.png",
    "/kegiatan-8.png",
    "/kegiatan-9.png",
    "/kegiatan-10.png",
    "/kegiatan-11.png",
  ];

  // Triple the array for smooth infinite scroll
  const tripled = [...items, ...items, ...items];

  return (
    <section id="gallery" className="py-16 w-full md:py-24 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-0 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Portfolio Kegiatan
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Galeri Kegiatan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dokumentasi kegiatan inspeksi, pengujian, dan operasional SEIIKI dengan standar profesional tertinggi.
          </p>
        </motion.div>

        <div className="mt-12 relative">
          {/* Top row - scroll right */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden group mb-6"
          >
            <div
              className="gallery-track flex items-center gap-6 will-change-transform"
              style={{ animation: "scroll-right 40s linear infinite" }}
            >
              {tripled.map((item, i) => (
                <motion.div
                  key={`top-${i}`}
                  className="shrink-0 w-[280px] sm:w-[320px] md:w-[380px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    onClick={() => setSelectedImage(item)}
                    className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden rounded-2xl shadow-lg cursor-pointer group/card"
                  >
                    <img
                      src={item}
                      alt="Kegiatan SEIIKI"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/20">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom row - scroll left */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden group"
          >
            <div
              className="gallery-track flex items-center gap-6 will-change-transform"
              style={{ animation: "scroll-left 40s linear infinite" }}
            >
              {tripled.map((item, i) => (
                <motion.div
                  key={`bottom-${i}`}
                  className="shrink-0 w-[280px] sm:w-[320px] md:w-[380px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    onClick={() => setSelectedImage(item)}
                    className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden rounded-2xl shadow-lg cursor-pointer group/card"
                  >
                    <img
                      src={item}
                      alt="Kegiatan SEIIKI"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/20">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced gradient edges */}
          </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full cursor-default"
            >
              <img
                src={selectedImage}
                alt="Kegiatan SEIIKI"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .gallery-track {
          width: 300%;
        }
        .group:hover .gallery-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}