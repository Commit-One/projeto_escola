import { Router } from "express";
import { container } from "tsyringe";
import {
  createGradeReportByStudentUuid,
  createNotesSchemaValidator,
  deleteNotesSchemaValidator,
  getOneNotesSchemaValidator,
  updateNotesSchemaValidator,
} from "../validators/notes.validator";
import { NotesController } from "../controllers/notes.controller";
import { createApi } from "../../../utils/helpers/createApi";

export const notesRoutes = Router();

const controller = container.resolve(NotesController);
const tagName = "Notes";

createApi(notesRoutes, {
  method: "post",
  path: "/",
  fullPath: "/notes",
  summary: "Criar notas",
  body: createNotesSchemaValidator,
  tags: [tagName],
  controller: controller.create.bind(controller),
});

createApi(notesRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/notes/:uuid",
  summary: "Deletar notas",
  params: deleteNotesSchemaValidator,
  tags: [tagName],
  controller: controller.delete.bind(controller),
});

createApi(notesRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/notes/:uuid",
  summary: "Atualizar nota",
  body: updateNotesSchemaValidator.body,
  params: updateNotesSchemaValidator.params,
  tags: [tagName],
  controller: controller.update.bind(controller),
});

createApi(notesRoutes, {
  method: "get",
  path: "/",
  fullPath: "/notes",
  summary: "Buscar notas",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
});

createApi(notesRoutes, {
  method: "get",
  path: "/uuid/:uuid",
  fullPath: "/notes/uuid/:uuid",
  summary: "Buscar uma nota em específico",
  params: getOneNotesSchemaValidator,
  tags: [tagName],
  controller: controller.getOne.bind(controller),
});

createApi(notesRoutes, {
  method: "get",
  path: "/gradereport/:studentUuid",
  fullPath: "/notes/gradereport/:studentUuid",
  summary: "Cria o boletim do estudante",
  params: createGradeReportByStudentUuid,
  tags: [tagName],
  controller: controller.createGradeByStudentUuid.bind(controller),
});
