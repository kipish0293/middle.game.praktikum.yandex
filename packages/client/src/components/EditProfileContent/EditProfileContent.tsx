import { Button, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { EditProfileForm, Icons, TField } from '@app/components';

type Properties = {
  handleSaveClick: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fields: TField[];
  passwordInputs: TField[];
};

export function EditProfileContent({
  handleSaveClick,
  setIsEditing,
  fields,
  passwordInputs,
}: Properties) {
  const headingSize = useBreakpointValue({ base: '4xl', md: '6xl', lg: '7xl' });
  return (
    <Flex display="flex" align="center" justify="center" direction="column" height="100vh">
      <Heading as="h1" fontSize={headingSize} mt="16" fontWeight="400">
        Edit profile
      </Heading>
      <Flex
        maxW="4xl"
        maxH="3xl"
        width="100vh"
        borderRadius="15"
        backgroundColor="lightBlue"
        justify="center"
        pt={29}
        direction="column"
        align="center"
        position="relative"
        mb={24}
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
        <EditProfileForm
          setIsEditing={setIsEditing}
          fields={fields}
          passwordInputs={passwordInputs}
        />
      </Flex>
    </Flex>
  );
}
