import { prisma } from '@/lib/db';
import { Package, Zap } from 'lucide-react';
import ProdukGrid from './ProdukGrid';

export const metadata = {
  title: 'Produk | SEIIKI',
  description: 'Produk-produk kelistrikan berkualitas dari PT. Solusi Energi Kelistrikan Indonesia',
};

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
          <ProdukGrid produkList={produkList} />
        )}
      </div>
    </main>
  );
}
