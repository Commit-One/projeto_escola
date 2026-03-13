import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createStudentSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Name").response })
      .trim()
      .min(1, new ValidationEmpty("Name").response),

    matriculation: z
      .string({
        error: new ValidationEmpty("Matriculation").response,
      })
      .trim()
      .min(1, new ValidationEmpty("Matriculation").response),

    dateBirth: z.coerce.date({
      error: () => ({
        message: new ValidationEmpty("Data aniversário").response,
      }),
    }),

    status: z
      .string({ error: new ValidationEmpty("Status").response })
      .trim()
      .min(1, new ValidationEmpty("Status").response),

    nameMother: z
      .string({ error: new ValidationEmpty("NameMother").response })
      .trim()
      .min(1, new ValidationEmpty("NameMother").response),

    nameFather: z
      .string({ error: new ValidationEmpty("NameFather").response })
      .trim()
      .min(1, new ValidationEmpty("NameFather").response),

    phone: z
      .string({ error: new ValidationEmpty("Phone").response })
      .trim()
      .min(1, new ValidationEmpty("Phone").response),

    classStudentUuid: z
      .string({ error: new ValidationEmpty("classStudentUuid").response })
      .trim()
      .min(1, new ValidationEmpty("classStudentUuid").response),

    dateMatriculation: z.coerce.date({
      error: () => ({
        message: new ValidationEmpty("Data de matrícula").response,
      }),
    }),

    hasDiscount: z.boolean().default(false),

    discount: z.number(),

    dayPayment: z.number({
      error: () => ({
        message: new ValidationEmpty("Dia do pagamento").response,
      }),
    }),

    schoolUuid: z
      .string({ error: new ValidationEmpty("SchoolUuid").response })
      .trim()
      .min(1, new ValidationEmpty("SchoolUuid").response),

    periodUuid: z
      .string({ error: new ValidationEmpty("PeriodUuid").response })
      .trim()
      .min(1, new ValidationEmpty("PeriodUuid").response),
  }),
});

const deleteStudentSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

const getOneStudentSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

const updateStatusStudentSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("Uuid").response })
      .min(1, new ValidationEmpty("Uuid").response),
  }),
});

const updateStudentSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: new ValidationEmpty("Name").response })
      .trim()
      .min(1, new ValidationEmpty("Name").response),

    matriculation: z
      .string({
        error: new ValidationEmpty("Matriculation").response,
      })
      .trim()
      .min(1, new ValidationEmpty("Matriculation").response),

    dateBirth: z.coerce.date({
      error: () => ({
        message: new ValidationEmpty("Data de aniversário").response,
      }),
    }),
    status: z
      .string({ error: new ValidationEmpty("Status").response })
      .trim()
      .min(1, new ValidationEmpty("Status").response),

    nameMother: z
      .string({ error: new ValidationEmpty("NameMother").response })
      .trim()
      .min(1, new ValidationEmpty("NameMother").response),

    nameFather: z
      .string({ error: new ValidationEmpty("NameFather").response })
      .trim()
      .min(1, new ValidationEmpty("NameFather").response),

    phone: z
      .string({ error: new ValidationEmpty("Phone").response })
      .trim()
      .min(1, new ValidationEmpty("Phone").response),

    classStudent: z
      .string({ error: new ValidationEmpty("ClassStudent").response })
      .trim()
      .min(1, new ValidationEmpty("ClassStudent").response),

    dateMatriculation: z.coerce.date({
      error: () => ({
        message: new ValidationEmpty("Data de matrícula").response,
      }),
    }),

    hasDiscount: z.boolean().default(false),

    discount: z.number(),

    dayPayment: z.number({
      error: () => ({
        message: new ValidationEmpty("Dia do pagamento").response,
      }),
    }),

    schoolUuid: z
      .string({ error: new ValidationEmpty("SchoolUuid").response })
      .trim()
      .min(1, new ValidationEmpty("SchoolUuid").response),

    periodUuid: z
      .string({ error: new ValidationEmpty("PeriodUuid").response })
      .trim()
      .min(1, new ValidationEmpty("PeriodUuid").response),
  }),
});

export {
  createStudentSchemaValidator,
  updateStudentSchemaValidator,
  getOneStudentSchemaValidator,
  deleteStudentSchemaValidator,
  updateStatusStudentSchemaValidator,
};
