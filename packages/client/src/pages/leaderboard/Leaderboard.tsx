import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';

import { Icons, LeaderboardItem } from '@app/components';

const data = [
  {
    place: 1,
    player: 'kot',
    score: 22_000,
  },
  {
    place: 2,
    player: 'cowboy',
    score: 18_500,
  },
  {
    place: 3,
    player: 'ROOTMAN',
    score: 9800,
  },
  {
    place: 4,
    player: 'JASTIN',
    score: 7200,
  },
  {
    place: 5,
    player: 'KROT_KASATKA',
    score: 5287,
  },
  {
    place: 6,
    player: 'KIOSK',
    score: 1800,
  },
];

export function LeaderboardPage() {
  const headingSize = useBreakpointValue({ base: '3xl', md: '4xl', lg: '7xl' });
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
          {data.map((item, index) => (
            <LeaderboardItem
              isHeader={false}
              key={item.place}
              place={item.place}
              player={item.player}
              score={item.score}
              background={index % 2 === 0 ? 'orange' : 'red'}
              icon={index === 0 ? <Icons.BestPlayer /> : undefined}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
