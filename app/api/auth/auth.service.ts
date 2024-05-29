import {UserToRegister} from "@/lib/types";
import {saltAndHashPassword} from "@/lib/password";
import { checkEmailExistsInDb, checkUsernameExistsInDb, createUserInDb } from '@/app/api/auth/auth.repository';
import { signIn } from '@/auth';
import { CustomError } from '@/lib/customError';


export async function registerNewUser(user: UserToRegister) {
  
    const mailAlreadyExists = await checkEmailExistsInDb(user.email);
    if (mailAlreadyExists) {
      throw new CustomError('This email is already in use. Please try another one.');
    }
    const usernameAlreadyExists = await checkUsernameExistsInDb(user.username);
    if (usernameAlreadyExists) {
      throw new CustomError('This username is already in use. Please try another one.');
    }
    const nonHashedPassword = user.password;
    user.password = saltAndHashPassword(user.password);
    const createdUser = await createUserInDb(user);
    if (createdUser) {
      await signIn('credentials', {
        redirect: false,
        email: user.email,
        password: nonHashedPassword
      })
      return createdUser;
    }
}


export async function getUserByEmail(email: string) {
  try {
    return checkEmailExistsInDb(email);
  } catch (error) {
    console.error(error);
  }
}