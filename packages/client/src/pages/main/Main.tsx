import { Link as ReactRouterLink } from 'react-router-dom';
import { ListItem, Button, Wrap, Center, Link as ChakraLink, List, Box } from '@chakra-ui/react';

import { decrement, increment } from '@app/store';
import { useAppDispatch, useAppSelector } from '@app/hooks';

import { TestIcon } from '../../components/icons/TestIcon';

// type Props = {};

export function MainPage() {
  const dispatch = useAppDispatch();
  const { counter } = useAppSelector((store) => store.counter);

  return (
    <Center flexDirection="column" alignItems="center" justifyContent="center" padding={10}>
      <Box>
        <TestIcon boxSize={20} />
      </Box>
      <Box as="nav" fontFamily="Ubuntu Mono" textAlign="center" padding={3} marginBottom={2}>
        <List flexDirection="column">
          <ListItem>
            <ChakraLink as={ReactRouterLink} to="/login">
              Login Page
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={ReactRouterLink} to="/register">
              Register Page
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={ReactRouterLink} to="/game">
              Game Page
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={ReactRouterLink} to="/profile">
              Profile Page
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={ReactRouterLink} to="/forum">
              Forum Page
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={ReactRouterLink} to="/leaderboard">
              Leaderboard Page
            </ChakraLink>
          </ListItem>
        </List>
      </Box>

      <Wrap paddingLeft={2}>
        <Button
          colorScheme="blue"
          size="sm"
          color="white"
          type="button"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <Center>{counter}</Center>
        <Button
          colorScheme="blue"
          size="sm"
          color="white"
          type="button"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </Wrap>
    </Center>
  );
}
