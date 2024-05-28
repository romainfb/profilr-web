import { z } from 'zod';

export const FormLoginSchema = z.object({
  email: z.string().email({ message: 'Merci de renseigner un email valide.' }),
  password: z
    .string({
      required_error: 'Merci de renseigner votre mot de passe.',
    })
    .min(1, { message: 'Merci de renseigner votre mot de passe.' })
});
