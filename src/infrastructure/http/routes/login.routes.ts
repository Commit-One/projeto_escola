import { Router } from "express";
import {
  loginSchemaDecoded,
  loginSchemaValidator,
} from "../validators/login.validator";
import { container } from "tsyringe";
import { LoginController } from "../controllers/login.controller";
import { createApi } from "../../../utils/helpers/createApi";

export const loginRoutes = Router();

const controller = container.resolve(LoginController);
const tagName = "Login";

createApi(loginRoutes, {
  method: "post",
  path: "/",
  fullPath: "/login",
  summary: "Login",
  body: loginSchemaValidator,
  tags: [tagName],
  controller: controller.signIn.bind(controller),
});

createApi(loginRoutes, {
  method: "post",
  path: "/decoded",
  fullPath: "/login/decoded",
  summary: "Criar notas",
  body: loginSchemaDecoded,
  tags: [tagName],
  controller: controller.decoded.bind(controller),
});
