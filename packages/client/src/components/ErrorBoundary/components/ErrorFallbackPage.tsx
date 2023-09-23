import { Button, Center, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function ErrorFallbackPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };
  return (
    <Center bg="transparent" h="100vh" color="initial">
      <Flex flexDirection="column">
        <Heading>Something went wrong...</Heading>
        <Button onClick={goToHome} mt={5}>
          Try again
        </Button>
      </Flex>
    </Center>
  );
}
