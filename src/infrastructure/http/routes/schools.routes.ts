import { Router } from "express";
import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  createSchoolSchema,
  deleteSchoolSchema,
  getByNameSchema,
  updateSchoolSchema,
  updateStatusSchoolSchema,
} from "../validators/school.validator";
import { container } from "tsyringe";
import { SchoolController } from "../controllers/school.controller";

export const schoolRoutes = Router();

const controller = container.resolve(SchoolController);

schoolRoutes.post(
  "/",
  validateMiddlewareSchema(createSchoolSchema),
  // authMiddleware,
  (req, res) => controller.create(req, res),
);

schoolRoutes.get("/", (req, res) => controller.getAll(req, res));

schoolRoutes.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteSchoolSchema),
  // authMiddleware,
  (req, res) => controller.delete(req, res),
);

schoolRoutes.put(
  "/:uuid",
  validateMiddlewareSchema(updateSchoolSchema),
  // authMiddleware,
  (req, res) => controller.update(req, res),
);

schoolRoutes.get(
  "/name/:name",
  validateMiddlewareSchema(getByNameSchema),
  // authMiddleware,
  (req, res) => controller.getByName(req, res),
);

schoolRoutes.put(
  "/status/:uuid",
  validateMiddlewareSchema(updateStatusSchoolSchema),
  // authMiddleware,
  (req, res) => controller.updateStatus(req, res),
);
