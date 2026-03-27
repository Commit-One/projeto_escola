import { Router } from "express";
import {
  createClassSchemaValidator,
  deleteClassSchemaValidator,
  getOneClassSchemaValidator,
  updateClassSchemaValidator,
} from "../validators/classStudent.validator";
import { container } from "tsyringe";
import { ClassStudentController } from "../controllers/classStudent.controller";
import { createApi } from "../../../utils/helpers/createApi";

export const classStudentsRoutes = Router();
const controller = container.resolve(ClassStudentController);
const tagName = "Classe / Turma";

createApi(classStudentsRoutes, {
  controller: controller.create.bind(controller),
  method: "post",
  path: "/",
  fullPath: "/class",
  summary: "Criar uma turma",
  tags: [tagName],
  body: createClassSchemaValidator,
});

createApi(classStudentsRoutes, {
  controller: controller.update.bind(controller),
  method: "put",
  path: "/:uuid",
  fullPath: "/class/:uuid",
  summary: "Atualizar uma turma",
  tags: [tagName],
  body: updateClassSchemaValidator,
});

createApi(classStudentsRoutes, {
  controller: controller.getByUuid.bind(controller),
  method: "get",
  path: "/uuid/:uuid",
  fullPath: "/class/uuid/:uuid",
  summary: "Buscar uma turma",
  tags: [tagName],
  body: getOneClassSchemaValidator,
});

createApi(classStudentsRoutes, {
  controller: controller.delete.bind(controller),
  method: "delete",
  path: "/:uuid",
  fullPath: "/class/:uuid",
  summary: "Deletar uma turma",
  tags: [tagName],
  body: deleteClassSchemaValidator,
});

createApi(classStudentsRoutes, {
  controller: controller.getAll.bind(controller),
  method: "get",
  path: "/",
  fullPath: "/class",
  summary: "Buscar turmas",
  tags: [tagName],
});
