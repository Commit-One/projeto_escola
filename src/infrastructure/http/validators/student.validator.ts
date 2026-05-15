import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createStudentSchema = z.object({
  name: z
    .string({ error: new ValidationEmpty("Nome").response })
    .trim()
    .min(1, new ValidationEmpty("Nome").response),
  cpf: z
    .string({ error: new ValidationEmpty("CPF").response })
    .trim()
    .min(1, new ValidationEmpty("CPF").response),
  age: z
    .number({ error: new ValidationEmpty("Idade").response })
    .min(1, new ValidationEmpty("Idade").response),
  matriculation: z
    .string({
      error: new ValidationEmpty("Matrícula").response,
    })
    .trim()
    .min(1, new ValidationEmpty("Matrícula").response),
  dateBirth: z.coerce.date({
    error: () => ({
      message: new ValidationEmpty("Data aniversário").response,
    }),
  }),
  nameMother: z
    .string({ error: new ValidationEmpty("Nome da mãe").response })
    .trim()
    .min(1, new ValidationEmpty("Nome da mãe").response),

  nameFather: z
    .string({ error: new ValidationEmpty("Nome do pai").response })
    .trim()
    .min(1, new ValidationEmpty("Nome do pai").response),

  phone: z
    .string({ error: new ValidationEmpty("Telefone").response })
    .trim()
    .min(1, new ValidationEmpty("Telefone").response),

  classUuid: z
    .string({ error: new ValidationEmpty("classUuid").response })
    .trim()
    .min(1, new ValidationEmpty("classUuid").response),
  address: z
    .string({ error: new ValidationEmpty("Endereço").response })
    .trim()
    .min(1, new ValidationEmpty("Endereço").response),
  dateMatriculation: z
    .string({ error: new ValidationEmpty("Data matrícula").response })
    .trim()
    .min(1, new ValidationEmpty("Data matrícula").response),
  discount: z.number(),
  dayPayment: z.number({
    error: () => ({
      message: new ValidationEmpty("Dia do pagamento").response,
    }),
  }),
  periodUuid: z
    .string({ error: new ValidationEmpty("PeriodUuid").response })
    .trim()
    .min(1, new ValidationEmpty("PeriodUuid").response),
});

const deleteStudentSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .min(1, new ValidationEmpty("Uuid").response),
});

const getOneStudentSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .min(1, new ValidationEmpty("Uuid").response),
});

const updateStatusStudentSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .min(1, new ValidationEmpty("Uuid").response),
});

const updateStudentSchema = {
  body: z.object({
    phone: z
      .string({ error: new ValidationEmpty("Telefone").response })
      .trim()
      .min(1, new ValidationEmpty("Telefone").response),
    classUuid: z
      .string({ error: new ValidationEmpty("classUuid").response })
      .trim()
      .min(1, new ValidationEmpty("classUuid").response),
    address: z
      .string({ error: new ValidationEmpty("Endereço").response })
      .trim()
      .min(1, new ValidationEmpty("Endereço").response),
    hasDiscount: z.boolean().default(false),
    discount: z.number(),
    dayPayment: z.number({
      error: () => ({
        message: new ValidationEmpty("Dia do pagamento").response,
      }),
    }),
    periodUuid: z
      .string({ error: new ValidationEmpty("PeriodUuid").response })
      .trim()
      .min(1, new ValidationEmpty("PeriodUuid").response),
  }),
  params: z.object({
    uuid: z
      .string({ error: new ValidationEmpty("uuid").response })
      .trim()
      .min(1, new ValidationEmpty("uuid").response),
  }),
};

export {
  createStudentSchema,
  updateStudentSchema,
  getOneStudentSchema,
  deleteStudentSchema,
  updateStatusStudentSchema,
};
