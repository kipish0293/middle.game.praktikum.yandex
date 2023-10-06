import { Icon } from '@chakra-ui/icon';

import { Routes } from '@app/const';

export type NavigationElement = {
  Icon: typeof Icon;
  path: Routes;
};
