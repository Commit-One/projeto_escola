import { Router } from "express";
import { TesteController } from "../controllers/use.test.controller";

export const teste = Router();

const controller = new TesteController();

teste.post("/", (req, res) => controller.execute(req, res));
