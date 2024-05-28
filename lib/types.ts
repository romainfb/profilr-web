import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

export type FormFieldProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  name: keyof T;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFormLogin = 'email' | 'password';

export type FormDataLogin = {
  email: string;
  password: string;
};
