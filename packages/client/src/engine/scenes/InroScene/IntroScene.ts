import { AbstractScene } from '../../core/AbstractScene/AbstractScene';
import { Player } from '../../entities/Player/Player';
import { makeWalls } from '../../entities/Wall/makeWalls';
import { Entities } from '../../entities/types/Entities';
import { EntitiesMapItem } from '../../core/EntityService/types';

export class IntroScene extends AbstractScene {
  private canvasSize: { width: number; height: number } | undefined = undefined;

  public constructor() {
    super();
    this.registerEntities({
      type: Entities.PLAYER,
      entity: new Player(),
    });
  }

  private addWalls() {
    if (!this.canvasSize?.width || !this.canvasSize.height) {
      return;
    }
    this.registerEntities(
      ...makeWalls(50, 50, this.canvasSize?.width, this.canvasSize?.height, 120),
    );
  }

  public addObjectToScene(entity: EntitiesMapItem) {
    this.registerEntities(entity);
  }

  public render(deltaTime: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (!this.canvasSize) {
      this.canvasSize = { width: context.canvas.width, height: context.canvas.height };
      this.addWalls();
    }
    context.strokeRect(0, 0, canvas.width, canvas.height);
    for (const entity of this.entityService.getEntities()) {
      entity.render(deltaTime, context);
    }
  }

  public update(deltaTime: number) {
    const entities = this.entityService.getEntities();
    for (const entity of entities) {
      entity.update(deltaTime);
    }
  }

  public onDestroy(): void {}
}
