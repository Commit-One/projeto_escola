import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

export const updatePasswordUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email(ApplicationError.generic.formatEmail)
      .min(1, ApplicationError.user.emailRequired),
    password: z.string().trim().min(1, ApplicationError.user.passwordRequired),
  }),
});
