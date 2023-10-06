import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { Routes } from '@app/const';

import { Icons } from '../icons';
import { NavigationElement } from '../../types/NavigationElement';
import { Navigation } from '../Navigation/Navigation';

const navigationElements: Array<NavigationElement> = [
  { Icon: Icons.ConsoleIcon, path: Routes.GAME },
  { Icon: Icons.CupIcon, path: Routes.LEADER_BOARD },
  { Icon: Icons.PlayerIcon, path: Routes.PROFILE },
  { Icon: Icons.ForumIcon, path: Routes.FORUM },
];
export function Layout() {
  return (
    <>
      <Box as="aside">
        <Navigation navigationElements={navigationElements} />
      </Box>
      <Outlet />
    </>
  );
}
