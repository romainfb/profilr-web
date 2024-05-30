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

export type UserToRegister = {
  email: string;
  username: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  phone?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export type ProfileR = {
  id: number;
  url?: string;
  user_id: number;
  bio: string;
  avatar?: Date;
  created_at: Date;
  updated_at: Date;
};

export type Link = {
  title: string;
  description: string;
  url: string;
  order: number;
};
