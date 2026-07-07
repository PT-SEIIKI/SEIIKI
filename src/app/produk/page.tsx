import { prisma } from '@/lib/db';
import { Package, Zap, ArrowRight } from 'lucide-react';
import ProdukGrid from './ProdukGrid';
import Link from 'next/link';

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
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2a4a] via-[#0b3d6b] to-[#09bce4]">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#facb01]/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-blue-300/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ArrowRight className="h-3 w-3" />
            <span className="text-white">Produk</span>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#facb01]/20 border border-[#facb01]/30 rounded-full px-4 py-1.5 text-sm text-[#facb01] font-medium mb-5">
              <Zap className="h-3.5 w-3.5" />
              Produk Kelistrikan Berkualitas
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Produk Kami
            </h1>
            <p className="text-blue-100/80 text-lg leading-relaxed">
              Peralatan dan material kelistrikan berkualitas tinggi untuk kebutuhan instalasi, pengujian, dan sertifikasi tenaga listrik.
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { value: `${produkList.length}+`, label: 'Produk Tersedia' },
              { value: 'Bergaransi', label: 'Kualitas Terjamin' },
              { value: 'Original', label: 'Produk Resmi' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xl font-bold text-white">{value}</span>
                <span className="text-xs text-blue-300/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="container mx-auto px-4 py-12">
        {produkList.length === 0 ? (
          <div className="text-center py-32 text-gray-400 flex flex-col items-center gap-4">
            <Package className="h-16 w-16 opacity-20" />
            <div>
              <p className="text-lg font-semibold text-gray-500">Belum ada produk</p>
              <p className="text-sm mt-1">Silakan kunjungi kembali nanti.</p>
            </div>
          </div>
        ) : (
          <ProdukGrid produkList={produkList} />
        )}
      </div>
    </main>
  );
}
