import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardKeluhanPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Keluhan Pelanggan</h1>
      <p className="text-muted-foreground">Tinjau dan kelola keluhan yang dikirim oleh pelanggan.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Keluhan</CardTitle>
            <CardDescription>Berikut adalah daftar keluhan yang masuk.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Tabel data keluhan pelanggan akan ditampilkan di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
