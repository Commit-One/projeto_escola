import { Router } from "express";
import { container } from "tsyringe";
import { DisciplineController } from "../controllers/discipline.controller";
import {
  createDisciplineSchema,
  deleteDisciplineSchema,
  getOneDisciplineSchema,
  updateDisciplineSchema,
} from "../validators/discipline.validator";
import { createApi } from "../../../utils/helpers/createApi";
import { authenticateMiddleware } from "../middleware/auth.middleware";
import { authorizationMiddleware } from "../middleware/profile.middleware";
import { ProfileEnum } from "../../../utils/enum/profile";

export const disciplineRoutes = Router();

const controller = container.resolve(DisciplineController);
const tagName = "Disciplinas";

createApi(disciplineRoutes, {
  controller: controller.create.bind(controller),
  method: "post",
  path: "/",
  fullPath: "/discipline",
  summary: "Cria disciplina",
  tags: [tagName],
  body: createDisciplineSchema,
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(disciplineRoutes, {
  controller: controller.delete.bind(controller),
  method: "delete",
  path: "/:uuid",
  fullPath: "/discipline/:uuid",
  summary: "Deleta disciplina",
  tags: [tagName],
  body: deleteDisciplineSchema,
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(disciplineRoutes, {
  controller: controller.update.bind(controller),
  method: "put",
  path: "/:uuid",
  fullPath: "/discipline/:uuid",
  summary: "Atualiza disciplina",
  tags: [tagName],
  body: updateDisciplineSchema.body,
  params: updateDisciplineSchema.params,
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(disciplineRoutes, {
  controller: controller.getAll.bind(controller),
  method: "get",
  path: "/",
  fullPath: "/discipline",
  summary: "Busca todas disciplinas",
  tags: [tagName],
  middlewares: [authenticateMiddleware],
});

createApi(disciplineRoutes, {
  controller: controller.getAll.bind(controller),
  method: "get",
  path: "/:uuid",
  fullPath: "/discipline/:uuid",
  summary: "Busca uma disciplina",
  tags: [tagName],
  params: getOneDisciplineSchema,
  middlewares: [authenticateMiddleware],
});
