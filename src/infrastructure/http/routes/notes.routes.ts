import { Router } from "express";
import { container } from "tsyringe";
import {
  createGradeReportByStudentUuid,
  createNotesSchema,
  deleteNotesSchema,
  getOneNotesSchema,
  updateNotesSchema,
} from "../validators/notes.validator";
import { NotesController } from "../controllers/notes.controller";
import { createApi } from "../../../utils/helpers/createApi";
import { authenticateMiddleware } from "../middleware/auth.middleware";
import { authorizationMiddleware } from "../middleware/profile.middleware";
import { ProfileEnum } from "../../../utils/enum/profile";

export const notesRoutes = Router();

const controller = container.resolve(NotesController);
const tagName = "Notes";

createApi(notesRoutes, {
  method: "post",
  path: "/",
  fullPath: "/notes",
  summary: "Criar notas",
  body: createNotesSchema,
  tags: [tagName],
  controller: controller.create.bind(controller),
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(notesRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/notes/:uuid",
  summary: "Deletar notas",
  params: deleteNotesSchema,
  tags: [tagName],
  controller: controller.delete.bind(controller),
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(notesRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/notes/:uuid",
  summary: "Atualizar nota",
  body: updateNotesSchema.body,
  params: updateNotesSchema.params,
  tags: [tagName],
  controller: controller.update.bind(controller),
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(notesRoutes, {
  method: "get",
  path: "/",
  fullPath: "/notes",
  summary: "Buscar notas",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
  middlewares: [authenticateMiddleware],
});

createApi(notesRoutes, {
  method: "get",
  path: "/uuid/:uuid",
  fullPath: "/notes/uuid/:uuid",
  summary: "Buscar uma nota em específico",
  params: getOneNotesSchema,
  tags: [tagName],
  controller: controller.getOne.bind(controller),
  middlewares: [authenticateMiddleware],
});

createApi(notesRoutes, {
  method: "get",
  path: "/gradereport/:studentUuid",
  fullPath: "/notes/gradereport/:studentUuid",
  summary: "Cria o boletim do estudante",
  params: createGradeReportByStudentUuid,
  tags: [tagName],
  controller: controller.createGradeByStudentUuid.bind(controller),
  middlewares: [authenticateMiddleware],
});
