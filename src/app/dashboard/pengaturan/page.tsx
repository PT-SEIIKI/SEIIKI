import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardPengaturanPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
      <p className="text-muted-foreground">Kelola pengaturan umum untuk dasbor dan situs.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Akun</CardTitle>
            <CardDescription>Ubah kata sandi dan informasi akun admin Anda.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Formulir untuk mengubah detail akun admin akan ada di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
