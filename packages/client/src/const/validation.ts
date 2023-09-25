import Joi from 'joi';
import { pick } from 'lodash';

import { FieldName } from '@app/types';

const noDigits = /\D$/;
const latinOrCyrillic = /[\w*ЁАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяё]$/;
const firstLetterCapital = /^[A-ZЁА-Я]\S+/;
const notOnlyDigits = /(?!^\d+$)^.+$/;
const noSpaces = /^\S*$/;
const evenOneDigit = /\d/;
const capitalLetter = /[A-ZА-Я-]/;
const telephone = /^\+?\d*$/;
const allowedLatinChars = /^[\w-_]*$/;

const messages = {
  min: '{#label} должен быть не менее {#limit} символов',
  max: '{#label} должен быть не более {#limit} символов',
  empty: '{#label} не может быть пустым',
};

const baseMessages = {
  'string.min': messages.min,
  'string.max': messages.max,
  'string.empty': messages.empty,
};

const password = Joi.string()
  .min(8)
  .max(40)
  .pattern(evenOneDigit, 'evenOneDigit')
  .pattern(capitalLetter, 'capitalLetter')
  .required()
  .label('Пароль')
  .messages(baseMessages)
  .error((errors) => {
    for (const error of errors) {
      if (error.code === 'string.pattern.name' && error.local)
        if (error.local.name === 'evenOneDigit') {
          error.message = 'Пароль должен содержать хотя бы одну цифру';
        } else if (error.local.name === 'capitalLetter') {
          error.message = 'Пароль должен содержать хотя бы одну заглавную букву';
        }
    }
    return errors;
  });

const nickname = Joi.string()
  .min(3)
  .max(10)
  .alphanum()
  .required()
  .label('Никейм')
  .messages({
    ...baseMessages,
    'string.alphanum': 'Никнейм должен состоять из латинских символов и цифр',
  });

const name = Joi.string()
  .min(2)
  .max(50)
  .pattern(firstLetterCapital, 'firstLetterCapital')
  .pattern(latinOrCyrillic, 'latinOrCyrillic')
  .pattern(noSpaces, 'noSpaces')
  .pattern(noDigits, 'noDigits')
  .required()
  .label('Имя')
  .messages(baseMessages)
  .error((errors) => {
    for (const error of errors) {
      if (error.code === 'string.pattern.name' && error.local)
        switch (error.local.name) {
          case 'latinOrCyrillic': {
            error.message = 'Имя должно состоять из кирилических или латинских символов';
            break;
          }
          case 'firstLetterCapital': {
            error.message = 'Первая буква имени должна быть заглавной';
            break;
          }
          case 'noSpaces': {
            error.message = 'В имени не должно быть пробелов';
            break;
          }
          case 'noDigits': {
            error.message = 'В имени не должно быть цифр';
            break;
          }
          // no default
        }
    }
    return errors;
  });

const login = Joi.string()
  .min(3)
  .max(20)
  .pattern(notOnlyDigits, 'notOnlyDigits')
  .pattern(allowedLatinChars, 'allowedLatinChars')
  .required()
  .label('Логин')
  .messages(baseMessages)
  .error((errors) => {
    for (const error of errors) {
      if (error.code === 'string.pattern.name' && error.local)
        if (error.local.name === 'notOnlyDigits') {
          error.message = 'Логин не может ссостоять только из цифр';
        } else if (error.local.name === 'allowedLatinChars') {
          error.message = 'Логин содержит недопустимые символы';
        }
    }
    return errors;
  });

const phone = Joi.string()
  .min(10)
  .max(15)
  .pattern(telephone)
  .label('Телефон')
  .messages({ ...baseMessages, 'string.pattern.base': '{#label} содержит недопустимые символы' });

const passwordRepeat = Joi.string()
  .valid(Joi.ref('password'))
  .required()
  .label('Повтор пароля')
  .messages({ ...baseMessages, 'any.only': 'Введённые пароли не совпадают' });
export const profileSchema = {
  [FieldName.FIRST_NAME]: name,
  [FieldName.SECOND_NAME]: name,
  [FieldName.LOGIN]: login,
  [FieldName.DISPLAY_NAME]: nickname,
  [FieldName.EMAIL]: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({ ...baseMessages, 'string.email': 'Веедён невалидный адрес электронной почты' }),
  [FieldName.PASSWORD]: password,
  [FieldName.PASSWORD_REPEAT]: passwordRepeat,
  [FieldName.PHONE]: phone,
};

export const loginSchema = pick(profileSchema, [[FieldName.LOGIN], [FieldName.PASSWORD]]);
