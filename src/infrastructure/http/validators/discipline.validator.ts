import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createDisciplineSchema = z.object({
  name: z
    .string({ error: new ValidationEmpty("Nome").response })
    .trim()
    .min(1, new ValidationEmpty("Nome").response),
  schoolUuid: z.string({ error: new ValidationEmpty("SchoolUuid").response }),
});

const updateDisciplineSchema = {
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

const deleteDisciplineSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

const getOneDisciplineSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

export {
  createDisciplineSchema,
  deleteDisciplineSchema,
  getOneDisciplineSchema,
  updateDisciplineSchema,
};
