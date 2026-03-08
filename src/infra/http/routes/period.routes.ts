import { Router } from "express";
import { makePeriodContainer } from "../../../main/container/period.container";

export const periodRoutes = Router();

const controller = makePeriodContainer();

periodRoutes.post("/", (req, res) => controller.create(req, res));
