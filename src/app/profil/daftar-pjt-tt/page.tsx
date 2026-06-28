import Image from "next/image";
import { Users, Award, ShieldCheck, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Personnel {
  no: number;
  name: string;
  idNumber: string;
  certificateNumber: string;
  registrationNumber: string;
  level: string;
  position: string;
}

interface Certificate {
  certificateNumber: string;
  serialNumber: string;
  businessType: string;
  classification: {
    field: string;
    subfield: string;
    specialization: string;
    qualification: string;
  };
  technicalResponsible: Personnel[];
  technicalStaff: Personnel[];
  imagePath: string;
}

export default function InspectorListPage() {
  const certificates: Certificate[] = [
    {
      certificateNumber: "685.1.1.315.M.1B.1871.C25",
      serialNumber: "0685.25032025.1",
      businessType: "Pemeriksaan dan Pengujian Instalasi Tenaga Listrik",
      classification: {
        field: "Instalasi Pemanfaatan Tenaga Listrik",
        subfield: "Instalasi Pemanfaatan Tenaga Listrik Tegangan Menengah",
        specialization: "-",
        qualification: "Menengah"
      },
      technicalResponsible: [
        {
          no: 1,
          name: "ERFIN KOESWARA",
          idNumber: "3175063066910008",
          certificateNumber: "8284.0.47.M025.08.2024",
          registrationNumber: "51601.0.2024",
          level: "Level 5",
          position: "Asisten Manajer Pemeriksaan dan Pengujian Pemanfaatan Tegangan Menengah"
        }
      ],
      technicalStaff: [
        {
          no: 1,
          name: "DEKRIS WILSON PARULIAN",
          idNumber: "3201010712980007",
          certificateNumber: "8285.0.47.M025.08.2024",
          registrationNumber: "51602.0.2024",
          level: "Level 3",
          position: "Ketua Grup Pemeriksaan dan Pengujian Pemanfaatan Tegangan Menengah"
        },
        {
          no: 2,
          name: "RIDWANA IMRON ROSYADI",
          idNumber: "3215260505000002",
          certificateNumber: "2756.0.11.M033.10.2023",
          registrationNumber: "55592.1.2023",
          level: "Level 3",
          position: "Ketua Grup Pemeriksaan dan Pengujian Pemanfaatan Tegangan Menengah"
        }
      ],
      imagePath: "/Instalasi Pemamfaatan Tenaga Listrik Tegangan Menengah.png"
    },
    {
      certificateNumber: "687.1.1.301.M.1B.1871.C25",
      serialNumber: "0687.25032025.1",
      businessType: "Pemeriksaan dan Pengujian Instalasi Tenaga Listrik",
      classification: {
        field: "Pembangkitan Tenaga Listrik",
        subfield: "Pembangkit Listrik Tenaga Diesel",
        specialization: "-",
        qualification: "Menengah"
      },
      technicalResponsible: [
        {
          no: 1,
          name: "EZRA PRASETIA DEKA",
          idNumber: "3275022407910040",
          certificateNumber: "2612.0.11.P035.09.2023",
          registrationNumber: "52869.1.2023",
          level: "Level 5",
          position: "Asisten manager Komisioning PLTD"
        }
      ],
      technicalStaff: [
        {
          no: 1,
          name: "RIDWANA IMRON ROSYADI",
          idNumber: "3215260505000002",
          certificateNumber: "2610.0.11.P033.09.2023",
          registrationNumber: "52870.1.2023",
          level: "Level 3",
          position: "Komisioning Electrical Engineer Senior"
        },
        {
          no: 2,
          name: "IYAN BASTIAN",
          idNumber: "1801051411880004",
          certificateNumber: "3190.0.11.P033.09.2022",
          registrationNumber: "53039.1.2022",
          level: "Level 3",
          position: "Komisioning Electrical Engineer Senior"
        }
      ],
      imagePath: "/Sertifikat No. 687.1.1.307.M.1B.1871.C25.png"
    },
    {
      certificateNumber: "686.1.1.318.M.1B.1871.C25",
      serialNumber: "0686.25032025.1",
      businessType: "Pemeriksaan dan Pengujian Instalasi Tenaga Listrik",
      classification: {
        field: "Pembangkitan Tenaga Listrik",
        subfield: "Pembangkit Listrik Tenaga Surya",
        specialization: "-",
        qualification: "Menengah"
      },
      technicalResponsible: [
        {
          no: 1,
          name: "EZRA PRASETIA DEKA",
          idNumber: "3275022407910040",
          certificateNumber: "2557.0.11.P035.09.2023",
          registrationNumber: "50630.1.2023",
          level: "Level 5",
          position: "Asisten Manager Komisioning PLTS"
        }
      ],
      technicalStaff: [
        {
          no: 1,
          name: "IYAN BASTIAN",
          idNumber: "1801051411880004",
          certificateNumber: "2933.0.11.P033.08.2022",
          registrationNumber: "48491.1.2022",
          level: "Level 3",
          position: "Komisioning Electrical Engineer Senior"
        },
        {
          no: 2,
          name: "RIDWANA IMRON ROSYADI",
          idNumber: "3215260505000002",
          certificateNumber: "2555.0.11.P033.09.2023",
          registrationNumber: "50632.1.2023",
          level: "Level 3",
          position: "Komisioning Electrical Engineer Senior"
        }
      ],
      imagePath: "/Sertifikat No. 686.1.1.318.M.1B.1871.C25.png"
    }
  ];

  return (
    <div>
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Daftar PJT-TT</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Penanggung Jawab Teknik Tenaga Listrik (PJT-TT) yang kompeten dan bersertifikat di PT. Solusi Energi Kelistrikan Indonesia.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Tentang PJT-TT</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Penanggung Jawab Teknik Tenaga Listrik (PJT-TT) adalah tenaga teknik ketenagalistrikan yang memiliki 
                kompetensi dan kewenangan untuk melakukan inspeksi, pengujian, dan penilaian kelayakan instalasi 
                tenaga listrik sesuai dengan standar dan regulasi yang berlaku.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Berikut adalah daftar resmi Penanggung Jawab Teknik (PJT) dan Tenaga Teknik (TT) yang terdaftar di 
                PT. Solusi Energi Kelistrikan Indonesia berdasarkan Sertifikat Badan Usaha Jasa Penunjang Tenaga Listrik.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        <div className="space-y-12">
          {certificates.map((cert, certIndex) => (
            <div key={certIndex} className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader className="bg-secondary">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        Sertifikat No. {cert.certificateNumber}
                      </CardTitle>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-semibold">No. Seri:</span> {cert.serialNumber}
                        </div>
                        <div>
                          <span className="font-semibold">Jenis Usaha:</span> {cert.businessType}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Classification Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg mb-3">Klasifikasi</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex gap-2">
                            <span className="font-semibold min-w-[100px]">Bidang:</span>
                            <span className="text-muted-foreground">{cert.classification.field}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-semibold min-w-[100px]">Subbidang:</span>
                            <span className="text-muted-foreground">{cert.classification.subfield}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-semibold min-w-[100px]">Kualifikasi:</span>
                            <Badge variant="default">{cert.classification.qualification}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Technical Responsible */}
                      <div>
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          Penanggung Jawab Teknik
                        </h3>
                        {cert.technicalResponsible.map((person) => (
                          <Card key={person.no} className="mb-3">
                            <CardContent className="p-4">
                              <p className="font-semibold text-base mb-2">{person.name}</p>
                              <div className="space-y-1 text-xs text-muted-foreground">
                                <p>No. Identitas: {person.idNumber}</p>
                                <p>No. Sertifikat: {person.certificateNumber}</p>
                                <p>No. Registrasi: {person.registrationNumber}</p>
                                <p>Level: <Badge variant="secondary" className="text-xs">{person.level}</Badge></p>
                                <p className="font-medium text-foreground mt-2">{person.position}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Technical Staff */}
                      <div>
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Tenaga Teknik
                        </h3>
                        <div className="space-y-3">
                          {cert.technicalStaff.map((person) => (
                            <Card key={person.no}>
                              <CardContent className="p-4">
                                <p className="font-semibold text-base mb-2">{person.name}</p>
                                <div className="space-y-1 text-xs text-muted-foreground">
                                  <p>No. Identitas: {person.idNumber}</p>
                                  <p>No. Sertifikat: {person.certificateNumber}</p>
                                  <p>No. Registrasi: {person.registrationNumber}</p>
                                  <p>Level: <Badge variant="secondary" className="text-xs">{person.level}</Badge></p>
                                  <p className="font-medium text-foreground mt-2">{person.position}</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Certificate Image */}
                    <div className="lg:sticky lg:top-4 h-fit">
                      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md border">
                        <Image
                          src={cert.imagePath}
                          alt={`Sertifikat ${cert.certificateNumber}`}
                          fill
                          className="object-contain"
                          priority={certIndex === 0}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Catatan:</strong> Data di atas merupakan informasi resmi berdasarkan Sertifikat Badan Usaha Jasa Penunjang Tenaga Listrik 
            yang dikeluarkan oleh Kementerian ESDM. Untuk verifikasi atau informasi lebih lanjut, silakan hubungi kantor kami.
          </p>
        </div>
      </section>
    </div>
  );
}
