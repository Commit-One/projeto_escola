import { Router } from "express";
import { makeUSerContainer } from "../../../main/container/user.container";
import { validateMiddlewareSchema } from "../middleware/validateSchema";
import { updatePasswordUserSchema } from "../validators/user.validator";

export const usersRoutes = Router();

const controller = makeUSerContainer();

usersRoutes.get("/", (req, res) => controller.getAll(req, res));
usersRoutes.put(
  "/password",
  validateMiddlewareSchema(updatePasswordUserSchema),
  (req, res) => controller.updatePassword(req, res),
);
