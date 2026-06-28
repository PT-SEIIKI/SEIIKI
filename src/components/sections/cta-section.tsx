"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-headline font-bold">Siap Memulai?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Verifikasi status SLO Anda atau ajukan permohonan baru dengan mudah melalui platform kami.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="group">
              <Link href="https://siujang.esdm.go.id/Cek-Validalitas-Sertifikat">
                Verifikasi SLO Anda
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="text-muted-foreground">atau</p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/kontak">Hubungi Tim Ahli Kami</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
