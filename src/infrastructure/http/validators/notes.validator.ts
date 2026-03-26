import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createNotesSchemaValidator = z.object({
  body: z.object({
    classUuid: z.string({ error: new ValidationEmpty("classUuid").response }),
    studentUuid: z.string({
      error: new ValidationEmpty("studentUuid").response,
    }),
    disciplineUuid: z.string({
      error: new ValidationEmpty("disciplineUuid").response,
    }),
    schoolUuid: z.string({ error: new ValidationEmpty("SchoolUuid").response }),
    periodUuid: z.string({ error: new ValidationEmpty("periodUuid").response }),
    academiccycleUuid: z.string({
      error: new ValidationEmpty("academiccycleUuid").response,
    }),
    note: z.number({ error: new ValidationEmpty("Nota").response }),
  }),
});

const updateNotesSchemaValidator = z.object({
  body: z.object({
    classUuid: z.string({ error: new ValidationEmpty("SchoolUuid").response }),
    studentUuid: z.string({
      error: new ValidationEmpty("SchoolUuid").response,
    }),
    disciplineUuid: z.string({
      error: new ValidationEmpty("SchoolUuid").response,
    }),
    periodUuid: z.string({ error: new ValidationEmpty("periodUuid").response }),
    schoolUuid: z.string({ error: new ValidationEmpty("SchoolUuid").response }),
    academiccycleUuid: z.string({
      error: new ValidationEmpty("academiccycleUuid").response,
    }),
    note: z.number({ error: new ValidationEmpty("Nota").response }),
  }),
  params: z.object({
    uuid: z.number({ error: new ValidationEmpty("Uuid").response }),
  }),
});

const deleteNotesSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

const getOneNotesSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

export {
  createNotesSchemaValidator,
  deleteNotesSchemaValidator,
  getOneNotesSchemaValidator,
  updateNotesSchemaValidator,
};
