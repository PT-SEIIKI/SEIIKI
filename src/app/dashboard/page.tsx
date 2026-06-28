import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Selamat datang di CMS Anda.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Halaman</CardTitle>
            <CardDescription>Kelola halaman statis seperti 'Tentang Kami' dan 'Visi & Misi'.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">halaman untuk dikelola</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Layanan SLO</CardTitle>
            <CardDescription>Kelola informasi terkait layanan Sertifikat Laik Operasi.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">item layanan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Galeri</CardTitle>
            <CardDescription>Unggah dan kelola gambar untuk galeri proyek Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">6</p>
            <p className="text-xs text-muted-foreground">gambar di galeri</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
