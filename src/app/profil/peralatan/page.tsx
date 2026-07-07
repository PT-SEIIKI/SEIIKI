import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { Wrench, Zap, Thermometer, Radio, Shield, Activity, Eye, Gauge } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Peralatan Inspeksi',
  description: 'Daftar peralatan inspeksi dan pengujian modern yang digunakan SEIIKI untuk sertifikasi instalasi tenaga listrik.',
  keywords: ['Peralatan Inspeksi Listrik', 'Alat Uji Kelistrikan', 'Megohmmeter', 'Earth Tester', 'SEIIKI'],
  canonical: '/profil/peralatan',
});

const categories = [
  {
    icon: <Gauge className="h-6 w-6" />,
    name: 'Pengukuran Tahanan & Isolasi',
    color: 'from-blue-500 to-cyan-500',
    items: [
      {
        name: 'Megohmmeter / Insulation Resistance Tester',
        brand: 'Fluke 1550C / Kyoritsu 3125',
        spec: 'Range: 10 kΩ – 1 TΩ | Tegangan uji: 50 V – 5 kV DC',
        desc: 'Mengukur tahanan isolasi kabel, motor, transformator, dan peralatan listrik lainnya untuk memastikan isolasi masih baik.',
        qty: 4,
      },
      {
        name: 'Earth Resistance Tester (Ground Tester)',
        brand: 'Fluke 1623-2 / Kyoritsu 4105A',
        spec: 'Range: 0,01 Ω – 20 kΩ | 3-pole & clamp method',
        desc: 'Mengukur tahanan pembumian sistem grounding instalasi sesuai standar PUIL 2011.',
        qty: 3,
      },
      {
        name: 'Low Resistance Ohmmeter (Ductor Tester)',
        brand: 'Megger DLRO10X',
        spec: 'Range: 0,1 μΩ – 2000 Ω | Arus uji: 10 A',
        desc: 'Mengukur tahanan kontak rendah pada busbar, sambungan kabel, dan kontak pemutus daya.',
        qty: 2,
      },
    ],
  },
  {
    icon: <Zap className="h-6 w-6" />,
    name: 'Pengujian Tegangan Tinggi',
    color: 'from-yellow-500 to-orange-500',
    items: [
      {
        name: 'High Voltage Tester (Hipot Tester)',
        brand: 'Megger S1-1052 / HV Diagnostics HVA34',
        spec: 'Output AC: 5 kV – 10 kV | Output DC: hingga 34 kV',
        desc: 'Melakukan uji tegangan tinggi (withstand test) pada kabel tegangan menengah, transformator, dan switchgear.',
        qty: 2,
      },
      {
        name: 'Cable Fault Locator',
        brand: 'Megger TDR1000/3',
        spec: 'Metode: Time Domain Reflectometry (TDR) | Jangkauan: 0 – 20 km',
        desc: 'Mendeteksi dan melokalisasi kerusakan (fault) pada kabel bawah tanah tegangan rendah dan menengah.',
        qty: 1,
      },
    ],
  },
  {
    icon: <Activity className="h-6 w-6" />,
    name: 'Analisa Kualitas Daya',
    color: 'from-green-500 to-emerald-500',
    items: [
      {
        name: 'Power Quality Analyzer',
        brand: 'Fluke 435-II / Hioki PW3390',
        spec: '4-channel | Harmonisa s/d orde ke-50 | Class A IEC 61000-4-30',
        desc: 'Menganalisis kualitas daya listrik: harmonisa, voltage sag/swell, flicker, dan ketidakseimbangan beban tiga fasa.',
        qty: 3,
      },
      {
        name: 'Clamp Power Meter',
        brand: 'Fluke 376 FC / Kyoritsu 2056R',
        spec: 'AC/DC hingga 2500 A | True RMS | Data logging',
        desc: 'Mengukur arus, tegangan, daya, dan faktor daya secara non-invasif pada panel dan kabel.',
        qty: 5,
      },
      {
        name: 'Digital Multimeter (DMM)',
        brand: 'Fluke 87V / Fluke 289',
        spec: 'CAT IV 600 V | True RMS | Resolusi 0,001 mV',
        desc: 'Pengukuran tegangan, arus, dan tahanan umum di lapangan dengan tingkat keamanan CAT IV.',
        qty: 8,
      },
    ],
  },
  {
    icon: <Thermometer className="h-6 w-6" />,
    name: 'Inspeksi Termal & Visual',
    color: 'from-red-500 to-rose-500',
    items: [
      {
        name: 'Thermal Imaging Camera (Kamera Inframerah)',
        brand: 'FLIR E75 / Hikvision H20',
        spec: 'Resolusi: 320×240 px | Sensitivitas: < 0,05°C | Range: -20°C s/d 650°C',
        desc: 'Mendeteksi titik panas (hot spot) pada panel listrik, konektor, dan kabel tanpa sentuhan untuk identifikasi awal kerusakan.',
        qty: 2,
      },
      {
        name: 'Borescope / Endoscope Kamera',
        brand: 'RIDGID micro CA-25',
        spec: 'Diameter probe: 17 mm | Panjang kabel: 1 m | Waterproof IP67',
        desc: 'Inspeksi visual ruang terbatas seperti interior panel, conduit, dan rongga bangunan.',
        qty: 2,
      },
    ],
  },
  {
    icon: <Radio className="h-6 w-6" />,
    name: 'Pengujian Proteksi & Relay',
    color: 'from-purple-500 to-violet-500',
    items: [
      {
        name: 'Relay Test Set',
        brand: 'Omicron CMC 356 / Megger MPRT8',
        spec: '3-fasa | Output hingga 430 V AC / 32 A | GPS timing',
        desc: 'Menguji fungsi relay proteksi (OCR, GFR, differential relay) pada switchgear tegangan menengah.',
        qty: 1,
      },
      {
        name: 'Circuit Breaker Tester',
        brand: 'Megger TM1700 / SVERKER 900',
        spec: 'Timing: 0,1 ms – 9999 ms | Arus kontak: hingga 100 A',
        desc: 'Mengukur waktu buka-tutup (opening/closing time) dan tahanan kontak pemutus daya (CB).',
        qty: 2,
      },
      {
        name: 'RCD/ELCB Tester',
        brand: 'Fluke 1664 FC / Kyoritsu 5406',
        spec: 'Arus uji: 10 mA – 500 mA | Waktu trip: 0 – 999 ms',
        desc: 'Menguji fungsi dan waktu trip Earth Leakage Circuit Breaker (ELCB) dan Residual Current Device (RCD).',
        qty: 4,
      },
    ],
  },
  {
    icon: <Eye className="h-6 w-6" />,
    name: 'Pengukuran Lingkungan',
    color: 'from-teal-500 to-cyan-600',
    items: [
      {
        name: 'Lux Meter (Pengukur Intensitas Cahaya)',
        brand: 'Hioki FT3425 / Lutron LX-1102',
        spec: 'Range: 0 – 200.000 lux | Akurasi ±3%',
        desc: 'Mengukur intensitas cahaya sistem penerangan gedung sesuai standar SNI 03-6197.',
        qty: 3,
      },
      {
        name: 'Sound Level Meter',
        brand: 'Testo 815 / Lutron SL-4023SD',
        spec: 'Range: 30 – 130 dB | Frekuensi: 31,5 Hz – 8 kHz',
        desc: 'Mengukur tingkat kebisingan ruang trafo, ruang genset, dan area sekitar instalasi.',
        qty: 2,
      },
      {
        name: 'Gas Detector (Multi-gas)',
        brand: 'MSA Altair 4X / BW GasAlert Quattro',
        spec: 'Sensor: O₂, CO, H₂S, LEL (combustible) | IP67',
        desc: 'Memastikan keamanan ruang bawah tanah, ruang switchgear, dan area berpotensi gas berbahaya sebelum inspeksi.',
        qty: 2,
      },
    ],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    name: 'Alat Pelindung Diri (APD)',
    color: 'from-slate-500 to-gray-600',
    items: [
      {
        name: 'Arc Flash PPE Kit (Kelas 2)',
        brand: 'Salisbury by Honeywell',
        spec: 'Rating: 12 cal/cm² ATPV | Termasuk: baju, sarung tangan, pelindung muka',
        desc: 'Perlindungan lengkap inspektur dari bahaya busur listrik saat bekerja pada panel tegangan menengah bertegangan.',
        qty: 6,
      },
      {
        name: 'Electrical Safety Gloves',
        brand: 'Ansell / Salisbury',
        spec: 'Kelas 00 (500 V), Kelas 0 (1000 V), Kelas 2 (17 kV)',
        desc: 'Sarung tangan isolasi bertegangan wajib dipakai saat inspeksi tegangan rendah dan menengah.',
        qty: 12,
      },
      {
        name: 'Voltage Detector (Phasing Stick)',
        brand: 'Fluke T6-1000 / Hoyt HT-500',
        spec: 'Range: 12 V – 1000 V AC/DC | Contactless & contact mode',
        desc: 'Memastikan keselamatan kerja dengan mendeteksi keberadaan tegangan sebelum menyentuh instalasi.',
        qty: 8,
      },
    ],
  },
];

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4]">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#facb01]/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="inline-flex items-center gap-2 bg-[#facb01]/20 border border-[#facb01]/30 rounded-full px-4 py-1.5 text-sm text-[#facb01] font-medium mb-5">
            <Wrench className="h-3.5 w-3.5" />
            Inventaris Peralatan Teknis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Peralatan Inspeksi<br />& Pengujian
          </h1>
          <p className="text-blue-100/80 text-lg max-w-2xl leading-relaxed">
            SEIIKI menggunakan peralatan berstandar internasional yang terkalibrasi secara berkala oleh Laboratorium Kalibrasi terakreditasi KAN, menjamin hasil inspeksi yang akurat dan dapat dipercaya.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { value: `${categories.reduce((a, c) => a + c.items.reduce((s, i) => s + i.qty, 0), 0)}+`, label: 'Unit Peralatan' },
              { value: `${categories.length}`, label: 'Kategori' },
              { value: 'Kalibrasi KAN', label: 'Tersertifikasi' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-blue-300/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intro card */}
      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-4xl">
          <p className="text-gray-600 leading-relaxed">
            Seluruh peralatan inspeksi dan pengujian yang kami miliki dikalibrasi secara berkala oleh lembaga kalibrasi terakreditasi KAN (Komite Akreditasi Nasional) sesuai dengan persyaratan SNI ISO/IEC 17020 sebagai Lembaga Inspeksi Teknik. Kalibrasi dilakukan minimal <strong>1 (satu) tahun sekali</strong> atau setelah kejadian yang dapat mempengaruhi akurasi alat.
          </p>
        </div>
      </div>

      {/* Equipment Categories */}
      <div className="container mx-auto px-4 pb-16 space-y-12">
        {categories.map((cat) => (
          <div key={cat.name}>
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`bg-gradient-to-br ${cat.color} text-white rounded-xl p-2.5`}>
                {cat.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{cat.name}</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug flex-1 pr-2">{item.name}</h3>
                    <span className="shrink-0 text-xs bg-[#09bce4]/10 text-[#09bce4] font-semibold px-2 py-0.5 rounded-full">
                      {item.qty} unit
                    </span>
                  </div>
                  <p className="text-xs text-[#09bce4] font-medium mb-2">{item.brand}</p>
                  <p className="text-xs text-gray-400 font-mono bg-gray-50 rounded-lg px-3 py-2 mb-3 leading-relaxed">{item.spec}</p>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Calibration note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
          <Shield className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Jaminan Kalibrasi & Akurasi</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Semua peralatan di atas dikalibrasi secara rutin oleh laboratorium kalibrasi terakreditasi KAN. Sertifikat kalibrasi tersedia dan dapat ditunjukkan kepada pelanggan atas permintaan. Peralatan yang masa kalibrasinya habis tidak akan digunakan di lapangan hingga proses kalibrasi ulang selesai.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
