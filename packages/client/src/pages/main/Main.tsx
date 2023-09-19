import { Box, Button, Center, List, ListItem, Wrap } from '@chakra-ui/react';

import { Link, TestIcon } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { decrement, increment } from '@app/store';

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
            <Link to="/login">Login Page</Link>
          </ListItem>
          <ListItem>
            <Link to="/register">Register Page</Link>
          </ListItem>
          <ListItem>
            <Link to="/game">Game Page</Link>
          </ListItem>
          <ListItem>
            <Link to="/profile">Profile Page</Link>
          </ListItem>
          <ListItem>
            <Link to="/forum">Forum Page</Link>
          </ListItem>
          <ListItem>
            <Link to="/leaderboard">Leaderboard Page</Link>
          </ListItem>
        </List>
      </Box>

      <Wrap paddingLeft={2}>
        <Button
          bg="blue"
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
          bg="blue"
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
