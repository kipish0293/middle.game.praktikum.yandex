import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setupStore } from '@app/store';

import './index.css';
import { App } from './App';

const store = setupStore();

const root = document.querySelector('#root') as HTMLElement;
ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
