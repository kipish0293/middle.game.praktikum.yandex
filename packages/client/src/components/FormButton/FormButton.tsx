import { Button } from '@chakra-ui/react';

export function FormButton({ label }: { label: string }) {
  return (
    <Button size="lg" colorScheme="red">
      {label}
    </Button>
  );
}
