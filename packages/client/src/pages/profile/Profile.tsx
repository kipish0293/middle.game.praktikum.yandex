import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { useAppDispatch } from '@app/hooks';
import { ViewProfileContent, EditProfileContent } from '@app/components';
import { changeAvatar, fetchData, fetchDataUser } from '@app/store';

const fields = [
  {
    name: 'id',
    label: 'Score',
    placeholder: 'Enter your name',
    profileItem: true,
  },
  {
    name: 'full_name',
    label: 'Name',
    placeholder: 'Enter your name',
    profileItem: true,
  },
  {
    name: 'first_name',
    label: 'Name',
    placeholder: 'Enter your name',
    editProfileItem: true,
  },
  {
    name: 'second_name',
    label: 'Surname',
    placeholder: 'Enter your name',
    editProfileItem: true,
  },
  {
    name: 'display_name',
    label: 'Nickname',
    placeholder: 'Enter your nickname',
    profileItem: true,
    editProfileItem: true,
  },
  {
    name: 'login',
    label: 'Login',
    placeholder: 'Enter your nickname',
    editProfileItem: true,
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    profileItem: true,
    editProfileItem: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: 'Enter your phone',
    profileItem: true,
    editProfileItem: true,
  },
];

const passwordInputs = [
  {
    name: 'newPassword',
    label: 'Password',
    placeholder: 'Enter password',
  },
  {
    name: 'oldPassword',
    label: 'Old password',
    placeholder: 'Enter password',
  },
  {
    name: 'password_repeat',
    label: 'Repeat password',
    placeholder: 'Repeat password',
  },
];

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchDataUser()).then(() => {
      dispatch(fetchData());
    });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      dispatch(changeAvatar(formData));
      onClose();
    }
  };

  return isEditing ? (
    <EditProfileContent
      handleSaveClick={handleSaveClick}
      setIsEditing={setIsEditing}
      fields={fields}
      passwordInputs={passwordInputs}
    />
  ) : (
    <ViewProfileContent
      handleEditClick={handleEditClick}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      fields={fields}
    />
  );
}
