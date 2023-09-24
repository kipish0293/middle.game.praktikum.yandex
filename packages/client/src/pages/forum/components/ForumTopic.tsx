import { Box, Button, Flex } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as makeUUID } from 'uuid';

import { FormTextArea, Icons, Link, Pagination } from '@app/components';

import styles from '../Forum.module.css';
import mock from '../mock.json';

import { ForumTopicComment } from './ForumTopicComment';

type GridItemType = {
  id?: number | string /* пока что добавляю string для создания топика */;
  name?: string;
  creationDate?: Date | string;
  commentsCount?: number;
  comments?: any;
};

const itemsPerPage = 5;

export function ForumTopic() {
  const [data, setData] = useState<GridItemType>();
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [inputText, setInputText] = useState('');
  const [itemOffset, setItemOffset] = useState(0);

  const parameters = useParams();

  useEffect(() => {
    const item = mock.data.allTheme.find((index) => String(index.id) === parameters.id);
    const newItem = {
      ...item,
      comments: mock.data.comments,
    };

    setData(newItem);
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(data?.comments ? data.comments.slice(itemOffset, endOffset) : []);
  }, [data, itemOffset]);

  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % (data?.comments?.length || 1);
      setItemOffset(newOffset);
    },
    [data],
  );

  const onChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setInputText(element.value);
  }, []);

  const sendData = useCallback(() => {
    const dataCopy = { ...data };

    dataCopy.comments.push({
      id: makeUUID(),
      name: 'Ivanessson',
      creationDate: new Date().toISOString(),
      comment: inputText,
      commentsCount: dataCopy.commentsCount,
    });
    setData(dataCopy);
    setInputText('');
  }, [data, inputText]);

  return (
    <Flex direction="column" justifyContent="space-between" h="100%">
      <Link to="/forum" className={styles.go_back_icon}>
        <Icons.GoBackIcon />
        Go back to forum
      </Link>
      <Box h="100%" overflowY="auto" mb={5}>
        {paginatedItems.map((index: any) => (
          <ForumTopicComment item={index} key={index.id} />
        ))}
      </Box>
      <Box>
        <Flex justifyContent="center">
          <FormTextArea
            name="topit-description"
            placeholder="Enter your message"
            isInvalid={false}
            value={inputText}
            onChange={onChange}
            fullWidth
          />
        </Flex>
        <Flex justifyContent="flex-end">
          <Button colorScheme="red" onClick={sendData}>
            Send
          </Button>
        </Flex>
        <Flex w="100%">
          <Pagination
            dataLength={data?.comments?.length}
            handlePageClick={handlePageClick}
            itemsPerPage={itemsPerPage}
          />
        </Flex>
      </Box>
    </Flex>
  );
}
