import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function robloxProxyPlugin(): Plugin {
  return {
    name: 'roblox-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        if (req.url === '/roblox-store-source.zip' || req.url.startsWith('/roblox-store-source.zip?') ||
            req.url === '/dist.zip' || req.url.startsWith('/dist.zip?') ||
            req.url === '/roblox-store-dist.zip' || req.url.startsWith('/roblox-store-dist.zip?')) {
          try {
            const fileName = req.url.includes('dist') ? 'roblox-store-dist.zip' : 'roblox-store-source.zip';
            const zipPath = path.resolve(__dirname, `public/${fileName}`);
            if (fs.existsSync(zipPath)) {
              const stat = fs.statSync(zipPath);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/zip');
              res.setHeader('Content-Length', stat.size);
              res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
              res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
              fs.createReadStream(zipPath).pipe(res);
              return;
            }
          } catch (err: any) {
            console.error('Error serving zip:', err);
          }
        }

        if (req.url.startsWith('/api/roblox/catalog')) {
          try {
            const urlObj = new URL(req.url, 'http://localhost:3000');
            const targetUrl = `https://catalog.roblox.com/v1/search/items/details${urlObj.search}`;
            const upstream = await fetch(targetUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
              }
            });
            const text = await upstream.text();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.statusCode = upstream.status;
            res.end(text);
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 502;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        if (req.url.startsWith('/api/roblox/thumbnails')) {
          try {
            const urlObj = new URL(req.url, 'http://localhost:3000');
            const pathSuffix = urlObj.pathname.replace(/^\/api\/roblox\/thumbnails/, '');
            const targetUrl = `https://thumbnails.roblox.com${pathSuffix}${urlObj.search}`;
            const upstream = await fetch(targetUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
              }
            });
            const text = await upstream.text();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.statusCode = upstream.status;
            res.end(text);
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 502;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), robloxProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

