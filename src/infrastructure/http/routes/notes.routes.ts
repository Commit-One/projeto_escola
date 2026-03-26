import { Router } from "express";
import { container } from "tsyringe";
import { validateMiddlewareSchema } from "../middleware/validateSchema.middleware";
import {
  createNotesSchemaValidator,
  deleteNotesSchemaValidator,
  getOneNotesSchemaValidator,
  updateNotesSchemaValidator,
} from "../validators/notes.validator";
import { NotesController } from "../controllers/notes.controller";

export const notesRoutes = Router();

const controller = container.resolve(NotesController);

notesRoutes.post(
  "/",
  validateMiddlewareSchema(createNotesSchemaValidator),
  (req, res) => controller.create(req, res),
);
notesRoutes.delete(
  "/:uuid",
  validateMiddlewareSchema(deleteNotesSchemaValidator),
  (req, res) => controller.delete(req, res),
);
notesRoutes.put(
  "/:uuid",
  validateMiddlewareSchema(updateNotesSchemaValidator),
  (req, res) => controller.update(req, res),
);
notesRoutes.get("/", (req, res) => controller.getAll(req, res));
notesRoutes.get(
  "/uuid/:uuid",
  validateMiddlewareSchema(getOneNotesSchemaValidator),
  (req, res) => controller.getOne(req, res),
);
