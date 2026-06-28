import { Wrench } from "lucide-react";

export default function EquipmentPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Peralatan</h1>
        <p className="mt-2 text-lg text-muted-foreground">Peralatan inspeksi dan pengujian modern berstandar tinggi.</p>
      </header>
       <main className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-md">
        <div className="text-center">
            <Wrench className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold">Dalam Proses Pembaruan</h2>
            <p className="text-muted-foreground mt-2">Daftar lengkap peralatan canggih yang kami gunakan akan segera ditampilkan di sini untuk menunjukkan komitmen kami pada akurasi dan keandalan.</p>
        </div>
      </main>
    </div>
  );
}
