import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardTentangKamiPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Kelola Halaman "Tentang Kami"</h1>
      <p className="text-muted-foreground">Ubah konten yang ditampilkan di halaman publik Tentang Kami.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Editor Konten</CardTitle>
            <CardDescription>Gunakan formulir di bawah ini untuk mengedit bagian halaman.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Formulir untuk mengedit teks sejarah, nilai-nilai, dan gambar akan ada di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
