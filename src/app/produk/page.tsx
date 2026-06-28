import { prisma } from '@/lib/db';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Package, Zap } from 'lucide-react';

export const metadata = {
  title: 'Produk | SEIIKI',
  description: 'Produk-produk kelistrikan berkualitas dari PT. Solusi Energi Kelistrikan Indonesia',
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

export default async function ProdukPage() {
  const produkList = await prisma.produk.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span>Produk Kelistrikan</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Produk Kami</h1>
          <p className="text-blue-100 max-w-xl mx-auto text-lg">
            Produk kelistrikan berkualitas tinggi untuk kebutuhan instalasi dan sertifikasi tenaga listrik.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {produkList.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <Package className="h-16 w-16 mx-auto mb-4 opacity-25" />
            <p className="text-lg font-medium">Belum ada produk yang tersedia</p>
            <p className="text-sm mt-1">Silakan kunjungi kembali nanti.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produkList.map(produk => (
              <Card key={produk.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
                <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 aspect-video flex items-center justify-center">
                  {produk.imageUrl ? (
                    <img
                      src={produk.imageUrl}
                      alt={produk.nama}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Package className="h-16 w-16 text-slate-400" />
                  )}
                </div>

                <CardHeader className="pb-2 pt-4">
                  <h3 className="font-bold text-gray-900 leading-snug">{produk.nama}</h3>
                </CardHeader>

                <CardContent className="flex-1 pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">{produk.deskripsi}</p>
                </CardContent>

                <CardFooter className="pt-3 border-t">
                  <p className="text-lg font-bold text-blue-700">{formatRupiah(produk.harga)}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
