import { Avatar, Box, Grid, GridItem, IconButton, Text } from '@chakra-ui/react';
import { dateFormat } from '@app/utils/dateFormatter';

import { Icons } from '@app/components';
import { useAppDispatch } from '@app/hooks';

import avatar from '../../../assets/images/avatar.png';
import style from '../Forum.module.css';
import { deleteComment } from '../../../store/slices/ForumActionCreators';

export function ForumTopicComment({ item }: any) {
  const dispatch = useAppDispatch();
  const deleteCommentItem = (id: number | string) => {
    dispatch(deleteComment(String(id)));
  };
  return (
    <Grid templateColumns="1fr 4fr" gridRowGap={5} pt={3} pb={3}>
      <GridItem className={style.topic_item_avatar}>
        <Avatar size="xl" name="Segun Adebayo" src={avatar} />
        <Text>{item.author}</Text>
        <Text>
          <Icons.Crown /> {item.score || '128995'}
        </Text>
      </GridItem>
      <GridItem padding={5} bg="#fff">
        <Box fontSize="xs">{dateFormat(item.creationDate)}</Box>
        <Text>{item.text}</Text>
      </GridItem>
      <IconButton
        aria-label="delete comment"
        icon={<Icons.TrashItemIcon />}
        onClick={() => deleteCommentItem(item.id)}
      />
    </Grid>
  );
}
