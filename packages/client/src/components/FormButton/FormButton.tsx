import { Button } from '@chakra-ui/react';

type Properties = {
  label: string;
  isDisabled?: boolean;
  type?: 'submit' | 'reset';
};

export function FormButton({ isDisabled, label, type = 'submit' }: Properties) {
  return (
    <Button isDisabled={isDisabled} size="lg" colorScheme="red" type={type}>
      {label}
    </Button>
  );
}
