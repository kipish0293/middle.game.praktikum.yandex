import './App.css';

import { registerFullScreenEvents } from '@app/utils/fullScreenApi';
import { startServiceWorker } from '@app/utils/startServiceWorker';
import { Center, ChakraProvider, Spinner } from '@chakra-ui/react';
import '@fontsource/ubuntu-mono/cyrillic.css';
import '@fontsource/ubuntu-mono/latin.css';
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorBoundary, Layout, ProtectedRoute } from '@app/components';
import { Routes as RouteNames } from '@app/const';
import { useAppSelector } from '@app/hooks';
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

import { theme } from './chakraTheme';
import { ForumList } from './pages/forum/components/ForumList';
import { ForumTopic } from './pages/forum/components/ForumTopic';

export function App() {
  const initialDataFetch = useRef(false);
  const { isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    registerFullScreenEvents();

    if (initialDataFetch.current) {
      return;
    }
    initialDataFetch.current = true;

    // в режиме разработки срабатывает дважды из-за React.StrictMode
    startServiceWorker();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary isPage componentName="App">
        {isLoading ? (
          <Center h="100vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          <Routes>
            <Route path={RouteNames.ROOT} element={<ProtectedRoute />}>
              <Route path={RouteNames.SIGNIN} element={<LoginPage />} />
              <Route path={RouteNames.REGISTER} element={<RegisterPage />} />
              <Route path={RouteNames.GAME} element={<GamePage />} />
              <Route index element={<MainPage />} />
              <Route path={RouteNames.SERVICE_UNAVAILABLE} element={<ServiceUnavailable />} />
              <Route path={RouteNames.ROOT} element={<Layout />}>
                <Route path={RouteNames.PROFILE} element={<ProfilePage />} />
                <Route path={RouteNames.FORUM} element={<ForumPage />}>
                  <Route index element={<ForumList />} />
                </Route>
                <Route path={RouteNames.LEADER_BOARD} element={<LeaderboardPage />} />
                <Route path={RouteNames.GAME_OVER} element={<GameOverPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/forum/:id" element={<ForumTopic />} />
          </Routes>
        )}
      </ErrorBoundary>
    </ChakraProvider>
  );
}
