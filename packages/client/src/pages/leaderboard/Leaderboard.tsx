import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useEffect } from 'react';

import { Icons, LeaderboardItem } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { getLeaderboard } from '@app/store';
import { Leaderbord } from '@app/types';

export function LeaderboardPage() {
  const dispatch = useAppDispatch();
  const headingSize = useBreakpointValue({ base: '3xl', md: '4xl', lg: '7xl' });
  const leaderboard = useAppSelector((state) => state.leaderboard.data);

  useEffect(() => {
    const leaderboardData = {
      ratingFieldName: 'score',
      cursor: 0,
      limit: 6,
    };
    dispatch(getLeaderboard(leaderboardData));
  }, []);

  return (
    <Box display="flex" alignItems="flex-start" height="100vh">
      <Box margin="0 auto">
        <Heading as="h1" fontSize={headingSize} marginTop="16" fontWeight="400" ml="16">
          Game masters
        </Heading>
        <Flex
          marginTop="6"
          maxW="4xl"
          maxH="47rem"
          w="100%"
          height="100%"
          borderRadius="15"
          backgroundColor="lightBlue"
          pt={9}
          pb={9}
          pl={16}
          pr={16}
          direction="column"
          align="center"
          gap="14"
          overflowY="auto"
          justify="center"
        >
          <LeaderboardItem
            place="place"
            player="player"
            score="score"
            background="violet"
            isHeader
          />
          {leaderboard?.map((item: Leaderbord, index: number) => (
            <LeaderboardItem
              isHeader={false}
              key={item.place}
              place={item.place}
              player={item.player}
              score={item.score}
              background={index % 2 === 0 ? 'orange' : 'lightRed'}
              icon={index === 0 ? <Icons.BestPlayer /> : undefined}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
