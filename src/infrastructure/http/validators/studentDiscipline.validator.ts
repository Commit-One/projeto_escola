import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createStudentDisciplineSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Nome").response })
      .trim()
      .min(1, new ValidationEmpty("Nome").response),
    classUuid: z.string({ error: new ValidationEmpty("classUuid").response }),
    studentUuid: z.string({
      error: new ValidationEmpty("studentUuid").response,
    }),
    disciplineUuid: z.string({
      error: new ValidationEmpty("disciplineUuid").response,
    }),
    schoolUuid: z.string({ error: new ValidationEmpty("SchoolUuid").response }),
    note: z.number({ error: new ValidationEmpty("Nota").response }),
  }),
});

const updateStudentDisciplineSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Nome").response })
      .trim()
      .min(1, new ValidationEmpty("Nome").response),
    classUuid: z.string({ error: new ValidationEmpty("SchoolUuid").response }),
    studentUuid: z.string({
      error: new ValidationEmpty("SchoolUuid").response,
    }),
    disciplineUuid: z.string({
      error: new ValidationEmpty("SchoolUuid").response,
    }),
    schoolUuid: z.string({ error: new ValidationEmpty("SchoolUuid").response }),
    note: z.number({ error: new ValidationEmpty("Nota").response }),
  }),
  params: z.object({
    uuid: z.number({ error: new ValidationEmpty("Uuid").response }),
  }),
});

const deleteStudentDisciplineSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

const getOneStudentDisciplineSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .trim()
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

export {
  createStudentDisciplineSchemaValidator,
  deleteStudentDisciplineSchemaValidator,
  getOneStudentDisciplineSchemaValidator,
  updateStudentDisciplineSchemaValidator,
};
