import { Router } from "express";
import { container } from "tsyringe";
import { PeriodController } from "../controllers/period.controller";
import { createApi } from "../../../utils/helpers/createApi";
import { authenticateMiddleware } from "../middleware/auth.middleware";
import { authorizationMiddleware } from "../middleware/profile.middleware";
import { ProfileEnum } from "../../../utils/enum/profile";

export const periodRoutes = Router();

const controller = container.resolve(PeriodController);
const tagName = "Period";

createApi(periodRoutes, {
  method: "post",
  path: "/",
  fullPath: "/periodo",
  summary: "Criar período",
  tags: [tagName],
  controller: controller.create.bind(controller),
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});
