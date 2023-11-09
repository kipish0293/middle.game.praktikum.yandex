/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/prefer-module */
import * as fs from 'node:fs';
import * as path from 'node:path';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import type { ViteDevServer } from 'vite';
import { createServer as createViteServer } from 'vite';

import preloadState from './preloadState';

dotenv.config();

const isDevelopment = () => process.env.NODE_ENV === 'development';

const startServer = async () => {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3000;

  let vite: ViteDevServer | undefined;
  let distributionPath = '/';
  let ssrClientPath = '/';
  if (!isDevelopment()) {
    distributionPath = path.dirname(require.resolve('client/dist/index.html'));
    ssrClientPath = require.resolve('client/ssr-dist/client.js');
  }
  const sourcePath = path.dirname(require.resolve('client'));

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

      let render: (url: string) => Promise<string>;

      render = isDevelopment()
        ? (await vite!.ssrLoadModule(path.resolve(sourcePath, 'ssr.tsx'))).render
        : (await import(ssrClientPath)).render;

      const appHtml = await render(url);

      const preloadedState = await preloadState();

      const preloadedStateHtml = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
        preloadedState,
      )}</script>`;

      const html = template.replace('<!--ssr-outlet-->', preloadedStateHtml + appHtml);

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
