import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardKontakPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Pesan Masuk</h1>
      <p className="text-muted-foreground">Lihat pesan yang dikirim melalui formulir kontak.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pesan</CardTitle>
            <CardDescription>Berikut adalah pesan yang diterima dari pengunjung situs.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Tabel berisi pesan-pesan yang masuk akan ditampilkan di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
