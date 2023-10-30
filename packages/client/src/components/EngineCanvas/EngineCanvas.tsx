import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Game, IntroScene } from '@app/engine';
import { Routes } from '@app/const';

export function EngineCanvas() {
  const navigate = useNavigate();

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

    if (canvasElement) {
      setGame(new Game(canvasElement, IntroScene, () => navigate(Routes.GAME_OVER)));
      setInitialRender(true);
    }
  }, []);

  return <canvas ref={onCanvasMount} />;
}
