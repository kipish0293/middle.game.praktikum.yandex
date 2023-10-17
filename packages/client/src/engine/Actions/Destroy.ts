import { EntityService } from '@app/engine';

import { EntitiesMapItem } from '../core/EntityService/types';

class Destroy {
  protected readonly entityService = EntityService.getInstance();

  public deleteEntity(entity: EntitiesMapItem) {
    this.entityService.destroyEntity(entity);
  }
}

export default new Destroy();
