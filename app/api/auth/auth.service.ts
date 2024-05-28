import {User, UserToRegister} from "@/lib/types";
import {saltAndHashPassword} from "@/lib/password";
import {checkEmailInDb, createUserInDb} from "@/app/api/auth/auth.repository";


export async function registerNewUser(user: UserToRegister) {
  
  try {
    const userExists = await checkEmailInDb(user.email);
    if (userExists) {
      return new Error('User already exists');
    }
    user.password = saltAndHashPassword(user.password);
    return await createUserInDb(user);
  } catch (error) {
    console.error(error);
  }
}