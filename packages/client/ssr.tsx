import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import './src/index.css';

import { setupStore } from '@app/store';

import { App } from './src/App';

const store = setupStore();
export const render = (url: string) =>
  renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
  );
