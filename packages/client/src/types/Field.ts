import { FieldName } from '@app/const';

export type Field = {
  name: Partial<FieldName>;
  placeholder: string;
  label?: string;
  type?: string;
};
