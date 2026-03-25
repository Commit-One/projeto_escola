import { Router } from "express";
import { container } from "tsyringe";
import { StudentDisciplineController } from "../controllers/studentDiscipline.controller";
import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  createStudentDisciplineSchemaValidator,
  deleteStudentDisciplineSchemaValidator,
  getOneStudentDisciplineSchemaValidator,
  updateStudentDisciplineSchemaValidator,
} from "../validators/studentDiscipline.validator";

export const studentDisciplineRoutes = Router();

const controller = container.resolve(StudentDisciplineController);

studentDisciplineRoutes.post(
  "/",
  validateMiddlewareSchema(createStudentDisciplineSchemaValidator),
  (req, res) => controller.create(req, res),
);
studentDisciplineRoutes.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteStudentDisciplineSchemaValidator),
  (req, res) => controller.delete(req, res),
);
studentDisciplineRoutes.put(
  "/:uuid",
  validateMiddlewareSchema(updateStudentDisciplineSchemaValidator),
  (req, res) => controller.update(req, res),
);
studentDisciplineRoutes.get("/", (req, res) => controller.getAll(req, res));
studentDisciplineRoutes.get(
  "/uuid/:uuid",
  validateMiddlewareSchema(getOneStudentDisciplineSchemaValidator),
  (req, res) => controller.getOne(req, res),
);
