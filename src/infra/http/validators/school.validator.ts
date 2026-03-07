import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

export const createSchoolSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, ApplicationError.school.nameRequired),
    address: z.string().trim().min(1, ApplicationError.school.addressRequired),
    phone: z.string().trim().min(1, ApplicationError.school.phoneRequired),
    email: z
      .string()
      .trim()
      .email(ApplicationError.generic.formatEmail)
      .min(1, ApplicationError.school.emailRequired),
  }),
});

export const deleteSchoolSchema = z.object({
  params: z.object({
    uuid: z.string().trim().uuid().min(1, ApplicationError.generic.uuid),
  }),
});

export const getByNameSchema = z.object({
  params: z.object({
    name: z.string().trim().min(1, ApplicationError.school.nameRequired),
  }),
});

export const updateSchoolSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, ApplicationError.school.nameRequired),
    address: z.string().trim().min(1, ApplicationError.school.addressRequired),
    phone: z.string().trim().min(1, ApplicationError.school.phoneRequired),
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
