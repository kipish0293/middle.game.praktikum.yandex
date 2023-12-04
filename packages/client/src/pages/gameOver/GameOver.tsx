import { Button, Center, Flex, Image, Box, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { Icons, Link } from '@app/components';
import { Routes, teamName, TEXT } from '@app/const';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { sendScore } from '@app/store';

import GameOver from '../../assets/images/game_over.png';

import styles from './GameOver.module.css';

export function GameOverPage() {
  const dispatch = useAppDispatch();

  const score = useAppSelector((state) => state.score.score);

  useEffect(() => {
    const sendScoreData = {
      data: {
        score,
      },
      ratingFieldName: 'score',
      teamName,
    };

    dispatch(sendScore(sendScoreData));
  }, []);

  return (
    <Center height="100vh">
      <Flex flexDirection="column" alignItems="center" gap="32px">
        <Text fontSize="xl" letterSpacing="widest">
          Score: {score}
        </Text>
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
            {TEXT.mainMenuLink}
          </Link>
        </Button>
      </Flex>
    </Center>
  );
}
