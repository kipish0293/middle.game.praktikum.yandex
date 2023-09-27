import { Button, Flex, Heading } from '@chakra-ui/react';
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
  return (
    <Flex display="flex" align="center" justify="center" direction="column">
      <Heading as="h1" fontSize="4.5rem" mt="4.1rem" fontWeight="400">
        Edit profile
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
          <Icons.GoBack />
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
