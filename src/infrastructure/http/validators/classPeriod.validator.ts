import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createClassPeriodSchema = z.object({
  classUuid: z
    .string({ error: new ValidationEmpty("classUuid").response })
    .trim()
    .min(1, new ValidationEmpty("classUuid").response),
  periodUuid: z
    .string({ error: new ValidationEmpty("periodUuid").response })
    .trim()
    .min(1, new ValidationEmpty("periodUuid").response),
  value: z.number({ error: new ValidationEmpty("value").response }),
});

const updateClassPeriodSchema = z.object({
  classUuid: z
    .string({ error: new ValidationEmpty("classUuid").response })
    .trim()
    .min(1, new ValidationEmpty("classUuid").response),
  periodUuid: z
    .string({ error: new ValidationEmpty("periodUuid").response })
    .trim()
    .min(1, new ValidationEmpty("periodUuid").response),
  value: z.number({ error: new ValidationEmpty("value").response }),
});

const deleteClassPeriodSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

const getOneClassPeriodSchema = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

export {
  getOneClassPeriodSchema,
  deleteClassPeriodSchema,
  updateClassPeriodSchema,
  createClassPeriodSchema,
};
