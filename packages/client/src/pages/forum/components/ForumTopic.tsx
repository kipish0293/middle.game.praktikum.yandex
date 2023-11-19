import { Box, Button, Flex } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FormTextArea, Icons, Link, Pagination } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks';

import styles from '../Forum.module.css';
import { createNewAnswer, getAllAnswer } from '../../../store/slices/ForumActionCreators';

import { ForumTopicComment } from './ForumTopicComment';

type GridItemType = {
  id?: number;
  author?: number;
  createdAt?: string;
  updatedAt: string;
  text?: string;
  thread?: number;
};

const itemsPerPage = 5;

export function ForumTopic() {
  const { answer } = useAppSelector((state) => state.forum);
  const [data, setData] = useState<GridItemType[]>();
  const [paginatedItems, setPaginatedItems] = useState<GridItemType[]>([]);
  const [inputText, setInputText] = useState('');
  const [itemOffset, setItemOffset] = useState(0);
  const dispatch = useAppDispatch();
  const parameters = useParams();

  useEffect(() => {
    if (parameters.id) {
      dispatch(getAllAnswer(`${parameters.id}`));
    }
  }, []);

  useEffect(() => {
    setData(answer);
  }, [answer]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(data ? data.slice(itemOffset, endOffset) : []);
  }, [data, itemOffset]);

  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % (data?.length || 1);
      setItemOffset(newOffset);
    },
    [data],
  );

  const onChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setInputText(element.value);
  }, []);

  const sendData = useCallback(() => {
    const body = {
      title: inputText,
      text: inputText,
      thread: parameters.id,
    };
    dispatch(createNewAnswer(body));
    setInputText('');
  }, [data, inputText, parameters.id, dispatch, createNewAnswer]);

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
            dataLength={data ? data.length : undefined}
            handlePageClick={handlePageClick}
            itemsPerPage={itemsPerPage}
          />
        </Flex>
      </Box>
    </Flex>
  );
}
