import 'jest-canvas-mock';
import { AbstractScene, Game } from '@app/engine';

const mockCallback = () => console.log('mock');

class MockScene extends AbstractScene {
  public constructor() {
    super();
  }

  public render() {}

  public update() {}

  public onDestroy() {}
}

describe('Game', () => {
  let game: undefined | Game;
  let animationFrameMock: jest.SpyInstance<number, [FrameRequestCallback]>;

  beforeEach(() => {
    let animationFrameCount = 0;

    animationFrameMock = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
      if (animationFrameCount === 0) {
        animationFrameCount = 1;
      }

      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    animationFrameMock.mockRestore();
    game = undefined;
  });

  it('create an instance of Game', () => {
    game = new Game(document.createElement('canvas'), MockScene, mockCallback, mockCallback);

    expect(game).toBeInstanceOf(Game);
  });

  it('stop the game loop', () => {
    game = new Game(document.createElement('canvas'), MockScene, mockCallback, mockCallback);

    game?.start();
    game?.stop();

    expect(animationFrameMock).toHaveBeenCalledTimes(1);
  });

  it('call render method', () => {
    let renderCalled = false;
    game = new Game(document.createElement('canvas'), MockScene, mockCallback, mockCallback);

    if (game) {
      game.render = () => {
        renderCalled = true;
      };
      game.start();
    }

    expect(renderCalled).toBe(true);
  });
});
