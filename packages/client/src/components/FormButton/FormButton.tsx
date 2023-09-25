import { Button } from '@chakra-ui/react';

type Properties = {
  label: string;
  isDisabled: boolean;
};

export function FormButton({ isDisabled, label }: Properties) {
  return (
    <Button isDisabled={isDisabled} size="lg" colorScheme="red" type="submit">
      {label}
    </Button>
  );
}
