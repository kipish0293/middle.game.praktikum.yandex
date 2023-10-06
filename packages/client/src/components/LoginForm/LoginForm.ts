import { FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Form } from '@app/components';
import { loginFields, loginSchema } from '@app/const';
import { AppDispatch, getUser, signin } from '@app/store';
import { LoginData } from '@app/types';

const buttonText = 'Enter';

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (data: FieldValues) => {
    dispatch(signin(data as LoginData));
    dispatch(getUser());
  };
  return Form({ inputs: loginFields, buttonText, mb: 5, validationSchema: loginSchema, onSubmit });
}
