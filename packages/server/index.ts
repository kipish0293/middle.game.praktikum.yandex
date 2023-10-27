/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable unicorn/prefer-module */

import * as fs from 'node:fs';
import * as path from 'node:path';

import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import express from 'express';

dotenv.config();

const isDevelopment = () => process.env.NODE_ENV === 'development';

const startServer = async () => {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distributionPath = path.dirname(require.resolve('client/dist/index.html'));
  const sourcePath = path.dirname(require.resolve('client'));
  const ssrClientPath = require.resolve('client/dist-ssr/client.js');

  if (isDevelopment()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: sourcePath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDevelopment()) {
    app.use('/src', express.static(path.resolve(distributionPath, 'src'), { index: false }));
  }

  app.use('*', async (request, res, next) => {
    const url = request.originalUrl;

    try {
      let template: string;

      if (isDevelopment()) {
        template = fs.readFileSync(path.resolve(sourcePath, 'index.html'), 'utf8');

        template = await vite!.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(distributionPath, 'index.html'), 'utf8');
      }

      const render = isDevelopment()
        ? (await vite!.ssrLoadModule(path.resolve(sourcePath, 'src/ssr.tsx'))).render
        : (await import(ssrClientPath)).render;

      const appHtml = await render(url);

      const html = template.replace('<!--ssr-outlet-->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      if (isDevelopment()) {
        vite!.ssrFixStacktrace(error as Error);
      }
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
};

startServer();
