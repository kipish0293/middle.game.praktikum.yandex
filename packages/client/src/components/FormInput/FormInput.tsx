/* eslint-disable react/jsx-props-no-spreading */
import { Box, FormErrorMessage, forwardRef, Input } from '@chakra-ui/react';
import { omit } from 'lodash';
import { ChangeEvent } from 'react';

type FormInputProperties = {
  name: string;
  placeholder: string;
  isInvalid: boolean;
  value?: string;
  type?: string;
  errorMessage?: string;
  onChange?: (event: ChangeEvent) => void;
  mb: number;
};

export const FormInput = forwardRef((properties: FormInputProperties, reference) => {
  const { placeholder = '', errorMessage = '', mb } = properties;
  const inputProperties = omit(properties, ['errorMessage']);
  return (
    <Box mb={mb}>
      <Input
        {...inputProperties}
        ref={reference}
        mb={0}
        placeholder={placeholder.toUpperCase()}
        size="lg"
        width="lg"
        borderRadius={4}
        borderWidth={3}
        borderColor="blue"
        focusBorderColor="blue"
        bg="white"
        textAlign="center"
        _hover={{
          background: 'white',
        }}
        _placeholder={{
          textAlign: 'center',
        }}
      />
      <FormErrorMessage fontSize="xs" mt={1} justifyContent="center" w="100%">
        {errorMessage}
      </FormErrorMessage>
    </Box>
  );
});
