import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createClassPeriodSchemaValidator = z.object({
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

const updateClassPeriodSchemaValidator = z.object({
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

const deleteClassPeriodSchemaValidator = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

const getOneClassPeriodSchemaValidator = z.object({
  uuid: z
    .string({ error: new ValidationEmpty("Uuid").response })
    .trim()
    .min(1, new ValidationEmpty("Uuid").response),
});

export {
  getOneClassPeriodSchemaValidator,
  deleteClassPeriodSchemaValidator,
  updateClassPeriodSchemaValidator,
  createClassPeriodSchemaValidator,
};
