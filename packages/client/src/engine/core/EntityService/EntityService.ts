import AbstractEntity from '../AbstractEntity';

export default class EntityService {
  private static _instance: EntityService;

  public readonly entities: AbstractEntity[] = [];

  private constructor() {
    this.entities = [];
  }

  public static getInstance() {
    if (EntityService._instance) {
      return EntityService._instance;
    }
    EntityService._instance = new EntityService();
    return EntityService._instance;
  }

  public registerEntity(entity: AbstractEntity) {
    this.entities.push(entity);
  }

  public registerEntities(...entities: AbstractEntity[]) {
    this.entities.push(...entities);
  }

  public destroyEntity(entity: AbstractEntity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }

  public destroyAllEntities() {
    this.entities.length = 0;
  }
}
