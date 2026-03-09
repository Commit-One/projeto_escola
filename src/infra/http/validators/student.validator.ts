import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

const createStudentSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: ApplicationError.student.nameRequired })
      .trim()
      .min(1, ApplicationError.student.nameRequired),

    matriculation: z
      .string({
        error: ApplicationError.student.matriculationRequired,
      })
      .trim()
      .min(1, ApplicationError.student.matriculationRequired),

    dateBirth: z.coerce.date({
      error: () => ({ message: ApplicationError.student.dateBirthRequired }),
    }),

    status: z
      .string({ error: ApplicationError.student.statusRequired })
      .trim()
      .min(1, ApplicationError.student.statusRequired),

    nameMother: z
      .string({ error: ApplicationError.student.nameMotherRequired })
      .trim()
      .min(1, ApplicationError.student.nameMotherRequired),

    nameFather: z
      .string({ error: ApplicationError.student.nameFatherRequired })
      .trim()
      .min(1, ApplicationError.student.nameFatherRequired),

    phone: z
      .string({ error: ApplicationError.student.phoneRequired })
      .trim()
      .min(1, ApplicationError.student.phoneRequired),

    classStudent: z
      .string({ error: ApplicationError.student.classStudentRequired })
      .trim()
      .min(1, ApplicationError.student.classStudentRequired),

    dateMatriculation: z.coerce.date({
      error: () => ({
        message: ApplicationError.student.dateMatriculationRequired,
      }),
    }),

    hasDiscount: z.boolean().default(false),

    discount: z.number(),

    datePayment: z.coerce.date({
      error: () => ({
        message: ApplicationError.student.datePaymentRequired,
      }),
    }),

    schoolUuid: z
      .string()
      .trim()
      .min(1, ApplicationError.student.schoolUuidRequired),

    periodUuid: z
      .string()
      .trim()
      .min(1, ApplicationError.student.periodUuidRequired),
  }),
});

const deleteStudentSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: ApplicationError.generic.uuid })
      .min(1, ApplicationError.generic.uuid),
  }),
});

const getOneStudentSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: ApplicationError.generic.uuid })
      .min(1, ApplicationError.generic.uuid),
  }),
});

const updateStatusStudentSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: ApplicationError.generic.uuid })
      .min(1, ApplicationError.generic.uuid),
  }),
});

const updateStudentSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: ApplicationError.student.nameRequired })
      .trim()
      .min(1, ApplicationError.student.nameRequired),

    matriculation: z
      .string({
        error: ApplicationError.student.matriculationRequired,
      })
      .trim()
      .min(1, ApplicationError.student.matriculationRequired),

    dateBirth: z.coerce.date({
      error: () => ({ message: ApplicationError.student.dateBirthRequired }),
    }),

    status: z
      .string({ error: ApplicationError.student.statusRequired })
      .trim()
      .min(1, ApplicationError.student.statusRequired),

    nameMother: z
      .string({ error: ApplicationError.student.nameMotherRequired })
      .trim()
      .min(1, ApplicationError.student.nameMotherRequired),

    nameFather: z
      .string({ error: ApplicationError.student.nameFatherRequired })
      .trim()
      .min(1, ApplicationError.student.nameFatherRequired),

    phone: z
      .string({ error: ApplicationError.student.phoneRequired })
      .trim()
      .min(1, ApplicationError.student.phoneRequired),

    classStudent: z
      .string({ error: ApplicationError.student.classStudentRequired })
      .trim()
      .min(1, ApplicationError.student.classStudentRequired),

    dateMatriculation: z.coerce.date({
      error: () => ({
        message: ApplicationError.student.dateMatriculationRequired,
      }),
    }),

    hasDiscount: z.boolean().default(false),

    discount: z.number(),

    datePayment: z.coerce.date({
      error: () => ({
        message: ApplicationError.student.datePaymentRequired,
      }),
    }),

    schoolUuid: z
      .string()
      .trim()
      .min(1, ApplicationError.student.schoolUuidRequired),

    periodUuid: z
      .string()
      .trim()
      .min(1, ApplicationError.student.periodUuidRequired),
  }),
});

export {
  createStudentSchemaValidator,
  updateStudentSchemaValidator,
  getOneStudentSchemaValidator,
  deleteStudentSchemaValidator,
  updateStatusStudentSchemaValidator,
};
