import { AbstractEntity, Vector } from '@app/engine';
import { BulletType } from '@app/types';

import { Directions } from '../../../types/Directions';
import bullet from '../../../assets/images/game/bullet.png';
import { Coords } from '../../../types/Coords';
import Destroy from '../../Actions/Destroy';
import { Entities } from '../types/Entities';
import CheckCollision from '../../Actions/CheckCollision';
import { Wall } from '../Wall/Wall';

export class Bullet extends AbstractEntity {
  public direction: Directions;

  public image: HTMLImageElement = new Image();

  public fillColor = 'transparent';

  public type: BulletType;

  public constructor(
    direction: Directions,
    coords: Coords,
    height: number,
    width: number,
    type: BulletType,
  ) {
    super({ position: new Vector(coords.x, coords.y), height, width });

    this.image.src = bullet;
    this.direction = direction;
    this.type = type;
  }

  public render(_: number, context: CanvasRenderingContext2D) {
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

    this.checkOutOfScene(context);

    if (this.wallCollision.collision) {
      this.destroy();
      (this.wallCollision.entity.entity as Wall).destroy();
    }
  }

  public destroy() {
    Destroy.deleteEntity({ type: Entities.BULLET, entity: this });
  }

  private checkOutOfScene(context: CanvasRenderingContext2D) {
    if (
      this.posX > context.canvas.width ||
      this.posY > context.canvas.height ||
      this.posX < 0 ||
      this.posY < 0
    ) {
      this.destroy();
    }
  }

  private get wallCollision() {
    return CheckCollision.checkCollisionWithType(this, Entities.WALL);
  }

  private handleMove() {
    switch (this.direction) {
      case Directions.RIGHT: {
        this.move(new Vector(3.5, 0));
        break;
      }
      case Directions.LEFT: {
        this.move(new Vector(-3.5, 0));
        break;
      }
      case Directions.DOWN: {
        this.move(new Vector(0, 3.5));
        break;
      }
      case Directions.UP: {
        this.move(new Vector(0, -3.5));
        break;
      }
      default:
      // do nothing
    }
  }

  public update() {
    this.handleMove();
  }
}
