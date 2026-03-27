import { Router } from "express";
import {
  createClassPeriodSchemaValidator,
  deleteClassPeriodSchemaValidator,
  getOneClassPeriodSchemaValidator,
  updateClassPeriodSchemaValidator,
} from "../validators/classPeriod.validator";
import { container } from "tsyringe";
import { ClassPeriodController } from "../controllers/classPeriod.controller";
import { createApi } from "../../../utils/helpers/createApi";

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
  body: createClassPeriodSchemaValidator,
});

createApi(classPeriodRoutes, {
  controller: controller.update.bind(controller),
  method: "put",
  path: "/:uuid",
  fullPath: "/classPeriod/:uuid",
  summary: "Atualizar regra de classe e período",
  tags: [tagName],
  body: updateClassPeriodSchemaValidator,
});

createApi(classPeriodRoutes, {
  controller: controller.getOne.bind(controller),
  method: "get",
  path: "/:uuid",
  fullPath: "/classPeriod/:uuid",
  tags: [tagName],
  summary: "Buscar uma regra de classe e período",
  body: getOneClassPeriodSchemaValidator,
});

createApi(classPeriodRoutes, {
  controller: controller.delete.bind(controller),
  method: "delete",
  path: "/:uuid",
  fullPath: "/classPeriod/:uuid",
  tags: [tagName],
  summary: "Deletar uma regra de classe e período",
  body: deleteClassPeriodSchemaValidator,
});

createApi(classPeriodRoutes, {
  controller: controller.getAll.bind(controller),
  method: "get",
  tags: [tagName],
  path: "/",
  fullPath: "/classPeriod",
  summary: "Buscar todas as regras de classe e período",
});
