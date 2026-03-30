import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

export const createMediaSchema = z.object({
  media: z.number().min(1, new ValidationEmpty("name").response),
});

export const updateMediaSchema = {
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
  body: z.object({
    media: z.number().min(1, new ValidationEmpty("name").response),
  }),
};

export const deleteMediaSchema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
});

export const getOneMediaSchema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
});
