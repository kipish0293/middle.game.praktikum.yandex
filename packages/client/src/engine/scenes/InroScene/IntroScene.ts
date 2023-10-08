import { AbstractScene } from '../../core/AbstractScene/AbstractScene';
import { SampleObstacle } from '../../entities/SampleObstacle/SampleObstacle';
import { SampleEntity } from '../../entities/SampleEntity/SampleEntity';

export class IntroScene extends AbstractScene {
  public constructor() {
    super();
    const obstacles = [new SampleObstacle()];
    const obstaclesMap = obstacles.map((obstacle) => ({ type: 'obstacle', entity: obstacle }));
    this.registerEntities(...obstaclesMap, { type: 'player', entity: new SampleEntity() });
  }

  public render(deltaTime: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
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
