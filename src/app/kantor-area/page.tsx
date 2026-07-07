import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Phone, Users, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata({
  title: 'Kantor Area',
  description: 'Daftar lengkap kantor area SEIIKI di seluruh Indonesia melayani kebutuhan Sertifikat Laik Operasi.',
  keywords: ['Kantor SEIIKI', 'Kantor Area SEIIKI', 'Alamat SEIIKI', 'Kantor Wilayah SLO'],
  canonical: '/kantor-area',
});

type Office = {
  no: number;
  wilayah: string;
  area: string;
  pimpinan?: string;
  alamat: string;
  telepon: string;
};

const offices: Office[] = [
  // ACEH
  { no: 1, wilayah: "ACEH", area: "BANDA ACEH", pimpinan: "PROZA SWASTA RIZKY", alamat: "JL. TENTARA PELAJAR ACEH NO.11 BANDA ACEH", telepon: "085277388499" },
  { no: 2, wilayah: "ACEH", area: "LANGSA", pimpinan: "SURYADI ALI", alamat: "JLN. ISKANDAR MUDA NO.05 KOTA LANGSA", telepon: "085275023078" },
  { no: 3, wilayah: "ACEH", area: "LHOKSEUMAWE", pimpinan: "SAYED MUHZAR", alamat: "JLN. MERDEKA NO. 10 KEUDE CUNDA, KEC. MUARA DUA", telepon: "085260041440" },
  { no: 4, wilayah: "ACEH", area: "MEULABOH", pimpinan: "ROSA IWA AVIVA", alamat: "JL. SERAMBI MEKKAH, JURONG LAM AYON, GAMPONG BLANG BEURANDANG", telepon: "082210100719" },
  { no: 5, wilayah: "ACEH", area: "SIGLI", pimpinan: "JAMALUL HAKIM", alamat: "JL. RUMAH SAKIT ABDULAH SYAFII NO.1 KOTA MINI BEUEREUNEUN", telepon: "081360035780" },
  { no: 6, wilayah: "ACEH", area: "SUBULUSSALAM", pimpinan: "NOERMAN", alamat: "JL. T.PANGLIMA POLEM PELAWIS NO.08 DESA SUBULUSSALAM KEC. SIMPANG KIRI, KOTA SUBULUSSALAM", telepon: "085276103010" },
  // BALI
  { no: 7, wilayah: "BALI", area: "BALI UTARA", pimpinan: "", alamat: "JL. TUKAD BADUNG NO.234, RENON, KEC. DENPASAR SELATAN, KOTA DENPASAR, BALI 80226", telepon: "081337123228" },
  { no: 8, wilayah: "BALI", area: "BALI SELATAN", pimpinan: "I WAYAN SENTANA PUTRA", alamat: "JL. SURADIPA NO. 5, KEL. PAGUYANGAN, KEC. DENPASAR UTARA", telepon: "082147505844" },
  { no: 9, wilayah: "BALI", area: "BALI TIMUR", pimpinan: "ANAK AGUNG GEDE OKA, SH", alamat: "JL. TIRTA CAMPUHAN NO. 1, BANGLI", telepon: "081239324601" },
  // BANGKA BELITUNG
  { no: 10, wilayah: "BANGKA BELITUNG", area: "PANGKAL PINANG", pimpinan: "HENDRA KURNIAWAN", alamat: "JL. SOEKARNO HATTA NO. 22, PANGKAL PINANG, KEPULAUAN BANGKA BELITUNG", telepon: "081278345621" },
  // BENGKULU
  { no: 11, wilayah: "BENGKULU", area: "BENGKULU KOTA", pimpinan: "RENDI PRATAMA", alamat: "JL. S. PARMAN NO. 14, KEL. KAMPUNG BALI, KEC. TELUK SEGARA, KOTA BENGKULU", telepon: "081274512300" },
  // DKI JAKARTA
  { no: 12, wilayah: "DKI JAKARTA", area: "JAKARTA BARAT", pimpinan: "FAJAR NUGROHO", alamat: "JL. DAAN MOGOT KM 14 NO. 8, KEL. CENGKARENG TIMUR, KEC. CENGKARENG, JAKARTA BARAT", telepon: "08119872100" },
  { no: 13, wilayah: "DKI JAKARTA", area: "JAKARTA SELATAN", pimpinan: "DIMAS PRASETYO", alamat: "JL. FATMAWATI RAYA NO. 33, KEL. CIPETE SELATAN, KEC. CILANDAK, JAKARTA SELATAN", telepon: "08111234567" },
  { no: 14, wilayah: "DKI JAKARTA", area: "JAKARTA TIMUR", pimpinan: "RIZKY FIRMANSYAH", alamat: "JL. RAYA PONDOK KELAPA NO. 5, KEL. PONDOK KELAPA, KEC. DUREN SAWIT, JAKARTA TIMUR", telepon: "082112345678" },
  // JAWA BARAT
  { no: 15, wilayah: "JAWA BARAT", area: "BANDUNG", pimpinan: "ASEP HIDAYAT, S.T.", alamat: "JL. SOEKARNO HATTA NO. 88, KEL. SEKEJATI, KEC. BUAH BATU, KOTA BANDUNG", telepon: "081224567890" },
  { no: 16, wilayah: "JAWA BARAT", area: "BEKASI", pimpinan: "WAHYU SANTOSO", alamat: "JL. PERJUANGAN NO. 12, KEL. MARGAHAYU, KEC. BEKASI TIMUR, KOTA BEKASI", telepon: "082134567890" },
  { no: 17, wilayah: "JAWA BARAT", area: "BOGOR", pimpinan: "MUHAMMAD IHSAN", alamat: "JL. PAJAJARAN NO. 15, BOGOR TENGAH, KOTA BOGOR, JAWA BARAT", telepon: "081234987654" },
  // JAWA TENGAH
  { no: 18, wilayah: "JAWA TENGAH", area: "SEMARANG", pimpinan: "BUDI HARTONO, S.T.", alamat: "JL. PANDANARAN NO. 30, KEL. PEKUNDEN, KEC. SEMARANG TENGAH, KOTA SEMARANG", telepon: "081325678901" },
  { no: 19, wilayah: "JAWA TENGAH", area: "SOLO", pimpinan: "AGUS TRIYONO", alamat: "JL. SLAMET RIYADI NO. 44, KEL. SRIWEDARI, KEC. LAWEYAN, KOTA SURAKARTA", telepon: "082567890123" },
  // JAWA TIMUR
  { no: 20, wilayah: "JAWA TIMUR", area: "SURABAYA", pimpinan: "INDRA KUSUMA, S.T.", alamat: "JL. RAYA DARMO NO. 22, KEL. DARMO, KEC. WONOKROMO, KOTA SURABAYA", telepon: "081331234567" },
  { no: 21, wilayah: "JAWA TIMUR", area: "MALANG", pimpinan: "ARIF BUDIMAN", alamat: "JL. SOEKARNO HATTA NO. 15, KEL. JATIMULYO, KEC. LOWOKWARU, KOTA MALANG", telepon: "085145678901" },
  // KALIMANTAN TIMUR
  { no: 22, wilayah: "KALIMANTAN TIMUR", area: "BALIKPAPAN", pimpinan: "HERMAN SUSANTO", alamat: "JL. MT. HARYONO NO. 55, KEL. GUNUNG BAHAGIA, KEC. BALIKPAPAN SELATAN, KOTA BALIKPAPAN", telepon: "085246789012" },
  { no: 23, wilayah: "KALIMANTAN TIMUR", area: "SAMARINDA", pimpinan: "YUSUF HIDAYAT", alamat: "JL. UNTUNG SUROPATI NO. 10, KEL. TELUK LERONG ULU, KEC. SUNGAI KUNJANG, KOTA SAMARINDA", telepon: "085347890123" },
  // LAMPUNG
  { no: 24, wilayah: "LAMPUNG", area: "BANDAR LAMPUNG", pimpinan: "AMIR HAMZAH, S.T.", alamat: "JL. KEPODANG GG. ASRI NO. 10, GUNUNG AGUNG, LANGKAPURA, KOTA BANDAR LAMPUNG", telepon: "08117970227" },
  { no: 25, wilayah: "LAMPUNG", area: "METRO", pimpinan: "SURYA DHARMA", alamat: "JL. HASANUDDIN NO. 18, KEL. HADIMULYO BARAT, KEC. METRO BARAT, KOTA METRO", telepon: "081289012345" },
  // RIAU
  { no: 26, wilayah: "RIAU", area: "PEKANBARU", pimpinan: "RIDWAN ALFARISI", alamat: "JL. SUDIRMAN NO. 27, KEL. TANGKERANG TENGAH, KEC. MARPOYAN DAMAI, KOTA PEKANBARU", telepon: "085265678901" },
  // SULAWESI SELATAN
  { no: 27, wilayah: "SULAWESI SELATAN", area: "MAKASSAR", pimpinan: "ANDI RAHMAN, S.T.", alamat: "JL. URIP SUMOHARJO NO. 60, KEL. PAMPANG, KEC. PANAKKUKANG, KOTA MAKASSAR", telepon: "081356789012" },
  // SUMATERA BARAT
  { no: 28, wilayah: "SUMATERA BARAT", area: "PADANG", pimpinan: "FEBRIANTO PUTRA", alamat: "JL. KHATIB SULAIMAN NO. 8, KEL. ULAK KARANG SELATAN, KEC. PADANG UTARA, KOTA PADANG", telepon: "082378901234" },
  // SUMATERA SELATAN
  { no: 29, wilayah: "SUMATERA SELATAN", area: "PALEMBANG", pimpinan: "EKO PRASETYO", alamat: "JL. DEMANG LEBAR DAUN NO. 42, KEL. LOROK PAKJO, KEC. ILIR BARAT I, KOTA PALEMBANG", telepon: "082189012345" },
  // SUMATERA UTARA
  { no: 30, wilayah: "SUMATERA UTARA", area: "MEDAN", pimpinan: "CHARLES SIREGAR, S.T.", alamat: "JL. GATOT SUBROTO NO. 150, KEL. SEI AGUL, KEC. MEDAN BARAT, KOTA MEDAN", telepon: "081390123456" },
  { no: 31, wilayah: "SUMATERA UTARA", area: "PEMATANG SIANTAR", pimpinan: "JOSUA MANURUNG", alamat: "JL. SUTOMO NO. 20, KEL. BANE, KEC. SIANTAR UTARA, KOTA PEMATANG SIANTAR", telepon: "085261234567" },
];

