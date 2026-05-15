import { Router } from "express";
import { container } from "tsyringe";
import { PeriodController } from "../controllers/period.controller";
import { createApi } from "../../../utils/helpers/createApi";
import { isAuthMiddleware } from "../middleware/auth.middleware";
import { authorizationProfileMiddleware } from "../middleware/profile.middleware";
import { ProfileEnum } from "../../../utils/enum/profile";
import {
  createPeriodSchema,
  deletePeriodSchema,
  updatePeriodSchema,
} from "../validators/period.validator";

export const periodRoutes = Router();

const controller = container.resolve(PeriodController);
const tagName = "Period";

createApi(periodRoutes, {
  method: "post",
  path: "/",
  fullPath: "/periodo",
  summary: "Criar período",
  body: createPeriodSchema,
  tags: [tagName],
  controller: controller.create.bind(controller),
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(periodRoutes, {
  method: "get",
  path: "/",
  fullPath: "/periodo",
  summary: "Buscar períodos",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(periodRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/periodo/:uuid",
  summary: "Atualizar período",
  tags: [tagName],
  params: updatePeriodSchema.params,
  body: updatePeriodSchema.body,
  controller: controller.update.bind(controller),
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(periodRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/periodo/:uuid",
  summary: "Deletar período",
  tags: [tagName],
  params: deletePeriodSchema,
  controller: controller.delete.bind(controller),
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});
