import { Button, Center, Flex, Image, Box, Heading } from '@chakra-ui/react';

import { Icons, Link } from '@app/components';
import { Routes, TEXT } from '@app/const';

import GameOver from '../../assets/images/game_over.png';

import styles from './GameOver.module.css';

export function GameOverPage() {
  return (
    <Center height="100vh">
      <Flex flexDirection="column" alignItems="center" gap="32px">
        <Box position="relative" w="980px">
          <Heading as="h1" size="4xl" className={styles.title} fontWeight="400">
            {TEXT.gameOver}
          </Heading>
          <Image src={GameOver} alt="ERROR GAME OVER" />
        </Box>
        <Button variant="link">
          <Link
            className={styles.link}
            fontWeight="normal"
            fontSize="2xl"
            lineHeight={7}
            color="black"
            to={Routes.ROOT}
          >
            <Icons.GoBackIcon />
            {TEXT.gameOver}
          </Link>
        </Button>
      </Flex>
    </Center>
  );
}
