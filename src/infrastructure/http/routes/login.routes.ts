import { Router } from "express";
import { validateMiddlewareSchema } from "../middleware/validateSchema";
import {
  loginSchemaDecoded,
  loginSchemaValidator,
} from "../validators/login.validator";
import { MakeLoginContainer } from "../../../main/container/login.container";
// import { authMiddleware } from "../middleware/auth";

export const loginRoutes = Router();

const controller = MakeLoginContainer.inicialize();

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
