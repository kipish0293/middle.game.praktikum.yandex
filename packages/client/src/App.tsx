import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/ubuntu-mono/cyrillic.css';
import '@fontsource/ubuntu-mono/latin.css';
import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorBoundary, Layout } from '@app/components';
import { useAppDispatch } from '@app/hooks';
import {
  ForumPage,
  GameOverPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ServiceUnavailable,
} from '@app/pages';
import { getUser } from '@app/store';
import { startServiceWorker } from '@app/utils';

import { theme } from './chakraTheme';
import { ForumList } from './pages/forum/components/ForumList';
import { ForumTopic } from './pages/forum/components/ForumTopic';

export function App() {
  const dispatch = useAppDispatch();
  const initialDataFetch = useRef(false);

  useEffect(() => {
    if (initialDataFetch.current) {
      return;
    }
    initialDataFetch.current = true;
    dispatch(getUser());

    // в режиме разработки срабатывает дважды из-за React.StrictMode
    startServiceWorker();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary isPage componentName="App">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route index element={<MainPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="forum" element={<ForumPage />}>
                <Route index element={<ForumList />} />
                <Route path=":id" element={<ForumTopic />} />
              </Route>
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="service-unavailable" element={<ServiceUnavailable />} />
              <Route path="game" element={<GamePage />} />
              <Route path="game-over" element={<GameOverPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ChakraProvider>
  );
}
