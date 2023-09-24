import {
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal as ModalWindow,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { BACKGROUND_CONST } from '../../utils/textConstants';

type ModalProperties = {
  onClose: () => void;
  isOpen: boolean;
  size: string;
  body: string | ReactNode;
  title: string;
};

export function Modal({ onClose, isOpen, size = 'lg', body = '', title = '' }: ModalProperties) {
  return (
    <ModalWindow onClose={onClose} size={size} isOpen={isOpen}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent bg={BACKGROUND_CONST}>
        <ModalHeader>
          <Heading as="h2" fontSize="2xl">
            {title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </ModalWindow>
  );
}
