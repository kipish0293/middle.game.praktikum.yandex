import { FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form } from '@app/components';
import { loginFields, loginSchema, Routes } from '@app/const';
import { AppDispatch, getUser, signin } from '@app/store';
import { LoginData } from '@app/types';

const buttonText = 'Enter';

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    await dispatch(signin(data as LoginData));
    await dispatch(getUser());
    navigate(Routes.ROOT);
  };
  return Form({ inputs: loginFields, buttonText, mb: 5, validationSchema: loginSchema, onSubmit });
}
