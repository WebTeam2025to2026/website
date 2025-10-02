const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

async function generateSitemap() {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'weekly', priority: 0.8 },
    { url: '/events', changefreq: 'weekly', priority: 0.8 },
    { url: '/gallery', changefreq: 'weekly', priority: 0.8 },
    // Add other pages here if any
  ];

  const sitemapStream = new SitemapStream({ hostname: 'https://quizzards-rec.web.app' });
  const writeStream = createWriteStream('./public/sitemap.xml');

  sitemapStream.pipe(writeStream);

  links.forEach(link => sitemapStream.write(link));

  sitemapStream.end();

  // ✅ Pass sitemapStream instead of writeStream
  await streamToPromise(sitemapStream);

  console.log('sitemap.xml generated!');
}

generateSitemap().catch(console.error);
