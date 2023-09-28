import { Input } from '@app/types';

import { FieldName } from './fieldName';

const fields: Array<Input> = [
  {
    name: FieldName.FIRST_NAME,
    placeholder: 'Enter your name',
    label: 'Name',
  },
  {
    name: FieldName.SECOND_NAME,
    placeholder: 'Enter your surname',
    label: 'Surname',
  },
  { name: FieldName.LOGIN, placeholder: 'Enter your login', label: 'Login' },
  {
    name: FieldName.DISPLAY_NAME,
    placeholder: 'Enter your nickname',
    label: 'Nickname',
  },
  {
    name: FieldName.PHONE,
    placeholder: 'Enter your phone',
    label: 'Phone',
  },
  {
    name: FieldName.EMAIL,
    placeholder: 'Enter your email',
  },
  {
    name: FieldName.PASSWORD,
    placeholder: 'Enter password',
    label: 'Password',
  },
  {
    name: FieldName.PASSWORD_REPEAT,
    placeholder: 'Repeat password',
    label: 'Repeat password',
  },
  {
    name: FieldName.PASSWORD_OLD,
    placeholder: 'Repeat password',
    label: 'Repeat password',
  },
];

export const loginFields = fields.filter(
  (input: Input) => input.name === FieldName.LOGIN || input.name === FieldName.PASSWORD,
);
export const profileFields = fields.filter((input) => input.name !== FieldName.PASSWORD_OLD);
