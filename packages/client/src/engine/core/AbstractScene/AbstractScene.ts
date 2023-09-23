import AbstractEntity from '../AbstractEntity';
import EntityService from '../EntityService';

export default abstract class AbstractScene {
  protected readonly entityService = EntityService.getInstance();

  public abstract update(deltaTime: number): void;

  public abstract render(
    deltaTime: number,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ): void;

  public registerEntities(...entities: AbstractEntity[]) {
    for (const entity of entities) {
      this.entityService.registerEntity(entity);
    }
  }

  public destroyEntity(entity: AbstractEntity) {
    this.entityService.destroyEntity(entity);
  }

  public destroy() {
    this.destroyAllEntities();
  }

  public destroyAllEntities() {
    this.entityService.destroyAllEntities();
  }
}
