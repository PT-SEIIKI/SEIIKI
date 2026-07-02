'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Produk = {
  id: string;
  nama: string;
  harga: number;
  deskripsi: string;
  imageUrl: string | null;
};

const PAGE_SIZE = 8;

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

export default function ProdukGrid({ produkList }: { produkList: Produk[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleProduk = produkList.slice(0, visibleCount);
  const hasMore = visibleCount < produkList.length;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProduk.map(produk => (
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

      {hasMore && (
        <div className="flex justify-center mt-10">
          <Button
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            className="bg-blue-800 hover:bg-blue-900 text-white px-8"
            size="lg"
          >
            Muat Lebih Banyak
          </Button>
        </div>
      )}
    </>
  );
}
