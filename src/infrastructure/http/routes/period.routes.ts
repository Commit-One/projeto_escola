import { Router } from "express";
import { container } from "tsyringe";
import { PeriodController } from "../controllers/period.controller";
import { createApi } from "../../../utils/helpers/createApi";

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
});
