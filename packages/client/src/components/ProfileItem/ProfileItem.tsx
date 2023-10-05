import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';

type Properties = {
  name: string;
  value: string | number;
};

export function ProfileItem({ name, value }: Properties) {
  const headingSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  return (
    <Flex
      borderBottom="1px dashed"
      w={headingSize}
      justify="space-between"
      paddingBottom="2"
      paddingTop="6"
      align="center"
      fontWeight="700"
    >
      <Text fontSize="3xl" letterSpacing="widest">
        {name}
      </Text>
      {name === 'Score' ? (
        <Text fontSize="xl" color="coral" letterSpacing="widest">
          {value}
        </Text>
      ) : (
        <Text fontSize="xl" letterSpacing="widest">
          {value}
        </Text>
      )}
    </Flex>
  );
}
