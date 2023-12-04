import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Game, IntroScene } from '@app/engine';
import { Routes } from '@app/const';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { gameStateActions, scoreActions } from '@app/store';
import { GameState } from '@app/types';

export function EngineCanvas() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const score = useAppSelector((state) => state.score.score);

  const [initialRender, setInitialRender] = useState<boolean>(false);
  const [game, setGame] = useState<Game | undefined>();

  useEffect(() => {
    if (!game) {
      return;
    }

    game.start();
    // eslint-disable-next-line consistent-return
    return () => game.stop();
  }, [game]);

  const onCanvasMount = useCallback((canvasElement: HTMLCanvasElement) => {
    if (initialRender) {
      return;
    }

    const onGameOver = () => {
      navigate(Routes.GAME_OVER);
      dispatch(gameStateActions.setGameState(GameState.NotStarted));
    };
    const onLevelUp = () => dispatch(gameStateActions.upGameLevel());
    const onScoreUpdate = (scr: number) => dispatch(scoreActions.updateScore(scr));
    const onGameWin = () => dispatch(gameStateActions.setGameState(GameState.Stopped));

    if (canvasElement) {
      const gameInstance = new Game(
        canvasElement,
        IntroScene,
        onGameOver,
        onLevelUp,
        onScoreUpdate,
        onGameWin,
      );

      setGame(gameInstance);
      setInitialRender(true);
    }
  }, []);

  return <canvas ref={onCanvasMount} />;
}
