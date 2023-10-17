import { debounce } from 'lodash';

import { AbstractEntity, InputService, Vector } from '@app/engine';

import { Directions } from '../../../types/Directions';
import { KeyCode } from '../../core/InputService/types';
import tankUp from '../../../assets/images/game/tankUp.png';
import tankLeft from '../../../assets/images/game/tankLeft.png';
import tankRight from '../../../assets/images/game/tankRight.png';
import tankDown from '../../../assets/images/game/tankDown.png';
import Fire from '../../Actions/Fire';
import { Entities } from '../types/Entities';
import { makeBullet } from '../Bullet/makeBullet';
import CheckCollision from '../../Actions/CheckCollision';

const image = {
  down: tankDown,
  left: tankLeft,
  right: tankRight,
  up: tankUp,
};

export class Player extends AbstractEntity {
  private inputService: InputService = InputService.getInstance();

  private bulletSize = 10;

  private canvasSize: { width: number; height: number } | undefined = undefined;

  public direction: Directions = Directions.RIGHT;

  public velocity = new Vector(0, 0);

  public mass = 100;

  public force = new Vector(0, this.mass * 100);

  public acc = new Vector(0, 0);

  public image: HTMLImageElement = new Image();

  public fillColor = 'transparent';

  private readonly fire: () => void;

  public constructor() {
    super({ position: new Vector(1, 1), height: 45, width: 40 });
    this.image.src = tankUp;
    this.fire = debounce(this._fire, 40);
  }

  public render(_: number, context: CanvasRenderingContext2D) {
    if (!this.canvasSize) {
      this.canvasSize = { width: context.canvas.width, height: context.canvas.height };
    }
    const previousFillStyle = context.fillStyle;
    this.prevPosition = this.position.copy();
    context.fillStyle = this.fillColor;
    context.fillRect(this.posX, this.posY, this.width, this.height);
    context.fillStyle = previousFillStyle;
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height,
    );
  }

  private get wallCollision() {
    return CheckCollision.checkCollisionWithType(this, Entities.WALL).collision;
  }

  private handleInput() {
    if (this.inputService.getInputKeyState(KeyCode.Space)) {
      this.fire();
    }
    if (this.inputService.getInputKeyState(KeyCode.KeyW)) {
      this.direction = Directions.UP;
    }
    if (this.inputService.getInputKeyState(KeyCode.KeyS)) {
      this.direction = Directions.DOWN;
    }
    if (this.inputService.getInputKeyState(KeyCode.KeyA)) {
      this.direction = Directions.LEFT;
    }
    if (this.inputService.getInputKeyState(KeyCode.KeyD)) {
      this.direction = Directions.RIGHT;
    }

    if (
      this.inputService.getInputKeyState(KeyCode.KeyW) ||
      this.inputService.getInputKeyState(KeyCode.KeyS) ||
      this.inputService.getInputKeyState(KeyCode.KeyA) ||
      this.inputService.getInputKeyState(KeyCode.KeyD)
    ) {
      switch (this.direction) {
        case Directions.RIGHT: {
          this.move(new Vector(1, 0));
          break;
        }
        case Directions.LEFT: {
          this.move(new Vector(-1, 0));
          break;
        }
        case Directions.DOWN: {
          this.move(new Vector(0, 1));
          break;
        }
        case Directions.UP: {
          this.move(new Vector(0, -1));
          break;
        }
        default: // do nothing
      }
    }
  }

  private moveBack() {
    switch (this.direction) {
      case Directions.RIGHT: {
        this.move(new Vector(-1, 0));
        break;
      }
      case Directions.LEFT: {
        this.move(new Vector(1, 0));
        break;
      }
      case Directions.DOWN: {
        this.move(new Vector(0, -1));
        break;
      }
      case Directions.UP: {
        this.move(new Vector(0, 1));
        break;
      }
      // no default
    }
  }

  private handleOutOfCanvas() {
    if (
      this.posX < 0 ||
      this.posY < 0 ||
      (this.canvasSize && this.posX + this.width > this.canvasSize.width) ||
      (this.canvasSize && this.posY + this.height > this.canvasSize.height)
    ) {
      this.moveBack();
    }
  }

  private handleWallCollision() {
    if (this.wallCollision) {
      this.moveBack();
    }
  }

  private _fire() {
    Fire.makeShot({
      type: Entities.BULLET,
      entity: makeBullet({
        direction: this.direction,
        playerCoords: { x: this.posX, y: this.posY },
        size: this.bulletSize,
        playerWidth: this.width,
        playerHeight: this.height,
      }),
    });
  }

  public update() {
    this.image.src = image[this.direction];
    this.handleWallCollision();
    this.handleOutOfCanvas();
    this.handleInput();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private addForce(deltaTime: number) {
    this.acc = this.force.divideScalar(this.mass);
    this.velocity = this.velocity.addScaled(this.acc, deltaTime);
    this.position = this.position.addScaled(this.velocity, deltaTime);
  }
}
