import { Router } from "express";
import { container } from "tsyringe";
import { ProfileController } from "../controllers/profile.controller";

export const profileRoutes = Router();

const controller = container.resolve(ProfileController);

profileRoutes.post("/", (req, res) => controller.create(req, res));
