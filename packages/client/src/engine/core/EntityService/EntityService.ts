import { isEmpty } from 'lodash';

import { AbstractEntity } from '../AbstractEntity/AbstractEntity';

import { EntitiesMapItem } from './types';

export class EntityService {
  private static _instance: EntityService;

  private entitiesMap: Record<string, AbstractEntity[]>;

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

      if (isEmpty(this.entitiesMap[item.type])) {
        delete this.entitiesMap[item.type];
      }
    }
  }

  public destroyAllEntities() {
    // eslint-disable-next-line guard-for-in
    for (const key in this.entitiesMap) {
      for (const entity of this.entitiesMap[key]) {
        entity.destroy();
      }
    }

    setTimeout(() => {
      this.entitiesMap = { ...this.entitiesMap };
    }, 0);
  }
}
