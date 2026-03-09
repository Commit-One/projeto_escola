import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

const updatePasswordUserSchema = z.object({
  body: z.object({
    email: z
      .string({ error: ApplicationError.user.emailRequired })
      .trim()
      .email(ApplicationError.generic.formatEmail)
      .min(1, ApplicationError.user.emailRequired),
    password: z
      .string({ error: ApplicationError.user.passwordRequired })
      .trim()
      .min(1, ApplicationError.user.passwordRequired),
  }),
});

const updateStatusUserSchema = z.object({
  params: z.object({
    uuid: z
      .string({ error: ApplicationError.generic.uuid })
      .trim()
      .min(1, ApplicationError.generic.uuid),
  }),
  body: z.object({
    status: z
      .string({ error: ApplicationError.generic.uuid })
      .trim()
      .min(1, ApplicationError.generic.uuid),
  }),
});

export { updatePasswordUserSchema, updateStatusUserSchema };
