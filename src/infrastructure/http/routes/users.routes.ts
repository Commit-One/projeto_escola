import { Router } from "express";
import {
  updatePasswordUserSchema,
  updateStatusUserSchema,
} from "../validators/user.validator";
import { container } from "tsyringe";
import { UserController } from "../controllers/user.controller";
import { createApi } from "../../../utils/helpers/createApi";

export const usersRoutes = Router();

const controller = container.resolve(UserController);
const tagName = "Users";

createApi(usersRoutes, {
  method: "get",
  path: "/",
  fullPath: "/users",
  summary: "Buscar todos os usuários",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
});

createApi(usersRoutes, {
  method: "put",
  path: "/password",
  fullPath: "/users/password",
  summary: "Atualizar senha do usuário",
  tags: [tagName],
  body: updatePasswordUserSchema,
  controller: controller.updatePassword.bind(controller),
});

createApi(usersRoutes, {
  method: "put",
  path: "/status/:uuid",
  fullPath: "/users/status/:uuid",
  summary: "Atualizar status do usuário",
  tags: [tagName],
  body: updateStatusUserSchema.body,
  params: updateStatusUserSchema.params,
  controller: controller.updateStatus.bind(controller),
});
