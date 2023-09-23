import AbstractScene from '../../core/AbstractScene';
import SampleEntity from '../../entities/SampleEntity';
import SampleObstacle from '../../entities/SampleObstacle';

export default class IntroScene extends AbstractScene {
  public sampleEntity = new SampleEntity();

  public obstacles = [new SampleObstacle()];

  public constructor() {
    super();
    this.registerEntities(this.sampleEntity, ...this.obstacles);
  }

  public render(deltaTime: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.strokeRect(0, 0, canvas.width, canvas.height);
    for (const entity of this.entityService.entities) {
      entity.render(deltaTime, context);
    }
  }

  public update(deltaTime: number) {
    for (const entity of this.entityService.entities) {
      entity.update(deltaTime);
    }
    for (const obstacle of this.obstacles) {
      if (obstacle.checkCollision(this.sampleEntity)) {
        console.log('intersects');
      }
    }
  }
}
