/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable import/no-extraneous-dependencies */

import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import type { ViteDevServer } from 'vite';
import { createServer as createViteServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';
import bodyParser from 'body-parser';
import jsesc from 'jsesc';

import type { RequestWithUser } from './types/RequestWithUser';
import { reactionRoutes } from './routes/reaction';
import preloadState from './preloadState';
// import { dbConnect } from './db/connect';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import { threadRoutes } from './routes/thread';
import { answerRoutes } from './routes/answer';
import { commentRoutes } from './routes/comment';

dotenv.config();

const isDevelopment = () => process.env.NODE_ENV === 'development';
const { YANDEX_API_URL, SERVER_PORT } = process.env;

const startServer = async () => {
  const app = express();
  app.use(
    '/api/v2/',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: { '*': '' },
      target: YANDEX_API_URL,
    }),
  );
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const port = Number(SERVER_PORT) || 3000;

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

  app.use(authMiddleware);

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDevelopment()) {
    app.use('/src', express.static(path.resolve(distributionPath, 'src'), { index: false }));
  }

  app.use('/api/forum/thread', threadRoutes);
  app.use('/api/forum/answer', answerRoutes);
  app.use('/api/forum/comment', commentRoutes);
  app.use('/api/forum/reaction', reactionRoutes);

  app.use('*', async (request: RequestWithUser, res, next) => {
    const url = request.originalUrl;

    try {
      let template: string;

      if (isDevelopment()) {
        template = fs.readFileSync(path.resolve(sourcePath, 'index.html'), 'utf8');

        template = await vite!.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(distributionPath, 'index.html'), 'utf8');
      }

      let render: (url: string, preloadedState?: Record<string, any>) => Promise<string>;
      const preloadedState = await preloadState(request.user || {});

      render = isDevelopment()
        ? (await vite!.ssrLoadModule(path.resolve(sourcePath, 'ssr.tsx'))).render
        : (await import(ssrClientPath)).render;

      const preloadedStateSerialized = jsesc(preloadedState, {
        json: true,
        isScriptContext: true,
      });

      const appHtml = await render(url, JSON.parse(preloadedStateSerialized));

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--store-data-->', preloadedStateSerialized);

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
  app.use(errorHandler);
};

startServer();
