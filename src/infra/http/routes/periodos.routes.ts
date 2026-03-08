import { Router } from "express";
import { makePeriodoContainer } from "../../../main/container/periodo.container";

export const periodoRoutes = Router();

const controller = makePeriodoContainer();

periodoRoutes.post("/", (req, res) => controller.create(req, res));
