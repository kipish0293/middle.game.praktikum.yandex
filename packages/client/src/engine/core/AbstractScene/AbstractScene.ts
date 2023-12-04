import { EntityService } from '../EntityService/EntityService';
import { EntitiesMapItem } from '../EntityService/types';

export abstract class AbstractScene {
  protected readonly entityService = EntityService.getInstance();

  public abstract update(deltaTime: number): void;

  public abstract render(
    deltaTime: number,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    level?: number,
  ): void;

  public registerEntities(...items: EntitiesMapItem[]) {
    for (const item of items) {
      this.entityService.registerEntity(item);
    }
  }

  public abstract onInit?(): void;

  public abstract onDestroy?(): void;

  public destroyEntity(item: EntitiesMapItem) {
    this.entityService.destroyEntity(item);
  }

  public init() {
    if (this.onInit) {
      this.onInit();
    }
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
