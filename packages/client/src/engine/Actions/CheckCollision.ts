import { AbstractEntity, EntityService } from '@app/engine';

import { Entities } from '../entities/types/Entities';
import { CollisionResolver } from '../core/CollisionResolver/CollisionResolver';

class CheckCollision {
  protected readonly entityService = EntityService.getInstance();

  public checkCollisionWithType(entity: AbstractEntity, type: Entities) {
    const arrayToCheck = this.entityService.getEntitiesMap()[type] || [];

    for (const element of arrayToCheck) {
      if (CollisionResolver.checkCollision(entity, element)) {
        return {
          collision: true,
          entity: {
            type,
            entity: element,
          },
        };
      }
    }
    return {
      collision: false,
      entity: {
        type,
        entity: undefined,
      },
    };
  }
}

export default new CheckCollision();
