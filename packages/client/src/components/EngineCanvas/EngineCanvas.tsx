import { useEffect, useRef, useState } from 'react';

import Game from '../../engine/core/Game';
import IntroScene from '../../engine/scenes/InroScene';

function EngineCanvas() {
  const reference = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | undefined>();

  useEffect(() => {
    if (!game) {
      return;
    }
    game.start();
  }, [game]);

  useEffect(() => {
    if (reference.current) {
      setGame(new Game(reference.current, IntroScene));
    }
  }, [reference]);

  return <canvas ref={reference} />;
}

export default EngineCanvas;
