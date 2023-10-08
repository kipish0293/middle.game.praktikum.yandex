import { EntityService } from '../EntityService/EntityService';
import { EntitiesMapItem } from '../EntityService/types';

export abstract class AbstractScene {
  protected readonly entityService = EntityService.getInstance();

  public abstract update(deltaTime: number): void;

  public abstract render(
    deltaTime: number,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ): void;

  public registerEntities(...items: EntitiesMapItem[]) {
    for (const item of items) {
      this.entityService.registerEntity(item);
    }
  }

  public abstract onDestroy?(): void;

  public destroyEntity(item: EntitiesMapItem) {
    this.entityService.destroyEntity(item);
  }

  public destroy() {
    this.destroyAllEntities();
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  public destroyAllEntities() {
    this.entityService.destroyAllEntities();
  }
}
