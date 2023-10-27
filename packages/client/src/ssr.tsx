import { renderToString } from 'react-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

import { setupStore } from '@app/store';

import { App } from './App';
import './index.css';

const store = setupStore();
export const render = (url: string) =>
  renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>,
  );
