import { useEffect, useRef, useState } from 'react';

import { Game, IntroScene } from '@app/engine';

export function EngineCanvas() {
  const canvasRendered = useRef(false);
  const reference = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | undefined>();

  useEffect(() => {
    if (!game) {
      return;
    }
    game.start();
    // eslint-disable-next-line consistent-return
    return () => {
      game.stop();
    };
  }, [game]);

  useEffect(() => {
    if (canvasRendered.current) {
      return;
    }
    if (reference.current) {
      setGame(new Game(reference.current, IntroScene));
      canvasRendered.current = true;
    }
  }, [reference]);

  return <canvas ref={reference} />;
}
