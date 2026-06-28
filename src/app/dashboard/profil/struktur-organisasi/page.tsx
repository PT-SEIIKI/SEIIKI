import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardStrukturOrganisasiPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Kelola Struktur Organisasi</h1>
      <p className="text-muted-foreground">Unggah atau perbarui bagan struktur organisasi.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Editor Bagan</CardTitle>
            <CardDescription>Ganti gambar bagan organisasi yang ditampilkan di situs.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Formulir untuk mengunggah gambar bagan akan ada di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
