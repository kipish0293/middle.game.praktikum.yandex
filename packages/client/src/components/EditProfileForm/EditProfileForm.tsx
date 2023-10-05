import { FormControl, FormLabel, Grid, GridItem } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { FormInput, FormButton } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { changePassword, changeProfile } from '@app/store';

import { TField } from '../ViewProfileContent/ViewProfileContent';

const buttonText = 'save';

type FormDataUser = {
  [key: string]: string;
};

type Properties = {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fields: TField[];
  passwordInputs: TField[];
};

export function EditProfileForm({ setIsEditing, fields, passwordInputs }: Properties) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState<FormDataUser>({
    first_name: user ? user.first_name : '',
    second_name: user ? user.second_name : '',
    display_name: user ? user.display_name : '',
    login: user ? user.login : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
  });

  const [passwordData, setPasswordData] = useState<FormDataUser>({
    oldPassword: '',
    newPassword: '',
    password_repeat: '',
  });

  const handleUserDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((previousUserData) => ({
      ...previousUserData,
      [name]: value,
    }));
  };

  const handlePasswordDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordData((previousPasswordData) => ({
      ...previousPasswordData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    delete passwordData.password_repeat;
    dispatch(changeProfile(userData));
    dispatch(changePassword(passwordData));
    setIsEditing(false);
  };

  const editProfileItems = fields.filter((field) => field?.editProfileItem);

  return (
    <FormControl as="form" alignItems="center" display="flex" flexDirection="column" w="80%">
      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
        {editProfileItems.map((input) => (
          <GridItem key={input.name} width="xs">
            <FormLabel htmlFor={input.name} fontSize="2xl" textAlign="start" display="block">
              {input.label}
            </FormLabel>
            <FormInput
              key={input.name}
              name={input.name}
              placeholder={input.placeholder}
              isInvalid={false}
              mb={4}
              id={input.name}
              value={
                input.name === 'phone'
                  ? userData[input.name]?.replace(
                      /(\d)(\d{3})(\d{3})(\d{2})(\d{2})/,
                      '$1 $2 $3 $4 $5',
                    ) || ''
                  : userData[input.name] || ''
              }
              onChange={handleUserDataChange}
              width="100%"
            />
          </GridItem>
        ))}
        {passwordInputs.map((input) => (
          <GridItem key={input.name} width="xs">
            <FormLabel
              htmlFor={input.name}
              fontSize="2xl"
              textAlign="start"
              width="100%"
              display="block"
            >
              {input.label}
            </FormLabel>
            <FormInput
              key={input.name}
              name={input.name}
              placeholder={input.placeholder}
              isInvalid={false}
              mb={4}
              id={input.name}
              value={passwordData[input.name] || ''}
              onChange={handlePasswordDataChange}
              width="100%"
            />
          </GridItem>
        ))}
      </Grid>
      <FormButton label={buttonText.toUpperCase()} type="submit" onSubmit={handleSubmit} />
    </FormControl>
  );
}
