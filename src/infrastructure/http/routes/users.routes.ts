import { Router } from "express";
import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  updatePasswordUserSchema,
  updateStatusUserSchema,
} from "../validators/user.validator";
import { container } from "tsyringe";
import { UserController } from "../controllers/user.controller";

export const usersRoutes = Router();

const controller = container.resolve(UserController);

usersRoutes.get("/", (req, res) => controller.getAll(req, res));

usersRoutes.put(
  "/password",
  validateMiddlewareSchema(updatePasswordUserSchema),
  (req, res) => controller.updatePassword(req, res),
);

usersRoutes.put(
  "/status/:uuid",
  validateMiddlewareSchema(updateStatusUserSchema),
  (req, res) => controller.updateStatus(req, res),
);
