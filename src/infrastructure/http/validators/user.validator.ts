import * as z from "zod";
import { AppError, ValidationEmpty } from "../../../utils/error";

const updatePasswordUserSchema = z.object({
  body: z.object({
    email: z
      .string({ error: new ValidationEmpty("Email").response })
      .trim()
      .email(new AppError("Formato inválido"))
      .min(1, new ValidationEmpty("Email").response),

    password: z
      .string({ error: new ValidationEmpty("Password").response })
      .trim()
      .min(1, new ValidationEmpty("Password").response),
  }),
});

const updateStatusUserSchema = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .min(1, new ValidationEmpty("Uuid").response),
  }),

  body: z.object({
    status: z
      .string({ error: new ValidationEmpty("Status").response })
      .trim()
      .min(1, new ValidationEmpty("Status").response),
  }),
});

export { updatePasswordUserSchema, updateStatusUserSchema };