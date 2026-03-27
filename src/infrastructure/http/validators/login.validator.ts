import * as z from "zod";
import { AppError, ValidationEmpty } from "../../../utils/error";

const loginSchemaValidator = z.object({
  email: z
    .string({ error: new ValidationEmpty("email").response })
    .trim()
    .email(new AppError("Formato inválido"))
    .min(1, new ValidationEmpty("email").response),
  password: z
    .string({ error: new ValidationEmpty("password").response })
    .trim()
    .min(1, new ValidationEmpty("password").response),
});

const loginSchemaDecoded = z.object({
  token: z
    .string({ error: "Token não informado" })
    .min(1, "Token não informado"),
});

export { loginSchemaValidator, loginSchemaDecoded };
