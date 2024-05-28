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
export type ValidFormRegister = 'email' | 'username' | 'password' | 'password_confirm';

export type FormDataLogin = {
  email: string;
  password: string;
};

export type FormDataRegister = {
  email: string;
  username: string;
  password: string;
  password_confirm: string;
};