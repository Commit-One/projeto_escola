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

export const classPeriod = Router();

const controller = container.resolve(ClassPeriodController);

classPeriod.post(
  "/",
  validateMiddlewareSchema(createClassPeriodSchemaValidator),
  (req, res) => controller.create(req, res),
);

classPeriod.put(
  "/:uuid",
  validateMiddlewareSchema(updateClassPeriodSchemaValidator),
  (req, res) => controller.update(req, res),
);

classPeriod.get(
  "/uuid/:uuid",
  validateMiddlewareSchema(getOneClassPeriodSchemaValidator),
  (req, res) => controller.getOne(req, res),
);

classPeriod.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteClassPeriodSchemaValidator),
  (req, res) => controller.delete(req, res),
);

classPeriod.get("/", (req, res) => controller.getAll(req, res));
