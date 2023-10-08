import { Box, Button, Heading, Text } from '@chakra-ui/react';

import { EngineCanvas } from '@app/components';
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
    <Box
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      height="100vh"
    >
      <Box display="flex" alignItems="center" flexDirection="column" gap="40">
        <Heading>Ready?</Heading>
        <Text fontSize="2xl">Your highest score: {score.score}</Text>
        <Button onClick={onPlayClick} size="lg" colorScheme="red">
          Play
        </Button>
      </Box>
    </Box>
  );
}

function GameStaredPageView() {
  const dispatch = useAppDispatch();
  const onStopClick = () => {
    dispatch(gameStateActions.setGameState(GameState.Stopped));
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap="10"
    >
      <EngineCanvas />
      <Button onClick={onStopClick} size="lg" colorScheme="red">
        Stop
      </Button>
    </Box>
  );
}

function GameStoppedPageView() {
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.score);

  const onPlayAgainClick = () => {
    dispatch(gameStateActions.setGameState(GameState.Started));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap="10"
    >
      <Box textAlign="center">
        <Heading>Your current score: {score.score}</Heading>
        <Text>Your highest score: {score.score}</Text>
      </Box>
      <Button onClick={onPlayAgainClick} size="lg" colorScheme="red">
        Play Again
      </Button>
    </Box>
  );
}

const PageView = {
  [GameState.NotStarted]: <GameNotStartedPageView />,
  [GameState.Started]: <GameStaredPageView />,
  [GameState.Stopped]: <GameStoppedPageView />,
};

export function GamePage() {
  const gameState = useAppSelector((state) => state.gameState);
  return PageView[gameState.gameSate];
}
