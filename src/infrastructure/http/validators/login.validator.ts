import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

const loginSchemaValidator = z.object({
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

const loginSchemaDecoded = z.object({
  body: z.object({
    token: z
      .string({ error: "Token não informado" })
      .min(1, "Token não informado"),
  }),
});

export { loginSchemaValidator, loginSchemaDecoded };
