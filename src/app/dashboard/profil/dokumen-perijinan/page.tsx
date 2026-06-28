import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardDokumenPerijinanPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Kelola Dokumen Perijinan</h1>
      <p className="text-muted-foreground">Unggah dan kelola dokumen legalitas dan akreditasi.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Manajemen Dokumen</CardTitle>
            <CardDescription>Tambah, hapus, atau perbarui dokumen perijinan.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Daftar dokumen dan formulir unggah akan ada di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
