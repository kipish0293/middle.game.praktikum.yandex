import { EntityService } from '@app/engine';

import { EntitiesMapItem } from '../core/EntityService/types';

class Fire {
  protected readonly entityService = EntityService.getInstance();

  public makeShot(bullet: EntitiesMapItem) {
    this.entityService.registerEntity(bullet);
  }
}

export default new Fire();
