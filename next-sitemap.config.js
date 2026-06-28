module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://seiiki.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/dashboard/*', '/login', '/api/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/login', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/login', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/login', '/api/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://seiiki.com'}/sitemap.xml`,
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/profil/tentang-kami': 0.9,
      '/profil/visi-misi': 0.9,
      '/slo/informasi': 0.9,
      '/kontak': 0.8,
      '/karir': 0.7,
      '/kantor-area': 0.7,
      '/profil/struktur-organisasi': 0.6,
      '/profil/peralatan': 0.6,
      '/profil/dokumen-perijinan': 0.6,
      '/profil/daftar-pjt-tt': 0.6,
    };

    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: priorities[path] || 0.5,
      lastmod: new Date().toISOString(),
    };
  },
};
