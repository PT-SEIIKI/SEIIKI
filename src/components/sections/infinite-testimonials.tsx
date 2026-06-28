'use client';

import React, { useState } from 'react';

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
};

type InfiniteTestimonialsProps = {
  items: Testimonial[];
  speed?: number;
  direction?: 'left' | 'right';
};

function InfiniteTestimonials({ items, speed = 60, direction = 'left' }: InfiniteTestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const content = [...items, ...items];
  const isLeft = direction === 'left';

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-background via-transparent to-background" />
      
      <div 
        className="flex w-max gap-6" 
        style={{
          animation: `${isLeft ? 'marquee-left' : 'marquee-right'} linear infinite`,
          animationDuration: '60s',
          animationPlayState: hoveredIndex !== null ? 'paused' : 'running',
        }}
      >
        {content.map((t, idx) => (
          <figure
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative min-w-[340px] max-w-[340px] md:min-w-[400px] md:max-w-[400px] rounded-3xl border border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500 p-6 hover:-translate-y-2"
            style={{
              background: 'linear-gradient(135deg, var(--card) 0%, var(--background) 100%)',
            }}
          >
            {/* Decorative quote icon */}
            <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Rating stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-foreground leading-relaxed mb-6 text-base md:text-lg relative">
              <span className="text-primary text-4xl absolute -top-2 -left-1 opacity-20">"</span>
              <p className="relative z-10">{t.quote}</p>
            </blockquote>

            <figcaption className="flex items-center gap-4 pt-4 border-t border-border">
              {t.avatarUrl ? (
                <img src={t.avatarUrl} alt={t.author} className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
                  {t.author.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <div className="font-semibold text-foreground text-base">{t.author}</div>
                {t.role && (
                  <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    {t.role}
                  </div>
                )}
              </div>
              
              {/* Verified badge */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </figcaption>

            {/* Hover effect gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </figure>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function TestimonialSection() {
  const items: Testimonial[] = [
    {
      quote: 'Pelayanan PT. Solusi Energi Kelistrikan Indonesia sangat profesional. Proses sertifikasi berjalan cepat dan jelas.',
      author: 'Rizky Pratama',
      role: 'Pemilik Toko Elektronik',
      rating: 5,
    },
    {
      quote: 'Tim teknisnya responsif dan detail dalam pemeriksaan. Kami merasa aman dan yakin instalasi telah sesuai standar.',
      author: 'Dewi Lestari',
      role: 'Manajer Operasional Pabrik',
      rating: 5,
    },
    {
      quote: 'Dokumentasi lengkap, komunikasi transparan, dan hasil yang tepat waktu. Rekomendasi kuat untuk kebutuhan SLO.',
      author: 'Andi Setiawan',
      role: 'Kontraktor Listrik',
      rating: 5,
    },
    {
      quote: 'Proses verifikasi SLO menjadi jauh lebih mudah. Platformnya user-friendly dan tim sangat membantu.',
      author: 'Sari Wulandari',
      role: 'Administrator Gedung',
      rating: 5,
    },
    {
      quote: 'Standar keselamatan menjadi prioritas. Kami puas dengan audit menyeluruh yang dilakukan oleh PT. SEIKI.',
      author: 'Bima Nugraha',
      role: 'Owner Restoran',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Dipercaya oleh 500+ Klien
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Apa Kata <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Mereka</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Testimoni nyata dari klien yang telah mempercayakan kebutuhan SLO mereka kepada PT. Solusi Energi Kelistrikan Indonesia
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">4.9/5.0</div>
              <div className="text-sm text-muted-foreground mt-1">Rating Rata-rata</div>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Klien Puas</div>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Rekomendasi</div>
            </div>
          </div>
        </div>

        <InfiniteTestimonials items={items} />

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Ingin menjadi bagian dari cerita sukses mereka?</p>
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
            Konsultasi Gratis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}