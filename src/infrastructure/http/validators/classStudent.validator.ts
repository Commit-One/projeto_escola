import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createClassSchemaValidator = z.object({
  name: z
    .string({ error: new ValidationEmpty("Nome").response })
    .trim()
    .min(1, new ValidationEmpty("Nome").response),
  schoolUuid: z
    .string({ error: new ValidationEmpty("schoolUuid").response })
    .trim()
    .min(1, new ValidationEmpty("schoolUuid").response),
  maxAge: z.number({ error: new ValidationEmpty("Idade máxima").response }),
  minAge: z.number({ error: new ValidationEmpty("Idade mínima").response }),
});

const updateClassSchemaValidator = z.object({
  name: z
    .string({ error: new ValidationEmpty("Nome").response })
    .trim()
    .min(1, new ValidationEmpty("Nome").response),
  schoolUuid: z
    .string({ error: new ValidationEmpty("schoolUuid").response })
    .trim()
    .min(1, new ValidationEmpty("schoolUuid").response),
  maxAge: z.number({ error: new ValidationEmpty("Idade máxima").response }),
  minAge: z.number({ error: new ValidationEmpty("Idade mínima").response }),
});

const deleteClassSchemaValidator = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

const getOneClassSchemaValidator = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

export {
  createClassSchemaValidator,
  deleteClassSchemaValidator,
  getOneClassSchemaValidator,
  updateClassSchemaValidator,
};
