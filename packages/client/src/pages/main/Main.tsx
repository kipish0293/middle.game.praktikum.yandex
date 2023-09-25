import { Box, Button, Center, List, ListItem, Wrap } from '@chakra-ui/react';

import { Link } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { decrement, increment } from '@app/store';
import { ROUTES } from '@app/types';

export function MainPage() {
  const dispatch = useAppDispatch();
  const { counter } = useAppSelector((store) => store.counter);

  return (
    <Center flexDirection="column" alignItems="center" justifyContent="center" padding={10}>
      <Box as="nav" fontFamily="Ubuntu Mono" textAlign="center" padding={3} marginBottom={2}>
        <List flexDirection="column">
          <ListItem>
            <Link to={ROUTES.LOGIN}>Login Page</Link>
          </ListItem>
          <ListItem>
            <Link to={ROUTES.REGISTER}>Register Page</Link>
          </ListItem>
          <ListItem>
            <Link to={ROUTES.GAME}>Game Page</Link>
          </ListItem>
          <ListItem>
            <Link to={ROUTES.PROFILE}>Profile Page</Link>
          </ListItem>
          <ListItem>
            <Link to={ROUTES.FORUM}>Forum Page</Link>
          </ListItem>
          <ListItem>
            <Link to={ROUTES.LEADER_BOARD}>Leaderboard Page</Link>
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
