import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createEmployeeSchema = z.object({
  name: z.string().trim().min(1, new ValidationEmpty("name").response),
  email: z
    .email({ error: "E-mail inválido" })
    .trim()
    .min(1, new ValidationEmpty("email").response),
});

const updateEmployeeSchema = {
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
  body: z.object({
    name: z.string().trim().min(1, new ValidationEmpty("name").response),
    email: z
      .email({ error: "E-mail inválido" })
      .trim()
      .min(1, new ValidationEmpty("email").response),
  }),
};

const deleteEmployeeSchema = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

const getOneEmployeeSchema = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

const updateStatusEmployeeSchema = {
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
  body: z.object({
    status: z.string().trim().min(1, new ValidationEmpty("status").response),
  }),
};

export {
  createEmployeeSchema,
  updateEmployeeSchema,
  deleteEmployeeSchema,
  getOneEmployeeSchema,
  updateStatusEmployeeSchema,
};
