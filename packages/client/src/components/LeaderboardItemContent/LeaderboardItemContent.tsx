import { Box } from '@chakra-ui/react';

type Properties = {
  value: string | number;
  width: string;
  placeLetterSpacing: string;
  marginRight?: string;
};
export function LeaderboardItemContent({
  value,
  width,
  placeLetterSpacing,
  marginRight,
}: Properties) {
  return (
    <Box
      h="2.1rem"
      background="white"
      borderRadius="5px"
      boxShadow="0.6rem 0.3rem 0.6rem 0.1rem rgba(0, 0, 0, 0.25)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="1"
      width={width}
      letterSpacing={placeLetterSpacing}
      marginRight={marginRight}
    >
      {value}
    </Box>
  );
}
