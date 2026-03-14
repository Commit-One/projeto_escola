import { Router } from "express";
import { container } from "tsyringe";
import { PeriodController } from "../controllers/period.controller";

export const periodRoutes = Router();

const controller = container.resolve(PeriodController);

periodRoutes.post("/", (req, res) => controller.create(req, res));
