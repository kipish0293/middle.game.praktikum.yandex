import { Button, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';

import { ProfileForm, Icons } from '@app/components';
import { useAppSelector } from '@app/hooks';

type Properties = {
  handleSaveClick: () => void;
};

const editProfileText = {
  title: 'Edit profile',
};

export function EditProfile({ handleSaveClick }: Properties) {
  const { user } = useAppSelector((state) => state.user);
  const headingSize = useBreakpointValue({ base: '4xl', md: '6xl', lg: '7xl' });
  return (
    <Flex display="flex" align="center" justify="center" direction="column">
      <Heading as="h1" fontSize={headingSize} mt="16" fontWeight="400">
        {editProfileText.title}
      </Heading>
      <Flex
        w="4xl"
        h="3xl"
        borderRadius="15"
        backgroundColor="lightBlue"
        justify="center"
        pt={29}
        direction="column"
        align="center"
        position="relative"
      >
        <Button
          onClick={handleSaveClick}
          textAlign="center"
          fontSize="xl"
          position="absolute"
          top="30"
          left="50"
          padding="0"
        >
          <Icons.GoBackProfileIcon />
        </Button>
        <ProfileForm user={user} goToProfileTable={handleSaveClick} />
      </Flex>
    </Flex>
  );
}
