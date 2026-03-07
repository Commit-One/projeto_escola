import { Router } from "express";
import { makeSchoolContainer } from "../../../main/container/school.container";
import { validateMiddlewareSchema } from "../middleware/validateSchema";
import {
  createSchoolSchema,
  deleteSchoolSchema,
  getByNameSchema,
  updateSchoolSchema,
} from "../validators/school.validator";
import { authMiddleware } from "../middleware/auth";

export const schoolRoutes = Router();

const controller = makeSchoolContainer();

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
