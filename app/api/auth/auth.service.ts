import {UserToRegister} from "@/lib/types";
import {saltAndHashPassword} from "@/lib/password";
import { checkEmailExistsInDb, checkUsernameExistsInDb, createUserInDb } from '@/app/api/auth/auth.repository';
import { signIn } from 'next-auth/react';
import { NextError } from 'next/dist/lib/is-error';


export async function registerNewUser(user: UserToRegister) {
  
  try {
    const mailAlreadyExists = await checkEmailExistsInDb(user.email);
    if (mailAlreadyExists) {
      throw new Error('This email is already in use. Please try another one.');
    }
    const usernameAlreadyExists = await checkUsernameExistsInDb(user.username);
    if (usernameAlreadyExists) {
      throw new Error('This username is already in use. Please try another one.');
    }
    user.password = saltAndHashPassword(user.password);
    const createdUser = await createUserInDb(user);
    if (createdUser) {
      await signIn('credentials', {
        email: user.email,
        password: user.password
      })
      return createdUser;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}


export async function getUserByEmail(email: string) {
  try {
    return checkEmailExistsInDb(email);
  } catch (error) {
    console.error(error);
  }
}