import { Router } from "express";
import { makeProfileContainer } from "../../../main/container/profile.container";

export const profileRoutes = Router();

const controller = makeProfileContainer();

profileRoutes.post("/", (req, res) => controller.create(req, res));
