import { Avatar, Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { dateFormat } from '@app/utils/dateFormatter';

import { Icons } from '@app/components';

import avatar from '../../../assets/images/avatar.png';
import style from '../Forum.module.css';

export function ForumTopicComment({ item }: any) {
  return (
    <Grid templateColumns="1fr 4fr" gridRowGap={5} pt={3} pb={3}>
      <GridItem className={style.topic_item_avatar}>
        <Avatar size="xl" name="Segun Adebayo" src={avatar} />
        <Text>{item.name}</Text>
        <Text>
          <Icons.Crown /> {item.score || '128995'}
        </Text>
      </GridItem>
      <GridItem padding={5} bg="#fff">
        <Box fontSize="xs">{dateFormat(item.creationDate)}</Box>
        <Text>{item.comment}</Text>
      </GridItem>
    </Grid>
  );
}
