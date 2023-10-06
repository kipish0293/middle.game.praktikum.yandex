import { Box, List } from '@chakra-ui/react';

import { NavigationElement } from '@app/components';

import { NavigationElement as NavigationElementType } from '../../types/NavigationElement';

import styles from './Navigation.module.css';

type Properties = {
  navigationElements: Array<NavigationElementType>;
};
export function Navigation({ navigationElements }: Properties) {
  return (
    <Box as="nav" bg="lightBlue" className={styles.container}>
      <List>
        {navigationElements.map(({ path, Icon }) => (
          <NavigationElement path={path} Icon={Icon} key={path} />
        ))}
      </List>
    </Box>
  );
}
