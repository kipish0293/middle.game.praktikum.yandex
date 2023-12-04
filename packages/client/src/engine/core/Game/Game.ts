import { AbstractScene } from '../AbstractScene/AbstractScene';
import { InputService } from '../InputService/InputService';
import { EntityService } from '../EntityService/EntityService';
import { Entities } from '../../entities/types/Entities';

export class Game {
  private readonly _canvas: HTMLCanvasElement;

  private readonly _context: CanvasRenderingContext2D;

  private _level = 1;

  private _maxLevelCount = 3;

  private _enemyKillScore = 50_000;

  private _activeScene: AbstractScene;

  private bgSound = new Audio('sounds/game.mp3');

  private gameOverSound = new Audio('sounds/gameOver.mp3');

  private gameWinSound = new Audio('sounds/gameWin.mp3');

  private _stopped = false;

  private _levelCompleted = false;

  private _onGameOverCb: () => void;

  private _onLevelUpCb: () => void;

  private _onScoreUpdate: (score: number) => void;

  private _onGameWinCb: () => void;

  public constructor(
    canvas: HTMLCanvasElement,
    InitialScene: new (game: Game) => AbstractScene,
    onGameOverCallback: () => void,
    onLevelUpCallback: () => void,
    onScoreUpdateCallback: (score: number) => void,
    onGameWinCallback: () => void,
    width = 800,
    height = 600,
  ) {
    EntityService.getInstance().destroyAllEntities();

    this._canvas = canvas;

    const context = this._canvas.getContext('2d');
    this._canvas.width = width;
    this._canvas.height = height;

    if (!context) {
      throw new Error('Canvas context should exist.');
    }

    this._context = context;
    this._activeScene = new InitialScene(this);
    this._context.imageSmoothingEnabled = false;

    this.bgSound.loop = true;
    this.bgSound.play();

    this._onGameOverCb = onGameOverCallback;
    this._onLevelUpCb = onLevelUpCallback;
    this._onScoreUpdate = onScoreUpdateCallback;
    this._onGameWinCb = onGameWinCallback;
  }

  public getContext() {
    return this._context;
  }

  public getCanvas() {
    return this._canvas;
  }

  public start() {
    let last = performance.now();
    const step = 1 / 60;
    let dt = 0;
    let now: number;

    let enemiesCount = 3;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const gameEndHandler = () => {
      this.stop();

      if (this._level === this._maxLevelCount) {
        this._onGameWinCb();
      } else {
        this._onLevelUpCb();
      }
    };

    const gameLoop = () => {
      if (this._stopped) {
        this._stopped = false;
        this.afterGameHasStopped();

        if (!this._levelCompleted || this._level === this._maxLevelCount) {
          return;
        }

        this._level += 1;
        this._levelCompleted = false;
        this._activeScene.init();
        this.bgSound.play();

        enemiesCount = 3 + (this._level - 1) * 2;
        this.gameWinSound.removeEventListener('ended', gameEndHandler);
      }

      now = performance.now();
      dt += Math.min(1, (now - last) / 1000);

      while (dt > step) {
        dt -= step;
        this.update(step);
      }

      last = now;

      this.render(dt);

      const entitiesMap = EntityService.getInstance().getEntitiesMap();

      const player = entitiesMap[Entities.PLAYER];
      const enemies = entitiesMap[Entities.ENEMY];

      if (!player && !this._levelCompleted) {
        this.stop();
        this.gameOverSound.play();
        this._onGameOverCb();
      }

      if (enemies?.length !== enemiesCount) {
        enemiesCount = enemies?.length;
        this._onScoreUpdate(this._enemyKillScore);
      }

      if (!enemies && !this._levelCompleted) {
        this._levelCompleted = true;

        this.bgSound.pause();
        this.bgSound.currentTime = 0;

        this.gameWinSound.play();
        this.gameWinSound.addEventListener('ended', gameEndHandler);
      }

      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }

  public stop() {
    this._stopped = true;
  }

  public update(deltaTime: number) {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._activeScene.update(deltaTime);
  }

  public render(deltaTime: number) {
    this._activeScene.render(deltaTime, this._context, this._canvas, this._level);
  }

  private afterGameHasStopped() {
    this._activeScene.destroy();
    InputService.getInstance().destroy();
    EntityService.getInstance().destroyAllEntities();

    this.bgSound.pause();
  }
}
