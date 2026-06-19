import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

const createScheduleSchema = z.object({
  schoolUuid: z
    .string()
    .trim()
    .min(1, new ValidationEmpty("schoolUuid").response),
  classUuid: z
    .string()
    .trim()
    .min(1, new ValidationEmpty("classUuid").response),
  event: z.string().trim().min(1, new ValidationEmpty("evento").response),
  initialHours: z
    .string()
    .trim()
    .min(1, new ValidationEmpty("initialHours").response),
  date: z.string().trim().min(1, new ValidationEmpty("date").response),
  endHours: z.string().trim().min(1, new ValidationEmpty("endHours").response),
});

const updateScheduleSchema = {
  body: z.object({
    schoolUuid: z
      .string()
      .trim()
      .min(1, new ValidationEmpty("schoolUuid").response),
    classUuid: z
      .string()
      .trim()
      .min(1, new ValidationEmpty("classUuid").response),
    event: z.string().trim().min(1, new ValidationEmpty("evento").response),
    initialHours: z
      .string()
      .trim()
      .min(1, new ValidationEmpty("initialHours").response),
    date: z.string().trim().min(1, new ValidationEmpty("date").response),
    endHours: z
      .string()
      .trim()
      .min(1, new ValidationEmpty("endHours").response),
  }),
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
};

const deleteScheduleSchema = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

const getOneScheduleSchema = z.object({
  uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
});

export {
  createScheduleSchema,
  getOneScheduleSchema,
  updateScheduleSchema,
  deleteScheduleSchema,
};
