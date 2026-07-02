'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import TestimonialSection from '@/components/sections/infinite-testimonials';
import { motion } from 'framer-motion';
import AboutSection from '@/components/sections/about-section';
import GallerySection from '@/components/sections/gallery-section';
import PartnersSection from '@/components/sections/partners-section';
import ServicesGrid from '@/components/sections/services-grid';
import CTASection from '@/components/sections/cta-section';
import AwardsSection from '@/components/sections/awards-section';
import ImportanceSection from '@/components/sections/importance-section';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo';

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
  order: number;
  active: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

interface Statistic {
  id: string;
  label: string;
  value: string;
  order: number;
}

function HeroSection({ slides }: { slides: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const activeSlides = slides.filter(slide => slide.active).sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (activeSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeSlides.length]);

  const currentSlideData = activeSlides[currentSlide] || {
    title: 'SEIIKI',
    subtitle: 'AMAN TERPERCAYA',
    description: 'Pusat Layanan Sertifikat Laik Operasi Instalasi Tenaga Listrik',
    imageUrl: '/header-1.jpg',
    buttonText: 'TENTANG KAMI',
    buttonUrl: '/profil/tentang-kami'
  };

  const getImageUrl = (slide: HeroSlide) => {
    let imageUrl = slide.imageUrl;
    
    // Fix common path issues in production
    if (imageUrl.startsWith('/public/')) {
      imageUrl = imageUrl.replace('/public/', '/');
    }
    
    // Ensure image starts with /
    if (!imageUrl.startsWith('/')) {
      imageUrl = '/' + imageUrl;
    }
    
    if (imageErrors.has(imageUrl)) {
      console.log('Using fallback image due to error:', imageUrl);
      return '/header-1.jpg';
    }
    
    console.log('Using image URL:', imageUrl);
    return imageUrl;
  };

  const handleImageError = (imageUrl: string) => {
    console.error('Image failed to load:', imageUrl);
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  return (
    <section className="relative w-full min-h-[calc(100dvh+5rem)] -mt-20 text-white flex items-center justify-center overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0">
        {activeSlides.map((slide, index) => (
          <div key={slide.id} className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 1.1
              }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${getImageUrl(slide)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            {/* Hidden img for error detection */}
            <img
              src={getImageUrl(slide)}
              alt=""
              onError={() => handleImageError(getImageUrl(slide))}
              style={{ display: 'none' }}
            />
          </div>
        ))}
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      {/* Centered content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tight leading-tight text-balance break-words max-w-[90%] md:max-w-4xl mx-auto">
            {currentSlideData.title}
          </h1>
          <div className="mt-4 flex flex-col items-center">
            <motion.div 
              className="w-16 h-1 bg-accent mb-2"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            {currentSlideData.subtitle && (
              <p className="text-base sm:text-lg md:text-2xl font-light tracking-[0.2em]">
                {currentSlideData.subtitle}
              </p>
            )}
            {currentSlideData.description && (
              <p className="mt-2 text-sm sm:text-base md:text-lg tracking-normal opacity-90 max-w-2xl px-4">
                {currentSlideData.description}
              </p>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {currentSlideData.buttonText && currentSlideData.buttonUrl && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300"
            >
              <Link href={currentSlideData.buttonUrl}>
                {currentSlideData.buttonText}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button
            asChild
            size="lg"
            className="bg-primary/80 backdrop-blur-sm border-0 text-white hover:bg-primary transform hover:scale-105 transition-all duration-300"
          >
            <a href="https://siujang.esdm.go.id/" target="_blank" rel="noopener noreferrer">
              DAFTAR SLO
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
        
        {/* Slide indicators */}
        {activeSlides.length > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            {activeSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from API...');
        const [slidesRes, servicesRes, statsRes] = await Promise.all([
          fetch('/api/hero-slides').then(r => {
            console.log('Hero slides response status:', r.status);
            return r.ok ? r.json() : [];
          }),
          fetch('/api/services').then(r => r.ok ? r.json() : []),
          fetch('/api/statistics').then(r => r.ok ? r.json() : [])
        ]);
        
        console.log('Hero slides data:', slidesRes);
        
        // Handle both direct array and wrapped object responses
        setSlides(Array.isArray(slidesRes) ? slidesRes : slidesRes.slides || []);
        setServices(Array.isArray(servicesRes) ? servicesRes : servicesRes.services || []);
        setStatistics(Array.isArray(statsRes) ? statsRes : statsRes.statistics || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set fallback data
        setServices([
          {
            id: '1',
            title: 'Pembangkit Listrik Tenaga Diesel (PLTD)',
            description: 'Legalitas Pembangkit Listrik Tenaga Diesel. Sertifikasi untuk instalasi PLTD dengan standar keamanan dan operasional tertinggi.',
            icon: 'Zap',
            imageUrl: '/Pembangkit Listrik Tenaga Diesel.png',
            featured: true,
            order: 1
          },
          {
            id: '2',
            title: 'Pembangkit Listrik Tenaga Surya (PLTS)',
            description: 'Legalitas Pembangkit Listrik Tenaga Surya. Layanan sertifikasi untuk instalasi PLTS dengan keandalan dan efisiensi terjamin.',
            icon: 'ShieldCheck',
            imageUrl: '/Pembangkit Listrik Tenaga Surya.png',
            featured: true,
            order: 2
          },
          {
            id: '3',
            title: 'Instalasi Penyediaan Tenaga Listrik Tegangan Menengah (IPTL TM)',
            description: 'Legalitas Instalasi Penyediaan Tenaga Listrik Tegangan Menengah. Sertifikasi untuk instalasi industri dan komersial besar.',
            icon: 'FileText',
            imageUrl: '/Instalasi Pemamfaatan Tenaga Listrik Tegangan Menengah.png',
            featured: true,
            order: 3
          }
        ]);
        setStatistics([
          { id: '1', value: '10+', label: 'Tahun Pengalaman', order: 1 },
          { id: '2', value: '15,000+', label: 'Sertifikat Diterbitkan', order: 2 },
          { id: '3', value: '25', label: 'Kantor Wilayah', order: 3 },
          { id: '4', value: '99%', label: 'Kepuasan Pelanggan', order: 4 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // services grid has been moved into a dedicated component

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-4 animate-bounce" />
          <p className="text-muted-foreground">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Beranda', url: '/' },
  ]);

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'SEIIKI',
            url: 'https://seiiki.com',
            description: 'Penyedia layanan Sertifikat Laik Operasi (SLO) untuk instalasi tenaga listrik di Indonesia',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://seiiki.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />
      <div className="flex flex-col min-h-[100dvh]">
        <HeroSection slides={slides} />
        <AboutSection />
        <AwardsSection />
        <ImportanceSection />
        <GallerySection />
        <PartnersSection />
        <ServicesGrid services={services} />
        <TestimonialSection />
        <CTASection />

      </div>
    </>
  );
}