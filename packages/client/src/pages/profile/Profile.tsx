import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { useAppDispatch } from '@app/hooks';
import { ProfileTable, EditProfile } from '@app/components';
import { changeAvatar } from '@app/store';
import { profileFields } from '@app/const';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    <EditProfile handleSaveClick={handleSaveClick} />
  ) : (
    <ProfileTable
      handleEditClick={handleEditClick}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      fields={profileFields}
    />
  );
}
