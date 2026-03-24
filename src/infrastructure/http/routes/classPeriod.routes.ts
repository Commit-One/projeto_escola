import { Router } from "express";
import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  createClassPeriodSchemaValidator,
  deleteClassPeriodSchemaValidator,
  getOneClassPeriodSchemaValidator,
  updateClassPeriodSchemaValidator,
} from "../validators/classPeriod.validator";
import { container } from "tsyringe";
import { ClassPeriodController } from "../controllers/classPeriod.controller";

export const classPeriodRoutes = Router();

const controller = container.resolve(ClassPeriodController);

classPeriodRoutes.post(
  "/",
  validateMiddlewareSchema(createClassPeriodSchemaValidator),
  (req, res) => controller.create(req, res),
);

classPeriodRoutes.put(
  "/:uuid",
  validateMiddlewareSchema(updateClassPeriodSchemaValidator),
  (req, res) => controller.update(req, res),
);

classPeriodRoutes.get(
  "/uuid/:uuid",
  validateMiddlewareSchema(getOneClassPeriodSchemaValidator),
  (req, res) => controller.getOne(req, res),
);

classPeriodRoutes.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteClassPeriodSchemaValidator),
  (req, res) => controller.delete(req, res),
);

classPeriodRoutes.get("/", (req, res) => controller.getAll(req, res));
