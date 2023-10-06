import { pick } from 'lodash';
import { FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Form } from '@app/components';
import { editProfileSchema, editProfileFields, FieldName } from '@app/const';
import { User } from '@app/types';
import { AppDispatch, changePassword, changeProfile } from '@app/store';

const buttonText = 'Save';

type Properties = {
  user?: User;
  goToProfileTable: () => void;
};

export function ProfileForm({ user, goToProfileTable }: Properties) {
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (data: FieldValues) => {
    const changeProfileData = pick(data, [
      FieldName.FIRST_NAME,
      FieldName.SECOND_NAME,
      FieldName.DISPLAY_NAME,
      FieldName.LOGIN,
      FieldName.EMAIL,
      FieldName.PHONE,
    ]);
    const changePasswordData = {
      oldPassword: data[FieldName.PASSWORD_OLD],
      newPassword: data[FieldName.PASSWORD],
    };

    if (changePasswordData.oldPassword === changePasswordData.newPassword) {
      await dispatch(changeProfile(changeProfileData));
    } else {
      await dispatch(changeProfile(changeProfileData));
      await dispatch(changePassword(changePasswordData));
    }
    goToProfileTable();
  };
  const initialValues = pick(user, [
    FieldName.FIRST_NAME,
    FieldName.SECOND_NAME,
    FieldName.EMAIL,
    FieldName.PHONE,
    FieldName.DISPLAY_NAME,
  ]) as Record<Partial<FieldName>, string>;
  return Form({
    inputs: editProfileFields,
    buttonText,
    mb: 3,
    validationSchema: editProfileSchema,
    initialValues,
    withLabel: true,
    onSubmit,
  });
}
