'use client';

import { useState } from 'react';
import { Package, ChevronDown, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Produk = {
  id: string;
  nama: string;
  harga: number;
  deskripsi: string;
  imageUrl: string | null;
  kategori?: string | null;
};

const PAGE_SIZE = 8;

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

export default function ProdukGrid({ produkList }: { produkList: Produk[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeKategori, setActiveKategori] = useState<string>('Semua');

  // Build unique category list
  const kategoriList = ['Semua', ...Array.from(new Set(produkList.map(p => p.kategori || 'Lainnya')))];

  const filtered = activeKategori === 'Semua'
    ? produkList
    : produkList.filter(p => (p.kategori || 'Lainnya') === activeKategori);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleKategori = (k: string) => {
    setActiveKategori(k);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {kategoriList.map(k => (
          <button
            key={k}
            onClick={() => handleKategori(k)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeKategori === k
                ? 'bg-[#09bce4] text-white border-[#09bce4] shadow-md shadow-[#09bce4]/25'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#09bce4] hover:text-[#09bce4]'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
          <Package className="h-12 w-12 opacity-30" />
          <p className="text-sm">Tidak ada produk dalam kategori ini</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map(produk => (
              <div
                key={produk.id}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image area */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                  {produk.imageUrl ? (
                    <img
                      src={produk.imageUrl}
                      alt={produk.nama}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Package className="h-12 w-12 text-slate-300" />
                    </div>
                  )}
                  {/* Kategori badge */}
                  {produk.kategori && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-600 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-gray-200 shadow-sm">
                        <Tag className="h-2.5 w-2.5" />
                        {produk.kategori}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#09bce4] transition-colors">
                    {produk.nama}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-3 flex-1 leading-relaxed">
                    {produk.deskripsi}
                  </p>

                  {/* Price */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Harga</p>
                      <p className="text-base font-bold text-[#09bce4]">{formatRupiah(produk.harga)}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#09bce4]/10 flex items-center justify-center group-hover:bg-[#09bce4] transition-colors duration-200">
                      <ChevronDown className="h-4 w-4 text-[#09bce4] group-hover:text-white -rotate-90 transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                variant="outline"
                size="lg"
                className="border-[#09bce4] text-[#09bce4] hover:bg-[#09bce4] hover:text-white font-semibold px-10 rounded-full transition-all duration-200"
              >
                Muat Lebih Banyak
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
