import { Flex, Box } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { LeaderboardItemContent } from '../LeaderboardItemContent/LeaderboardItemContent';

type Properties = {
  place: string | number;
  player: string;
  score: string | number;
  background?: string;
  isHeader: boolean;
  icon?: ReactElement | null;
};
export function LeaderboardItem({ place, player, score, background, isHeader, icon }: Properties) {
  const formattedPlace = isHeader ? String(place).toUpperCase() : place;
  const formattedPlayer = isHeader ? player.toUpperCase() : player;
  const formattedScore = isHeader ? String(score).toUpperCase() : score;
  return (
    <Flex
      background={background}
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="space-between"
      padding="0.375rem 1rem"
      borderRadius={isHeader ? '5px' : ''}
      fontWeight="700"
      fontSize="3xl"
      maxWidth="3xl"
      maxHeight="3.125rem"
    >
      <LeaderboardItemContent
        value={formattedPlace}
        width="6rem"
        placeLetterSpacing={isHeader ? 'widest' : ''}
        marginRight={icon ? '' : '20'}
      />
      <Box marginRight={icon ? '7' : ''} marginLeft={icon ? '7' : ''}>
        {icon}
      </Box>
      <LeaderboardItemContent
        value={formattedPlayer}
        width="sm"
        placeLetterSpacing={isHeader ? '0.2rem' : ''}
        marginRight="40px"
      />
      <LeaderboardItemContent
        value={formattedScore}
        width="8.4rem"
        placeLetterSpacing={isHeader ? '0.4rem' : ''}
      />
    </Flex>
  );
}
