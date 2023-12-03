import { ModalBody, Button, ModalFooter } from '@chakra-ui/react';

import { useAppDispatch } from '@app/hooks';

import { deleteTread } from '../../../store/slices/ForumActionCreators';

type DeleteTopicProperties = {
  onClose: () => void;
  id: number | undefined;
  setDeleteItem: (value: number | null) => void;
};

export function DeleteTopic({ onClose, id, setDeleteItem }: DeleteTopicProperties) {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTread(String(id)));
    setDeleteItem(null);
    onClose();
  };
  return (
    <>
      <ModalBody>Are you sure you want to delete this topic?</ModalBody>
      <ModalFooter>
        <Button colorScheme="red" onClick={() => handleDelete()}>
          Delete
        </Button>
        <Button ml={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  );
}
