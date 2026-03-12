import { Router } from "express";
import { MakePeriodContainer } from "../../../main/container/period.container";

export const periodRoutes = Router();

const controller = MakePeriodContainer.inicialize();

periodRoutes.post("/", (req, res) => controller.create(req, res));
