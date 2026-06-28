import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfficeAddressPage() {
  return (
    <div>
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Alamat Kantor</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Kunjungi kantor kami atau hubungi untuk informasi lebih lanjut tentang layanan inspeksi teknik ketenagalistrikan.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline">Informasi Kontak</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  Alamat Kantor Pusat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Jl. Kepodang Gang Asri No. 10<br />
                  Kelurahan Gunung Agung, Kecamatan Langkapura<br />
                  Kota Bandar Lampung<br />
                  Provinsi Lampung, Indonesia
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  Telepon & WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nomor Kantor: 08117970227<br />
                  No. HP: 08117970227<br />
                  No. Fax: 08117970227
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  pt.seyiki@gmail.com<br />
                  Email Lainnya
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  Jam Operasional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Senin - Jumat: 08:00 - 17:00 WIB<br />
                  Sabtu: 08:00 - 12:00 WIB<br />
                  Minggu & Hari Libur: Tutup
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-3xl font-bold font-headline mb-6">Lokasi Kami</h2>
            <div className="w-full h-[500px] bg-muted rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.2168!2d105.2644!3d-5.4292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjUnNDUuMSJTIDEwNcKwMTUnNTEuOCJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Jl. Kepodang Gang Asri No. 10, Kelurahan Gunung Agung, Kecamatan Langkapura, Bandar Lampung
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
