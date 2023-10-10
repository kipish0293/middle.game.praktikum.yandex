import { Box, Button, Heading, IconButton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toggleFullScreen } from '@app/utils/fullScreenApi';

import { EngineCanvas, Icons } from '@app/components';
import { GameState } from '@app/types';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { gameStateActions } from '@app/store';

function GameNotStartedPageView() {
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.score);

  const onPlayClick = () => {
    dispatch(gameStateActions.setGameState(GameState.Started));
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="40">
      <Heading>Ready?</Heading>
      <Text fontSize="2xl">Your highest score: {score.score}</Text>
      <Button onClick={onPlayClick} size="lg" colorScheme="red">
        Play
      </Button>
    </Box>
  );
}

function GameStaredPageView() {
  const dispatch = useAppDispatch();

  const onStopClick = () => {
    dispatch(gameStateActions.setGameState(GameState.Stopped));
  };

  return (
    <>
      <EngineCanvas />
      <Button onClick={onStopClick} size="lg" colorScheme="red">
        Stop
      </Button>
    </>
  );
}

function GameStoppedPageView() {
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.score);

  const onPlayAgainClick = () => {
    dispatch(gameStateActions.setGameState(GameState.Started));
  };

  return (
    <>
      <Box textAlign="center">
        <Heading>Your current score: {score.score}</Heading>
        <Text>Your highest score: {score.score}</Text>
      </Box>
      <Button onClick={onPlayAgainClick} size="lg" colorScheme="red">
        Play Again
      </Button>
    </>
  );
}

const PageView = {
  [GameState.NotStarted]: <GameNotStartedPageView />,
  [GameState.Started]: <GameStaredPageView />,
  [GameState.Stopped]: <GameStoppedPageView />,
};

export function GamePage() {
  const gameState = useAppSelector((state) => state.gameState);

  const [fullScreen, setFullScreen] = useState<boolean>(!!document.fullscreenElement);

  useEffect(() => {
    const eventHandler = () => setFullScreen(!!document.fullscreenElement);

    document.addEventListener('fullscreenchange', eventHandler);
    return () => document.removeEventListener('fullscreenchange', eventHandler);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap="10"
    >
      <IconButton
        position="absolute"
        top={30}
        right={30}
        aria-label="fullscreen toggle"
        icon={fullScreen ? <Icons.FullScreenOffIcon /> : <Icons.FullScreenOnIcon />}
        onClick={toggleFullScreen}
      />
      {PageView[gameState.gameSate]}
    </Box>
  );
}
