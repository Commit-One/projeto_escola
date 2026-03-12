import { Router } from "express";

import { validateMiddlewareSchema } from "../middleware/validateSchema";
import { MakeStudentContainer } from "../../../main/container/student.container";
import {
  createStudentSchemaValidator,
  deleteStudentSchemaValidator,
  getOneStudentSchemaValidator,
  updateStatusStudentSchemaValidator,
  updateStudentSchemaValidator,
} from "../validators/student.validator";

export const studentsRoutes = Router();

const controller = MakeStudentContainer.inicialize();

studentsRoutes.get("/", (req, res) => controller.getAll(req, res));

studentsRoutes.post(
  "/",
  validateMiddlewareSchema(createStudentSchemaValidator),
  (req, res) => controller.create(req, res),
);

studentsRoutes.get("/", (req, res) => controller.getAll(req, res));

studentsRoutes.get(
  "/:uuid",
  validateMiddlewareSchema(getOneStudentSchemaValidator),
  (req, res) => controller.getOne(req, res),
);

studentsRoutes.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteStudentSchemaValidator),
  (req, res) => controller.delete(req, res),
);

studentsRoutes.put(
  "/:uuid",
  validateMiddlewareSchema(updateStudentSchemaValidator),
  (req, res) => controller.update(req, res),
);

studentsRoutes.put(
  "/status/:uuid",
  validateMiddlewareSchema(updateStatusStudentSchemaValidator),
  (req, res) => controller.updateStatus(req, res),
);
