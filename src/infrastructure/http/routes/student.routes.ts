import { Router } from "express";
import {
  createStudentSchema,
  deleteStudentSchema,
  getOneStudentSchema,
  updateStatusStudentSchema,
  updateStudentSchema,
} from "../validators/student.validator";
import { container } from "tsyringe";
import { StudentController } from "../controllers/student.controller";
import { createApi } from "../../../utils/helpers/createApi";
import { authorizationMiddleware } from "../middleware/profile.middleware";
import { authenticateMiddleware } from "../middleware/auth.middleware";
import { ProfileEnum } from "../../../utils/enum/profile";

export const studentsRoutes = Router();
const controller = container.resolve(StudentController);
const tagName = "Estudante";

createApi(studentsRoutes, {
  method: "get",
  path: "/",
  fullPath: "/student",
  summary: "Busca todos os alunos",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(studentsRoutes, {
  method: "post",
  path: "/",
  fullPath: "/student",
  summary: "Cria um aluno",
  tags: [tagName],
  controller: controller.create.bind(controller),
  body: createStudentSchema,
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(studentsRoutes, {
  method: "get",
  path: "/:uuid",
  fullPath: "/student/:uuid",
  summary: "Busca um aluno com base no id",
  tags: [tagName],
  controller: controller.getOne.bind(controller),
  body: getOneStudentSchema,
  middlewares: [authenticateMiddleware],
});

createApi(studentsRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/student/:uuid",
  summary: "Deleta um aluno com base no id",
  tags: [tagName],
  controller: controller.delete.bind(controller),
  body: deleteStudentSchema,
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(studentsRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/student/:uuid",
  summary: "Atualiza um aluno com base no id",
  tags: [tagName],
  controller: controller.update.bind(controller),
  body: updateStudentSchema.body,
  params: updateStudentSchema.params,
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});

createApi(studentsRoutes, {
  method: "put",
  path: "/status/:uuid",
  fullPath: "/student/status/:uuid",
  summary: "Atualiza o status do aluno com base no id",
  tags: [tagName],
  controller: controller.updateStatus.bind(controller),
  params: updateStatusStudentSchema,
  middlewares: [
    authenticateMiddleware,
    authorizationMiddleware([ProfileEnum.ADMIN]),
  ],
});
