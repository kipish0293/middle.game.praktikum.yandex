import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import './src/index.css';

import { rootReducer, setupStore } from '@app/store';

import { App } from './src/App';

type State = ReturnType<typeof rootReducer>;

export const render = (url: string, initialStoreData: State | undefined) => {
  const store = setupStore(initialStoreData);

  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
  );
};
