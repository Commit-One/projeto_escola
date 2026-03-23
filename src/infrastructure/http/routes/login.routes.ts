import { Router } from "express";
import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  loginSchemaDecoded,
  loginSchemaValidator,
} from "../validators/login.validator";
import { container } from "tsyringe";
import { LoginController } from "../controllers/login.controller";

export const loginRoutes = Router();

const controller = container.resolve(LoginController);

loginRoutes.post(
  "/",
  validateMiddlewareSchema(loginSchemaValidator),
  (req, res) => controller.signIn(req, res),
);

loginRoutes.post(
  "/decoded",
  validateMiddlewareSchema(loginSchemaDecoded),
  (req, res) => controller.decoded(req, res),
);
