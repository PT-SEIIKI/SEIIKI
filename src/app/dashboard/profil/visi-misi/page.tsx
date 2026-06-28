import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardVisiMisiPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Kelola Halaman "Visi & Misi"</h1>
      <p className="text-muted-foreground">Ubah teks visi dan misi perusahaan.</p>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Editor Visi & Misi</CardTitle>
            <CardDescription>Perbarui pernyataan visi dan poin-poin misi di sini.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">[Formulir untuk mengedit teks Visi dan Misi akan ada di sini]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
