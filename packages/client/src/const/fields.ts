import { Field } from '@app/types';

import { FieldName } from './fieldName';

const fields: Array<Field> = [
  { name: FieldName.SCORE, placeholder: '', label: 'Score' },
  { name: FieldName.FULL_NAME, placeholder: '', label: 'Name' },
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
    label: 'Email',
  },
  {
    name: FieldName.PASSWORD_OLD,
    placeholder: 'Old password',
    label: 'Old password',
    type: 'password',
  },
  {
    name: FieldName.PASSWORD,
    placeholder: 'Enter password',
    label: 'Password',
    type: 'password',
  },
  {
    name: FieldName.PASSWORD_REPEAT,
    placeholder: 'Repeat password',
    label: 'Repeat password',
    type: 'password',
  },
];

export const loginFields = fields.filter(
  (field) => field.name === FieldName.LOGIN || field.name === FieldName.PASSWORD,
);
export const registerFields = fields.filter(
  (field) =>
    field.name !== FieldName.PASSWORD_OLD &&
    field.name !== FieldName.SCORE &&
    field.name !== FieldName.FULL_NAME,
);

export const profileFields = fields.filter(
  (field) =>
    field.name === FieldName.SCORE ||
    field.name === FieldName.FULL_NAME ||
    field.name === FieldName.DISPLAY_NAME ||
    field.name === FieldName.PHONE ||
    field.name === FieldName.EMAIL,
);

export const editProfileFields = fields.filter(
  (field) => field.name !== FieldName.SCORE && field.name !== FieldName.FULL_NAME,
);

export type ProfileFields = typeof profileFields;
