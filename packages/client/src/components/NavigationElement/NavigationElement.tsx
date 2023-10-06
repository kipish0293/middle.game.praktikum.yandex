import { ListItem } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

import { Link } from '@app/components';

import { NavigationElement as NavigationElementProperties } from '../../types/NavigationElement';

import styles from './NavigationElement.module.css';

export function NavigationElement({ Icon, path }: NavigationElementProperties) {
  const location = useLocation();
  const isCurrentLocation = useMemo(() => location.pathname === path, [location.pathname, path]);
  return (
    <ListItem
      key={path}
      borderColor={`${isCurrentLocation ? 'lightRed' : 'transparent'}`}
      className={styles.container}
    >
      <Link to={path}>
        <Icon />
      </Link>
    </ListItem>
  );
}