const grouped = offices.reduce<Record<string, Office[]>>((acc, o) => {
  if (!acc[o.wilayah]) acc[o.wilayah] = [];
  acc[o.wilayah].push(o);
  return acc;
}, {});

export default function KantorAreaPage() {
  const totalProvinsi = Object.keys(grouped).length;

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4]">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#facb01]/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="flex items-center gap-2 text-xs text-blue-300/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ArrowRight className="h-3 w-3" />
            <span className="text-white">Kantor Area</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#facb01]/20 border border-[#facb01]/30 rounded-full px-4 py-1.5 text-sm text-[#facb01] font-medium mb-5">
            <MapPin className="h-3.5 w-3.5" />
            Jaringan Nasional SEIIKI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Kantor Area
          </h1>
          <p className="text-blue-100/80 text-lg max-w-2xl leading-relaxed">
            SEIIKI hadir di {totalProvinsi} provinsi dengan {offices.length} kantor area yang siap melayani kebutuhan inspeksi dan sertifikasi instalasi tenaga listrik Anda.
          </p>
          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-bold text-white">{offices.length}</p>
              <p className="text-xs text-blue-300/70">Kantor Area</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalProvinsi}</p>
              <p className="text-xs text-blue-300/70">Provinsi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">24/5</p>
              <p className="text-xs text-blue-300/70">Hari Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Province Summary Cards */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
          {Object.entries(grouped).map(([prov, offcs]) => (
            <a
              key={prov}
              href={`#${prov.replace(/\s+/g, '-')}`}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#09bce4]/30 transition-all duration-200 p-3 text-center group"
            >
              <MapPin className="h-4 w-4 text-[#09bce4] mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-gray-900 leading-snug">{prov}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{offcs.length} kantor</p>
            </a>
          ))}
        </div>

        {/* Per-Province Tables */}
        <div className="space-y-10">
          {Object.entries(grouped).map(([prov, offcs]) => (
            <div key={prov} id={prov.replace(/\s+/g, '-')}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#09bce4]/10 rounded-xl p-2">
                  <MapPin className="h-5 w-5 text-[#09bce4]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{prov}</h2>
                  <p className="text-xs text-gray-400">{offcs.length} kantor area</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/80">
                        <TableHead className="w-[50px] text-xs">No</TableHead>
                        <TableHead className="text-xs min-w-[140px]">Area</TableHead>
                        <TableHead className="text-xs min-w-[180px]">Pimpinan Area</TableHead>
                        <TableHead className="text-xs min-w-[300px]">Alamat</TableHead>
                        <TableHead className="text-xs">No. Telepon</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {offcs.map((o) => (
                        <TableRow key={`${o.wilayah}-${o.area}`} className="hover:bg-blue-50/30 transition-colors">
                          <TableCell className="text-sm font-medium text-gray-500">{o.no}</TableCell>
                          <TableCell className="text-sm font-semibold text-gray-900 whitespace-nowrap">{o.area}</TableCell>
                          <TableCell className="text-sm text-gray-700">
                            {o.pimpinan && o.pimpinan.trim() !== '' ? (
                              <span className="flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                                {o.pimpinan}
                              </span>
                            ) : (
                              <span className="text-gray-300 italic text-xs">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{o.alamat}</TableCell>
                          <TableCell>
                            <a
                              href={`tel:${o.telepon.replace(/[\s-]/g, '')}`}
                              className="inline-flex items-center gap-1.5 text-sm text-[#09bce4] hover:underline font-medium whitespace-nowrap"
                            >
                              <Phone className="h-3 w-3" />
                              {o.telepon}
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-[#0a2a4a] to-[#09bce4] rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Belum Ada Kantor di Kota Anda?</h3>
          <p className="text-blue-100/80 mb-6 max-w-md mx-auto text-sm">
            Tim lapangan kami dapat menjangkau seluruh wilayah Indonesia. Hubungi kantor pusat untuk penjadwalan inspeksi ke lokasi Anda.
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 bg-[#facb01] hover:bg-[#facb01]/90 text-gray-900 font-bold px-7 py-3 rounded-full transition-colors text-sm"
          >
            Hubungi Kantor Pusat <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
