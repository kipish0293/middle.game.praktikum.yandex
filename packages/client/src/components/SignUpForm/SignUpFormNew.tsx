import { FormControl } from '@chakra-ui/react';

import { FormButton, FormInput } from '@app/components';

const inputs = [
  {
    name: 'first_name',
    placeholder: 'Enter your name',
  },
  {
    name: 'login',
    placeholder: 'Enter your nickname',
  },
  {
    name: 'phone',
    placeholder: 'Enter your phone',
  },
  {
    name: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    placeholder: 'Enter password',
  },
  {
    name: 'password_repeat',
    placeholder: 'Repeat password',
  },
];

const buttonText = 'Sign up';

export function SignUpFormNew() {
  return (
    <FormControl as="form" alignItems="center" display="flex" flexDirection="column">
      {inputs.map((input) => (
        <FormInput
          key={input.name}
          name={input.name}
          placeholder={input.placeholder}
          isInvalid={false}
          mb={8}
        />
      ))}
      <FormButton label={buttonText.toUpperCase()} />
    </FormControl>
  );
}
