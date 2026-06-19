import { Router } from "express";
import { container } from "tsyringe";
import { createApi } from "../../../utils/helpers/createApi";
import {
  createScheduleSchema,
  deleteScheduleSchema,
  updateScheduleSchema,
} from "../validators/schedule.validator";
import { isAuthMiddleware } from "../middleware/auth.middleware";
import { authorizationProfileMiddleware } from "../middleware/profile.middleware";
import { ProfileEnum } from "../../../utils/enum/profile";
import { ScheduleController } from "../controllers/schedule.controller";

export const scheduleRoutes = Router();
const controller = container.resolve(ScheduleController);
const tagName = "Schedule";

createApi(scheduleRoutes, {
  method: "post",
  path: "/",
  fullPath: "/schedule",
  summary: "Criar agendamento de um evento",
  body: createScheduleSchema,
  tags: [tagName],
  controller: controller.create.bind(controller),
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(scheduleRoutes, {
  method: "get",
  path: "/",
  fullPath: "/schedule",
  summary: "Buscar todos os agendamentos",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
  middlewares: [isAuthMiddleware],
});

createApi(scheduleRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/schedule/:uuid",
  summary: "Atualizar um agendamento",
  body: updateScheduleSchema.body,
  params: updateScheduleSchema.params,
  tags: [tagName],
  controller: controller.update.bind(controller),
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(scheduleRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/schedule/:uuid",
  summary: "Deletar um agendamento",
  params: deleteScheduleSchema,
  tags: [tagName],
  controller: controller.delete.bind(controller),
  middlewares: [
    isAuthMiddleware,
    authorizationProfileMiddleware([ProfileEnum.ADMIN]),
  ],
});
