import { Form } from '@app/components';
import { loginFields, loginSchema } from '@app/const';

const buttonText = 'Enter';

export function LoginForm() {
  return Form({ inputs: loginFields, buttonText, mb: 5, validationSchema: loginSchema });
}
