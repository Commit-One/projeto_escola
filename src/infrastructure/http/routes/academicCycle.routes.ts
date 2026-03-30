import { Router } from "express";
import { container } from "tsyringe";
import { AcademicCycleController } from "../controllers/academicCycle.controller";
import { createApi } from "../../../utils/helpers/createApi";
import {
  createAcademicCycleSchema,
  deleteAcademicCycleSchema,
  getOneAcademicCycleSchema,
  updateAcademicCycleSchema,
} from "../validators/academicCycle.validator";
import { authenticateMiddleware } from "../middleware/auth.middleware";
import { authorizationMiddleware } from "../middleware/profile.middleware";
import { ProfileEnum } from "../../../utils/enum/profile";

export const academicCycleRoutes = Router();
const controller = container.resolve(AcademicCycleController);
const tagName = "Academic Cycle";

createApi(academicCycleRoutes, {
  method: "post",
  path: "/",
  fullPath: "/academiccycle",
  summary: "Criar ciclo acadêmico",
  body: createAcademicCycleSchema,
  tags: [tagName],
  controller: controller.create.bind(controller),
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(academicCycleRoutes, {
  method: "get",
  path: "/",
  fullPath: "/academiccycle",
  summary: "Buscar todos os ciclos acadêmicos",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
  middlewares: [authenticateMiddleware],
});

createApi(academicCycleRoutes, {
  method: "get",
  path: "/uuid/:uuid",
  fullPath: "/academiccycle/uuid/:uuid",
  summary: "Buscar um ciclo  acadêmicos",
  params: getOneAcademicCycleSchema,
  tags: [tagName],
  controller: controller.getOne.bind(controller),
  middlewares: [authenticateMiddleware],
});

createApi(academicCycleRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/academiccycle/:uuid",
  summary: "Atualizar um ciclo  acadêmicos",
  body: updateAcademicCycleSchema.body,
  params: updateAcademicCycleSchema.params,
  tags: [tagName],
  controller: controller.update.bind(controller),
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(academicCycleRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/academiccycle/:uuid",
  summary: "Deletar um ciclo  acadêmico",
  params: deleteAcademicCycleSchema,
  tags: [tagName],
  controller: controller.delete.bind(controller),
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});
