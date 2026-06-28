import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Tentang Kami',
  description: 'PT. Solusi Energi Kelistrikan Indonesia (SEIIKI) adalah perusahaan jasa inspeksi teknik yang terverifikasi oleh Kementerian ESDM untuk sertifikasi Sertifikat Laik Operasi (SLO). Berpengalaman lebih dari 10 tahun melayani seluruh Indonesia.',
  keywords: ['Tentang SEIIKI', 'PT Solusi Energi Kelistrikan Indonesia', 'Lembaga Inspeksi Teknik', 'Sejarah SEIIKI', 'Direksi SEIIKI', 'Profil Perusahaan SLO'],
  canonical: '/profil/tentang-kami',
});

export default function AboutUsPage() {
    const aboutImage = placeholderImages.find(p => p.id === 'about-us');

    const values = [
        { name: "Integritas", description: "Menjunjung tinggi kejujuran dan etika profesional dalam setiap layanan." },
        { name: "Keamanan", description: "Memprioritaskan keselamatan dan kelaikan instalasi listrik." },
        { name: "Profesionalisme", description: "Didukung oleh tim ahli yang kompeten dan bersertifikat." },
        { name: "Pelayanan", description: "Berkomitmen memberikan pelayanan yang cepat, transparan, dan memuaskan." },
    ];

    return (
        <div>
            <section className="bg-secondary">
                <div className="container mx-auto px-4 py-12 md:py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Tentang SEIIKI (PT. SOLUSI ENERGI KELISTRIKAN INDONESIA)</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Perusahaan jasa inspeksi teknik yang terverifikasi oleh Kementerian ESDM melalui Direktorat Jenderal Ketenagalistrikan. Berkantor pusat di Bandar Lampung, kami hadir sebagai mitra profesional dan independen dalam proses sertifikasi Sertifikat Laik Operasi (SLO).
                    </p>
                </div>
            </section>


            {/* Sejarah Singkat */}
            <section className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold font-headline">Sejarah Singkat</h2>
                        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                <span className="font-semibold text-foreground">PT. Solusi Energi Kelistrikan Indonesia (SEIIKI)</span> adalah perusahaan jasa inspeksi teknik yang terverifikasi oleh Kementerian ESDM melalui Direktorat Jenderal Ketenagalistrikan. Kami berfokus pada pengujian dan pemeriksaan kelayakan operasi instalasi ketenagalistrikan, meliputi PLTD, PLTS, serta instalasi tegangan menengah.
                            </p>
                            <p>
                                Berkantor pusat di Bandar Lampung, kami hadir sebagai mitra profesional dan independen dalam proses sertifikasi Sertifikat Laik Operasi (SLO). Dengan tenaga ahli bersertifikat, kami berkomitmen memberikan layanan inspeksi yang objektif, akurat, dan terpercaya untuk menjaga keselamatan serta keberlanjutan infrastruktur ketenagalistrikan Indonesia.
                            </p>
                            <p>
                                <span className="font-semibold text-foreground">PT. Solusi Energi Kelistrikan Indonesia (SEKI)</span> berdiri secara resmi pada tanggal <span className="font-semibold text-foreground">30 Desember 2024</span> berdasarkan Akta Pendirian Perseroan Terbatas Nomor 06, yang dibuat di hadapan Notaris Gusti Komang Oka Trio Putra, S.H., M.Kn. di Kota Bandar Lampung. Pendirian ini disahkan oleh Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia dengan nomor <span className="font-semibold text-foreground">AHU-00467.AH.02.01.Tahun 2020</span>.
                            </p>
                            <p>
                                Perusahaan ini didirikan oleh empat orang pendiri utama:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><span className="font-semibold text-foreground">Amir Hamzah, S.T.</span></li>
                                <li><span className="font-semibold text-foreground">Rio Firdaus</span></li>
                                <li><span className="font-semibold text-foreground">Dr. Effriliya</span></li>
                                <li><span className="font-semibold text-foreground">Achmad Firdaus</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <Image
                            src="/Perijinan.png"
                            alt="Dokumen Perijinan SEIIKI"
                            width={600}
                            height={800}
                            className="w-full h-64 md:h-full object-cover rounded-xl shadow-md"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Dasar Hukum */}
            <section className="bg-secondary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold font-headline text-center">Dasar Hukum</h2>
                    <p className="mt-3 text-muted-foreground text-center max-w-3xl mx-auto">
                        Landasan regulasi yang menjadi acuan operasional sebagai Lembaga Inspeksi Teknik.
                    </p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>UURI No. 30 Tahun 2009</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Tentang Ketenagalistrikan.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>PP No. 14 Tahun 2012</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Tentang Kegiatan Usaha Penyediaan Tenaga Listrik.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Permen ESDM No. 05 Tahun 2014 & No. 38 Tahun 2018</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Tentang Tata Cara Akreditasi dan Sertifikasi Ketenagalistrikan.</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>KEPMEN ESDM No. 49 Tahun 2017</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Penetapan PT. Solusi Energi Kelistrikan Indonesia (SEIIKI) sebagai LIT-TR.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Direksi */}
            <section className="container mx-auto px-4 py-12 md:py-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold font-headline">Direksi</h2>
                    <p className="mt-2 text-muted-foreground">Struktur pimpinan perusahaan.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {[
                        { name: 'Amir Hamzah, S.T.', title: 'Direktur Utama', img: 'https://ui-avatars.com/api/?name=Amir+Hamzah&size=400&background=1976D2&color=fff&bold=true' },
                        { name: 'Dr. Effriliya', title: 'Direktur', img: 'https://ui-avatars.com/api/?name=Dr+Effriliya&size=400&background=0D47A1&color=fff&bold=true' },
                    ].map((p) => (
                        <Card key={p.name} className="overflow-hidden shadow-md">
                            <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50">
                                <Image src={p.img} alt={p.name} width={400} height={300} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">{p.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-muted-foreground">{p.title}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Dokumen Terkait */}
            <section className="bg-secondary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold font-headline">Dasar Hukum & Regulasi</h2>
                        <p className="mt-2 text-muted-foreground">Landasan regulasi yang menjadi acuan operasional.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: 'UU RI No. 30 Tahun 2009', subtitle: 'Tentang Ketenagalistrikan' },
                            { title: 'PP No. 14 Tahun 2012', subtitle: 'Tentang Kegiatan Usaha Penyediaan Tenaga Listrik' },
                            { title: 'Permen ESDM No. 05 Tahun 2014', subtitle: 'Tentang Tata Cara Akreditasi dan Sertifikasi Ketenagalistrikan' },
                            { title: 'Permen ESDM No. 38 Tahun 2018', subtitle: 'Tentang Tata Cara Akreditasi dan Sertifikasi Ketenagalistrikan' },
                        ].map((d) => (
                            <Card key={d.title} className="shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg">{d.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-muted-foreground">{d.subtitle}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-secondary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold font-headline">Nilai-Nilai Kami</h2>
                         <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Fondasi yang memandu setiap langkah dan keputusan kami.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map(value => (
                            <div key={value.name} className="text-center">
                                <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-semibold font-headline">{value.name}</h3>
                                <p className="mt-2 text-muted-foreground">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
