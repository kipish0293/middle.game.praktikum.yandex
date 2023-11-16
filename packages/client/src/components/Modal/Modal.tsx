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

import { BACKGROUND_COLOR } from '../../const/colors';

type ModalProperties = {
  onClose: () => void;
  isOpen: boolean;
  size: string;
  body: string | ReactNode;
  title: string | ReactNode;
  isCentered?: boolean;
  bg?: string;
};

export function Modal({
  onClose,
  isOpen,
  size = 'lg',
  body = '',
  title = '',
  isCentered,
  bg = BACKGROUND_COLOR,
}: ModalProperties) {
  return (
    <ModalWindow onClose={onClose} size={size} isOpen={isOpen} isCentered={isCentered}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent bg={bg} data-testid="modal-content">
        <ModalHeader data-testid="modal-header">
          <Heading as="h2" fontSize="2xl">
            {title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton data-testid="modal-close-btn" />
        <ModalBody data-testid="modal-body">{body}</ModalBody>
      </ModalContent>
    </ModalWindow>
  );
}
