import * as z from "zod";
import { AppError, ValidationEmpty } from "../../../utils/error";

const createSchoolSchema = z.object({
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Nome da escola").response })
      .trim()
      .min(1, new ValidationEmpty("Nome da escola").response),
    address: z
      .string({ error: new ValidationEmpty("Endereço").response })
      .trim()
      .min(1, new ValidationEmpty("Endereço").response),
    phone: z
      .string({ error: new ValidationEmpty("Telefone").response })
      .trim()
      .min(1, new ValidationEmpty("Telefone").response),
    nameDirector: z
      .string({ error: new ValidationEmpty("Nome do diretor").response })
      .trim()
      .min(1, new ValidationEmpty("Nome do diretor").response),
    email: z
      .string({ error: new ValidationEmpty("E-mail").response })
      .trim()
      .email(new AppError("Formato inválido"))
      .min(1, new ValidationEmpty("E-mail").response),
  }),
});

const deleteSchoolSchema = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .uuid()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

const getByNameSchema = z.object({
  params: z.object({
    name: z
      .string({ error: new ValidationEmpty("Nome da escola").response })
      .trim()
      .min(1, new ValidationEmpty("Nome da escola").response),
  }),
});

const updateSchoolSchema = z.object({
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Nome da escola").response })
      .trim()
      .min(1, new ValidationEmpty("Nome da escola").response),
    address: z
      .string({ error: new ValidationEmpty("Endereço").response })
      .trim()
      .min(1, new ValidationEmpty("Endereço").response),
    phone: z
      .string({ error: new ValidationEmpty("Telefone").response })
      .trim()
      .min(1, new ValidationEmpty("Telefone").response),
    nameDirector: z
      .string({ error: new ValidationEmpty("Nome do diretor").response })
      .trim()
      .min(1, new ValidationEmpty("Nome do diretor").response),
    email: z
      .string({ error: new ValidationEmpty("E-mail").response })
      .trim()
      .email(new AppError("Formato inválido"))
      .min(1, new ValidationEmpty("E-mail").response),
  }),
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .uuid()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

const updateStatusSchoolSchema = z.object({
  body: z.object({
    status: z.string().trim().min(1, new ValidationEmpty("Status").response),
  }),
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

export {
  createSchoolSchema,
  updateSchoolSchema,
  deleteSchoolSchema,
  getByNameSchema,
  updateStatusSchoolSchema,
};
