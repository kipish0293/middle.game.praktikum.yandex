import { AbstractEntity, CollisionShape, Vector } from '@app/engine';

export class CollisionResolver {
  /**
   * Разрешает коллизию двух объектов. Выталкивает первый из второго.
   * @param firstEntity Первый объект, будет вытолкнут из второго.
   * @param secondEntity Второй объект.
   */
  public static resolveCollision(firstEntity: AbstractEntity, secondEntity: AbstractEntity) {
    if (!this.checkCollision(firstEntity, secondEntity)) {
      return;
    }
    const collisionShape = this.calculateCollisionShape(firstEntity, secondEntity);
    console.log(collisionShape);
    if (collisionShape.width > collisionShape.height) {
      firstEntity.move(new Vector(collisionShape.width, 0));
    } else if (collisionShape.width < collisionShape.height) {
      firstEntity.move(new Vector(0, collisionShape.height));
    } else {
      firstEntity.move(new Vector(collisionShape.width, collisionShape.height));
    }
  }

  public static calculateCollisionShape(
    firstEntity: AbstractEntity,
    secondEntity: AbstractEntity,
  ): CollisionShape {
    const [x1Min, x1Max] = [firstEntity.posX, firstEntity.posX + firstEntity.width];
    const [y1Min, y1Max] = [firstEntity.posY, firstEntity.posY + firstEntity.height];

    const [x2Min, x2Max] = [secondEntity.posX, secondEntity.posX + secondEntity.width];
    const [y2Min, y2Max] = [secondEntity.posY, secondEntity.posY + secondEntity.height];

    if (x1Max < x2Min || x1Min > x2Max || y1Max < y2Min || y1Min > y2Max) {
      return {
        position: firstEntity.position.copy(),
        width: 0,
        height: 0,
      };
    }

    const xOverlapMin = Math.max(x1Min, x2Min);
    const xOverlapMax = Math.min(x1Max, x2Max);
    const yOverlapMin = Math.max(y1Min, y2Min);
    const yOverlapMax = Math.min(y1Max, y2Max);

    return {
      position: new Vector(xOverlapMin, yOverlapMin),
      width: xOverlapMax - xOverlapMin,
      height: yOverlapMax - yOverlapMin,
    };
  }

  public static checkCollision(firstEntity: AbstractEntity, secondEntity: AbstractEntity) {
    const collisionShape = this.calculateCollisionShape(firstEntity, secondEntity);
    return collisionShape.width * collisionShape.height > 0;
  }
}
