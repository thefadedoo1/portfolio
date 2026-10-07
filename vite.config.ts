import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const origin = env.VITE_SITE_URL?.replace(/\/$/, '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-seo',
        transformIndexHtml(html) {
          return html.replace(
            '<!-- canonical -->',
            origin
              ? `<link rel="canonical" href="${origin}/" /><meta property="og:url" content="${origin}/" />`
              : '',
          );
        },
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`,
          });
          this.emitFile({
            type: 'asset',
            fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? `<url><loc>${origin}/</loc></url>` : ''}</urlset>`,
          });
        },
      },
    ],
    server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] },
    build: { rollupOptions: { output: { manualChunks: { motion: ['framer-motion'] } } } },
  };
});
