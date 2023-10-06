import { useDispatch } from 'react-redux';
import { FieldValues } from 'react-hook-form';

import { Form } from '@app/components';
import { registerFields, signupSchema } from '@app/const';
import { AppDispatch, getUser, signup } from '@app/store';
import { SignUpData } from '@app/types';

const buttonText = 'Sign up';
export function SignUpForm() {
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (data: FieldValues) => {
    dispatch(signup(data as SignUpData));
    dispatch(getUser());
  };

  return Form({
    inputs: registerFields,
    buttonText,
    mb: 3,
    validationSchema: signupSchema,
    onSubmit,
  });
}
