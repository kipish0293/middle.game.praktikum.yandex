import { Box, FormErrorMessage, Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import style from './FormTextArea.module.css';

type FormInputProperties = {
  name: string;
  placeholder: string;
  isInvalid: boolean;
  value?: string;
  errorMessage?: string;
  height?: string;
  fullWidth?: boolean;
  onChange?: (event: ChangeEvent) => void;
};

export function FormTextArea(properties: FormInputProperties) {
  const {
    name,
    placeholder,
    isInvalid,
    errorMessage,
    height = 'auto',
    fullWidth = false,
    value,
    onChange,
  } = properties;
  return (
    <Box mb={8} w={fullWidth ? '100%' : 'auto'}>
      <Textarea
        name={name}
        isInvalid={isInvalid}
        placeholder={placeholder.toUpperCase()}
        size="lg"
        width="lg"
        className={fullWidth ? style.textarea : ''}
        borderRadius={4}
        borderWidth={3}
        borderColor="blue"
        focusBorderColor="blue"
        bg="white"
        textAlign="center"
        h={height}
        value={value}
        onChange={onChange}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </Box>
  );
}
