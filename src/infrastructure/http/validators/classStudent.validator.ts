import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

const createClassSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: ApplicationError.class.nameRequired })
      .trim()
      .min(1, ApplicationError.class.nameRequired),
    maxAge: z.number({ error: ApplicationError.class.maxAgeRequired }),
    minAge: z.number({ error: ApplicationError.class.minAgeRequired }),
  }),
});

const updateClassSchemaValidator = z.object({
  body: z.object({
    name: z
      .string({ error: ApplicationError.class.nameRequired })
      .trim()
      .min(1, ApplicationError.class.nameRequired),
    maxAge: z.number({ error: ApplicationError.class.maxAgeRequired }),
    minAge: z.number({ error: ApplicationError.class.minAgeRequired }),
  }),
});

const deleteClassSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: ApplicationError.generic.uuid })
      .trim()
      .min(1, ApplicationError.generic.uuid),
  }),
});

const getOneClassSchemaValidator = z.object({
  params: z.object({
    uuid: z
      .string({ error: ApplicationError.generic.uuid })
      .trim()
      .min(1, ApplicationError.class.nameRequired),
  }),
});

export {
  createClassSchemaValidator,
  deleteClassSchemaValidator,
  getOneClassSchemaValidator,
  updateClassSchemaValidator,
};
