import { Router } from "express";
import {
  createSchoolSchema,
  deleteSchoolSchema,
  getByNameSchema,
  updateSchoolSchema,
  updateStatusSchoolSchema,
} from "../validators/school.validator";
import { container } from "tsyringe";
import { SchoolController } from "../controllers/school.controller";
import { createApi } from "../../../utils/helpers/createApi";

export const schoolRoutes = Router();

const controller = container.resolve(SchoolController);
const tagName = "Escola";

createApi(schoolRoutes, {
  method: "post",
  path: "/",
  fullPath: "/school",
  summary: "Criar escola",
  tags: [tagName],
  controller: controller.create.bind(controller),
  body: createSchoolSchema,
});

createApi(schoolRoutes, {
  method: "get",
  path: "/",
  fullPath: "/school",
  summary: "Buscar escolas",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
});

createApi(schoolRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/school/:uuid",
  summary: "Deletar uma escola",
  tags: [tagName],
  params: deleteSchoolSchema,
  controller: controller.delete.bind(controller),
});

createApi(schoolRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/school/:uuid",
  summary: "Atualizar uma escola",
  params: updateSchoolSchema.params,
  body: updateSchoolSchema.body,
  tags: [tagName],
  controller: controller.update.bind(controller),
});

createApi(schoolRoutes, {
  method: "put",
  path: "/status/:uuid",
  fullPath: "/school/status/:uuid",
  summary: "Atualizar o status de uma escola",
  params: updateStatusSchoolSchema.params,
  body: updateStatusSchoolSchema.body,
  tags: [tagName],
  controller: controller.updateStatus.bind(controller),
});

createApi(schoolRoutes, {
  method: "get",
  path: "/name/:name",
  fullPath: "/school/name/:name",
  summary: "Buscar uma escola pelo nome",
  params: getByNameSchema,
  tags: [tagName],
  controller: controller.getByName.bind(controller),
});
