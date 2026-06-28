import Image from "next/image";
import { FileText, Download, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LicenseDocumentsPage() {
  const documents = [
    {
      title: "Dokumen Perijinan",
      issuer: "Kementerian ESDM",
      description: "Dokumen perijinan resmi perusahaan sebagai Lembaga Inspeksi Teknik.",
      image: "/Perijinan.png"
    },
    {
      title: "Sertifikat Instalasi Pemanfaatan Tenaga Listrik Tegangan Menengah",
      number: "685.1.1.315.M.1B.1871.C25",
      issuer: "Dirjen Ketenagalistrikan",
      description: "Sertifikat Badan Usaha untuk Pemeriksaan dan Pengujian Instalasi Pemanfaatan Tenaga Listrik Tegangan Menengah.",
      image: "/Instalasi Pemamfaatan Tenaga Listrik Tegangan Menengah.png"
    },
    {
      title: "Sertifikat Pembangkit Listrik Tenaga Diesel",
      number: "687.1.1.301.M.1B.1871.C25",
      issuer: "Dirjen Ketenagalistrikan",
      description: "Sertifikat Badan Usaha untuk Pemeriksaan dan Pengujian Pembangkit Listrik Tenaga Diesel (PLTD).",
      image: "/Sertifikat No. 687.1.1.307.M.1B.1871.C25.png"
    },
    {
      title: "Sertifikat Pembangkit Listrik Tenaga Surya",
      number: "686.1.1.318.M.1B.1871.C25",
      issuer: "Dirjen Ketenagalistrikan",
      description: "Sertifikat Badan Usaha untuk Pemeriksaan dan Pengujian Pembangkit Listrik Tenaga Surya (PLTS).",
      image: "/Sertifikat No. 686.1.1.318.M.1B.1871.C25.png"
    }
  ];

  const legalBasis = [
    "UU RI No. 30 Tahun 2009 tentang Ketenagalistrikan",
    "PP No. 14 Tahun 2012 tentang Kegiatan Usaha Penyediaan Tenaga Listrik",
    "Permen ESDM No. 05 Tahun 2014 tentang Tata Cara Akreditasi dan Sertifikasi Ketenagalistrikan",
    "Permen ESDM No. 38 Tahun 2018 tentang Tata Cara Akreditasi dan Sertifikasi Ketenagalistrikan",
    "Permen ESDM No. 39 Tahun 2018 tentang Pelayanan Perizinan Berusaha Terintegrasi Secara Elektronik Bidang Ketenagalistrikan"
  ];

  return (
    <div>
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Dokumen Perijinan</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Dokumen resmi dan legalitas PT. Solusi Energi Kelistrikan Indonesia sebagai Lembaga Inspeksi Teknik Tenaga Listrik.
          </p>
        </div>
      </section>

      {/* Main Documents */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold font-headline mb-8">Dokumen Perijinan & Sertifikat</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {documents.map((doc, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardHeader className="bg-secondary">
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    {doc.number && (
                      <p className="text-sm text-muted-foreground mt-1">No: {doc.number}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Document Image */}
                <div className="relative w-full aspect-[3/4] bg-muted">
                  <Image
                    src={doc.image}
                    alt={doc.title}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
                {/* Document Info */}
                <div className="p-6 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">Penerbit:</span> {doc.issuer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Legal Basis */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline mb-8 text-center">Dasar Hukum</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {legalBasis.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Catatan:</strong> Semua dokumen perijinan dan akreditasi kami dapat diverifikasi melalui website resmi 
            Direktorat Jenderal Ketenagalistrikan Kementerian ESDM Republik Indonesia.
          </p>
        </div>
      </section>
    </div>
  );
}
