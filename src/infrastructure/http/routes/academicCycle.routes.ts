import { Router } from "express";
import { container } from "tsyringe";
import { AcademicCycleController } from "../controllers/academicCycle.controller";

export const academicCycleRoutes = Router();

const controller = container.resolve(AcademicCycleController);

academicCycleRoutes.post("/", (req, res) => controller.create(req, res));
academicCycleRoutes.get("/", (req, res) => controller.getAll(req, res));
academicCycleRoutes.get("/uuid/:uuid", (req, res) =>
  controller.getOne(req, res),
);
academicCycleRoutes.put("/:uuid", (req, res) => controller.update(req, res));
academicCycleRoutes.delete("/:uuid", (req, res) => controller.delete(req, res));
