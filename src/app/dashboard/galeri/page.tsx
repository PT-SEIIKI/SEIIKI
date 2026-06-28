import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardGaleriPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Kelola Galeri</h1>
      <p className="text-muted-foreground">Tambah, hapus, atau atur urutan gambar di galeri.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Manajemen Gambar</CardTitle>
            <CardDescription>Unggah gambar baru atau kelola gambar yang sudah ada.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Area untuk unggah dan pratinjau gambar galeri akan ada di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
