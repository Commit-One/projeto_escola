import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createAcademicCycleSchemaValidator = z.object({
  name: z.string().trim().min(1, new ValidationEmpty("name").response),
});

const updateAcademicCycleSchemaValidator = {
  body: z.object({
    name: z.string().trim().min(1, new ValidationEmpty("name").response),
  }),
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
};

const deleteAcademicCycleSchemaValidator = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

const getOneAcademicCycleSchemaValidator = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

export {
  createAcademicCycleSchemaValidator,
  getOneAcademicCycleSchemaValidator,
  updateAcademicCycleSchemaValidator,
  deleteAcademicCycleSchemaValidator,
};
