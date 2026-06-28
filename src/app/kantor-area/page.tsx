import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Kantor Area',
  description: 'Daftar lengkap kantor area SEIIKI di seluruh Indonesia. Kami memiliki 25 kantor wilayah yang tersebar di berbagai provinsi untuk melayani kebutuhan Sertifikat Laik Operasi Anda.',
  keywords: ['Kantor SEIIKI', 'Kantor Area SEIIKI', 'Alamat SEIIKI', 'Kantor Wilayah SLO', 'Cabang SEIIKI', 'Kontak Kantor SEIIKI'],
  canonical: '/kantor-area',
});

export default function KantorAreaPage() {
  type Office = {
    no: number;
    wilayah: string;
    area: string;
    pimpinan?: string;
    alamat: string;
    telepon: string;
  };

  const offices: Office[] = [
    {
      no: 1,
      wilayah: "ACEH",
      area: "BANDA ACEH",
      pimpinan: "PROZA SWASTA RIZKY",
      alamat: "JL.TENTARA PELAJAR ACEH NO.11 BANDA ACEH",
      telepon: "085277388499",
    },
    {
      no: 2,
      wilayah: "ACEH",
      area: "LANGSA",
      pimpinan: "SURYADI ALI",
      alamat: "JLN. ISKANDAR MUDA NO.05 KOTA LANGSA",
      telepon: "085275023078",
    },
    {
      no: 3,
      wilayah: "ACEH",
      area: "LHOKSEUMAWE",
      pimpinan: "SAYED MUHZAR",
      alamat: "JLN. MERDEKA NO. 10 KEUDE CUNDA, KEC. MUARA DUA",
      telepon: "+62 852-6004-1440",
    },
    {
      no: 4,
      wilayah: "ACEH",
      area: "MEULABOH",
      pimpinan: "ROSA IWA AVIVA",
      alamat: "JL. SERAMBI MEKKAH, JURONG LAM AYON, GAMPONG BLANG BEURANDANG",
      telepon: "082210100719",
    },
    {
      no: 5,
      wilayah: "ACEH",
      area: "SIGLI",
      pimpinan: "JAMALUL HAKIM",
      alamat: "JL.RUMAH SAKIT ABDULAH SYAFII NO.1 KOTA MINI BEUEREUNEUN",
      telepon: "081360035780",
    },
    {
      no: 6,
      wilayah: "ACEH",
      area: "SUBULUSSALAM",
      pimpinan: "NOERMAN",
      alamat:
        "JL.T.PANGLIMA POLEM PELAWIS NO.08 DESA SUBULUSSALAM KEC.SIMPANG KIRI,KOTA SUBULUSSALAM",
      telepon: "085276103010",
    },
    {
      no: 8,
      wilayah: "BALI",
      area: "BALI SELATAN",
      pimpinan: "I WAYAN SENTANA PUTRA",
      alamat: "JL. SURADIPA NO. 5, KEL. PAGUYANGAN, KEC. DENPASAR UTARA",
      telepon: "082147505844",
    },
    {
      no: 9,
      wilayah: "BALI",
      area: "BALI TIMUR",
      pimpinan: "ANAK AGUNG GEDE OKA, SH",
      alamat: "JL. TIRTA CAMPUHAN NO. 1, BANGLI",
      telepon: "081239324601",
    },
    {
      no: 7,
      wilayah: "BALI",
      area: "BALI UTARA",
      pimpinan: "",
      alamat:
        "JL. TUKAD BADUNG NO.234, RENON, KEC. DENPASAR SELATAN, KOTA DENPASAR, BALI, 80226",
      telepon: "081337123228",
    },
  ].sort((a, b) => a.no - b.no);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="py-6 md:py-8 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Daftar Kantor Area</h1>
        <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
          Informasi kantor area beserta wilayah, pimpinan, alamat, dan kontak.
        </p>
      </header>

      <div className="bg-card rounded-lg shadow-md p-2 md:p-4">
        <Table>
          <TableCaption>Data kantor area SEIIKI</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">No</TableHead>
              <TableHead>Nama Wilayah</TableHead>
              <TableHead>Nama Area</TableHead>
              <TableHead className="min-w-[200px]">Pimpinan Area</TableHead>
              <TableHead className="min-w-[320px]">Alamat</TableHead>
              <TableHead>No Telepon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offices.map((o) => (
              <TableRow key={`${o.wilayah}-${o.area}`}>
                <TableCell className="font-medium">{o.no}</TableCell>
                <TableCell>{o.wilayah}</TableCell>
                <TableCell className="whitespace-nowrap">{o.area}</TableCell>
                <TableCell>{o.pimpinan && o.pimpinan.trim() !== "" ? o.pimpinan : "-"}</TableCell>
                <TableCell>{o.alamat}</TableCell>
                <TableCell>
                  <a href={`tel:${o.telepon.replace(/\s+/g, "")}`} className="text-primary hover:underline">
                    {o.telepon}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
