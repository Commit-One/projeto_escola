import { Router } from "express";
import { validateMiddlewareSchema } from "../middleware/validateSchema";
import {
  loginSchemaDecoded,
  loginSchemaValidator,
} from "../validators/login.validator";
import { makeLoginContainer } from "../../../main/container/login.container";
import { authMiddleware } from "../middleware/auth";

export const loginRoutes = Router();

const controller = makeLoginContainer();

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
