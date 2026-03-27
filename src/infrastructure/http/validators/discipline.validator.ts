import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createDisciplineSchemaValidator = z.object({
  name: z
    .string({ error: new ValidationEmpty("Nome").response })
    .trim()
    .min(1, new ValidationEmpty("Nome").response),
  schoolUuid: z.string({ error: new ValidationEmpty("SchoolUuid").response }),
});

const updateDisciplineSchemaValidator = {
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Nome").response })
      .trim()
      .min(1, new ValidationEmpty("Nome").response),
  }),
  params: z.object({
    uuid: z.string({ error: new ValidationEmpty("Uuid").response }),
  }),
};

const deleteDisciplineSchemaValidator = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

const getOneDisciplineSchemaValidator = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

export {
  createDisciplineSchemaValidator,
  deleteDisciplineSchemaValidator,
  getOneDisciplineSchemaValidator,
  updateDisciplineSchemaValidator,
};
