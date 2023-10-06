/* eslint-disable react/jsx-props-no-spreading */
import { Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { FieldError, FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi, { PartialSchemaMap } from 'joi';
import { v4 as makeUUID } from 'uuid';

import { FormButton, FormInput } from '@app/components';
import { Field } from '@app/types';
import { FieldName } from '@app/const';

type Properties = {
  inputs: Array<Field>;
  buttonText: string;
  mb: number;
  validationSchema: PartialSchemaMap<any>;
  onSubmit: (values: FieldValues) => void;
  initialValues?: Record<Partial<FieldName>, string>;
  withLabel?: boolean;
};

type GetFormInputProperties = {
  name: FieldName;
  id: string;
  type?: string;
  placeholder: string;
  isInvalid: boolean;
  error?: FieldError;
  register: UseFormRegister<Record<Partial<FieldName>, string>>;
  mb: number;
};

const getFormInput = ({
  name,
  id,
  type,
  placeholder,
  isInvalid,
  error,
  register,
  mb,
}: GetFormInputProperties) => (
  <FormInput
    {...register(name)}
    mb={mb}
    key={name}
    name={name}
    id={id}
    type={type}
    placeholder={placeholder}
    isInvalid={isInvalid}
    errorMessage={error?.message?.toString()}
  />
);

export function Form({
  inputs,
  buttonText,
  mb,
  validationSchema,
  initialValues,
  onSubmit,
  withLabel = false,
}: Properties) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: joiResolver(Joi.object(validationSchema)),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  return (
    <FormControl
      isInvalid={!isValid}
      onSubmit={handleSubmit(onSubmit)}
      as="form"
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      {inputs.map((input: Field) => {
        const { name, placeholder, type, label } = input;
        const error = errors[name];
        const isInvalid = !!error;
        const id = makeUUID();
        if (withLabel) {
          return (
            <Flex alignItems="center" gap={5} w="70%" justifyContent="space-between" key={id}>
              <FormLabel htmlFor={id}>{label}</FormLabel>
              {getFormInput({ name, id, type, placeholder, isInvalid, error, register, mb })}
            </Flex>
          );
        }
        return getFormInput({ name, id, type, placeholder, isInvalid, error, register, mb });
      })}
      <FormButton isDisabled={!isValid} label={buttonText.toUpperCase()} />
    </FormControl>
  );
}
