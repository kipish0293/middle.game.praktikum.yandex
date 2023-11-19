import { Box, Button, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { dateFormat } from '@app/utils/dateFormatter';

import { Icons, Link, Modal, Pagination } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks';

import styles from '../Forum.module.css';
import {
  createNewThread,
  deleteTread,
  getAllThread,
} from '../../../store/slices/ForumActionCreators';
import { TTread } from '../../../store/slices/ForumSlice';

import { CreateTopic } from './CreateTopic';
import { GridColumnTemplate } from './GridColumnTemplate';

const titleItemList = ['Themes', 'Date', ''];
const itemsPerPage = 10;

export function ForumList() {
  const { tread } = useAppSelector((state) => state.forum);
  const [rowItemList, setRowItemList] = useState<TTread[]>([]);
  const [paginatedItems, setPaginatedItems] = useState<TTread[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getAllThread());
  }, []);

  useEffect(() => {
    const sortedList = [...tread].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    const endOffset = itemOffset + itemsPerPage;
    const sortedPaginatedItems = sortedList.slice(itemOffset, endOffset);

    setRowItemList(sortedList);
    setPaginatedItems(sortedPaginatedItems);
  }, [tread, itemOffset]);

  const deleteRowItem = (id: number | string) => {
    dispatch(deleteTread(`${id}`));
  };

  const onConfirm = (newItem: any) => {
    dispatch(createNewThread(newItem));
    onClose();
  };

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % rowItemList.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Flex justifyContent="center" w="100%">
        <Button
          leftIcon={<Icons.CreateItemIcon />}
          variant="solid"
          colorScheme="teal"
          className={styles.newtopic}
          color="initial"
          size="md"
          onClick={onOpen}
        >
          New topic
        </Button>
      </Flex>
      <Box className={styles.forumlist}>
        <Box className={styles.forumlist_header}>
          <GridColumnTemplate isTitle itemList={titleItemList} />
        </Box>
        {paginatedItems.map((item, index) => (
          <GridColumnTemplate
            isTitle={false}
            /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            itemList={[
              <Link to={`/forum/${item.id}`}>{item.title}</Link>,
              dateFormat(item.updatedAt),
              // item.commentsCount,
              <IconButton
                aria-label="delete thread"
                icon={<Icons.TrashItemIcon />}
                onClick={() => deleteRowItem(item.id)}
              />,
            ]}
          />
        ))}
      </Box>
      <Pagination
        dataLength={rowItemList.length}
        handlePageClick={handlePageClick}
        itemsPerPage={itemsPerPage}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        body={<CreateTopic onClose={onClose} onConfirm={onConfirm} />}
        title="New topic"
      />
    </>
  );
}
