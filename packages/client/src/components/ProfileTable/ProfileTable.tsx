import {
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
} from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';

import { ProfileItem, ProfileTableControls } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { Field, User } from '@app/types';
import { ProfileFields, staticBaseUrl, FieldName } from '@app/const';
import { logout } from '@app/store';

const profileTitleTexts = {
  title: 'Player',
  modal: {
    title: 'Upload avatar file',
    button: 'Add',
  },
};

type Properties = {
  handleEditClick: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  fields: ProfileFields;
};

export function ProfileTable({
  handleEditClick,
  handleInputChange,
  handleSubmit,
  isOpen,
  onOpen,
  onClose,
  fields,
}: Properties) {
  const { user } = useAppSelector((state) => state.user);
  const finalReference = useRef(null);
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  const createItem = (field: Field) => {
    if (field.name === FieldName.FULL_NAME) {
      return (
        <ProfileItem
          key="name"
          name={field?.label ?? ''}
          value={`${user?.first_name || ''} ${user?.second_name || ''}`}
        />
      );
    }
    if (field.name === FieldName.PHONE) {
      return (
        <ProfileItem
          key={field.name}
          name={field?.label ?? ''}
          value={user?.phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5') || ''}
        />
      );
    }

    // TODO Add logic for game score in profile
    if (field.name === FieldName.SCORE) {
      return <ProfileItem key={field.name} name={field?.label ?? ''} value="1984" />;
    }

    return (
      <ProfileItem
        key={field.name}
        name={field?.label ?? ''}
        value={user ? user[field.name as keyof User] : ''}
      />
    );
  };

  return (
    <>
      <Flex display="flex" align="center" justify="center" direction="column">
        <Heading as="h1" fontSize="7xl" marginTop="16" fontWeight="400">
          {profileTitleTexts.title}
        </Heading>
        <Flex
          maxW="4xl"
          h="3xl"
          width="100vw"
          borderRadius="15"
          backgroundColor="lightBlue"
          justify="flex-start"
          pt={29}
          direction="column"
          align="center"
          position="relative"
          mb={24}
        >
          <ProfileTableControls handleEdit={handleEditClick} handleLogout={onLogout} />
          <Button
            border="none"
            padding="0"
            width="19rem"
            height="18rem"
            type="button"
            onClick={onOpen}
          >
            <Image w="100%" h="100%" alt="avatar" src={`${staticBaseUrl}/${user?.avatar}`} />
          </Button>
          <Flex flexDirection="column" pt="1.6rem">
            {fields.map((element) => createItem(element))}
          </Flex>
        </Flex>
      </Flex>
      <Modal finalFocusRef={finalReference} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{profileTitleTexts.modal.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" name="picture" onChange={handleInputChange} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleSubmit}>
              {profileTitleTexts.modal.button}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
