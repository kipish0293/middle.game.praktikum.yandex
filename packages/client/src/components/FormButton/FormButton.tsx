import { Button } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

type Properties = {
  label: string;
  onSubmit?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function FormButton({ isDisabled, label, onSubmit, type, onClick }: Properties) {
  return (
    <Button
      isDisabled={isDisabled}
      size="lg"
      colorScheme="red"
      onClick={onSubmit || onClick}
      type={type}
    >
      {label}
    </Button>
  );
}
