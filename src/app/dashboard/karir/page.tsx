import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardKarirPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Kelola Lowongan Karir</h1>
      <p className="text-muted-foreground">Tambah, edit, atau hapus lowongan pekerjaan.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Lowongan</CardTitle>
            <CardDescription>Kelola posisi yang sedang dibuka di perusahaan.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Formulir dan daftar untuk mengelola lowongan pekerjaan akan ada di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
