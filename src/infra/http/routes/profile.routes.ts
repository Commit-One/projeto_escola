import { Router } from "express";
import { makeProfileContainer } from "../../../main/container/profile.container";
import { createProfileSchema } from "../validators/profile.validator";
import { validateMiddlewareSchema } from "../middleware/validateSchema";

export const profileRoutes = Router();

const controller = makeProfileContainer();

profileRoutes.post(
  "/",
  validateMiddlewareSchema(createProfileSchema),
  (req, res) => controller.create(req, res),
);
