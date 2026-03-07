import * as z from "zod";
import { ApplicationError } from "../../../utils/error";

export const createProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, ApplicationError.profile.nameRequired),
  }),
});
