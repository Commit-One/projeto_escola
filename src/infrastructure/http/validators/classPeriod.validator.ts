import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createClassPeriodSchema = z.object({
  classUuid: z
    .string({ error: new ValidationEmpty("Classe").response })
    .trim()
    .min(1, new ValidationEmpty("Classe").response),
  periodUuid: z
    .string({ error: new ValidationEmpty("Período").response })
    .trim()
    .min(1, new ValidationEmpty("Período").response),
  value: z.number({ error: new ValidationEmpty("Valor").response }),
});

const updateClassPeriodSchema = z.object({
  classUuid: z
    .string({ error: new ValidationEmpty("Classe").response })
    .trim()
    .min(1, new ValidationEmpty("Classe").response),
  periodUuid: z
    .string({ error: new ValidationEmpty("Período").response })
    .trim()
    .min(1, new ValidationEmpty("Período").response),
  value: z.number({ error: new ValidationEmpty("Valor").response }),
});

const deleteClassPeriodSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

const getOneClassPeriodByUuidSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

export {
  getOneClassPeriodByUuidSchema,
  deleteClassPeriodSchema,
  updateClassPeriodSchema,
  createClassPeriodSchema,
};
