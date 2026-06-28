"use client";

import { Users, Award, Briefcase } from "lucide-react";
import PageHeader from "@/components/sections/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";

interface Founder {
  no: number;
  name: string;
  status: string;
}

interface Director {
  position: string;
  name: string;
}

interface TechnicalPersonnel {
  no: number;
  name: string;
  level: string;
  competency: string;
}

export default function OrganizationalStructurePage() {
  const founders: Founder[] = [
    { no: 1, name: "Dr. Effriliya", status: "Pemegang Saham Utama" },
    { no: 2, name: "Amir Hamzah, S.T.", status: "Pendiri & Pemegang Saham" },
    { no: 3, name: "Achmad Firdaus", status: "Pendiri & Pemegang Saham" },
    { no: 4, name: "Rio Firdaus", status: "Pendiri & Pemegang Saham" }
  ];

  const directors: Director[] = [
    { position: "Direktur Utama", name: "Amir Hamzah, S.T." },
    { position: "Direktur", name: "Dr. Effriliya" }
  ];

  const technicalResponsible: TechnicalPersonnel[] = [
    { no: 1, name: "Ezra Prasetia Deka", level: "Level 5", competency: "Asisten Manajer Komisioning PLTS & PLTD" },
    { no: 2, name: "Erfin Koeswara", level: "Level 5", competency: "Asisten Manajer Pemeriksaan & Pengujian Pemanfaatan Tegangan Menengah" }
  ];

  const technicalStaff: TechnicalPersonnel[] = [
    { no: 1, name: "Iyan Bastian", level: "Level 3", competency: "Komisioning Electrical Engineer Senior" },
    { no: 2, name: "Ridwana Imron Rosyadi", level: "Level 3", competency: "Komisioning Electrical Engineer Senior" },
    { no: 3, name: "Dekris Wilson Parulian", level: "Level 3", competency: "Ketua Grup Pemeriksaan & Pengujian Pemanfaatan Tegangan Menengah" }
  ];

  return (
    <div>
      <PageHeader
        title="Struktur Organisasi"
        subtitle="Kenali tim dan struktur yang mendukung operasi kami."
      />
      <div className="container mx-auto p-4 md:p-8">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-md">
            <div className="flex items-start gap-4">
              <Users className="h-12 w-12 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-gray-900 dark:text-white mb-4">
                  Struktur Organisasi & Tim Profesional
                </h2>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  PT. Solusi Energi Kelistrikan Indonesia (SEIIKI) memiliki struktur organisasi yang dirancang untuk menjamin efektivitas, profesionalitas, dan akuntabilitas dalam setiap kegiatan operasional.
                </p>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Struktur ini memastikan bahwa seluruh proses inspeksi, pengujian, dan sertifikasi kelayakan operasi (SLO) dilaksanakan sesuai dengan standar teknis dan regulasi dari Direktorat Jenderal Ketenagalistrikan Republik Indonesia.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Organizational Structure Sections */}
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* 1. Founders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-secondary">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Briefcase className="h-6 w-6 text-primary" />
                  1. Pendiri
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">No</th>
                        <th className="text-left py-3 px-4 font-semibold">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {founders.map((founder) => (
                        <tr key={founder.no} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{founder.no}</td>
                          <td className="py-3 px-4 font-medium">{founder.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{founder.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Directors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-secondary">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Users className="h-6 w-6 text-primary" />
                  2. Direksi
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Jabatan</th>
                        <th className="text-left py-3 px-4 font-semibold">Nama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {directors.map((dir, idx) => (
                        <tr key={idx} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{dir.position}</td>
                          <td className="py-3 px-4">{dir.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  * Direksi berwenang mengurus dan mewakili perusahaan sesuai Anggaran Dasar
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3. Technical Responsible (PJT) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-secondary">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Award className="h-6 w-6 text-primary" />
                  3. Penanggung Jawab Teknik (PJT)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">No</th>
                        <th className="text-left py-3 px-4 font-semibold">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold">Level</th>
                        <th className="text-left py-3 px-4 font-semibold">Unit Kompetensi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technicalResponsible.map((tr) => (
                        <tr key={tr.no} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{tr.no}</td>
                          <td className="py-3 px-4 font-medium">{tr.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="default">{tr.level}</Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{tr.competency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4. Technical Staff (TT) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-secondary">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Users className="h-6 w-6 text-primary" />
                  4. Tenaga Teknik (TT)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">No</th>
                        <th className="text-left py-3 px-4 font-semibold">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold">Level</th>
                        <th className="text-left py-3 px-4 font-semibold">Unit Kompetensi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technicalStaff.map((ts) => (
                        <tr key={ts.no} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{ts.no}</td>
                          <td className="py-3 px-4 font-medium">{ts.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">{ts.level}</Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{ts.competency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
