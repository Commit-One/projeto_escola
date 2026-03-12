import { Router } from "express";
import { validateMiddlewareSchema } from "../middleware/validateSchema";
import {
  createClassSchemaValidator,
  deleteClassSchemaValidator,
  getOneClassSchemaValidator,
  updateClassSchemaValidator,
} from "../validators/classStudent.validator";
import { MakeClassStudentContainer } from "../../../main/container/classStudent.container";

export const classStudents = Router();

const controller = MakeClassStudentContainer.inicialize();

classStudents.post(
  "/",
  validateMiddlewareSchema(createClassSchemaValidator),
  (req, res) => controller.create(req, res),
);

classStudents.put(
  "/:uuid",
  validateMiddlewareSchema(updateClassSchemaValidator),
  (req, res) => controller.update(req, res),
);

classStudents.get(
  "/uuid/:uuid",
  validateMiddlewareSchema(getOneClassSchemaValidator),
  (req, res) => controller.geByUuid(req, res),
);

classStudents.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteClassSchemaValidator),
  (req, res) => controller.delete(req, res),
);

classStudents.get("/", (req, res) => controller.getAll(req, res));
