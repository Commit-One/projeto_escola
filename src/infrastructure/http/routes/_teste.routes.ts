import { Router } from "express";
import { TesteController } from "../controllers/_use.test.controller";
import { container } from "tsyringe";

export const teste = Router();

const controller = container.resolve(TesteController);

teste.post("/", (req, res) => controller.execute(req, res));
