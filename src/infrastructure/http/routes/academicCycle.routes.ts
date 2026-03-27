import { Router } from "express";
import { container } from "tsyringe";
import { AcademicCycleController } from "../controllers/academicCycle.controller";
import { createApi } from "../../../utils/helpers/createApi";
import {
  createAcademicCycleSchemaValidator,
  deleteAcademicCycleSchemaValidator,
  getOneAcademicCycleSchemaValidator,
  updateAcademicCycleSchemaValidator,
} from "../validators/academicCycle.validator";

export const academicCycleRoutes = Router();
const controller = container.resolve(AcademicCycleController);
const tagName = "Academic Cycle";

createApi(academicCycleRoutes, {
  method: "post",
  path: "/",
  fullPath: "/academiccycle",
  summary: "Criar ciclo acadêmico",
  body: createAcademicCycleSchemaValidator,
  tags: [tagName],
  controller: controller.create.bind(controller),
});

createApi(academicCycleRoutes, {
  method: "get",
  path: "/",
  fullPath: "/academiccycle",
  summary: "Buscar todos os ciclos acadêmicos",
  body: createAcademicCycleSchemaValidator,
  tags: [tagName],
  controller: controller.getAll.bind(controller),
});

createApi(academicCycleRoutes, {
  method: "get",
  path: "/uuid/:uuid",
  fullPath: "/academiccycle/uuid/:uuid",
  summary: "Buscar um ciclo  acadêmicos",
  params: getOneAcademicCycleSchemaValidator,
  tags: [tagName],
  controller: controller.getOne.bind(controller),
});

createApi(academicCycleRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/academiccycle/:uuid",
  summary: "Atualizar um ciclo  acadêmicos",
  body: updateAcademicCycleSchemaValidator.body,
  params: updateAcademicCycleSchemaValidator.params,
  tags: [tagName],
  controller: controller.update.bind(controller),
});

createApi(academicCycleRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/academiccycle/:uuid",
  summary: "Deletar um ciclo  acadêmico",
  params: deleteAcademicCycleSchemaValidator,
  tags: [tagName],
  controller: controller.delete.bind(controller),
});
