import { Router } from "express";
import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  createClassSchemaValidator,
  deleteClassSchemaValidator,
  getOneClassSchemaValidator,
  updateClassSchemaValidator,
} from "../validators/classStudent.validator";
import { container } from "tsyringe";
import { ClassStudentController } from "../controllers/classStudent.controller";

export const classStudentsRoutes = Router();

const controller = container.resolve(ClassStudentController);

classStudentsRoutes.post(
  "/",
  validateMiddlewareSchema(createClassSchemaValidator),
  (req, res) => controller.create(req, res),
);

classStudentsRoutes.put(
  "/:uuid",
  validateMiddlewareSchema(updateClassSchemaValidator),
  (req, res) => controller.update(req, res),
);

classStudentsRoutes.get(
  "/uuid/:uuid",
  validateMiddlewareSchema(getOneClassSchemaValidator),
  (req, res) => controller.geByUuid(req, res),
);

classStudentsRoutes.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteClassSchemaValidator),
  (req, res) => controller.delete(req, res),
);

classStudentsRoutes.get("/", (req, res) => controller.getAll(req, res));
