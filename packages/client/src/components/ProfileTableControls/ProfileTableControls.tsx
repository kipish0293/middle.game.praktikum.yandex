import { Flex, Button, useDisclosure, Center, Text } from '@chakra-ui/react';

import { Icons, Modal } from '@app/components';

type Properties = {
  handleEdit: () => void;
  handleLogout: () => void;
};

const profileControlsText = {
  modal: {
    title: 'Are you sure want logout?',
  },
};

export function ProfileTableControls({ handleEdit, handleLogout }: Properties) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex position="absolute" top="30" left="50" gap={6}>
        <Button onClick={handleEdit} fontSize="xl" padding="0">
          <Icons.EditIcon />
        </Button>
        <Button
          onClick={onOpen}
          fontSize="xl"
          padding="0"
          bg="transparent"
          _hover={{ background: 'transparent' }}
        >
          <Icons.UserHandUpIcon />
        </Button>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        body={
          <Center pt={4} pb={5} gap={5}>
            <Button
              colorScheme="red"
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              Logout
            </Button>
            <Button colorScheme="green" onClick={onClose}>
              Cancel
            </Button>
          </Center>
        }
        title={<Text textAlign="center">{profileControlsText.modal.title}</Text>}
        isCentered
        bg="white"
      />
    </>
  );
}
