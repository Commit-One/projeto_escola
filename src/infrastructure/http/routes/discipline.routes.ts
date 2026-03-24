import { Router } from "express";
import { container } from "tsyringe";
import { DisciplineController } from "../controllers/discipline.controller";

export const disciplineRoutes = Router();

const controller = container.resolve(DisciplineController);

disciplineRoutes.post("/", (req, res) => controller.create(req, res));
disciplineRoutes.delete("/:uuid", (req, res) => controller.delete(req, res));
disciplineRoutes.put("/:uuid", (req, res) => controller.update(req, res));
disciplineRoutes.get("/", (req, res) => controller.getAll(req, res));
disciplineRoutes.get("/uuid/:uuid", (req, res) => controller.getOne(req, res));
