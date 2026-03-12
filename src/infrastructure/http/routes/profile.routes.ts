import { Router } from "express";
import { MakeProfileContainer } from "../../../main/container/profile.container";

export const profileRoutes = Router();

const controller = MakeProfileContainer.inicialize();

profileRoutes.post("/", (req, res) => controller.create(req, res));
