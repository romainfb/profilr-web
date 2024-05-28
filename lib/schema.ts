import { z } from 'zod';

export const FormLoginSchema = z.object({
  email: z.string().email({ message: 'Merci de renseigner un email valide.' }),
  password: z
    .string({
      required_error: 'Merci de renseigner votre mot de passe.',
    })
    .min(1, { message: 'Merci de renseigner votre mot de passe.' })
});

export const FormRegisterSchema = z.object({
  email: z.string().email({ message: 'Merci de renseigner un email valide.' }),
  password: z
    .string({
      required_error: 'Merci de renseigner votre mot de passe.',
    })
    .min(1, { message: 'Merci de renseigner votre mot de passe.' }),
  password_confirm: z
    .string({
      required_error: 'Merci de confirmer votre mot de passe.',
    })
    .min(1, { message: 'Merci de confirmer votre mot de passe.' }),
  username: z
    .string({
      required_error: 'Merci de renseigner votre prénom.',
    })
    .min(1, { message: 'Merci de renseigner votre prénom.' })
}).refine((data) => data.password === data.password_confirm, {
  message: "Les mots de passe ne correspondent pas",
  path: ["password_confirm"], // chemin de l'erreur
});