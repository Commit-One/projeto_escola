import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createPeriodSchema = z.object({
  name: z.string().trim().min(1, new ValidationEmpty("name").response),
});

const updatePeriodSchema = {
  body: z.object({
    name: z.string().trim().min(1, new ValidationEmpty("name").response),
  }),
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
};

const deletePeriodSchema = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

const getOnePeriodSchema = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

export {
  createPeriodSchema,
  getOnePeriodSchema,
  updatePeriodSchema,
  deletePeriodSchema,
};
