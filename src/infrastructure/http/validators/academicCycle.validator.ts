import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createAcademicCycleSchema = z.object({
  name: z.string().trim().min(1, new ValidationEmpty("name").response),
});

const updateAcademicCycleSchema = {
  body: z.object({
    name: z.string().trim().min(1, new ValidationEmpty("name").response),
  }),
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
};

const deleteAcademicCycleSchema = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

const getOneAcademicCycleSchema = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

export {
  createAcademicCycleSchema,
  getOneAcademicCycleSchema,
  updateAcademicCycleSchema,
  deleteAcademicCycleSchema,
};
