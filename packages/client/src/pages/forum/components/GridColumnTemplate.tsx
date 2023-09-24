import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { v4 as makeUUID } from 'uuid';

import styles from '../Forum.module.css';

type GridColumType = {
  isTitle: boolean;
  itemList: Array<string | ReactNode>;
};

export function GridColumnTemplate({ isTitle, itemList }: GridColumType) {
  let currentClassName = isTitle ? styles.griditem_title : styles.griditem_row;
  currentClassName += ` ${styles.griditem}`;
  const fonSize = isTitle ? '2xl' : '';

  return (
    <Grid templateColumns="2fr 1fr 1fr 0.5fr" gap={6} pt={3} pb={3}>
      {itemList.map((item, index) => (
        <GridItem
          w="100%"
          h="10"
          className={currentClassName}
          fontSize={fonSize}
          key={makeUUID()}
          bg={index === itemList.length - 1 ? 'transparent' : '#fff'}
        >
          <Box className={styles.griditem_box}>{item}</Box>
        </GridItem>
      ))}
    </Grid>
  );
}
