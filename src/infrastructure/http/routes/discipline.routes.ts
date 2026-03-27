import { Router } from "express";
import { container } from "tsyringe";
import { DisciplineController } from "../controllers/discipline.controller";
import {
  createDisciplineSchemaValidator,
  deleteDisciplineSchemaValidator,
  getOneDisciplineSchemaValidator,
  updateDisciplineSchemaValidator,
} from "../validators/discipline.validator";
import { createApi } from "../../../utils/helpers/createApi";

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
  body: createDisciplineSchemaValidator,
});

createApi(disciplineRoutes, {
  controller: controller.delete.bind(controller),
  method: "delete",
  path: "/:uuid",
  fullPath: "/discipline/:uuid",
  summary: "Deleta disciplina",
  tags: [tagName],
  body: deleteDisciplineSchemaValidator,
});

createApi(disciplineRoutes, {
  controller: controller.update.bind(controller),
  method: "put",
  path: "/:uuid",
  fullPath: "/discipline/:uuid",
  summary: "Atualiza disciplina",
  tags: [tagName],
  body: updateDisciplineSchemaValidator.body,
  params: updateDisciplineSchemaValidator.params,
});

createApi(disciplineRoutes, {
  controller: controller.getAll.bind(controller),
  method: "put",
  path: "/",
  fullPath: "/discipline",
  summary: "Busca todas disciplinas",
  tags: [tagName],
});

createApi(disciplineRoutes, {
  controller: controller.getAll.bind(controller),
  method: "get",
  path: "/:uuid",
  fullPath: "/discipline/:uuid",
  summary: "Busca uma disciplina",
  tags: [tagName],
  params: getOneDisciplineSchemaValidator,
});
