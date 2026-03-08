import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

const updatePasswordUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email(ApplicationError.generic.formatEmail)
      .min(1, ApplicationError.user.emailRequired),
    password: z.string().trim().min(1, ApplicationError.user.passwordRequired),
  }),
});

const updateStatusUserSchema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, ApplicationError.generic.uuid),
  }),
  body: z.object({
    status: z.string().trim().min(1, ApplicationError.generic.uuid),
  }),
});

export { updatePasswordUserSchema, updateStatusUserSchema };
