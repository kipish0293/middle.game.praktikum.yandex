/* eslint-disable react/jsx-props-no-spreading */
import { Box, FormErrorMessage, forwardRef, Input } from '@chakra-ui/react';
import { omit } from 'lodash';
import { ChangeEvent } from 'react';

type Properties = {
  name: string;
  placeholder: string;
  isInvalid: boolean;
  value?: string;
  type?: string;
  errorMessage?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  mb?: number;
  width?: string;
  id?: string;
};


export const FormInput = forwardRef((properties: Properties, reference) => {
  const { placeholder = '', errorMessage = '', mb, width, value, id, onChange } = properties;
  const inputProperties = omit(properties, ['errorMessage']);
  return (
    <Box mb={mb}>
      <Input
        {...inputProperties}
        ref={reference}
        mb={0}
        placeholder={placeholder.toUpperCase()}
        size="lg"
        width={width || 'lg'}
        borderRadius={4}
        borderWidth={3}
        borderColor="blue"
        focusBorderColor="blue"
        bg="white"
        textAlign="center"
        onChange={onChange}
        value={value}
        id={id}
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
