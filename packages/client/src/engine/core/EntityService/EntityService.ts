import { AbstractEntity } from '../AbstractEntity/AbstractEntity';

import { EntitiesMapItem } from './types';

export class EntityService {
  private static _instance: EntityService;

  private readonly entitiesMap: Record<string, AbstractEntity[]>;

  private constructor() {
    this.entitiesMap = {};
  }

  public static getInstance() {
    if (EntityService._instance) {
      return EntityService._instance;
    }
    EntityService._instance = new EntityService();
    return EntityService._instance;
  }

  public getEntitiesMap() {
    return this.entitiesMap;
  }

  public getEntities() {
    return (
      Object.entries(this.entitiesMap)
        .map(([_, _entities]) => _entities)
        // eslint-disable-next-line unicorn/no-array-reduce
        .reduce((accumulator, current) => [...accumulator, ...current])
    );
  }

  public registerEntity(item: EntitiesMapItem) {
    if (!this.entitiesMap[item.type]) {
      this.entitiesMap[item.type] = [];
    }
    this.entitiesMap[item.type].push(item.entity);
  }

  public destroyEntity(item: EntitiesMapItem) {
    const index = this.entitiesMap[item.type].indexOf(item.entity);
    if (index !== -1) {
      this.entitiesMap[item.type].splice(index, 1);
    }
  }

  public destroyAllEntities() {
    for (const key in this.entitiesMap) {
      if (Object.hasOwn(this.entitiesMap, key)) {
        delete this.entitiesMap[key];
      }
    }
  }
}
