import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardPendaftaranSLOPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Data Pendaftaran SLO</h1>
      <p className="text-muted-foreground">Lihat dan kelola data pendaftaran yang masuk.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Pendaftar Baru</CardTitle>
            <CardDescription>Berikut adalah daftar pengajuan SLO yang diterima.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Tabel data pendaftar SLO akan ditampilkan di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
