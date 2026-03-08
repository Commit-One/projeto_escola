import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

const createSchoolSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, ApplicationError.school.nameSchoolRequired),
    address: z.string().trim().min(1, ApplicationError.school.addressRequired),
    phone: z.string().trim().min(1, ApplicationError.school.phoneRequired),
    nameDirector: z
      .string()
      .trim()
      .min(1, ApplicationError.school.nameDirectorRequired),
    email: z
      .string()
      .trim()
      .email(ApplicationError.generic.formatEmail)
      .min(1, ApplicationError.school.emailRequired),
  }),
});

const deleteSchoolSchema = z.object({
  params: z.object({
    uuid: z.string().trim().uuid().min(1, ApplicationError.generic.uuid),
  }),
});

const getByNameSchema = z.object({
  params: z.object({
    name: z.string().trim().min(1, ApplicationError.school.nameSchoolRequired),
  }),
});

const updateSchoolSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, ApplicationError.school.nameSchoolRequired),
    address: z.string().trim().min(1, ApplicationError.school.addressRequired),
    phone: z.string().trim().min(1, ApplicationError.school.phoneRequired),
    nameDirector: z
      .string()
      .trim()
      .min(1, ApplicationError.school.nameDirectorRequired),
    email: z
      .string()
      .trim()
      .email()
      .min(1, ApplicationError.school.emailRequired),
  }),
  params: z.object({
    uuid: z.string().trim().uuid().min(1, ApplicationError.generic.uuid),
  }),
});

const updateStatusSchoolSchema = z.object({
  body: z.object({
    status: z.string().trim().min(1, ApplicationError.generic.updateStatus),
  }),
  params: z.object({
    uuid: z.string().trim().min(1, ApplicationError.generic.uuid),
  }),
});

export {
  createSchoolSchema,
  updateSchoolSchema,
  deleteSchoolSchema,
  getByNameSchema,
  updateStatusSchoolSchema,
};
