import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

export const createAcademicCycleSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, new ValidationEmpty("name").response),
  }),
});

export const updateAcademicCycleSchema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
  body: z.object({
    name: z.string().trim().min(1, new ValidationEmpty("name").response),
  }),
});

export const deleteAcademicCycleSchema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
});

export const getOneAcademicCycleSchema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
});
