import { Box, Button, Heading, IconButton, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { registerFullScreenEvents, toggleFullScreen } from '@app/utils/fullScreenApi';

import { EngineCanvas, Icons } from '@app/components';
import { GameState } from '@app/types';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { gameStateActions, scoreActions, sendScore } from '@app/store';
import { teamName } from '@app/const';

import { useDocument } from '../../hooks/useDocument';
import { getTeamLeaderboard } from '../../store/slices/GameActionCreators';

function GameNotStartedPageView() {
  const dispatch = useAppDispatch();

  const { score, highestScore, isLoading } = useAppSelector((state) => state.score);

  useEffect(() => {
    const leaderboardData = {
      ratingFieldName: 'score',
      cursor: 0,
      limit: 10,
    };

    const sendScoreData = {
      data: {
        score,
      },
      ratingFieldName: 'score',
      teamName,
    };

    dispatch(sendScore(sendScoreData));
    dispatch(getTeamLeaderboard(leaderboardData));
  }, []);

  const onPlayClick = () => {
    dispatch(gameStateActions.setGameState(GameState.Started));
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="40">
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Heading>Ready?</Heading>
          <Text fontSize="2xl">Your highest score: {highestScore}</Text>
          <Button onClick={onPlayClick} size="lg" colorScheme="red">
            Play
          </Button>
        </>
      )}
    </Box>
  );
}

function GameStaredPageView() {
  const dispatch = useAppDispatch();

  const score = useAppSelector((state) => state.score.score);
  const level = useAppSelector((state) => state.gameState.level);

  useEffect(() => {
    dispatch(gameStateActions.resetGameLevel());
    dispatch(scoreActions.resetScore());
  }, []);

  const onStopClick = () => {
    dispatch(gameStateActions.setGameState(GameState.Stopped));
  };

  return (
    <>
      <Text fontSize="xl" letterSpacing="widest">
        Level: {level} Score: {score}
      </Text>
      <EngineCanvas />
      <Button size="lg" colorScheme="red" onClick={onStopClick}>
        Stop
      </Button>
    </>
  );
}

function GameStoppedPageView() {
  const dispatch = useAppDispatch();

  const { score, highestScore } = useAppSelector((state) => state.score);

  useEffect(() => {
    const leaderboardData = {
      ratingFieldName: 'score',
      cursor: 0,
      limit: 10,
    };

    dispatch(getTeamLeaderboard(leaderboardData));
  }, []);

  const onPlayAgainClick = () => {
    dispatch(gameStateActions.setGameState(GameState.Started));
  };

  return (
    <>
      <Box textAlign="center">
        <Heading>Your current score: {score}</Heading>
        <Text>Your highest score: {highestScore}</Text>
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

  const document = useDocument();

  const [fullScreen, setFullScreen] = useState<boolean>(!!document?.fullscreenElement);

  useEffect(() => {
    registerFullScreenEvents();

    const eventHandler = () => setFullScreen(!!document?.fullscreenElement);

    document?.addEventListener('fullscreenchange', eventHandler);
    return () => document?.removeEventListener('fullscreenchange', eventHandler);
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
      {PageView[gameState.gameState]}
    </Box>
  );
}
