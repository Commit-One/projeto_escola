import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createNotesSchema = z.object({
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
});

const updateNotesSchema = {
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
};

const deleteNotesSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

const getOneNotesSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

const createGradeReportByStudentUuid = z.object({
  studentUuid: z
    .string({ error: new ValidationEmpty("studentUuid").response })
    .trim()
    .min(1, new ValidationEmpty("studentUuid").response),
});

export {
  createNotesSchema,
  deleteNotesSchema,
  getOneNotesSchema,
  updateNotesSchema,
  createGradeReportByStudentUuid,
};
