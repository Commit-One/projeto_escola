import { Router } from "express";

import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  createStudentSchemaValidator,
  deleteStudentSchemaValidator,
  getOneStudentSchemaValidator,
  updateStatusStudentSchemaValidator,
  updateStudentSchemaValidator,
} from "../validators/student.validator";
import { container } from "tsyringe";
import { StudentController } from "../controllers/student.controller";

export const studentsRoutes = Router();

const controller = container.resolve(StudentController);

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
