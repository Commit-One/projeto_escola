import { Router } from "express";
import {
  createClassPeriodSchema,
  deleteClassPeriodSchema,
  getOneClassPeriodByUuidSchema,
  updateClassPeriodSchema,
} from "../validators/classPeriod.validator";
import { container } from "tsyringe";
import { ClassPeriodController } from "../controllers/classPeriod.controller";
import { createApi } from "../../../utils/helpers/createApi";
import { isAuthMiddleware } from "../middleware/auth.middleware";
import { ProfileEnum } from "../../../utils/enum/profile";
import { authorizationProfileMiddleware } from "../middleware/profile.middleware";

export const classPeriodRoutes = Router();

const controller = container.resolve(ClassPeriodController);
const tagName = "Períodos e turnos";

createApi(classPeriodRoutes, {
  controller: controller.create.bind(controller),
  method: "post",
  path: "/",
  fullPath: "/classPeriod",
  summary: "Criar um regra de classe e período",
  tags: [tagName],
  body: createClassPeriodSchema,
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(classPeriodRoutes, {
  controller: controller.update.bind(controller),
  method: "put",
  path: "/:uuid",
  fullPath: "/classPeriod/:uuid",
  summary: "Atualizar regra de classe e período",
  tags: [tagName],
  body: updateClassPeriodSchema,
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(classPeriodRoutes, {
  controller: controller.getOne.bind(controller),
  method: "get",
  path: "/:uuid",
  fullPath: "/classPeriod/:uuid",
  tags: [tagName],
  summary: "Buscar uma regra de classe e período",
  body: getOneClassPeriodByUuidSchema,
  middlewares: [isAuthMiddleware],
});

createApi(classPeriodRoutes, {
  controller: controller.delete.bind(controller),
  method: "delete",
  path: "/:uuid",
  fullPath: "/classPeriod/:uuid",
  tags: [tagName],
  summary: "Deletar uma regra de classe e período",
  body: deleteClassPeriodSchema,
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(classPeriodRoutes, {
  controller: controller.getAll.bind(controller),
  method: "get",
  tags: [tagName],
  path: "/",
  fullPath: "/classPeriod",
  summary: "Buscar todas as regras de classe e período",
  middlewares: [isAuthMiddleware],
});
