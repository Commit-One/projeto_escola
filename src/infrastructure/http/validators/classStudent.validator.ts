import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createClassSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Nome").response })
      .trim()
      .min(1, new ValidationEmpty("Nome").response),
    maxAge: z.number({ error: new ValidationEmpty("Idade máxima").response }),
    minAge: z.number({ error: new ValidationEmpty("Idade mínima").response }),
  }),
});

const updateClassSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Nome").response })
      .trim()
      .min(1, new ValidationEmpty("Nome").response),
    maxAge: z.number({ error: new ValidationEmpty("Idade máxima").response }),
    minAge: z.number({ error: new ValidationEmpty("Idade mínima").response }),
  }),
});

const deleteClassSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

const getOneClassSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

export {
  createClassSchemaValidator,
  deleteClassSchemaValidator,
  getOneClassSchemaValidator,
  updateClassSchemaValidator,
};
