import { BulletType } from '@app/types';

import { Coords } from '../../../types/Coords';
import { Directions } from '../../../types/Directions';

import { Bullet } from './Bullet';

type MakeBulletProperties = {
  type: BulletType;
  direction: Directions;
  playerCoords: Coords;
  playerWidth: number;
  playerHeight: number;
};

export const makeBullet = ({
  type,
  direction,
  playerCoords,
  playerWidth,
  playerHeight,
}: MakeBulletProperties) => {
  const coords: Coords = { x: 0, y: 0 };
  const size = 10;

  switch (direction) {
    case Directions.RIGHT: {
      coords.x = playerCoords.x + playerWidth;
      coords.y = playerCoords.y + playerHeight / 2 - size / 2;
      break;
    }
    case Directions.LEFT: {
      coords.x = playerCoords.x - size;
      coords.y = playerCoords.y + playerHeight / 2 - size / 2;
      break;
    }
    case Directions.DOWN: {
      coords.x = playerCoords.x + playerWidth / 2 - size / 2;
      coords.y = playerCoords.y + playerHeight;
      break;
    }
    case Directions.UP: {
      coords.x = playerCoords.x + playerWidth / 2 - size / 2;
      coords.y = playerCoords.y - size;
      break;
    }
    default:
    // do nothing
  }

  return new Bullet(direction, coords, size, size, type);
};
