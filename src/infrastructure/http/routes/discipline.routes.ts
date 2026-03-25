import { Router } from "express";
import { container } from "tsyringe";
import { DisciplineController } from "../controllers/discipline.controller";
import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  createDisciplineSchemaValidator,
  deleteDisciplineSchemaValidator,
  getOneDisciplineSchemaValidator,
  updateDisciplineSchemaValidator,
} from "../validators/discipline.validator";

export const disciplineRoutes = Router();

const controller = container.resolve(DisciplineController);

disciplineRoutes.post(
  "/",
  validateMiddlewareSchema(createDisciplineSchemaValidator),
  (req, res) => controller.create(req, res),
);
disciplineRoutes.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteDisciplineSchemaValidator),
  (req, res) => controller.delete(req, res),
);
disciplineRoutes.put(
  "/:uuid",
  validateMiddlewareSchema(updateDisciplineSchemaValidator),
  (req, res) => controller.update(req, res),
);
disciplineRoutes.get("/", (req, res) => controller.getAll(req, res));
disciplineRoutes.get(
  "/uuid/:uuid",
  validateMiddlewareSchema(getOneDisciplineSchemaValidator),
  (req, res) => controller.getOne(req, res),
);
